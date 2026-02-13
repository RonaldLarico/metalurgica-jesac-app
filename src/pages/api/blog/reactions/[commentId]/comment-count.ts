import type { APIRoute } from "astro";
import { prisma } from "../../../../../../lib/db.server";

// GET → obtener todos los conteos de reacciones de un comentario
export const GET: APIRoute = async ({ params }) => {
  const commentId = Number(params.commentId);
  if (isNaN(commentId)) {
    return new Response(JSON.stringify({ message: "Invalid commentId" }), { status: 400 });
  }

  try {
    const reactions = await prisma.blogCommentReaction.groupBy({
      by: ["type"],
      where: { commentId },
      _count: { type: true },
    });

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