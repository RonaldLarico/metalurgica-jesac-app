import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { ensureMediaDir, MEDIA_DIRS } from "../../../lib/mediaPaths";

export const POST: APIRoute = async ({ request, cookies }) => {
  const type = "services";
  ensureMediaDir(type);
  try {
    const session = cookies.get("session")?.value;
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();

    const files = formData.getAll("file");

    if (!files.length) {
      return new Response("No files uploaded", { status: 400 });
    }

    const savedImages: {
      filename: string;
      url: string;
      name: string;
      size: number;
      width?: number;
      height?: number;
      format?: string;
    }[] = [];

    for (const f of files) {
      if (!(f instanceof File)) {
        continue;
      }

      const buffer = Buffer.from(await f.arrayBuffer());

      const outputBuffer = await sharp(buffer)
        .resize({ width: 3000, withoutEnlargement: true })
        .webp({ quality: 92 })
        .toBuffer();

      const metadata = await sharp(outputBuffer).metadata();

      const originalName = path.parse(f.name).name;
      const sanitizedOriginalName = originalName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");
      const extWebp = "webp";

      const fileName = `${Date.now()}-${sanitizedOriginalName}.${extWebp}`;
      const uploadDir = MEDIA_DIRS[type];
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, outputBuffer);

      savedImages.push({
        filename: fileName,
        url: `/api/media/${type}/${fileName}`,
        name: sanitizedOriginalName,
        size: outputBuffer.length,
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
      });

      /*       console.log(
        "Guardado:",
        fileName,
        "Metadata:",
        savedImages[savedImages.length - 1],
      ); */
    }

    if (savedImages.length === 0) {
      console.error("❌ No se guardaron archivos válidos");
      return new Response("No valid files", { status: 400 });
    }

    return new Response(JSON.stringify(savedImages), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("💥 ERROR UPLOAD:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
};
