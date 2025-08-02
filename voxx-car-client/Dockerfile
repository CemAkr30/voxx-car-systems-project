# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# pnpm yükle
RUN corepack enable && corepack prepare pnpm@latest --activate

# package.json ve lock dosyasını kopyala
COPY package.json pnpm-lock.yaml ./

# Sadece production bağımlılıkları yükle
RUN pnpm install --prod

# Kaynak kodu kopyala
COPY . .

# Uygulamayı derle
RUN pnpm run build

# Production stage
FROM nginx:alpine

# Derlenmiş dosyaları nginx'e kopyala
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx konfigürasyonu
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
