import type { APIRoute } from "astro";
import { prisma } from "../../../../../../lib/db.server";

interface CommentNode {
  id: number;
  content: string;
  name: string;
  email: string | null;
  blogId: number;
  parentId: number | null;
  approved: boolean;
  createdAt: Date;
  replies: CommentNode[];
}

export const GET: APIRoute = async ({ params }) => {
  try {
    const blogId = Number(params.blogId);

    if (isNaN(blogId)) {
      return new Response(JSON.stringify({ message: "Invalid blogId" }), {
        status: 400,
      });
    }

    // 1️⃣ Obtener comentarios aprobados
    const comments = await prisma.blogComment.findMany({
      where: {
        blogId,
        approved: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 2️⃣ Construcción eficiente del árbol O(n)
    const map = new Map<number, CommentNode>();
    const roots: CommentNode[] = [];

    for (const comment of comments) {
      map.set(comment.id, {
        ...comment,
        replies: [],
      });
    }

    for (const comment of comments) {
      const node = map.get(comment.id)!;

      if (comment.parentId !== null) {
        const parent = map.get(comment.parentId);
        if (parent) {
          parent.replies.push(node);
        }
      } else {
        roots.push(node);
      }
    }

    return new Response(JSON.stringify(roots), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching comments" }),
      { status: 500 },
    );
  }
};
