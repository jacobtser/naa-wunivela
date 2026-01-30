Netlify Local Development & Deployment

Prerequisites

- Node.js (14+)
- npm (or yarn)
- Netlify account (https://app.netlify.com)
- Optional: Netlify CLI for local testing

Setup

1. Install dependencies (locally):

```bash
cd "c:\Users\jacob\OneDrive\Desktop\Startup\1"
npm install
```

2. Install Netlify CLI globally (optional but recommended):

```bash
npm install -g netlify-cli
```

Local testing (Netlify Dev)

- Start Netlify Dev which serves static files and runs functions locally:

```bash
netlify dev
```

- By default, your site will be served at http://localhost:8888 and serverless functions at http://localhost:8888/.netlify/functions/{name}

Environment variables (local)

- Create a file named `.env` or use your OS environment to set these for local dev:

```
ADMIN_KEY=admin_orders_2026
ORDERS_FILE=./tmp/orders.json
ADMIN_PASSWORD=admin2026
```

- Netlify CLI automatically loads `.env` when running `netlify dev`.

Deploy to Netlify (production)

1. Push code to GitHub
2. Go to https://app.netlify.com → New site from Git → choose your repository
3. In Site settings → Build & deploy → Environment, add the following variables:
   - `ADMIN_KEY` = `admin_orders_2026` (or your own)
   - `ORDERS_FILE` = (leave empty to use `/tmp/orders.json` on Netlify)
   - `ADMIN_PASSWORD` = `your-secret-password`
4. Deploy — Netlify will build and publish your site. Functions are auto-detected.

Notes

- `/tmp` on Netlify is ephemeral; use a real DB for production persistence (Supabase, MongoDB Atlas, etc.).
- The admin password is currently used client-side; for production, implement server-side auth and remove the hard-coded client password.

Commands summary

```bash
# install deps
npm install

# run local dev server
netlify dev

# push to git then Netlify auto-deploys
git add .
git commit -m "Deploy to Netlify"
git push
```
