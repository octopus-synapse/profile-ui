# Build stage
FROM oven/bun:1.2.23-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source
COPY . .

# Build
RUN bun run build

# Production stage
FROM oven/bun:1.2.23-alpine

WORKDIR /app

# Copy built artifacts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# Health check (optional - for serving via HTTP)
# HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
#   CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

# This is a library package, not a runnable service
# If you need to serve the package via HTTP (e.g., for Storybook/playground):
# CMD ["bun", "run", "serve"]

# For development/testing purposes:
CMD ["echo", "Profile UI library built successfully"]
