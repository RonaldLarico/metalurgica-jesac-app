import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { prisma } from "../../../../lib/db.server";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const userId = cookies.get("session")?.value;
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const formData = await request.formData();
    const serviceId = formData.get("serviceId");
    const items = formData.getAll("image"); // obtiene todas las imágenes con el mismo nombre

    if (!serviceId) return new Response("serviceId is required", { status: 400 });
    if (!items || items.length === 0) return new Response("No files uploaded", { status: 400 });

    const uploadsDir = path.join(process.cwd(), "public/services");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const savedImages: {
      url: string;
      size: number;
      width?: number;
      height?: number;
      format?: string;
      serviceId: number;
    }[] = [];
    const responseUrls: string[] = [];

    // Iterar sobre todas las imágenes y procesarlas
    for (const item of items) {
      if (!(item instanceof File)) continue;

      const buffer = Buffer.from(await item.arrayBuffer());

      // 🔹 Procesar con Sharp: resize y convertir a webp
      const outputBuffer = await sharp(buffer)
        .resize({ width: 3000, withoutEnlargement: true })
        .webp({ quality: 92, effort: 4, smartSubsample: true })
        .toBuffer();

      const outputMetadata = await sharp(outputBuffer).metadata();
      const ext = outputMetadata.format;
      const fileName = `${Date.now()}-${path.parse(item.name).name}.${ext}`;
      const filePath = path.join(uploadsDir, fileName);
      const publicUrl = `/services/${fileName}`;

      fs.writeFileSync(filePath, outputBuffer);
      const stats = fs.statSync(filePath);

      savedImages.push({
        url: publicUrl,
        size: stats.size,
        width: outputMetadata.width,
        height: outputMetadata.height,
        format: outputMetadata.format,
        serviceId: Number(serviceId),
      });

      responseUrls.push(publicUrl);
    }

    if (savedImages.length === 0) return new Response("No valid image files", { status: 400 });

    // 🔹 Guardar todas las imágenes en la DB
    await prisma.serviceImage.createMany({
      data: savedImages,
    });

    return new Response(
      JSON.stringify({ ok: true, urls: responseUrls }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("CREATE IMAGE ERROR:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
};
