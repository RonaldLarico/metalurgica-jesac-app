import type { APIRoute } from "astro";
import { prisma } from "../../../../../lib/db.server";

export const POST: APIRoute = async ({ params, request, clientAddress }) => {
  try {
    // 1️⃣ Validar blogId
    const blogId = Number(params.blogId);
    if (isNaN(blogId)) {
      return new Response(
        JSON.stringify({ message: "Invalid blogId" }),
        { status: 400 }
      );
    }

    // 2️⃣ Leer body
    const body = await request.json();
    const { type, userId } = body;

    if (!type) {
      return new Response(
        JSON.stringify({ message: "Reaction type is required" }),
        { status: 400 }
      );
    }

    // 3️⃣ Obtener IP desde Astro (forma correcta)
    const ipAddress = clientAddress ?? null;

    if (!userId && !ipAddress) {
      return new Response(
        JSON.stringify({ message: "Unable to determine client IP" }),
        { status: 400 }
      );
    }

    // 4️⃣ Validar que el blog existe
    const blogExists = await prisma.blog.findUnique({
      where: { id: blogId },
      select: { id: true },
    });

    if (!blogExists) {
      return new Response(
        JSON.stringify({ message: "Blog not found" }),
        { status: 404 }
      );
    }

    let reaction;

    // ============================================================
    // 🔐 CASO 1: Usuario autenticado
    // ============================================================
    if (userId) {
      reaction = await prisma.blogReaction.upsert({
        where: {
          blogId_userId: {
            blogId,
            userId: Number(userId),
          },
        },
        update: {
          type,
        },
        create: {
          blogId,
          type,
          userId: Number(userId),
          ipAddress: null,
        },
      });
    }

    // ============================================================
    // 🌐 CASO 2: Usuario anónimo (por IP)
    // ============================================================
    else {
      reaction = await prisma.blogReaction.upsert({
        where: {
          blogId_ipAddress: {
            blogId,
            ipAddress: ipAddress!,
          },
        },
        update: {
          type,
        },
        create: {
          blogId,
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
    console.error("BlogReaction POST error:", error);

    return new Response(
      JSON.stringify({ message: "Error creating blog reaction" }),
      { status: 500 }
    );
  }
};
