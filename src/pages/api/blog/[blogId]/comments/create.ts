import type { APIRoute } from "astro";
import { prisma } from "../../../../../../lib/db.server";

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const blogId = Number(params.blogId);

    if (isNaN(blogId)) {
      return new Response(JSON.stringify({ message: "Invalid blogId" }), {
        status: 400,
      });
    }

    const body = await request.json();
    let { content, name, email, parentId } = body;

    // Normalizar datos
    content = content?.trim();
    name = name?.trim();
    parentId = parentId ? Number(parentId) : null;

    if (!content || !name) {
      return new Response(
        JSON.stringify({ message: "Content and name are required" }),
        { status: 400 },
      );
    }

    // 1️⃣ Validar blog
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      return new Response(JSON.stringify({ message: "Blog not found" }), {
        status: 404,
      });
    }

    // 2️⃣ Validar comentario padre si existe
    if (parentId !== null) {
      const parentComment = await prisma.blogComment.findUnique({
        where: { id: parentId },
      });

      if (!parentComment || parentComment.blogId !== blogId) {
        return new Response(
          JSON.stringify({ message: "Invalid parent comment" }),
          { status: 400 },
        );
      }
    }

    // 3️⃣ Crear comentario
    const comment = await prisma.blogComment.create({
      data: {
        content,
        name,
        email: email ?? null,
        blogId,
        parentId,
        approved: true,
      },
    });

    return new Response(JSON.stringify(comment), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error creating comment" }), {
      status: 500,
    });
  }
};
