import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/db.server";
import fs from "fs";
import path from "path";

export const POST: APIRoute = async ({ request, cookies }) => {
  const userId = cookies.get("session")?.value;
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { imageId } = await request.json();

  if (!imageId) {
    return new Response("Image ID required", { status: 400 });
  }

  // 🔎 Buscar imagen y validar dueño
  const image = await prisma.image.findUnique({
    where: { id: Number(imageId) },
  });

  if (!image || image.userId !== Number(userId)) {
    return new Response("Image not found", { status: 404 });
  }

  // 🗑 Eliminar archivo físico
  const filePath = path.join(process.cwd(), "public", image.url);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  // 🗑 Eliminar de BD
  await prisma.image.delete({
    where: { id: image.id },
  });

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
