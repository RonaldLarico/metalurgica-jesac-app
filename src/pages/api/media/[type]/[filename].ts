import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";
import { getMediaDirByType } from "../../../../lib/mediaPaths";

export const GET: APIRoute = async ({ params }) => {
  const { type, filename } = params;

  if (!type || !filename) {
    return new Response("Not found", { status: 404 });
  }

  // Obtiene la carpeta correspondiente
  const baseDir = getMediaDirByType(type);

  if (!baseDir) {
    return new Response("Invalid media type", { status: 404 });
  }

  const filePath = path.join(baseDir, filename);

  if (!fs.existsSync(filePath)) {
    return new Response("Not found", { status: 404 });
  }

  const file = fs.readFileSync(filePath);

  return new Response(file, {
    headers: {
      "Content-Type": "image/webp", // Si manejas otros tipos, se puede detectar dinámicamente
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
