#!/bin/bash

# Pocket Watcher Deployment Script
echo "🚀 Pocket Watcher Deployment Script"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Ready for deployment"
    echo "✅ Git repository initialized"
else
    echo "📁 Git repository already exists"
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found!"
    echo "Please create .env.local with your Neon DATABASE_URL"
    echo "Example:"
    echo "DATABASE_URL=\"postgresql://username:password@ep-xxx.region.aws.neon.tech/database?sslmode=require\""
    echo "NEXTAUTH_SECRET=\"your-secret-here\""
    echo "NEXTAUTH_URL=\"https://pocketwatcher.arwindpianist.store\""
    exit 1
fi

# Test database connection
echo "🔍 Testing database connection..."
npm run db:push

if [ $? -eq 0 ]; then
    echo "✅ Database connection successful!"
else
    echo "❌ Database connection failed!"
    echo "Please check your DATABASE_URL in .env.local"
    exit 1
fi

# Build test
echo "🔨 Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "🎉 Ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Push to GitHub:"
echo "   git remote add origin https://github.com/yourusername/pocket-watcher.git"
echo "   git push -u origin main"
echo ""
echo "2. Deploy to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Add environment variables from VERCEL_ENV_VARIABLES.txt"
echo "   - Deploy!"
echo ""
echo "3. Configure custom domain:"
echo "   - Add pocketwatcher.arwindpianist.store in Vercel dashboard"
echo "   - Update DNS records as instructed"
