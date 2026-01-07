// src/pages/api/services/delete-subtitle.ts
import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/db.server";

export const DELETE: APIRoute = async ({ request, cookies }) => {
  try {
    const userId = cookies.get("session")?.value;
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const body = await request.json();
    const { subtitleId } = body;

    if (!subtitleId) return new Response("subtitleId is required", { status: 400 });

    // 🔎 Buscar el subtitle
    const subtitle = await prisma.serviceSubtitle.findUnique({
      where: { id: Number(subtitleId) },
    });

    if (!subtitle) return new Response("Subtitle not found", { status: 404 });

    // 🗑 Eliminar el subtitle
    await prisma.serviceSubtitle.delete({
      where: { id: Number(subtitleId) },
    });

    return new Response(
      JSON.stringify({ ok: true, message: "Subtitle deleted successfully" }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("DELETE SUBTITLE ERROR:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
};
