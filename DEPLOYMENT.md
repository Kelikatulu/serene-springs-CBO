<<<<<<< HEAD
# GitHub Secrets Setup Guide

To enable automated deployment, you need to configure GitHub secrets for your repository.

## Step-by-Step Instructions

### 1. Go to Repository Settings
1. Navigate to your GitHub repository: https://github.com/Kelikatulu/serene-springs-CBO
2. Click on **Settings** (top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**

### 2. Add Required Secrets

Add each of the following secrets one by one:

#### SSH_HOST
- **Name**: `SSH_HOST`
- **Value**: `34.31.153.53`

#### SSH_USERNAME
- **Name**: `SSH_USERNAME`
- **Value**: Your SSH username (e.g., `root`, `ubuntu`, `deploy`, or whatever username you use to SSH into the server)

#### SSH_PRIVATE_KEY
- **Name**: `SSH_PRIVATE_KEY`
- **Value**: Your private SSH key content
  
**How to get your SSH private key:**
```bash
# On your local machine or server, view your private key:
cat ~/.ssh/id_rsa
# Or if you use a different key:
cat ~/.ssh/your_key_name

# Copy the ENTIRE output including:
# -----BEGIN OPENSSH PRIVATE KEY-----
# ... key content ...
# -----END OPENSSH PRIVATE KEY-----
```

**If you don't have an SSH key yet:**
```bash
# Generate a new SSH key pair:
ssh-keygen -t rsa -b 4096 -C "github-actions"

# Copy the public key to your server:
ssh-copy-id username@34.31.153.53

# Then copy the private key content for GitHub secrets:
cat ~/.ssh/id_rsa
```

#### SSH_PORT (Optional)
- **Name**: `SSH_PORT`
- **Value**: `22` (or your custom SSH port if different)

#### DEPLOY_PATH
- **Name**: `DEPLOY_PATH`
- **Value**: The directory path where files should be deployed
  - Example: `/var/www/serenespringscbo.org`
  - Example: `/var/www/html`
  - Example: `/home/username/public_html`

### 3. Verify Setup

After adding all secrets:
1. Go to **Actions** tab in your repository
2. You should see the "Deploy to Production" workflow
3. Make a small change to your code and push to `main` branch
4. The workflow will automatically trigger and deploy

## Troubleshooting

**If deployment fails:**
1. Check the Actions tab for error messages
2. Verify all secrets are correctly set
3. Ensure your SSH key has access to the server
4. Verify the deploy path exists on the server
5. Check server permissions (the SSH user must have write access to the deploy path)

## Server Setup Requirements

Your server should have:
- SSH access enabled
- Web server installed (Nginx or Apache)
- Deploy directory created with proper permissions
- Firewall allowing HTTP/HTTPS traffic (ports 80/443)
=======
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
>>>>>>> 74f5d10426ce04fda8b85307564cd959849f7fb6
