# syntax=docker/dockerfile:1

###############################################
# Build stage
###############################################
FROM node:20-bookworm-slim AS build

# Native deps for better-sqlite3 / sharp / node-gyp
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    python3 \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

###############################################
# Runtime stage
###############################################
FROM node:20-bookworm-slim AS runtime

RUN apt-get update && apt-get install -y --no-install-recommends \
    libvips \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

# Copy built application and dependencies from the build stage
COPY --from=build /opt/app/node_modules ./node_modules
COPY --from=build /opt/app/package.json ./package.json
COPY --from=build /opt/app/package-lock.json ./package-lock.json
COPY --from=build /opt/app/dist ./dist
COPY --from=build /opt/app/config ./config
COPY --from=build /opt/app/src ./src
COPY --from=build /opt/app/public ./public
COPY --from=build /opt/app/favicon.png ./favicon.png
COPY --from=build /opt/app/tsconfig.json ./tsconfig.json

# Run as the non-root user that ships with the node image
RUN chown -R node:node /opt/app
USER node

EXPOSE 1337

CMD ["npm", "run", "start"]
