import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/db.server";

export const POST: APIRoute = async ({ request, cookies }) => {
  const session = cookies.get("session")?.value;
  if (!session) {
    return new Response("No autorizado", { status: 401 });
  }

  const { title, category, subtitles, images } = await request.json();

  if (!title || !Array.isArray(images) || images.length === 0) {
    return new Response("Datos incompletos", { status: 400 });
  }

  try {
    const service = await prisma.service.create({
      data: {
        title,
        category,
        subtitles: Array.isArray(subtitles)
          ? {
              create: subtitles.map((text: string, index: number) => ({
                text,
                order: index,
              })),
            }
          : undefined,
        images: Array.isArray(images)
          ? {
              create: images.map((img: any) => ({
                url: img.url,
                size: img.size ?? null,
                width: img.width ?? null,
                height: img.height ?? null,
                format: img.format ?? null,
              })),
            }
          : undefined,
      },
      include: {
        images: true,
        subtitles: true,
      },
    });
    console.log("REQUEST BODY:", { title, subtitles, images });

    return new Response(JSON.stringify(service), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("💥 ERROR CREATE SERVICE:", err);
    return new Response("Error al crear el servicio", { status: 500 });
  }
};
