# Pocket Watcher Deployment Script (PowerShell)
Write-Host "🚀 Pocket Watcher Deployment Script" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

# Check if git is initialized
if (!(Test-Path ".git")) {
    Write-Host "📁 Initializing Git repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit - Ready for deployment"
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "📁 Git repository already exists" -ForegroundColor Green
}

# Check if .env.local exists
if (!(Test-Path ".env.local")) {
    Write-Host "⚠️  .env.local not found!" -ForegroundColor Red
    Write-Host "Please create .env.local with your Neon DATABASE_URL" -ForegroundColor Yellow
    Write-Host "Example:" -ForegroundColor White
    Write-Host 'DATABASE_URL="postgresql://username:password@ep-xxx.region.aws.neon.tech/database?sslmode=require"' -ForegroundColor Gray
    Write-Host 'NEXTAUTH_SECRET="your-secret-here"' -ForegroundColor Gray
    Write-Host 'NEXTAUTH_URL="https://pocketwatcher.arwindpianist.store"' -ForegroundColor Gray
    exit 1
}

# Test database connection
Write-Host "🔍 Testing database connection..." -ForegroundColor Yellow
npm run db:push

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database connection successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Database connection failed!" -ForegroundColor Red
    Write-Host "Please check your DATABASE_URL in .env.local" -ForegroundColor Yellow
    exit 1
}

# Build test
Write-Host "🔨 Testing build..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 Ready for deployment!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Push to GitHub:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/yourusername/pocket-watcher.git" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Deploy to Vercel:" -ForegroundColor White
Write-Host "   - Go to https://vercel.com" -ForegroundColor Gray
Write-Host "   - Import your GitHub repository" -ForegroundColor Gray
Write-Host "   - Add environment variables from VERCEL_ENV_VARIABLES.txt" -ForegroundColor Gray
Write-Host "   - Deploy!" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Configure custom domain:" -ForegroundColor White
Write-Host "   - Add pocketwatcher.arwindpianist.store in Vercel dashboard" -ForegroundColor Gray
Write-Host "   - Update DNS records as instructed" -ForegroundColor Gray
