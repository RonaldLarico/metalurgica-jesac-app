import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/db.server";

export const GET: APIRoute = async ({ cookies }) => {
  
  const session = cookies.get("session")?.value;
  if (!session) {
    return new Response("No autorizado", { status: 401 });
  }

  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      subtitles: {
        orderBy: { order: "desc" },
      },
      images: true,
    },
  });

  return new Response(JSON.stringify(services), {
    headers: { "Content-Type": "application/json" },
  });
};
