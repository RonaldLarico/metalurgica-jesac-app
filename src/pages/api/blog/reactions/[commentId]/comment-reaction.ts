import type { APIRoute } from "astro";
import { prisma } from "../../../../../../lib/db.server";

export const POST: APIRoute = async ({ params, request, clientAddress }) => {
  try {
    const commentId = Number(params.commentId);
    if (isNaN(commentId)) {
      return new Response(
        JSON.stringify({ message: "Invalid commentId" }),
        { status: 400 }
      );
    }

    const body = await request.json();
    const { type, userId } = body;

    if (!type) {
      return new Response(
        JSON.stringify({ message: "Reaction type is required" }),
        { status: 400 }
      );
    }

    // Obtener IP correctamente desde Astro
    const ipAddress = clientAddress ?? null;

    if (!userId && !ipAddress) {
      return new Response(
        JSON.stringify({ message: "Unable to determine client IP" }),
        { status: 400 }
      );
    }

    // Validar comentario
    const comment = await prisma.blogComment.findUnique({
      where: { id: commentId },
      select: { id: true },
    });

    if (!comment) {
      return new Response(
        JSON.stringify({ message: "Comment not found" }),
        { status: 404 }
      );
    }

    let reaction;
    
    // Usuario autenticado
    if (userId) {
      reaction = await prisma.blogCommentReaction.upsert({
        where: {
          commentId_userId: {
            commentId,
            userId: Number(userId),
          },
        },
        update: { type },
        create: {
          commentId,
          type,
          userId: Number(userId),
          ipAddress: null,
        },
      });
    }
    // Usuario anónimo
    else {
      reaction = await prisma.blogCommentReaction.upsert({
        where: {
          commentId_ipAddress: {
            commentId,
            ipAddress: ipAddress!,
          },
        },
        update: { type },
        create: {
          commentId,
          type,
          userId: null,
          ipAddress: ipAddress!,
        },
      });
    }

    return new Response(JSON.stringify(reaction), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("CommentReaction POST error:", error);
    return new Response(
      JSON.stringify({ message: "Error creating comment reaction" }),
      { status: 500 }
    );
  }
};
