# Базовый образ с Node.js LTS
FROM node:20.12.2-alpine as base

WORKDIR /app
ENV PNPM_HOME=/pnpm
ENV PATH="$PNPM_HOME:$PATH"

# Установка инструментов для сборки нативных модулей
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    gcc \
    libc-dev \
    linux-headers

# Включаем pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Стадия для разработки
FROM base as dev
ENV NODE_ENV=development
COPY . .
RUN pnpm install --frozen-lockfile
CMD ["pnpm", "run", "dev"]

# Стадия для production
FROM base as production
ENV NODE_ENV=production
COPY pnpm*.yaml ./
COPY package.json ./
RUN pnpm install --frozen-lockfile --prod
COPY . .
RUN pnpm run build && pnpm store prune

# Финальный образ
FROM node:20.12.2-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=production /app/node_modules ./node_modules
COPY --from=production /app/dist ./dist
COPY --from=production /app/package.json ./

RUN chown -R node:node /app
USER node

CMD ["node", "dist/main.js"]