#!/bin/bash

# Deployment Script for Serene Springs CBO
# Builds and deploys the React app to the remote server

set -e  # Exit on any error

# Configuration
SERVER_USER="toxicgreys001"
SERVER_IP="34.31.153.53"
SERVER_PATH="/var/www/serenespringscbo"
SERVER="${SERVER_USER}@${SERVER_IP}"

echo "=========================================="
echo "Serene Springs CBO - Deployment"
echo "=========================================="
echo ""

# Build the React application
echo "🔨 Building React application..."
npm run build

if [ ! -d "build" ]; then
    echo "❌ Build directory not found!"
    exit 1
fi

echo "✅ Build completed successfully"
echo ""

# Create backup of current deployment (optional)
echo "💾 Creating backup on server..."
ssh $SERVER "if [ -d $SERVER_PATH ]; then sudo cp -r $SERVER_PATH ${SERVER_PATH}_backup_$(date +%Y%m%d_%H%M%S); fi" || true

# Transfer files to server
echo "📤 Transferring files to server..."
rsync -avz --delete build/ $SERVER:$SERVER_PATH/

echo "✅ Files transferred successfully"
echo ""

# Set proper permissions
echo "🔐 Setting permissions..."
ssh $SERVER "sudo chown -R www-data:www-data $SERVER_PATH"

# Restart nginx
echo "🔄 Restarting nginx..."
ssh $SERVER "sudo systemctl restart nginx"

echo "✅ Nginx restarted"
echo ""

# Check nginx status
echo "🔍 Checking nginx status..."
ssh $SERVER "sudo systemctl status nginx --no-pager" || true

echo ""
echo "=========================================="
echo "✅ Deployment completed successfully!"
echo "=========================================="
echo ""
echo "Your site should now be live at:"
echo "  • http://$SERVER_IP"
echo "  • https://serenespringscbo.org (if DNS is configured)"
echo ""
echo "To verify deployment:"
echo "  curl http://$SERVER_IP"
echo ""
