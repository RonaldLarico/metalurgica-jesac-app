# -------------------------
# Etapa de build
# -------------------------
FROM node:22-bullseye AS build

WORKDIR /app

# Dependencias nativas necesarias
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 g++ make git bash openssl ca-certificates libc6-compat \
    && apt-get upgrade -y \
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

# AGREGADO: Prisma generate
RUN pnpm prisma generate


# -------------------------
# Etapa de producción
# -------------------------
#FROM node:22-bullseye AS production

# Usamos imagen oficial de ffmpeg + Debian slim
FROM jrottenberg/ffmpeg:6.0-slim AS production

WORKDIR /app

# Dependencias runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    nodejs npm bash openssl ca-certificates libc6-compat \
    && apt-get upgrade -y \
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

# Aseguramos que ffmpeg esté en el PATH de Node
ENV PATH="/usr/bin:${PATH}"

ENV NODE_ENV=production
EXPOSE 3000

# AGREGADO: Prisma migrate deploy antes de arrancar el server
#CMD ["sh", "-c", "pnpm prisma migrate deploy && node dist/server/entry.mjs"]
CMD ["node","dist/server/entry.mjs"]
