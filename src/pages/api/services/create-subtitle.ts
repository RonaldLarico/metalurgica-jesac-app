import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/db.server";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // 🔒 Verificar sesión (opcional)
    const userId = cookies.get("session")?.value;
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const body = await request.json();
    const { serviceId, text } = body;

    // ✅ Validaciones
    if (!serviceId) return new Response("serviceId is required", { status: 400 });
    if (typeof text !== "string" || text.trim() === "")
      return new Response("text is required", { status: 400 });

    // 🔎 Verificar que exista el Service
    const service = await prisma.service.findUnique({
      where: { id: Number(serviceId) },
    });

    if (!service) return new Response("Service not found", { status: 404 });

    // ➕ Crear el ServiceSubtitle
    const newSubtitle = await prisma.serviceSubtitle.create({
      data: {
        text: text.trim(),
        serviceId: Number(serviceId),
      },
    });

    return new Response(
      JSON.stringify({ ok: true, subtitle: newSubtitle }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("CREATE SUBTITLE ERROR:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
};
