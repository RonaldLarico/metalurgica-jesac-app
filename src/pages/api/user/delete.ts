import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/db.server";
import fs from "fs";
import path from "path";

export const POST: APIRoute = async ({ request, cookies }) => {
  const sessionUserId = cookies.get("session")?.value;
  if (!sessionUserId) {
    return new Response("No autorizado", { status: 401 });
  }

  const { id } = await request.json();
  if (!id) {
    return new Response("ID requerido", { status: 400 });
  }

  // Obtener imágenes del usuario
  const images = await prisma.image.findMany({
    where: { userId: Number(id) },
  });

  // Eliminar archivos físicos
  for (const img of images) {
    const filePath = path.join(process.cwd(), "public", img.url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  // Eliminar registros
  await prisma.image.deleteMany({
    where: { userId: Number(id) },
  });

  await prisma.user.delete({
    where: { id: Number(id) },
  });

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
