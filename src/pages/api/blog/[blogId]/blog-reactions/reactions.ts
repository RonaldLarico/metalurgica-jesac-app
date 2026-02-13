// api/blog/[blogId]/reactions.ts
import type { APIRoute } from "astro";
import { prisma } from "../../../../../../lib/db.server";

export const GET: APIRoute = async ({ params }) => {
  const blogId = Number(params.blogId);
  if (isNaN(blogId)) {
    return new Response(JSON.stringify({ message: "Invalid blogId" }), { status: 400 });
  }

  try {
    // Contar todas las reacciones por tipo
    const reactions = await prisma.blogReaction.groupBy({
      by: ["type"],
      where: { blogId },
      _count: { type: true },
    });

    // Formatear para React (siempre en el orden LIKE, DISLIKE, LOVE, WOW)
    const formatted = ["LIKE", "DISLIKE", "LOVE", "WOW"].map((type) => {
      const found = reactions.find((r) => r.type === type);
      return { type, count: found?._count?.type || 0 };
    });

    return new Response(JSON.stringify(formatted), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error fetching reactions" }), { status: 500 });
  }
};
