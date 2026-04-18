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
ENV DATABASE_URI=file:/app/database.db
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

CMD ["sh", "-c", "npx payload migrate 2>&1 | tee /tmp/migrate.log; status=${PIPESTATUS:-$?}; if [ \"$status\" != \"0\" ]; then echo '=== migrate failed (non-fatal), full log below ==='; cat /tmp/migrate.log; echo '=== end migrate log, starting server ==='; fi; npm start"]
