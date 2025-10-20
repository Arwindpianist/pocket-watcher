const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env file
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  const envLocalPath = path.join(__dirname, '..', '.env.local');
  
  // Try to load from .env.local first, then .env
  const filePath = fs.existsSync(envLocalPath) ? envLocalPath : envPath;
  
  if (fs.existsSync(filePath)) {
    const envContent = fs.readFileSync(filePath, 'utf8');
    const lines = envContent.split('\n');
    
    lines.forEach(line => {
      line = line.trim();
      // Skip comments and empty lines
      if (!line || line.startsWith('#')) return;
      
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let value = match[2].trim();
        
        // Remove surrounding quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        
        process.env[key] = value;
      }
    });
    
    console.log('✓ Environment variables loaded');
  } else {
    console.warn('⚠ No .env or .env.local file found');
  }
}

// Load environment variables
loadEnv();

// Get Prisma command from arguments
const prismaArgs = process.argv.slice(2);

if (prismaArgs.length === 0) {
  console.error('Error: Please provide a Prisma command');
  console.error('Example: node scripts/run-prisma.js db push');
  process.exit(1);
}

// Run Prisma CLI with the loaded environment
const prisma = spawn('npx', ['prisma', ...prismaArgs], {
  stdio: 'inherit',
  shell: true,
  env: process.env
});

prisma.on('close', (code) => {
  process.exit(code);
});

prisma.on('error', (err) => {
  console.error('Failed to start Prisma:', err);
  process.exit(1);
});

