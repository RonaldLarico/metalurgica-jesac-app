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

    const savedFiles = [];
    const responseUrls: string[] = [];

    for (const item of items) {
      if (!(item instanceof File)) continue;

      const originalBuffer = Buffer.from(await item.arrayBuffer());
      const extname = path.extname(item.name).toLowerCase();

      let fileName: string;
      let publicUrl: string;
      let stats: fs.Stats;

      // 🔹 Imagen: comprimir y convertir a WebP
      if ([".png", ".jpg", ".jpeg", ".webp"].includes(extname)) {
        const outputBuffer = await sharp(originalBuffer)
          .resize({ width: 3000, withoutEnlargement: true })
          .webp({ quality: 92, effort: 4, smartSubsample: true })
          .toBuffer();

        fileName = `${Date.now()}-${path.parse(item.name).name}.webp`;
        const filePath = path.join(uploadsDir, fileName);
        fs.writeFileSync(filePath, outputBuffer);
        publicUrl = `/uploads/${fileName}`;
        stats = fs.statSync(filePath);

        const metadata = await sharp(outputBuffer).metadata();

        savedFiles.push({
          url: publicUrl,
          size: stats.size,
          width: metadata.width,
          height: metadata.height,
          format: metadata.format,
          userId: Number(userId),
        });

        responseUrls.push(publicUrl);

      // 🔹 Video MP4: subir tal cual, sin comprimir
      } else if (extname === ".mp4") {
        fileName = `${Date.now()}-${path.parse(item.name).name}.mp4`;
        const filePath = path.join(uploadsDir, fileName);
        fs.writeFileSync(filePath, originalBuffer);
        publicUrl = `/uploads/${fileName}`;
        stats = fs.statSync(filePath);

        savedFiles.push({
          url: publicUrl,
          size: stats.size,
          width: null,
          height: null,
          format: "mp4",
          userId: Number(userId),
        });

        responseUrls.push(publicUrl);

      } else {
        continue; // Ignorar otros tipos de archivo
      }
    }

    if (savedFiles.length === 0) {
      return new Response("No valid files", { status: 400 });
    }

    // 💾 Guardar archivos en la DB
    await prisma.image.createMany({ data: savedFiles });

    return new Response(
      JSON.stringify({ ok: true, urls: responseUrls }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
