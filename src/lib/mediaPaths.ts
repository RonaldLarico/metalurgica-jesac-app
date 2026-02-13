import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const MEDIA_BASE_DIR = path.resolve(__dirname, "../../../images");

export const MEDIA_DIRS = {
  services: path.join(MEDIA_BASE_DIR, "services"),
  gallery: path.join(MEDIA_BASE_DIR, "gallery"),
  //blog: path.join(MEDIA_BASE_DIR, "blog"),
} as const;

export type MediaType = keyof typeof MEDIA_DIRS;

export function getMediaDirByType(type: string): string | null {
  return MEDIA_DIRS[type as MediaType] ?? null;
}

export function ensureMediaDir(type: MediaType) {
  const dir = MEDIA_DIRS[type];
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}
