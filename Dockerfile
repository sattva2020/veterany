FROM node:22-alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --production=false

COPY . .
RUN mkdir -p public public/media

ENV NEXT_TELEMETRY_DISABLED=1
ENV PAYLOAD_SECRET=build-time-secret-placeholder
ENV DATABASE_URI=file:/app/database.db
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

CMD ["sh", "-c", "npx payload migrate && npm start"]
