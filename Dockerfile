FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .
RUN mkdir -p public

# Build
ENV NEXT_TELEMETRY_DISABLED=1
ENV PAYLOAD_SECRET=build-time-secret-placeholder
ENV DATABASE_URI=file:/app/database.db
RUN npm run build

# Production
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN mkdir -p public/media

EXPOSE 3000

CMD ["npm", "start"]
