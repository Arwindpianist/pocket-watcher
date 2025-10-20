# 🚀 Pocket Watcher - Setup Guide

This guide will help you get Pocket Watcher up and running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (recommended) - Install with: `npm install -g pnpm`
- **Git** - [Download](https://git-scm.com/)

## Step-by-Step Setup

### 1. Clone the Repository

\`\`\`bash
git clone <your-repository-url>
cd pocket-watcher
\`\`\`

### 2. Install Dependencies

Using pnpm (recommended):
\`\`\`bash
pnpm install
\`\`\`

Or using npm:
\`\`\`bash
npm install
\`\`\`

Or using yarn:
\`\`\`bash
yarn install
\`\`\`

### 3. Set Up Environment Variables

Create a \`.env.local\` file in the root directory of your project:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Then edit \`.env.local\` with your values:

\`\`\`env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Google OAuth (optional - only if you want Google sign-in)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
\`\`\`

#### Generating NEXTAUTH_SECRET

Run this command to generate a secure secret:

**On macOS/Linux:**
\`\`\`bash
openssl rand -base64 32
\`\`\`

**On Windows (PowerShell):**
\`\`\`powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
\`\`\`

Copy the output and paste it as your \`NEXTAUTH_SECRET\` value.

#### Setting Up Google OAuth (Optional)

If you want to enable Google sign-in:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: \`http://localhost:3000/api/auth/callback/google\`
6. Copy the Client ID and Client Secret to your \`.env.local\`

### 4. Initialize the Database

Generate Prisma client:
\`\`\`bash
pnpm prisma generate
\`\`\`

Push the schema to your database:
\`\`\`bash
pnpm prisma db push
\`\`\`

### 5. Start the Development Server

\`\`\`bash
pnpm dev
\`\`\`

The application will be available at [http://localhost:3000](http://localhost:3000)

## First Time Use

1. **Open your browser** and navigate to http://localhost:3000
2. **Create an account** by clicking "Get Started" or "Sign up"
3. **Fill in your details** and create your account
4. **Start adding expenses** from your dashboard!

## Common Issues & Solutions

### Issue: Module not found errors

**Solution:** Make sure all dependencies are installed:
\`\`\`bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
\`\`\`

### Issue: Prisma client errors

**Solution:** Regenerate the Prisma client:
\`\`\`bash
pnpm prisma generate
\`\`\`

### Issue: Database connection errors

**Solution:** Ensure your \`.env.local\` file has the correct \`DATABASE_URL\`:
\`\`\`env
DATABASE_URL="file:./dev.db"
\`\`\`

### Issue: NextAuth errors

**Solution:** Verify your \`NEXTAUTH_SECRET\` is set in \`.env.local\`

## Development Tips

### View Database

To view and edit your database using Prisma Studio:

\`\`\`bash
pnpm prisma studio
\`\`\`

### Reset Database

If you need to reset your database:

\`\`\`bash
rm prisma/dev.db
pnpm prisma db push
\`\`\`

### Check for TypeScript Errors

\`\`\`bash
pnpm tsc --noEmit
\`\`\`

### Run Linting

\`\`\`bash
pnpm lint
\`\`\`

## Production Deployment

For production deployment on Vercel:

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables
4. **Important:** Update \`NEXTAUTH_URL\` to your production URL
5. **Important:** For production, consider using PostgreSQL instead of SQLite

To migrate to PostgreSQL:
1. Update \`schema.prisma\` datasource to \`postgresql\`
2. Update \`DATABASE_URL\` in your environment variables
3. Run \`pnpm prisma generate\` and \`pnpm prisma db push\`

## Need Help?

If you encounter any issues not covered here, please:

1. Check the main [README.md](README.md)
2. Review the [Next.js documentation](https://nextjs.org/docs)
3. Check [Prisma documentation](https://www.prisma.io/docs)
4. Check [NextAuth.js documentation](https://next-auth.js.org/)

Happy tracking! 💰

