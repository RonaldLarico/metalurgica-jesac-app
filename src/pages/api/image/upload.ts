import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import ffmpeg from "fluent-ffmpeg";
import { prisma } from "../../../../lib/db.server";
import { ensureMediaDir, MEDIA_DIRS } from "../../../lib/mediaPaths";

export const POST: APIRoute = async ({ request, cookies }) => {
  const type = "gallery";
  ensureMediaDir(type);
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

    const savedFiles = [];
    const responseUrls: string[] = [];

    const imageExts = [".png", ".jpg", ".jpeg", ".webp"];
    const videoExts = [".mp4"];
    const gifExts = [".gif"];

    const uploadDir = MEDIA_DIRS[type];

    for (const item of items) {
      if (!(item instanceof File)) continue;

      const originalBuffer = Buffer.from(await item.arrayBuffer());
      const extname = path.extname(item.name).toLowerCase();
      const originalName = path.parse(item.name).name;

      let fileName: string;
      let publicUrl: string;
      let stats: fs.Stats;

      const sanitizedOriginalName = originalName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");

      const ext = extname.replace(".", "");
      const extWebp = "webp";

      if (imageExts.includes(extname)) {
        const outputBuffer = await sharp(originalBuffer)
          .resize({ width: 3000, withoutEnlargement: true })
          .webp({ quality: 92, effort: 4, smartSubsample: true })
          .toBuffer();
        
        fileName = `${Date.now()}-${sanitizedOriginalName}.${extWebp}`;
        const filePath = path.join(uploadDir, fileName);

        fs.writeFileSync(filePath, outputBuffer);
        publicUrl = `/api/media/${type}/${fileName}`;
        stats = fs.statSync(filePath);

        const metadata = await sharp(outputBuffer).metadata();

        savedFiles.push({
          url: publicUrl,
          name: sanitizedOriginalName,
          size: stats.size,
          width: metadata.width,
          height: metadata.height,
          format: metadata.format,
          userId: Number(userId),
        });
        responseUrls.push(publicUrl);

      } else if (videoExts.includes(extname) || gifExts.includes(extname)) {
        const tempInputPath = path.join(
          uploadDir,
          `temp-${Date.now()}-${sanitizedOriginalName}${extname}`
        );

        fileName = `${Date.now()}-${sanitizedOriginalName}.webm`;
        const outputPath = path.join(uploadDir, fileName);

        // Guardar archivo temporal
        fs.writeFileSync(tempInputPath, originalBuffer);

        // Convertir usando FFmpeg
        await new Promise((resolve, reject) => {
          ffmpeg(tempInputPath)
            .outputOptions([
              "-c:v libvpx-vp9",     // Codec moderno
              "-crf 32",             // Calidad (30-35 recomendado)
              "-b:v 0",
              "-vf scale=1280:-1",   // Limita resolución máxima
              "-row-mt 1",           // Mejor rendimiento multithread
              "-c:a libopus",        // Audio moderno
            ])
            .toFormat("webm")
            .on("end", resolve)
            .on("error", reject)
            .save(outputPath);
        });

        // Eliminar original temporal
        fs.unlinkSync(tempInputPath);
        publicUrl = `/api/media/${type}/${fileName}`;
        stats = fs.statSync(outputPath);

        savedFiles.push({
          url: publicUrl,
          name: sanitizedOriginalName,
          size: stats.size,
          width: null,
          height: null,
          format: extname.replace(".", ""),
          userId: Number(userId),
        });

        responseUrls.push(publicUrl);

      } else {
        continue;
      }
    }

    if (savedFiles.length === 0) {
      return new Response("No valid files", { status: 400 });
    }

    // Guardar archivos en la DB
    await prisma.image.createMany({ data: savedFiles });

    return new Response(JSON.stringify({ ok: true, urls: responseUrls }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
