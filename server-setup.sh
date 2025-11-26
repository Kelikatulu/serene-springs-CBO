#!/bin/bash

# Server Setup Script for Serene Springs CBO
# Run this on your server: toxicgreys001@34.31.153.53

set -e  # Exit on any error

echo "=========================================="
echo "Serene Springs CBO - Server Setup"
echo "=========================================="
echo ""

# Update system packages
echo "📦 Updating system packages..."
sudo apt update
sudo apt upgrade -y

# Install Node.js and npm
echo "📦 Installing Node.js and npm..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt install -y nodejs
    echo "✅ Node.js $(node -v) installed"
    echo "✅ npm $(npm -v) installed"
else
    echo "✅ Node.js already installed: $(node -v)"
fi

# Install nginx
echo "📦 Installing nginx..."
if ! command -v nginx &> /dev/null; then
    sudo apt install -y nginx
    echo "✅ Nginx installed"
else
    echo "✅ Nginx already installed"
fi

# Create application directory
echo "📁 Creating application directory..."
sudo mkdir -p /var/www/serenespringscbo
sudo chown -R $USER:$USER /var/www/serenespringscbo
echo "✅ Directory created: /var/www/serenespringscbo"

# Configure firewall
echo "🔥 Configuring firewall..."
if command -v ufw &> /dev/null; then
    sudo ufw allow 22/tcp   # SSH
    sudo ufw allow 80/tcp   # HTTP
    sudo ufw allow 443/tcp  # HTTPS
    echo "✅ Firewall rules configured"
else
    echo "⚠️  UFW not installed, skipping firewall configuration"
fi

# Start and enable nginx
echo "🚀 Starting nginx..."
sudo systemctl start nginx
sudo systemctl enable nginx
echo "✅ Nginx is running"

# Display status
echo ""
echo "=========================================="
echo "✅ Server setup complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Build your React app locally: npm run build"
echo "2. Transfer files to: /var/www/serenespringscbo"
echo "3. Configure nginx with the provided nginx.conf"
echo "4. Set up Cloudflare DNS to point to this server"
echo ""
echo "Server IP: $(curl -s ifconfig.me)"
echo "Nginx status: $(sudo systemctl is-active nginx)"
echo ""
