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
