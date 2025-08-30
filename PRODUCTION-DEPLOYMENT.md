# 🚀 Voxx Car Systems - Production Deployment Guide

## 📋 Ön Gereksinimler

### 1. **Hostinger VPS/Cloud Hosting**
- Ubuntu 20.04+ veya CentOS 8+
- Minimum 4GB RAM
- 50GB+ disk alanı
- Root erişimi

### 2. **Domain Ayarları**
- `voxxcarsystems.online` domain'i aktif
- DNS A record'ları sunucu IP'sine yönlendirilmeli
- Port 80 ve 443 açık olmalı

## 🔧 Deployment Adımları

### 1. **Sunucuya Bağlanın**
```bash
ssh root@your-server-ip
```

### 2. **Proje Dosyalarını Yükleyin**
```bash
# Git ile (önerilen)
git clone https://github.com/your-repo/voxx-car-systems.git
cd voxx-car-systems

# Veya manuel olarak dosyaları yükleyin
```

### 3. **Deployment Script'ini Çalıştırın**
```bash
chmod +x deploy-production.sh
sudo ./deploy-production.sh
```

### 4. **SSL Sertifikalarını Ayarlayın**
```bash
# Email adresinizi güncelleyin
nano deploy-production.sh

# SSL sertifikalarını oluşturun
certbot certonly --standalone -d voxxcarsystems.online -d www.voxxcarsystems.online --non-interactive --agree-tos --email your-email@example.com
```

### 5. **Environment Variables**
```bash
# .env dosyası oluşturun
nano .env

# Gerekli değişkenleri ekleyin
KAFKA_HOST_NAME=your-server-ip
SPRING_PROFILES_ACTIVE=prod
```

## 🔍 Kontrol Listesi

### ✅ Sistem Kontrolleri
- [ ] Docker ve Docker Compose yüklü
- [ ] SSL sertifikaları oluşturuldu
- [ ] Port 80 ve 443 açık
- [ ] Domain DNS ayarları doğru

### ✅ Container Kontrolleri
- [ ] Tüm container'lar çalışıyor
- [ ] Nginx SSL konfigürasyonu doğru
- [ ] Backend API erişilebilir
- [ ] Frontend yükleniyor

### ✅ Güvenlik Kontrolleri
- [ ] Firewall ayarları
- [ ] SSL sertifikaları geçerli
- [ ] CORS ayarları doğru
- [ ] Security headers aktif

## 🌐 Erişim Adresleri

| Servis | URL | Port |
|--------|-----|------|
| Frontend | https://voxxcarsystems.online | 443 |
| Backend API | https://voxxcarsystems.online/api/ | 443 |
| Keycloak | https://voxxcarsystems.online:8080 | 8080 |
| Kafdrop | https://voxxcarsystems.online:9000 | 9000 |
| Couchbase | https://voxxcarsystems.online:8091 | 8091 |

## 🔧 Troubleshooting

### SSL Sertifikası Sorunları
```bash
# Sertifika durumunu kontrol edin
certbot certificates

# Sertifikaları yenileyin
certbot renew

# Nginx konfigürasyonunu test edin
nginx -t
```

### Container Sorunları
```bash
# Container loglarını kontrol edin
docker logs voxx-car-nginx
docker logs voxx-car-app
docker logs voxx-car-ui

# Container'ları yeniden başlatın
docker-compose restart
```

### Network Sorunları
```bash
# Port durumunu kontrol edin
netstat -tulpn | grep :80
netstat -tulpn | grep :443

# Firewall ayarlarını kontrol edin
ufw status
```

## 📞 Destek

Sorun yaşarsanız:
1. Container loglarını kontrol edin
2. SSL sertifika durumunu kontrol edin
3. DNS ayarlarını kontrol edin
4. Firewall ayarlarını kontrol edin

## 🔄 Güncelleme

Sistem güncellemeleri için:
```bash
cd /opt/voxx-car-systems
git pull
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```
