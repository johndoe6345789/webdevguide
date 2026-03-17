# ---------- deps stage ----------
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# ---------- build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Bake a placeholder so Next.js inlines a sed-able token into the JS bundles.
ENV NEXT_PUBLIC_API_URL=__NEXT_PUBLIC_API_URL_PLACEHOLDER__

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Ensure public directory exists so COPY never fails
RUN mkdir -p /app/public

RUN npm run build

# ---------- runtime stage ----------
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["node", "server.js"]
