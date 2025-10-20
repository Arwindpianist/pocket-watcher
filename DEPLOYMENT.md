# 🚀 Deployment Guide - Vercel with Custom Domain

## Overview

This guide will help you deploy Pocket Watcher to Vercel with your custom domain: `pocketwatcher.arwindpianist.store`

## ⚠️ Important Changes for Production

### Database Migration (Required)

Vercel uses a serverless environment, so SQLite won't work. You need to use PostgreSQL.

**Recommended Options:**
1. **Vercel Postgres** (Easiest) - Built-in PostgreSQL by Vercel
2. **Neon** (Free tier available) - https://neon.tech
3. **Supabase** (Free tier available) - https://supabase.com
4. **Railway** (Free tier available) - https://railway.app

## 📝 Step-by-Step Deployment

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for deployment"

# Create repository on GitHub and push
git remote add origin https://github.com/yourusername/pocket-watcher.git
git branch -M main
git push -u origin main
```

### Step 2: Set Up PostgreSQL Database

#### Option A: Vercel Postgres (Recommended)

1. Go to https://vercel.com
2. Import your GitHub repository
3. Go to **Storage** tab → **Create Database** → **Postgres**
4. Vercel will automatically set `DATABASE_URL` environment variable

#### Option B: Neon (Free Alternative)

1. Go to https://neon.tech
2. Sign up and create a new project
3. Copy the connection string (looks like: `postgresql://user:password@host/database`)
4. You'll add this to Vercel environment variables

### Step 3: Update Prisma Schema for PostgreSQL

Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Changed from "sqlite"
  url      = env("DATABASE_URL")
}
```

### Step 4: Deploy to Vercel

1. Go to https://vercel.com
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Configure environment variables:

```env
DATABASE_URL="your-postgresql-connection-string"
NEXTAUTH_URL="https://pocketwatcher.arwindpianist.store"
NEXTAUTH_SECRET="your-secure-random-secret"
GOOGLE_CLIENT_ID="your-google-client-id" (optional)
GOOGLE_CLIENT_SECRET="your-google-client-secret" (optional)
```

5. Click **"Deploy"**

### Step 5: Configure Custom Domain

1. After deployment, go to your project in Vercel
2. Click **"Settings"** → **"Domains"**
3. Add your domain: `pocketwatcher.arwindpianist.store`
4. Vercel will provide DNS records

### Step 6: Update DNS Settings

Go to your domain provider (where you manage `arwindpianist.store`) and add:

**For subdomain (pocketwatcher):**
```
Type: CNAME
Name: pocketwatcher
Value: cname.vercel-dns.com
```

Or if Vercel provides specific records:
```
Type: A
Name: pocketwatcher
Value: 76.76.21.21 (example - use Vercel's provided IP)
```

### Step 7: Run Database Migration

After deployment, run migrations:

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Link project: `vercel link`
4. Run migration: `vercel env pull .env.production.local`
5. Then: `npx prisma migrate deploy`

Or use the Vercel dashboard to run:
```bash
npx prisma db push
```

## 🔒 Security Checklist

- ✅ Generate new `NEXTAUTH_SECRET` for production
- ✅ Update `NEXTAUTH_URL` to your custom domain
- ✅ Use PostgreSQL (not SQLite)
- ✅ Keep environment variables secure
- ✅ Enable HTTPS (automatic with Vercel)
- ✅ Update Google OAuth redirect URIs (if using)

## 🔄 Update Google OAuth (If Using)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **Credentials**
4. Edit your OAuth 2.0 Client ID
5. Add to **Authorized redirect URIs**:
   ```
   https://pocketwatcher.arwindpianist.store/api/auth/callback/google
   ```

## 📊 Post-Deployment

### Verify Deployment

1. Visit: https://pocketwatcher.arwindpianist.store
2. Create a test account
3. Add a test expense
4. Check that charts load correctly

### Monitor Logs

In Vercel dashboard:
- Go to your project
- Click **"Deployments"**
- Click on latest deployment
- View **"Runtime Logs"** for any errors

## 🔧 Troubleshooting

### Build Failures

If build fails, check:
1. All dependencies are in `package.json`
2. TypeScript errors are fixed
3. Environment variables are set

### Database Connection Issues

If database won't connect:
1. Verify `DATABASE_URL` format
2. Check database is publicly accessible
3. Verify Prisma schema matches database

### Domain Not Working

If custom domain doesn't resolve:
1. Wait 24-48 hours for DNS propagation
2. Verify DNS records are correct
3. Check domain SSL certificate status

## 📝 Quick Commands Reference

```bash
# Generate secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Check build locally
npm run build

# Deploy to Vercel
vercel --prod

# View logs
vercel logs

# Pull environment variables
vercel env pull
```

## 🎉 Success!

Once deployed, your app will be available at:
- **Primary**: https://pocketwatcher.arwindpianist.store
- **Vercel URL**: https://pocket-watcher-xxxx.vercel.app

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Prisma PostgreSQL Guide](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)

Happy deploying! 🚀

