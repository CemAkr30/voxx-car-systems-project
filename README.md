# VoxxCar Systems Project

Modern araç filo yönetim sistemi - React frontend ve Go backend ile geliştirilmiş profesyonel Docker tabanlı uygulama.

## 🚀 Özellikler

- **Frontend**: React + TypeScript + Vite + TanStack Router
- **Backend**: Go + Fiber + GORM + PostgreSQL
- **Database**: PostgreSQL 16
- **Cache**: Redis 7
- **Containerization**: Docker & Docker Compose
- **Development**: Hot reloading with Air (Go) and Vite (React)
- **Production**: Optimized builds with Nginx (frontend only)

## 📋 Gereksinimler

- Docker & Docker Compose
- Git
- Hosting platformu (DigitalOcean, AWS, Google Cloud, vb.)

## 🛠️ Kurulum

### 1. Projeyi Klonlayın

```bash
git clone <repository-url>
cd voxx-car-systems-project
```

### 2. Hızlı Başlangıç

#### Development Ortamı (Geliştirme)

```bash
# Development ortamını başlat
./scripts/deploy.sh deploy-dev

# Veya manuel olarak
docker-compose -f docker-compose.dev.yaml up -d --build
```

**Erişim URL'leri:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Database: localhost:5432
- Redis: localhost:6379

#### Production Ortamı (Canlı)

```bash
# Production ortamını başlat
./scripts/deploy.sh deploy-prod

# Veya manuel olarak
docker-compose up -d --build
```

**Erişim URL'leri:**
- Frontend: http://localhost (port 80)
- Backend API: http://localhost:8080
- API Docs: http://localhost:8080/swagger/

### 3. Deployment Scriptleri

Proje kök dizininde `scripts/deploy.sh` scripti bulunmaktadır:

```bash
# Script'i çalıştırılabilir yap
chmod +x scripts/deploy.sh

# Kullanım
./scripts/deploy.sh [command]

# Komutlar:
./scripts/deploy.sh build        # Docker imajlarını oluştur
./scripts/deploy.sh deploy-prod  # Production'a deploy et
./scripts/deploy.sh deploy-dev   # Development'a deploy et
./scripts/deploy.sh logs         # Production loglarını göster
./scripts/deploy.sh logs-dev     # Development loglarını göster
./scripts/deploy.sh health       # Servis sağlığını kontrol et
./scripts/deploy.sh cleanup      # Kullanılmayan Docker kaynaklarını temizle
```

## 🌐 Hosting Platformlarına Deployment

### DigitalOcean App Platform

1. **Docker Registry'ye Push:**
```bash
# DigitalOcean Container Registry kullanarak
export DOCKER_REGISTRY="registry.digitalocean.com/your-registry"
./scripts/deploy.sh push
```

2. **App Platform'da Deploy:**
   - DigitalOcean App Platform'a giriş yapın
   - "Create App" > "Container Registry" seçin
   - Registry'den imajları seçin
   - Environment variables'ları ayarlayın

### AWS ECS

1. **ECR'ye Push:**
```bash
# AWS ECR kullanarak
export DOCKER_REGISTRY="your-account.dkr.ecr.region.amazonaws.com"
./scripts/deploy.sh push
```

2. **ECS Task Definition oluşturun:**
   - ECS Console'da yeni task definition oluşturun
   - Container definitions ekleyin
   - Environment variables ayarlayın

### Google Cloud Run

1. **Artifact Registry'ye Push:**
```bash
# Google Cloud Artifact Registry kullanarak
export DOCKER_REGISTRY="region-docker.pkg.dev/project-id/repository"
./scripts/deploy.sh push
```

2. **Cloud Run'da Deploy:**
```bash
gcloud run deploy voxxcar-backend \
  --image region-docker.pkg.dev/project-id/repository/voxxcar-backend:latest \
  --platform managed \
  --region region \
  --allow-unauthenticated
```

## 🔧 Konfigürasyon

### Environment Variables

#### Backend (Go)
```bash
APP_ENV=production
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-secure-password
DB_NAME=voxxcar
REDIS_HOST=redis
REDIS_PORT=6379
JWT_SECRET=your-jwt-secret
```

#### Frontend (React)
```bash
VITE_API_URL=http://localhost:8080
```

## 📊 Monitoring & Logs

### Logları İzleme

```bash
# Tüm servislerin logları
docker-compose logs -f

# Belirli servisin logları
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Development logları
docker-compose -f docker-compose.dev.yaml logs -f
```

### Health Checks

```bash
# Servis sağlığını kontrol et
./scripts/deploy.sh health

# Manuel kontrol
curl http://localhost:8080/health  # Backend
curl http://localhost/health       # Frontend
```

## 🔄 Development Workflow

### Hot Reloading

- **Backend**: Air ile otomatik yeniden başlatma
- **Frontend**: Vite ile hot module replacement

### Code Changes

Development ortamında kod değişiklikleri otomatik olarak yansır:

```bash
# Development ortamında çalışırken
# Backend kodunu değiştirin -> Air otomatik yeniden başlatır
# Frontend kodunu değiştirin -> Vite otomatik yeniden yükler
```

## 🗄️ Database

### Migration

Database migration'ları otomatik olarak çalışır:

```bash
# Migration dosyaları
voxx-car-server/internal/framework/migrations/
```

### Backup

```bash
# Database backup
docker exec voxxcar-postgres pg_dump -U postgres voxxcar > backup.sql

# Restore
docker exec -i voxxcar-postgres psql -U postgres voxxcar < backup.sql
```

## 🔒 Güvenlik

### Production Güvenlik Önlemleri

- Non-root user ile container çalıştırma
- Security headers (X-Frame-Options, XSS Protection, vb.)
- Environment variables ile hassas bilgileri yönetme

### Environment Variables Güvenliği

```bash
# Production'da environment variables'ları hosting platformunda ayarlayın
```

## 🚀 Performance

### Optimization

- **Frontend**: Nginx ile static file caching
- **Backend**: Gzip compression
- **Database**: Connection pooling
- **Cache**: Redis ile caching

### Scaling

```bash
# Horizontal scaling
docker-compose up -d --scale backend=3
```

## 📝 Troubleshooting

### Yaygın Sorunlar

1. **Port çakışması:**
```bash
# Port'ları kontrol et
netstat -tulpn | grep :8080
netstat -tulpn | grep :3000
```

2. **Database bağlantı sorunu:**
```bash
# Database container'ını kontrol et
docker-compose logs postgres
docker exec voxxcar-postgres pg_isready -U postgres
```

3. **Memory sorunu:**
```bash
# Docker resource usage
docker stats
```

### Debug

```bash
# Container'a bağlan
docker exec -it voxxcar-backend sh
docker exec -it voxxcar-frontend sh

# Logları detaylı incele
docker-compose logs --tail=100 backend
```

## 📚 API Documentation

Backend API documentation'ı Swagger ile sağlanır:

- Development: http://localhost:8080/swagger/
- Production: http://your-domain:8080/swagger/

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- Proje Linki: [https://github.com/your-username/voxx-car-systems-project](https://github.com/your-username/voxx-car-systems-project)

---

**Not**: Bu proje production-ready Docker konfigürasyonu ile gelir. Hosting platformlarında kolayca deploy edilebilir.