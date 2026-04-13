FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate importMap
RUN npx payload generate:importmap

# Precompile Payload SCSS (payload-base.css + payload-components.css already in repo as fallback)
RUN npx sass node_modules/@payloadcms/ui/dist/scss/app.scss "src/app/(payload)/payload-base.css" --no-source-map --style=compressed || true
RUN cp node_modules/@payloadcms/next/dist/prod/styles.css "src/app/(payload)/payload-components.css" || true

# Build Next.js
ENV NEXT_TELEMETRY_DISABLED=1
ENV PAYLOAD_SECRET=build-time-secret-placeholder
ENV DATABASE_URI=file:./build.db
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN mkdir -p public/media && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
