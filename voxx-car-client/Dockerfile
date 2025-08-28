FROM node:18-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# --- Runtime stage: serve static build with Nginx on port 80 ---
FROM nginx:alpine AS runtime

# Copy built assets
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# Copy SPA nginx config (with proper try_files)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
