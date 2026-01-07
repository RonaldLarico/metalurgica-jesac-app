import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/db.server";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const userId = cookies.get("session")?.value;
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const body = await request.json();
    const { subtitleId, text } = body;

    if (!subtitleId) return new Response("subtitleId is required", { status: 400 });
    if (typeof text !== "string" || text.trim() === "")
      return new Response("text is required", { status: 400 });

    // 🔎 Buscar el subtitle
    const subtitle = await prisma.serviceSubtitle.findUnique({
      where: { id: Number(subtitleId) },
    });

    if (!subtitle) return new Response("Subtitle not found", { status: 404 });

    // 🔄 Actualizar solo el campo 'text'
    const updatedSubtitle = await prisma.serviceSubtitle.update({
      where: { id: Number(subtitleId) },
      data: { text: text.trim() },
    });

    return new Response(
      JSON.stringify({ ok: true, subtitle: updatedSubtitle }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("UPDATE SUBTITLE ERROR:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
};
