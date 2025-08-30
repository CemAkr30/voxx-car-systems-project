#!/bin/bash

echo "🚀 Voxx Car Systems - Production Deployment"
echo "=========================================="

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ This script must be run as root (sudo)"
    exit 1
fi

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    systemctl enable docker
    systemctl start docker
fi

# Install Docker Compose if not installed
if ! command -v docker-compose &> /dev/null; then
    echo "🐳 Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Install Certbot for SSL certificates
if ! command -v certbot &> /dev/null; then
    echo "🔒 Installing Certbot..."
    apt install certbot -y
fi

# Create SSL certificates
echo "🔒 Creating SSL certificates..."
certbot certonly --standalone -d voxxcarsystems.online -d www.voxxcarsystems.online --non-interactive --agree-tos --email your-email@example.com

# Set up auto-renewal
echo "🔄 Setting up SSL certificate auto-renewal..."
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -

# Create deployment directory
echo "📁 Creating deployment directory..."
mkdir -p /opt/voxx-car-systems
cd /opt/voxx-car-systems

# Copy project files
echo "📋 Copying project files..."
# Note: You need to copy your project files here manually or via git

# Set environment variables
echo "🔧 Setting environment variables..."
export KAFKA_HOST_NAME=$(hostname -I | awk '{print $1}')

# Build and start containers
echo "🐳 Building and starting containers..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Check container status
echo "🔍 Checking container status..."
docker ps

echo "✅ Deployment completed!"
echo "🌐 Frontend: https://voxxcarsystems.online"
echo "🔧 Backend API: https://voxxcarsystems.online/api/"
echo "🔑 Keycloak: https://voxxcarsystems.online:8080"
