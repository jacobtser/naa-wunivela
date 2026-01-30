# GitHub + Netlify Deployment Guide

This site is now ready to deploy as a **free, completely serverless application**.

## What Changed

- ✅ **Frontend**: Same HTML/CSS/JS—no changes needed for you
- ✅ **Backend**: Converted PHP to serverless Node.js functions
- ✅ **Storage**: Orders saved to `/tmp` (auto-persists) or connect a database
- ✅ **API Calls**: Updated `js/order.js` and `admin/orders.html` to use `/.netlify/functions/` endpoints
- ✅ **Config**: `netlify.toml` handles redirects, caching, and CORS

## Quick Start: Deploy to Netlify

### 1. Push to GitHub

```bash
git add .
git commit -m "Add serverless backend for Netlify deployment"
git push origin main
```

### 2. Deploy on Netlify (2 minutes)

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Select GitHub, authorize, find your repo
4. Click "Deploy"
5. Wait ~2 minutes for auto-deployment
6. Your site is **LIVE** at `https://your-site.netlify.app` 🎉

### 3. Test Ordering

- Visit `https://your-site.netlify.app/order.html`
- Add products, fill form, place order
- Click 3 times on page to unlock admin
- Go to `/admin/orders.html`, enter password `admin2026`
- See your order in the admin dashboard

## Files Changed/Added

### New Files

- `netlify/functions/order.js` – Serverless order processing
- `netlify/functions/get-orders.js` – Retrieve orders for admin
- `netlify.toml` – Netlify configuration (redirects, cache, headers)
- `.env.example` – Document required env vars
- `DEPLOY_TO_NETLIFY.md` – Full deployment docs

### Updated Files

- `js/order.js` – Changed `fetch("backend/order.php")` to `fetch("/.netlify/functions/order")`
- `admin/orders.html` – Changed `fetch("../backend/get_orders.php")` to `fetch("/.netlify/functions/get-orders")`

## Key Points

### Storage (Orders)

- **By default**: Saves to `/tmp/orders.json` on Netlify's temporary filesystem
- **Lasts**: ~24 hours per deployment (good for testing)
- **For production**: Update `ORDERS_FILE` env var or connect a database (Supabase, MongoDB Atlas, etc.)

### Admin Panel

- **Password**: `admin2026` (change in env var for production)
- **Unlock**: Click 3 times anywhere on the site
- **Access**: `/admin/orders.html`

### Deployment

- **Auto-deploys**: Every time you push to GitHub (if Netlify connected)
- **No manual steps**: Netlify auto-detects `netlify/functions/` and deploys functions
- **HTTPS**: Free SSL included

## Free Tier Limits

| Service                 | Free Limit          | Your Usage                          |
| ----------------------- | ------------------- | ----------------------------------- |
| Netlify Serverless      | 125K requests/month | ~few hundred/month for a small site |
| GitHub Pages (frontend) | Unlimited           | Your static files                   |
| Bandwidth               | 100GB/month         | ~1-10GB for typical site            |
| Build time              | 300 min/month       | ~1-2 min per deploy                 |

**Conclusion**: Completely free, with room to grow! 🎉

## Alternative: Vercel

If you prefer Vercel instead of Netlify:

1. Go to https://vercel.com/new
2. Import your GitHub repo
3. Vercel auto-deploys
4. Done! (Same setup, slightly different dashboard)

**Note**: Netw recommends **Netlify** for this setup because it's simpler and has better function support.

## Troubleshooting

### Orders not saving?

- Check Netlify logs: Dashboard → Deploys → latest → Functions
- `/tmp` storage is ephemeral—use a database for permanent storage

### Admin not loading?

- Triple-click anywhere on home page to unlock
- Enter password `admin2026`
- Use incognito mode if stuck (cache issue)

### CORS errors?

- Already handled in `netlify.toml`
- If still occurs, check browser console (F12) for exact error

### Functions not running?

- Verify `netlify/functions/order.js` exists in repo
- Re-push to GitHub
- Netlify will auto-redeploy

## Need Help?

1. **Netlify docs**: https://docs.netlify.com
2. **Vercel docs**: https://vercel.com/docs
3. **This guide**: See `DEPLOY_TO_NETLIFY.md` for detailed steps

---

**Ready?** Push to GitHub and connect Netlify. Your site goes live in 2 minutes! 🚀
