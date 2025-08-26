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

# Optional: ensure a basic SPA fallback (try_files) using default.conf
RUN printf "server {\n  listen 80;\n  server_name _;\n  root /usr/share/nginx/html;\n  index index.html;\n  location / {\n    try_files $uri /index.html;\n  }\n} \n" > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
