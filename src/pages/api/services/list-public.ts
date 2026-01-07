import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/db.server";

export const GET: APIRoute = async () => {
  try {
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
  } catch (error) {
    console.error("Error fetching services:", error);
    return new Response(JSON.stringify({ error: "Error al obtener servicios" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
