# ✅ Deployment Checklist for Vercel

Use this checklist to ensure a smooth deployment to `pocketwatcher.arwindpianist.store`

## Pre-Deployment Tasks

### 1. Code Preparation
- [ ] All code changes committed to Git
- [ ] Build succeeds locally (`npm run build`)
- [ ] No TypeScript errors
- [ ] All tests passing (if any)

### 2. Database Setup
- [ ] Choose PostgreSQL provider:
  - [ ] Vercel Postgres (easiest)
  - [ ] Neon (free tier: https://neon.tech)
  - [ ] Supabase (free tier: https://supabase.com)
  - [ ] Railway (free tier: https://railway.app)
- [ ] Get PostgreSQL connection string
- [ ] Update `prisma/schema.prisma` provider to `postgresql`

### 3. Environment Variables Preparation

Prepare these values before deploying:

```
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://pocketwatcher.arwindpianist.store"
NEXTAUTH_SECRET="[Generate new one - see below]"
GOOGLE_CLIENT_ID="[Optional]"
GOOGLE_CLIENT_SECRET="[Optional]"
```

**Generate new NEXTAUTH_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 4. GitHub Repository
- [ ] Create repository on GitHub
- [ ] Push all code to GitHub:
  ```bash
  git init
  git add .
  git commit -m "Initial commit - Production ready"
  git remote add origin https://github.com/YOUR_USERNAME/pocket-watcher.git
  git branch -M main
  git push -u origin main
  ```

## Vercel Deployment

### 5. Import Project
- [ ] Go to https://vercel.com
- [ ] Click "Add New" → "Project"
- [ ] Import your GitHub repository
- [ ] Select "pocket-watcher" repository

### 6. Configure Project
- [ ] Framework Preset: **Next.js** (should auto-detect)
- [ ] Root Directory: **./** (leave default)
- [ ] Build Command: **npm run build** (should auto-fill)
- [ ] Output Directory: **.next** (should auto-fill)

### 7. Add Environment Variables

In Vercel project settings, add each variable:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | Your PostgreSQL connection string | From your database provider |
| `NEXTAUTH_URL` | `https://pocketwatcher.arwindpianist.store` | Your custom domain |
| `NEXTAUTH_SECRET` | Generated random string | Use node command above |
| `GOOGLE_CLIENT_ID` | Optional | Only if using Google OAuth |
| `GOOGLE_CLIENT_SECRET` | Optional | Only if using Google OAuth |

- [ ] All environment variables added
- [ ] Click "Deploy"

### 8. Initial Deployment
- [ ] Wait for deployment to complete
- [ ] Check build logs for errors
- [ ] Note your Vercel URL (e.g., `pocket-watcher-xxx.vercel.app`)

## Database Migration

### 9. Run Prisma Migration

Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login and link
vercel login
vercel link

# Pull environment variables
vercel env pull

# Run migration
npx prisma generate
npx prisma db push
```

Option B: Via Vercel Dashboard
1. Go to your project → Settings → Environment Variables
2. Ensure `DATABASE_URL` is set correctly
3. Redeploy the project
4. The build process will run migrations

- [ ] Database migration completed
- [ ] No Prisma errors in deployment logs

## Domain Configuration

### 10. Add Custom Domain
- [ ] In Vercel project, go to "Settings" → "Domains"
- [ ] Click "Add"
- [ ] Enter: `pocketwatcher.arwindpianist.store`
- [ ] Note the DNS records Vercel provides

### 11. Update DNS Settings

Go to your domain registrar for `arwindpianist.store`:

**Add CNAME Record:**
```
Type: CNAME
Name: pocketwatcher
Target: cname.vercel-dns.com
TTL: Automatic or 3600
```

**OR Add A Record (if CNAME not supported):**
```
Type: A
Name: pocketwatcher
Target: [IP from Vercel]
TTL: Automatic or 3600
```

- [ ] DNS records added
- [ ] Wait 5-60 minutes for DNS propagation
- [ ] SSL certificate issued (automatic via Vercel)

## Post-Deployment

### 12. Google OAuth Update (If Using)
- [ ] Go to Google Cloud Console
- [ ] Navigate to Credentials
- [ ] Edit your OAuth 2.0 Client
- [ ] Add to Authorized redirect URIs:
  ```
  https://pocketwatcher.arwindpianist.store/api/auth/callback/google
  ```
- [ ] Save changes

### 13. Testing
- [ ] Visit `https://pocketwatcher.arwindpianist.store`
- [ ] Create a test account
- [ ] Login successfully
- [ ] Add a test expense
- [ ] View dashboard and charts
- [ ] Delete test expense
- [ ] Logout and login again
- [ ] Test Google OAuth (if enabled)

### 14. Monitoring
- [ ] Check Vercel Analytics
- [ ] Review Runtime Logs for errors
- [ ] Set up error monitoring (optional: Sentry)
- [ ] Monitor database usage

## Troubleshooting

### Build Failures
- Check build logs in Vercel dashboard
- Verify all dependencies in `package.json`
- Ensure `prisma/schema.prisma` uses `postgresql`

### Database Connection Errors
- Verify `DATABASE_URL` format
- Check database is publicly accessible
- Ensure SSL mode is correct (add `?sslmode=require` if needed)

### Domain Not Resolving
- Wait 24-48 hours for full DNS propagation
- Use https://dnschecker.org to verify DNS propagation
- Check SSL certificate status in Vercel

### Authentication Errors
- Verify `NEXTAUTH_URL` matches your domain exactly
- Check `NEXTAUTH_SECRET` is set and not empty
- For Google OAuth, verify redirect URIs are correct

## Final Steps

### 15. Documentation
- [ ] Update README.md with production URL
- [ ] Document any production-specific configurations
- [ ] Update team members with deployment info

### 16. Backup and Security
- [ ] Set up database backups
- [ ] Review security settings
- [ ] Enable Vercel Protection (optional)
- [ ] Set up monitoring alerts

## 🎉 Deployment Complete!

Your Pocket Watcher app should now be live at:
**https://pocketwatcher.arwindpianist.store**

## Quick Reference

### Useful Commands
```bash
# View deployment logs
vercel logs

# Redeploy
vercel --prod

# Pull environment variables
vercel env pull

# Run migrations locally with production DB
npx prisma studio
```

### Important URLs
- Production: https://pocketwatcher.arwindpianist.store
- Vercel Dashboard: https://vercel.com/dashboard
- Database Provider: [Your chosen provider]
- Google Cloud Console: https://console.cloud.google.com/

Need help? Check `DEPLOYMENT.md` for detailed instructions!

