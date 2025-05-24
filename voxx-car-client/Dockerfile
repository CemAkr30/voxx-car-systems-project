# 1. Aşama: Build
FROM node:18-alpine AS build

WORKDIR /app

# package.json ve package-lock.json'ı kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Tüm dosyaları kopyala
COPY . .

# React uygulamasını production için build et
RUN npm run build

# 2. Aşama: Nginx ile serve et
FROM nginx:alpine

# Build dosyalarını nginx'in varsayılan root dizinine kopyala
COPY --from=build /app/build /usr/share/nginx/html

# Gerekirse nginx konfigürasyon dosyasını değiştirebilirsin
# COPY nginx.conf /etc/nginx/nginx.conf

# 80 portunu expose et
EXPOSE 80

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"]
