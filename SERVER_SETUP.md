# Quick Server Setup Commands

Run these commands on your server to prepare for deployment:

## 1. Create deployment directory
```bash
mkdir -p ~/serenespringscbo.org
```

## 2. Check if Nginx is installed
```bash
which nginx
# or
nginx -v
```

## 3. Check if Apache is installed
```bash
which apache2
# or
apache2 -v
```

## 4. If neither is installed, install Nginx (recommended)
```bash
sudo apt update
sudo apt install nginx -y
```

## 5. Create Nginx configuration
```bash
sudo nano /etc/nginx/sites-available/serenespringscbo.org
```

Paste this configuration:
```nginx
server {
    listen 80;
    server_name serenespringscbo.org www.serenespringscbo.org;
    root /home/toxicgreys001/serenespringscbo.org;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

## 6. Enable the site
```bash
sudo ln -s /etc/nginx/sites-available/serenespringscbo.org /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 7. Generate SSH key for GitHub Actions (on your LOCAL machine, not server)
```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_deploy_key -C "github-actions-deploy"
```

## 8. Copy public key to server
```bash
ssh-copy-id -i ~/.ssh/github_deploy_key.pub toxicgreys001@34.31.153.53
```

## 9. Get private key for GitHub secrets (on your LOCAL machine)
```bash
cat ~/.ssh/github_deploy_key
```
Copy the entire output (including BEGIN and END lines) for the `SSH_PRIVATE_KEY` secret.

## GitHub Secrets to Add

Go to: https://github.com/Kelikatulu/serene-springs-CBO/settings/secrets/actions

Add these secrets:
- **SSH_HOST**: `34.31.153.53`
- **SSH_USERNAME**: `toxicgreys001`
- **SSH_PRIVATE_KEY**: (paste the private key from step 9)
- **SSH_PORT**: `22`
- **DEPLOY_PATH**: `/home/toxicgreys001/serenespringscbo.org`
