# 🚀 Shear Butter - Deployment Guide

Complete step-by-step guide to deploy your Shear Butter website on GitHub, Netlify, or other free hosting platforms.

## Table of Contents
1. [GitHub Pages Deployment](#github-pages-deployment)
2. [Netlify Deployment](#netlify-deployment)
3. [Vercel Deployment](#vercel-deployment)
4. [Traditional Web Hosting](#traditional-web-hosting)
5. [Post-Deployment Checklist](#post-deployment-checklist)

---

## GitHub Pages Deployment

### Step 1: Initialize Git Repository
```bash
cd /path/to/Startup
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Create repository name: `shear-butter` (or your preferred name)
3. **Do NOT** initialize with README (we already have one)
4. Click "Create repository"

### Step 3: Add Remote and Push
```bash
git add .
git commit -m "Initial commit: Shear Butter website"
git remote add origin https://github.com/YOUR_USERNAME/shear-butter.git
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select "Deploy from a branch"
   - Branch: Select `main` and `/root`
4. Click **Save**
5. Wait 2-3 minutes for deployment
6. Your site will be at: `https://YOUR_USERNAME.github.io/shear-butter`

### Step 5: Custom Domain (Optional)
1. In Settings → Pages
2. Under "Custom domain", enter your domain
3. Add DNS records as instructed by GitHub
4. Enable "Enforce HTTPS"

---

## Netlify Deployment

### Method 1: Drag and Drop (Easiest)
1. Go to https://netlify.com
2. Sign up with GitHub (or email)
3. Drag and drop the `Startup` folder onto the screen
4. Your site will be deployed immediately!
5. Netlify provides a temporary URL like: `https://random-name.netlify.app`

### Method 2: Git Integration
1. Go to https://netlify.com/app/signup
2. Sign up and click "New site from Git"
3. Connect your GitHub account
4. Select your `shear-butter` repository
5. Click "Deploy site"

### Netlify Configuration (netlify.toml)
Create a `netlify.toml` file in the root:

```toml
[build]
publish = "/"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200

[[headers]]
for = "/*"
[headers.values]
X-Content-Type-Options = "nosniff"
X-Frame-Options = "SAMEORIGIN"
X-XSS-Protection = "1; mode=block"
Referrer-Policy = "strict-origin-when-cross-origin"
Content-Security-Policy = "default-src 'self' https:; script-src 'self' 'unsafe-inline' https://www.youtube.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; frame-src https://www.youtube.com formspree.io; connect-src 'self' formspree.io;"
```

---

## Vercel Deployment

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
# or
yarn global add vercel
```

### Step 2: Deploy
```bash
cd /path/to/Startup
vercel
```

### Step 3: Follow Prompts
- Choose your team
- Confirm directory
- Deploy will start automatically

Your site will be at: `https://your-project-name.vercel.app`

### Step 3b: Connect to GitHub (Alternative)
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure and deploy

---

## Traditional Web Hosting

### Using Infinity Free (Recommended)

1. **Create Account**
   - Go to https://infinityfree.net
   - Sign up with email

2. **Create New Website**
   - Click "Create Website"
   - Choose your domain (e.g., `shearbutter.infinityfreeapp.com`)
   - Click "Create"

3. **Upload Files via FTP**
   - Download an FTP client: FileZilla (https://filezilla-project.org/)
   - Get FTP credentials from your Infinity Free account
   - Connect and upload all files to the `htdocs` folder

4. **Configure**
   - The `.htaccess` file will handle security
   - Ensure PHP is enabled for the backend

### Using Hostinger, SiteGround, or Similar

1. Purchase hosting plan
2. Access cPanel or control panel
3. Use File Manager or FTP to upload files
4. Set document root to the Startup folder
5. Enable SSL certificate (usually free)

---

## Security Configurations for Hosting

### Before Going Live

1. **Change Admin Password**
   ```javascript
   // In admin/admin.js, find and change:
   if (password === 'shear123') {  // Change this!
   ```

2. **Update Formspree ID**
   ```html
   <!-- In index.html, replace -->
   <form ... action="https://formspree.io/f/YOUR_FORM_ID" ...>
   ```

3. **Enable HTTPS**
   - GitHub Pages: Automatic ✅
   - Netlify: Automatic ✅
   - Vercel: Automatic ✅
   - Traditional Hosting: Use Let's Encrypt (usually free)

4. **Set up Environment Variables (if using backend)**
   ```bash
   FORMSPREE_ID=your_form_id
   API_KEY=your_secret_key
   ```

---

## Post-Deployment Checklist

### Functionality Tests
- [ ] Navigation menu works on desktop and mobile
- [ ] Contact form submits successfully
- [ ] Email notifications received
- [ ] YouTube videos load and play
- [ ] All images display correctly
- [ ] Testimonials slider works
- [ ] Admin panel accessible (try logging in)

### Performance Tests
- [ ] Page loads in < 3 seconds
- [ ] Mobile layout is responsive
- [ ] No console errors in browser
- [ ] Images are optimized
- [ ] CSS/JS files are minified

### Security Tests
- [ ] HTTPS is enabled (lock icon in URL bar)
- [ ] Security headers are present:
  ```bash
  curl -I https://your-domain.com | grep -i "X-Frame"
  ```
- [ ] Admin login works with new password
- [ ] Source code is not accessible
- [ ] .htaccess is active (403 error on /admin)

### SEO & Analytics (Optional)
- [ ] Verify domain in Google Search Console
- [ ] Set up Google Analytics
- [ ] Add sitemap.xml
- [ ] Submit to search engines

### Email Configuration
- [ ] Test contact form email submission
- [ ] Verify Formspree settings
- [ ] Check spam folder for emails
- [ ] Set up email notifications

### Backup & Monitoring
- [ ] Set up automated backups
- [ ] Monitor website uptime
- [ ] Set up error logging
- [ ] Track website analytics

---

## Continuous Integration/Deployment

### GitHub Actions (Automatic Deployment)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

This automatically deploys when you push to main branch!

---

## Custom Domain Setup

### For GitHub Pages
1. Register domain (e.g., GoDaddy, Namecheap)
2. Update DNS settings:
   ```
   A record: 185.199.108.153
   A record: 185.199.109.153
   A record: 185.199.110.153
   A record: 185.199.111.153
   ```
3. In GitHub Settings → Pages, add custom domain

### For Netlify
1. In Netlify → Site settings → Domain management
2. Click "Add custom domain"
3. Update DNS records as instructed

---

## Troubleshooting Deployment

### Site shows 404 Not Found
- Check that files are in correct directory
- Verify `index.html` is in root
- Check file permissions (should be 644)

### Contact form not working
- Verify Formspree Form ID
- Check that URL is HTTPS
- Test with Formspree directly

### HTTPS not working
- Wait 24-48 hours for SSL certificate
- Clear browser cache
- Try different browser

### Admin panel not accessible
- Check `.htaccess` rules
- Verify directory permissions
- Test basic auth if needed

### Website slow
- Optimize images (use WebP)
- Enable gzip compression
- Minify CSS/JavaScript
- Use CDN for static assets

---

## Recommended Services

| Service | Cost | Performance | Ease |
|---------|------|-------------|------|
| GitHub Pages | Free | Excellent | Easy |
| Netlify | Free | Excellent | Very Easy |
| Vercel | Free | Excellent | Easy |
| Infinity Free | Free | Good | Medium |
| Hostinger | $2-3/mo | Good | Medium |
| SiteGround | $2.99-7.99/mo | Excellent | Easy |

---

## Next Steps

1. ✅ Deploy your site
2. ✅ Set up custom domain
3. ✅ Configure Formspree
4. ✅ Test all functionality
5. ✅ Set up backups
6. ✅ Monitor performance
7. ✅ Promote to your audience!

---

**Need Help?**
- Check website console (F12) for errors
- Review README.md for configuration
- Visit hosting provider's documentation
- Test locally first before deploying

**Last Updated**: 2026
