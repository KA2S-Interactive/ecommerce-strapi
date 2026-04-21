# Strapi 5 — production image (push to Docker Hub as khalil123er/ecomstrapi)
FROM node:20-bookworm-slim AS builder

WORKDIR /opt/app

# better-sqlite3 and other native addons need a compiler at install/build time
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build && npm prune --omit=dev

FROM node:20-bookworm-slim AS runner

WORKDIR /opt/app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

COPY --chown=node:node --from=builder /opt/app ./

USER node

RUN mkdir -p .tmp public/uploads

EXPOSE 1337

CMD ["npm", "run", "start"]
