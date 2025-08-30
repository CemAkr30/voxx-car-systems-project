# 🔐 GitHub Secrets Setup Guide

## 📋 Gerekli GitHub Secrets

CI/CD pipeline'ının çalışması için aşağıdaki secrets'ları GitHub repository'nizde ayarlamanız gerekiyor:

### **1. Docker Hub Secrets**

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `DOCKERHUB_USERNAME` | Docker Hub kullanıcı adınız | `your-username` |
| `DOCKERHUB_TOKEN` | Docker Hub access token | `dckr_pat_xxxxxxxxxxxxxxxxxxxx` |

**Docker Hub Token Oluşturma:**
1. Docker Hub'a giriş yapın
2. Account Settings → Security → New Access Token
3. Token'a isim verin (örn: "GitHub Actions")
4. Token'ı kopyalayın ve güvenli bir yere kaydedin

### **2. Hostinger Server Secrets**

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `HOSTINGER_HOST` | Sunucu IP adresi | `123.456.789.123` |
| `HOSTINGER_USER` | SSH kullanıcı adı | `root` |
| `HOSTINGER_SSH_KEY` | SSH private key | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `HOSTINGER_SSH_PORT` | SSH port numarası | `22` |
| `HOSTINGER_PROJECT_DIR` | Proje dizini | `/opt/voxx-car-systems` |

**SSH Key Oluşturma:**
```bash
# Local bilgisayarınızda SSH key oluşturun
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# Public key'i sunucuya kopyalayın
ssh-copy-id root@your-server-ip

# Private key'i GitHub Secrets'a ekleyin
cat ~/.ssh/id_rsa
```

### **3. Application Secrets**

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `KAFKA_HOST_NAME` | Kafka host adresi | `your-server-ip` |

## 🔧 GitHub Secrets Ekleme

### **1. Repository Settings'e Gidin**
1. GitHub repository'nizde **Settings** sekmesine tıklayın
2. Sol menüden **Secrets and variables** → **Actions** seçin

### **2. Secrets Ekleme**
1. **New repository secret** butonuna tıklayın
2. **Name** alanına secret adını yazın
3. **Value** alanına secret değerini yazın
4. **Add secret** butonuna tıklayın

### **3. Environment Variables (Opsiyonel)**
Production environment için:
1. **Environments** sekmesine gidin
2. **New environment** → **production** oluşturun
3. Environment'a özel secrets ekleyin

## 🔍 Secrets Kontrol Listesi

### ✅ Docker Hub
- [ ] `DOCKERHUB_USERNAME` eklendi
- [ ] `DOCKERHUB_TOKEN` eklendi
- [ ] Token geçerli ve çalışıyor

### ✅ Hostinger Server
- [ ] `HOSTINGER_HOST` eklendi
- [ ] `HOSTINGER_USER` eklendi
- [ ] `HOSTINGER_SSH_KEY` eklendi
- [ ] `HOSTINGER_SSH_PORT` eklendi
- [ ] `HOSTINGER_PROJECT_DIR` eklendi
- [ ] SSH bağlantısı test edildi

### ✅ Application
- [ ] `KAFKA_HOST_NAME` eklendi

## 🧪 Test Etme

### **1. SSH Bağlantı Testi**
```bash
ssh -i ~/.ssh/id_rsa root@your-server-ip
```

### **2. Docker Hub Testi**
```bash
docker login -u your-username -p your-token
```

### **3. CI/CD Pipeline Testi**
1. Repository'de küçük bir değişiklik yapın
2. Main branch'e push edin
3. GitHub Actions sekmesinden workflow'u takip edin

## 🔒 Güvenlik Notları

### **SSH Key Güvenliği**
- Private key'i asla public repository'ye commit etmeyin
- Key'i güçlü bir passphrase ile koruyun
- Düzenli olarak key'leri yenileyin

### **Docker Hub Token Güvenliği**
- Token'ı güvenli bir yerde saklayın
- Token'a minimum gerekli izinleri verin
- Düzenli olarak token'ları yenileyin

### **Server Güvenliği**
- SSH port'unu varsayılan 22'den değiştirin
- Fail2ban kurun
- Düzenli güvenlik güncellemeleri yapın

## 🆘 Sorun Giderme

### **SSH Bağlantı Sorunları**
```bash
# SSH debug modu
ssh -v -i ~/.ssh/id_rsa root@your-server-ip

# SSH config kontrolü
cat ~/.ssh/config
```

### **Docker Hub Sorunları**
```bash
# Docker login testi
docker login -u your-username

# Token kontrolü
curl -H "Authorization: Bearer your-token" https://registry-1.docker.io/v2/
```

### **GitHub Actions Sorunları**
1. Actions sekmesinden log'ları kontrol edin
2. Secrets'ların doğru eklendiğinden emin olun
3. Environment variables'ları kontrol edin
