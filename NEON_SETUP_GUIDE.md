# 🗄️ Neon Database Setup Guide

## Problem: Empty Database After Vercel Deployment

Your Vercel deployment is working, but the Neon database is empty because the tables haven't been created yet.

## ✅ Solution: Push Schema to Neon

Choose **ONE** of these methods:

---

## Method 1: Push Schema Locally (Fastest) ⚡

### Prerequisites:
- Your `.env.local` file has the Neon `DATABASE_URL`

### Steps:

1. **Run the setup script:**
   ```powershell
   .\setup-neon.ps1
   ```

   **OR manually:**
   ```bash
   npx prisma db push
   ```

2. **Verify the tables were created:**
   ```bash
   npm run db:studio
   ```
   This will open Prisma Studio where you can see your tables.

3. **Done!** Now try signing up on your deployed site.

---

## Method 2: One-Time Setup (Recommended After First Push) ✅

After you've pushed the schema once using Method 1, you're all set! The database tables will persist, and you don't need to push the schema again unless you change the Prisma schema.

### When to Push Schema Again:
- Only when you modify `prisma/schema.prisma` (add new fields, tables, etc.)
- After pushing changes, run `npx prisma db push` locally again

### Note:
The build process on Vercel only generates the Prisma Client, it doesn't push the schema to the database. This is intentional and follows best practices.

---

## Method 3: Manual Database Push 🔨

If you can't run commands locally and don't want to redeploy:

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Link your project:**
   ```bash
   vercel link
   ```

4. **Run Prisma command in Vercel environment:**
   ```bash
   vercel env pull .env.production
   npx prisma db push
   ```

---

## 🔍 Verify Setup

After using any method above, verify your setup:

### Check Tables Exist:
```bash
npx prisma db studio
```

You should see two tables:
- ✅ `User`
- ✅ `Expense`

### Test Signup:
1. Go to: `https://pocketwatcher.arwindpianist.store/register`
2. Create a test account
3. Try logging in
4. Add a test expense

---

## 🚨 Troubleshooting

### Error: "Environment variable not found: DATABASE_URL"

**Solution:**
- Check your `.env.local` file exists
- Verify it contains: `DATABASE_URL="postgresql://..."`
- Make sure you're using the Neon connection string (not SQLite)

### Error: "Can't reach database server"

**Solution:**
- Verify your Neon database is active (check Neon dashboard)
- Check the connection string is correct
- Try connecting with `psql` or a database client

### Tables Created But Still Can't Sign Up

**Solution:**
1. Check Vercel logs for errors
2. Verify all environment variables are set in Vercel
3. Make sure `DATABASE_URL` in Vercel matches your Neon URL
4. Redeploy after verifying environment variables

---

## 🎯 Quick Command Reference

```bash
# Push schema to database
npx prisma db push

# Open database viewer
npm run db:studio

# Generate Prisma client
npx prisma generate

# View database URL (locally)
echo $env:DATABASE_URL  # PowerShell
echo $DATABASE_URL      # Bash
```

---

## ✅ Success Checklist

- [ ] Neon database created
- [ ] DATABASE_URL added to `.env.local`
- [ ] Schema pushed to Neon (`npx prisma db push`)
- [ ] Tables visible in Prisma Studio
- [ ] Can register on deployed site
- [ ] Can login successfully
- [ ] Can add expenses

---

## 📚 Additional Resources

- [Neon Documentation](https://neon.tech/docs)
- [Prisma PostgreSQL Guide](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)

---

## Need More Help?

If you're still having issues:
1. Check the Vercel deployment logs
2. Verify the `DATABASE_URL` in Vercel settings
3. Make sure Prisma is generating correctly (`npm run build` locally)

