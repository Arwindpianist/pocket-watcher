# Setup Neon Database for Production
Write-Host "`n🚀 Neon Database Setup" -ForegroundColor Cyan
Write-Host "=====================`n" -ForegroundColor Cyan

# Check if DATABASE_URL is in .env.local
if (!(Test-Path ".env.local")) {
    Write-Host "❌ .env.local not found!" -ForegroundColor Red
    Write-Host "`nPlease create .env.local with your Neon connection string:" -ForegroundColor Yellow
    Write-Host 'DATABASE_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"' -ForegroundColor Gray
    exit 1
}

$envContent = Get-Content ".env.local" -Raw
if ($envContent -notmatch "neon\.tech") {
    Write-Host "⚠️  Warning: DATABASE_URL doesn't look like a Neon connection string" -ForegroundColor Yellow
    Write-Host "Make sure you're using your Neon PostgreSQL URL, not SQLite!`n" -ForegroundColor Yellow
}

Write-Host "📊 Pushing Prisma schema to Neon..." -ForegroundColor Yellow
npx prisma db push

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Database schema pushed successfully!" -ForegroundColor Green
    Write-Host "`n📋 Verifying tables..." -ForegroundColor Yellow
    npx prisma db execute --stdin <<< "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
    
    Write-Host "`n🎉 Your Neon database is ready!" -ForegroundColor Green
    Write-Host "`nYou can now:" -ForegroundColor White
    Write-Host "  1. Sign up on your deployed site" -ForegroundColor Gray
    Write-Host "  2. View your data with: npm run db:studio" -ForegroundColor Gray
    Write-Host "`nDeployed URL: https://pocketwatcher.arwindpianist.store`n" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Failed to push schema!" -ForegroundColor Red
    Write-Host "`nTroubleshooting:" -ForegroundColor Yellow
    Write-Host "  1. Check your DATABASE_URL in .env.local" -ForegroundColor Gray
    Write-Host "  2. Make sure your Neon database is active" -ForegroundColor Gray
    Write-Host "  3. Verify network connectivity" -ForegroundColor Gray
    exit 1
}
