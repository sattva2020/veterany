FROM node:22-alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./
# Лок-файл сгенерирован npm 11; npm 10 из базового образа считает его рассинхронизированным.
RUN npm install -g npm@11 && npm ci --production=false

COPY . .
RUN mkdir -p public public/media

RUN npx payload generate:importmap
RUN npx sass node_modules/@payloadcms/ui/dist/scss/app.scss "src/app/(payload)/payload-base.css" --no-source-map --style=compressed
RUN cp node_modules/@payloadcms/next/dist/prod/styles.css "src/app/(payload)/payload-components.css"

ENV NEXT_TELEMETRY_DISABLED=1
ENV PAYLOAD_SECRET=build-time-secret-placeholder
# Build-time stub: build does not require a live DB (force-dynamic pages, no SSG of CMS routes).
ENV DATABASE_URI=postgres://stub:stub@localhost:5432/stub
# NEXT_PUBLIC_* are inlined at build time, so the public site URL (used by
# sitemap.ts, robots.ts, JsonLd, canonical tags) must be passed at build.
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run as the unprivileged "node" user shipped with the base image.
# /app/public/media must stay writable for CMS uploads.
RUN chown -R node:node /app
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget -qO- http://localhost:3000/uk >/dev/null 2>&1 || exit 1

# Boot: wait for the Postgres sidecar, apply pending migrations (schema is created
# by the initial migration), then start the server.
CMD ["sh", "-c", "sleep 4; npx payload migrate 2>&1 | tee /tmp/migrate.log; status=${PIPESTATUS:-$?}; if [ \"$status\" != \"0\" ]; then echo '=== migrate failed (non-fatal), full log below ==='; cat /tmp/migrate.log; echo '=== end migrate log, starting server ==='; fi; npm start"]
