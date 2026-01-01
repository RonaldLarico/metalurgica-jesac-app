import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { prisma } from "../../../../lib/db.server";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const userId = cookies.get("session")?.value;
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();
    const items = formData.getAll("image");

    if (!items || items.length === 0) {
      return new Response("No files uploaded", { status: 400 });
    }

    // 📁 Crear carpeta uploads si no existe
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const savedImages = [];
    const responseUrls: string[] = [];

    for (const item of items) {
      // 🔑 IGNORAR metadata de FilePond
      if (!(item instanceof File)) continue;

      const buffer = Buffer.from(await item.arrayBuffer());
      const metadata = await sharp(buffer).metadata();

      // Comprimir y convertir a WebP
      const outputBuffer = await sharp(buffer)
        .resize({ width: 3000, withoutEnlargement: true }) // opcional
        .webp({ quality: 92, effort: 4, smartSubsample: true })
        .toBuffer(); // generamos buffer en memoria

      // Detectar extensión real del buffer generado
      const outputMetadata = await sharp(outputBuffer).metadata();
      const ext = outputMetadata.format; // por ejemplo: 'webp', 'jpeg', 'png', etc.

      const fileName = `${Date.now()}-${path.parse(item.name).name}.${ext}`;
      const filePath = path.join(uploadsDir, fileName);
      const publicUrl = `/uploads/${fileName}`;

      // 💾 Guardar archivo físico
      fs.writeFileSync(filePath, outputBuffer);

      const stats = fs.statSync(filePath);

      // 📌 Preparar registro para DB
      savedImages.push({
        url: publicUrl,
        size: stats.size,
        width: outputMetadata.width,
        height: outputMetadata.height,
        format: outputMetadata.format,
        userId: Number(userId),
      });

      responseUrls.push(publicUrl);
    }

    if (savedImages.length === 0) {
      return new Response("No valid image files", { status: 400 });
    }

    // 💾 Guardar TODAS las URLs en la base de datos
    await prisma.image.createMany({
      data: savedImages,
    });

    return new Response(
      JSON.stringify({
        ok: true,
        urls: responseUrls,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
