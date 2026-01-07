# -------------------------
# Etapa de build
# -------------------------
FROM node:22-slim AS build

WORKDIR /app

# Dependencias nativas necesarias
RUN apt-get update && apt-get install -y \
    python3 g++ make git bash openssl \
    && rm -rf /var/lib/apt/lists/*

# pnpm
RUN npm install -g pnpm@latest

# Copia manifests
COPY package.json pnpm-lock.yaml* ./

# Instala TODAS las dependencias
RUN pnpm install --frozen-lockfile --shamefully-hoist

# Copia el proyecto
COPY . .

# Build Astro SSR
RUN pnpm run build

# 👉 AGREGADO: Prisma generate
RUN pnpm prisma generate


# -------------------------
# Etapa de producción
# -------------------------
FROM node:22-slim AS production

WORKDIR /app

# Dependencias runtime
RUN apt-get update && apt-get install -y \
    openssl bash \
    && rm -rf /var/lib/apt/lists/*

# pnpm
RUN npm install -g pnpm@latest

# Copiamos node_modules YA RESUELTOS (clave)
COPY --from=build /app/node_modules ./node_modules

# Copiamos lo necesario para runtime
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist ./dist

COPY --from=build /app/prisma.config.ts ./prisma.config.ts

ENV NODE_ENV=production
EXPOSE 3000

# 👉 AGREGADO: Prisma migrate deploy antes de arrancar el server
CMD ["sh", "-c", "pnpm prisma migrate deploy && node dist/server/entry.mjs"]
