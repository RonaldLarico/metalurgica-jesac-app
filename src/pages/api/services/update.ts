import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/db.server";

export const POST: APIRoute = async ({ request, cookies }) => {
  const sessionUserId = cookies.get("session")?.value;
  if (!sessionUserId) {
    return new Response("No autorizado", { status: 401 });
  }

  const { id, title, subtitles, images } = await request.json();

  if (!id || !title) {
    return new Response("Datos incompletos", { status: 400 });
  }

  // Eliminamos relaciones previas para simplificar
  await prisma.serviceSubtitle.deleteMany({
    where: { serviceId: Number(id) },
  });

  await prisma.serviceImage.deleteMany({
    where: { serviceId: Number(id) },
  });

  const service = await prisma.service.update({
    where: { id: Number(id) },
    data: {
      title,
      subtitles: subtitles
        ? {
            create: subtitles.map((text: string, index: number) => ({
              text,
              order: index,
            })),
          }
        : undefined,
      images: images
        ? {
            create: images.map((url: string) => ({
              url,
            })),
          }
        : undefined,
    },
  });

  return new Response(JSON.stringify(service), {
    headers: { "Content-Type": "application/json" },
  });
};
