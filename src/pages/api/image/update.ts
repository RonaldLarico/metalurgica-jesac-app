import type { APIRoute } from "astro";
import { prisma } from "../../../../lib/db.server";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { ensureMediaDir, MEDIA_DIRS } from "../../../lib/mediaPaths";

export const POST: APIRoute = async ({ request, cookies }) => {
  const type = "gallery";
  ensureMediaDir(type);

  const userId = cookies.get("session")?.value;
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const formData = await request.formData();
  const imageId = formData.get("imageId");
  const file = formData.get("image") as File;

  if (!imageId || !file) {
    return new Response("Invalid data", { status: 400 });
  }

  // Buscar imagen
  const image = await prisma.image.findUnique({
    where: { id: Number(imageId) },
  });

  if (!image || image.userId !== Number(userId)) {
    return new Response("Image not found", { status: 404 });
  }

  // Eliminar imagen anterior
  const oldPath = path.join(MEDIA_DIRS[type], path.basename(image.url));
  if (fs.existsSync(oldPath)) {
    fs.unlinkSync(oldPath);
  }

  // Asegurar carpeta gallery
  const uploadDir = MEDIA_DIRS[type];

  // Procesar imagen con Sharp (comprimir y convertir a webp)
  const buffer = Buffer.from(await file.arrayBuffer());
  const outputBuffer = await sharp(buffer)
    .resize({ width: 3000, withoutEnlargement: true }) // opcional
    .webp({ quality: 92, effort: 4, smartSubsample: true })
    .toBuffer();

  const originalName = path.parse(file.name).name;
  const sanitizedOriginalName = originalName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

  // Detectar formato real (webp)
  const outputMetadata = await sharp(outputBuffer).metadata();
  const ext = outputMetadata.format;
  const newFileName = `${Date.now()}-${sanitizedOriginalName}.${ext}`;
  const newFullPath = path.join(uploadDir, newFileName);

  fs.writeFileSync(newFullPath, outputBuffer);

  const newUrl = `/api/media/${type}/${newFileName}`;

  // Actualizar BD
  await prisma.image.update({
    where: { id: image.id },
    data: {
      url: newUrl,
      name: sanitizedOriginalName,
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
