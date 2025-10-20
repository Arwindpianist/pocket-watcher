const fs = require('fs');
const path = require('path');

// Ensure we're in the project root
const rootDir = path.join(__dirname, '..');
process.chdir(rootDir);

const envPath = path.join(rootDir, '.env');
const envLocalPath = path.join(rootDir, '.env.local');

// Check if .env exists
if (!fs.existsSync(envPath)) {
  // If .env.local exists, copy it
  if (fs.existsSync(envLocalPath)) {
    fs.copyFileSync(envLocalPath, envPath);
    console.log('✓ Created .env from .env.local');
  } else {
    // Create default .env
    const defaultEnv = `# Database
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
NEXTAUTH_SECRET="change-this-to-a-random-secret"

# Application URL
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
`;
    fs.writeFileSync(envPath, defaultEnv, 'utf8');
    console.log('✓ Created default .env file');
  }
} else {
  console.log('✓ .env file exists');
}

// Also ensure .env.local exists if it doesn't
if (!fs.existsSync(envLocalPath) && fs.existsSync(envPath)) {
  fs.copyFileSync(envPath, envLocalPath);
  console.log('✓ Created .env.local from .env');
}

