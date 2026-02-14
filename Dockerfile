# -------------------------
# Etapa de build
# -------------------------
FROM node:22-alpine AS build

WORKDIR /app

# Dependencias nativas necesarias
RUN apk add --no-cache python3 g++ make git bash openssl ca-certificates libc6-compat curl

# pnpm
RUN npm install -g pnpm@latest

# Copia manifests
COPY package.json pnpm-lock.yaml* ./

# Instala TODAS las dependencias
RUN pnpm install --frozen-lockfile --shamefully-hoist

# Copia el proyecto
COPY . .

# Pre-cargar FFmpeg WASM en la build
RUN node -e "const { createFFmpeg } = require('@ffmpeg/ffmpeg'); const ffmpeg = createFFmpeg({ log: true }); ffmpeg.load().then(() => console.log('FFmpeg WASM pre-cargado'));"

# Build Astro SSR
RUN pnpm run build

# AGREGADO: Prisma generate
RUN pnpm prisma generate


# -------------------------
# Etapa de producción
# -------------------------
FROM node:22-alpine AS production

# Usamos imagen oficial de ffmpeg + Debian slim

WORKDIR /app

# Dependencias runtime
RUN apk add --no-cache bash openssl ca-certificates libc6-compat

# pnpm
RUN npm install -g pnpm@latest

# Copiamos node_modules YA RESUELTOS (clave)
COPY --from=build /app/node_modules ./node_modules

# Copiamos lo necesario para runtime
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist ./dist

COPY --from=build /app/prisma.config.ts ./prisma.config.ts

# Copiamos el WASM pre-cargado desde build
COPY --from=build /root/.ffmpeg-core ./node_modules/@ffmpeg/ffmpeg/core

ENV NODE_ENV=production
EXPOSE 3000

# AGREGADO: Prisma migrate deploy antes de arrancar el server
#CMD ["sh", "-c", "pnpm prisma migrate deploy && node dist/server/entry.mjs"]
CMD ["node","dist/server/entry.mjs"]
