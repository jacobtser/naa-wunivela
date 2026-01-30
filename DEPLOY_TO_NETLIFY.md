# Deploy to Netlify/Vercel (Free Serverless Backend)

## Overview

- **Frontend**: Hosted on GitHub Pages (free, static files)
- **Backend**: Serverless functions on Netlify or Vercel (free tier included)
- **Orders Storage**: JSON file (no database required) or connect to paid DB

## Option 1: Deploy to Netlify (Recommended - Easier)

### Prerequisites

1. GitHub repository with this site pushed
2. Netlify account (free at https://netlify.com)

### Step 1: Connect Repository to Netlify

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Select GitHub, authorize, and choose your repository
4. Click "Deploy"
5. Netlify auto-detects the site and deploys!

### Step 2: Configure Environment (Optional but Recommended)

1. In Netlify dashboard → Site settings → "Build & deploy" → "Environment"
2. Add these variables:
   ```
   ADMIN_PASSWORD = admin2026
   ADMIN_KEY = admin_orders_2026
   ```
3. (Orders stored in `/tmp` by default; persists for ~24 hours per deployment)

### Step 3: Test

- Frontend: https://your-site.netlify.app
- Place an order on /order.html
- Admin panel: Click 3 times on site, enter password `admin2026`
- View orders in admin dashboard

### Deployment Complete ✅

- Netlify auto-deploys when you push to GitHub
- Serverless functions auto-created in `netlify/functions/`
- CORS already configured in `netlify.toml`

---

## Option 2: Deploy to Vercel (Alternative)

### Prerequisites

1. GitHub repository with this site
2. Vercel account (free at https://vercel.com)

### Step 1: Deploy via GitHub

1. Go to https://vercel.com/new
2. Import your GitHub project
3. Vercel auto-detects and deploys
4. Takes ~2 minutes

### Step 2: Rename Functions (Vercel uses `/api` instead of `/.netlify/functions`)

Vercel looks for functions in `api/` folder. Netlify uses `netlify/functions/`.

**Option A (Recommended)**: Just use Netlify (simpler, same free tier)

**Option B (If you prefer Vercel)**: Create `api/` folder:

```bash
mkdir api
cp netlify/functions/order.js api/order.js
cp netlify/functions/get-orders.js api/get-orders.js
```

Then push to GitHub and Vercel auto-deploys.

### Step 3: Environment Variables

1. Vercel dashboard → Project settings → Environment Variables
2. Add the same variables as Netlify

### Deployment Complete ✅

---

## How Orders Are Stored

### On Netlify/Vercel (Free Tier)

- **Storage**: `/tmp/orders.json` (temporary filesystem)
- **Persistence**: ~24 hours per automatic deployment
- **Limitation**: Lost when Netlify/Vercel redeploys (but OK for testing/demo)
- **For Production**: Connect a database (see below)

### Upgrade to Persistent Storage (Production)

Add a database connection to free services:

- **Supabase** (PostgreSQL, free tier) - https://supabase.com
- **MongoDB Atlas** (NoSQL, free tier) - https://www.mongodb.com/cloud/atlas
- **Firebase** (real-time DB, free tier) - https://firebase.google.com

To add DB:

1. Set `ORDERS_FILE` to your database connection string in environment
2. Update `netlify/functions/order.js` to use the connection instead of file
3. Deploy

---

## Troubleshooting

### Orders Not Saving

- **Check**: Netlify/Vercel logs (Netlify dashboard → Deploys → latest → Functions)
- **Likely cause**: `/tmp` not writable (rare, but check permissions)
- **Fix**: Switch to persistent database or contact support

### Admin Page Not Loading

- **Check**: Triple-click on home page to unlock
- **Enter password**: `admin2026`
- **If still blocked**: Clear browser cache (Ctrl+Shift+Del), try incognito

### CORS Error When Placing Order

- **Expected if**: Frontend on GitHub Pages + backend on different domain
- **Fix**: Already handled in `netlify.toml` and function headers
- **If still happening**: Check browser console (F12) for exact error, update `netlify.toml` with your domain

### Serverless Functions Not Running

- **Check**: `netlify/functions/` folder exists and has `order.js` and `get-orders.js`
- **Check**: `netlify.toml` present in root
- **Fix**: Redeploy (push to GitHub)

---

## GitHub Pages + Netlify Hybrid Setup (Optional)

You can host static files on GitHub Pages AND backend on Netlify (best of both):

### Do This (Skip if using Netlify for everything)

1. Keep frontend static files in GitHub Pages branch (`gh-pages` or `main`)
2. Deploy backend to Netlify separately:
   ```bash
   netlify deploy --dir . --functions=netlify/functions
   ```
3. In `js/order.js`, set `API_BASE` to your Netlify backend URL:
   ```javascript
   const API_BASE = "https://your-site.netlify.app/.netlify/functions";
   ```

---

## Quick Checklist

- [x] Serverless Node functions created (`netlify/functions/order.js`, `get-orders.js`)
- [x] Frontend API calls updated to use `/.netlify/functions/`
- [x] `netlify.toml` configured with redirects and cache headers
- [x] `netlify/functions/` in Git (so Netlify finds them on deploy)
- [ ] Push to GitHub
- [ ] Connect GitHub repo to Netlify
- [ ] Add environment variables (optional but recommended)
- [ ] Test: place order, check admin panel
- [ ] Done! 🎉

---

## Deploy Commands (if manual deploy)

### Netlify CLI (for advanced users)

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Or Just Push to GitHub

Netlify auto-deploys when connected. No CLI needed.

---

## Security Notes (Production)

1. **Change admin password**: Edit `netlify/functions/order.js` hardcoded check or set `ADMIN_PASSWORD` env var
2. **Move orders storage**: Don't use `/tmp` for permanent data—use a database
3. **Disable right-click/shortcuts**: Already enabled in `js/main.js`
4. **HTTPS**: Netlify provides free SSL by default
5. **Env variables**: Never commit `.env` file with secrets—use Netlify/Vercel dashboard

---

## Cost Breakdown (Free Tier)

| Component    | Cost   | Notes                           |
| ------------ | ------ | ------------------------------- |
| GitHub Pages | Free   | Static frontend                 |
| Netlify      | Free   | 125K requests/month serverless  |
| Vercel       | Free   | 100 requests/hour serverless    |
| DNS          | Free   | Netlify provides `.netlify.app` |
| SSL          | Free   | Auto-included                   |
| **Total**    | **$0** | Totally free!                   |

Upgrade to paid if you exceed free limits (very unlikely for small site).

---

## Next Steps

1. Push this code to GitHub
2. Go to https://netlify.com and connect your repo
3. Netlify deploys automatically
4. Visit your live site and test ordering
5. Done! 🎉

Questions? Check Netlify docs: https://docs.netlify.com
