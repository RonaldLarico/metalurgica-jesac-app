import { defineConfig } from "prisma/config";
import type { PrismaConfig } from "prisma/config";
import path from "path";

// Cargar dotenv solo en desarrollo
if (process.env.NODE_ENV !== "production") {
  try {
    const dotenv: typeof import("dotenv") = require("dotenv");
    dotenv.config({ path: path.resolve(process.cwd(), ".env") });
  } catch {
    console.warn("⚠️ dotenv no disponible, continuando...");
  }
}

// Determinar entorno
const isProduction = process.env.NODE_ENV === "production";

// Obtener URL de conexión
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error(
    "❌ DATABASE_URL no definida. Revisa tus variables de entorno."
  );
}

// Configuración Prisma
const prismaConfig: PrismaConfig = {
  datasource: {
    url: databaseUrl,
  },
};

export default defineConfig(prismaConfig);

/* import { defineConfig } from "prisma/config";

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
 */