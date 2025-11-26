# Deployment Guide: Serene Springs CBO

Deploy the React app to your server at **34.31.153.53** using GitHub.

## Step 1: Setup Server (One-time)

SSH into your server:

```bash
ssh toxicgreys001@34.31.153.53
```

Install required packages:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install nginx
sudo apt install -y nginx

# Install git
sudo apt install -y git

# Configure firewall
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
```

## Step 2: Clone and Build on Server

```bash
# Clone repository
cd ~
git clone https://github.com/Kelikatulu/serene-springs-CBO.git
cd serene-springs-CBO

# Install dependencies
npm install

# Build the app
npm run build

# Create web directory and copy files
sudo mkdir -p /var/www/serenespringscbo
sudo cp -r build/* /var/www/serenespringscbo/
sudo chown -R www-data:www-data /var/www/serenespringscbo
```

## Step 3: Configure Nginx

Create nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/serenespringscbo
```

Paste this configuration:

```nginx
server {
    listen 80;
    listen [::]:80;
    
    server_name serenespringscbo.org www.serenespringscbo.org;
    
    root /var/www/serenespringscbo;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Save (Ctrl+O, Enter, Ctrl+X), then activate:

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/serenespringscbo /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

## Step 4: Configure Cloudflare DNS

1. Go to Cloudflare dashboard → **serenespringscbo.org** → **DNS**
2. Add **A record**:
   - Type: `A`
   - Name: `@`
   - IPv4 address: `34.31.153.53`
   - Proxy status: **Proxied** (orange cloud)
   - TTL: Auto

3. Add **www** record:
   - Type: `CNAME`
   - Name: `www`
   - Target: `serenespringscbo.org`
   - Proxy status: **Proxied**

4. Go to **SSL/TLS** → **Overview**
   - Set mode to: **Flexible**

5. Go to **SSL/TLS** → **Edge Certificates**
   - Enable: **Always Use HTTPS**
   - Enable: **Automatic HTTPS Rewrites**

## Step 5: Verify Deployment

Test via IP:
```bash
curl http://34.31.153.53
```

Test via domain (wait 5-10 minutes for DNS):
```
https://serenespringscbo.org
```

## Updating the Site (Future Deployments)

On your server:

```bash
# Navigate to repo
cd ~/serene-springs-CBO

# Pull latest changes
git pull origin main

# Rebuild
npm install
npm run build

# Copy to web directory
sudo cp -r build/* /var/www/serenespringscbo/

# Clear Cloudflare cache (optional)
# Do this in Cloudflare dashboard: Caching → Purge Everything
```

## Troubleshooting

**Check nginx status:**
```bash
sudo systemctl status nginx
```

**View nginx logs:**
```bash
sudo tail -f /var/log/nginx/error.log
```

**Check if files exist:**
```bash
ls -la /var/www/serenespringscbo/
```

**Restart nginx:**
```bash
sudo systemctl restart nginx
```
