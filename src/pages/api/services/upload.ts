import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    console.log("🚀 /upload llamado");

    const session = cookies.get("session")?.value;
    if (!session) {
      console.log("❌ No autorizado");
      return new Response("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();
    console.log("FormData keys:", Array.from(formData.keys()));

    const files = formData.getAll("file"); // FilePond envía cada archivo con key 'file'
    console.log("Archivos recibidos:", files.length);

    if (!files.length) {
      console.log("❌ No se recibieron archivos");
      return new Response("No files uploaded", { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public/services");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const savedImages: {
      filename: string;
      url: string;
      size: number;
      width?: number;
      height?: number;
      format?: string;
    }[] = [];

    for (const f of files) {
      if (!(f instanceof File)) {
        console.log("⚠ Ignorando item que no es File:", f);
        continue;
      }

      const buffer = Buffer.from(await f.arrayBuffer());

      // 🔹 Comprimir/conversión a WebP
      const outputBuffer = await sharp(buffer)
        .resize({ width: 3000, withoutEnlargement: true })
        .webp({ quality: 92 })
        .toBuffer();

      const metadata = await sharp(outputBuffer).metadata();

      const fileName = `${Date.now()}-${path.parse(f.name).name}.webp`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, outputBuffer);

      savedImages.push({
        filename: fileName,
        url: `/services/${fileName}`,
        size: outputBuffer.length,
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
      });

      console.log("✅ Guardado:", fileName, "Metadata:", savedImages[savedImages.length - 1]);
    }

    if (savedImages.length === 0) {
      console.log("❌ No se guardaron archivos válidos");
      return new Response("No valid files", { status: 400 });
    }

    // ✅ Retornar JSON completo con metadata
    return new Response(JSON.stringify(savedImages), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("💥 ERROR UPLOAD:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
};
