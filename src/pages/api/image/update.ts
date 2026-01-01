import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/db.server";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export const POST: APIRoute = async ({ request, cookies }) => {
  const userId = cookies.get("session")?.value;
  if (!userId) return new Response("Unauthorized", { status: 401 });
  
  const formData = await request.formData();
  const imageId = formData.get("imageId");
  const file = formData.get("image") as File;

  if (!imageId || !file) {
    return new Response("Invalid data", { status: 400 });
  }

  // 🔎 Buscar imagen
  const image = await prisma.image.findUnique({
    where: { id: Number(imageId) },
  });

  if (!image || image.userId !== Number(userId)) {
    return new Response("Image not found", { status: 404 });
  }

  // 🗑 Eliminar imagen anterior
  const oldPath = path.join(process.cwd(), "public", image.url);
  if (fs.existsSync(oldPath)) {
    fs.unlinkSync(oldPath);
  }

  // 📁 Asegurar carpeta uploads
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // 💾 Procesar imagen con Sharp (comprimir y convertir a webp)
  const buffer = Buffer.from(await file.arrayBuffer());
  const outputBuffer = await sharp(buffer)
    .resize({ width: 3000, withoutEnlargement: true }) // opcional
    .webp({ quality: 92, effort: 4, smartSubsample: true })
    .toBuffer();

  // Detectar formato real (webp)
  const outputMetadata = await sharp(outputBuffer).metadata();
  const ext = outputMetadata.format; // debería ser 'webp'
  const newFileName = `${Date.now()}-${path.parse(file.name).name}.${ext}`;
  const newFullPath = path.join(uploadsDir, newFileName);

  fs.writeFileSync(newFullPath, outputBuffer);

  const newUrl = `/uploads/${newFileName}`;

  // 🔄 Actualizar BD
  await prisma.image.update({
    where: { id: image.id },
    data: {
      url: newUrl,
      size: outputBuffer.length,
      width: outputMetadata.width,
      height: outputMetadata.height,
      format: outputMetadata.format,
    },
  });

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
