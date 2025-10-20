# 🚀 Quick Start Guide

Get Pocket Watcher running in 5 minutes!

## Installation Commands

Run these commands in order:

```bash
# 1. Install dependencies
pnpm install

# 2. Generate a secure secret
# macOS/Linux:
openssl rand -base64 32

# Windows PowerShell:
# node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# 3. Update .env.local with the generated secret
# Edit .env.local and replace 'change-this-to-a-random-secret' with your generated secret

# 4. Initialize database
pnpm db:push

# 5. Start development server
pnpm dev
```

## Open Your Browser

Navigate to http://localhost:3000

## Create Your First Account

1. Click "Get Started" or "Sign Up"
2. Fill in your details
3. Create account
4. Start tracking expenses!

## Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm db:push      # Push database schema
pnpm db:studio    # Open Prisma Studio (database GUI)
```

## Project Features

✅ **Authentication** - Secure login with email/password or Google
✅ **Add Expenses** - Quick expense entry with categories
✅ **Dashboard** - Real-time statistics and insights
✅ **Charts** - Visual spending analytics
✅ **Delete Expenses** - Manage your transaction history

## Need More Help?

- Full setup guide: [SETUP.md](SETUP.md)
- Complete documentation: [README.md](README.md)

## Troubleshooting

**Problem:** Dependencies not installing
**Solution:** `rm -rf node_modules pnpm-lock.yaml && pnpm install`

**Problem:** Prisma errors
**Solution:** `pnpm prisma generate`

**Problem:** Database issues
**Solution:** `rm prisma/dev.db && pnpm db:push`

Happy tracking! 💰

