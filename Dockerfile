FROM node:22-alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --production=false

COPY . .
RUN mkdir -p public public/media

RUN npx payload generate:importmap
RUN npx sass node_modules/@payloadcms/ui/dist/scss/app.scss "src/app/(payload)/payload-base.css" --no-source-map --style=compressed
RUN cp node_modules/@payloadcms/next/dist/prod/styles.css "src/app/(payload)/payload-components.css"

ENV NEXT_TELEMETRY_DISABLED=1
ENV PAYLOAD_SECRET=build-time-secret-placeholder
# Build-time stub: build does not require a live DB (force-dynamic pages, no SSG of CMS routes).
ENV DATABASE_URI=postgres://stub:stub@localhost:5432/stub
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

# Boot sequence:
#  1. wait a moment for the Postgres sidecar
#  2. one-shot Payload init in DEV mode (NODE_ENV=development) so postgresAdapter({push:true})
#     synchronizes the schema. `payload migrate` triggers a DB connect, which calls
#     pushDevSchema under the hood. If migrations exist they are applied; with the
#     current empty migrations array the command succeeds quickly.
#     Payload disables push when NODE_ENV=production, hence the override.
#  3. start the real server with the real NODE_ENV (production)
CMD ["sh", "-c", "sleep 4; NODE_ENV=development npx payload migrate 2>&1 | tee /tmp/init.log; echo '=== init log end ==='; npm start"]
