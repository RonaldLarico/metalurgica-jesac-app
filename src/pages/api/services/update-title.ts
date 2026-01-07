// src/pages/api/services/update-title.ts
import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/db.server";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const userId = cookies.get("session")?.value;
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const body = await request.json();
    const { serviceId, title, category } = body;

    if (!serviceId || !title) {
      return new Response("serviceId and title are required", { status: 400 });
    }

    // 🔎 Verificar que el servicio exista
    const service = await prisma.service.findUnique({
      where: { id: Number(serviceId) },
    });

    if (!service) {
      return new Response("Service not found", { status: 404 });
    }

    // 🔄 Actualizar el title
    await prisma.service.update({
      where: { id: Number(serviceId) },
      data: { title, category },
    });

    return new Response(
      JSON.stringify({ ok: true, message: "Title updated successfully" }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("UPDATE TITLE ERROR:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
};
