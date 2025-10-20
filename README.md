# 💰 Pocket Watcher

A modern, lightweight expense tracker built with Next.js, Prisma, and SQLite. Track your expenses, visualize spending patterns, and take control of your personal finances.

## ✨ Features

- 🔐 **Secure Authentication** - Email/password & Google OAuth with NextAuth.js
- 💸 **Expense Management** - Add, view, and delete expenses with ease
- 📊 **Visual Analytics** - Beautiful charts showing spending by category and monthly trends
- 📈 **Smart Statistics** - Automatic calculation of totals, averages, and insights
- 🎨 **Modern UI** - Clean, responsive design with dark mode
- 🚀 **Fast & Lightweight** - Built with performance in mind

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Database**: SQLite via Prisma ORM
- **Authentication**: NextAuth.js
- **UI**: TailwindCSS + shadcn/ui
- **Charts**: Recharts
- **Deployment**: Vercel-ready

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)
- Git

### Installation

1. **Clone the repository**

\`\`\`bash
git clone <repository-url>
cd pocket-watcher
\`\`\`

2. **Install dependencies**

\`\`\`bash
pnpm install
\`\`\`

3. **Set up environment variables**

Create a \`.env.local\` file in the root directory:

\`\`\`env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# Google OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
\`\`\`

To generate a secure \`NEXTAUTH_SECRET\`, run:
\`\`\`bash
openssl rand -base64 32
\`\`\`

4. **Initialize the database**

\`\`\`bash
pnpm prisma generate
pnpm prisma db push
\`\`\`

5. **Start the development server**

\`\`\`bash
pnpm dev
\`\`\`

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Usage

1. **Create an account** - Sign up with email/password or Google
2. **Add expenses** - Click "Add Expense" to log transactions
3. **View analytics** - See spending patterns on your dashboard
4. **Track progress** - Monitor your expenses over time

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

For production, you'll want to use a more robust database:
- PostgreSQL (recommended for Vercel)
- MySQL
- MongoDB

Update your \`schema.prisma\` datasource accordingly.

## 📁 Project Structure

\`\`\`
pocket-watcher/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Login page
│   ├── register/         # Register page
│   └── settings/         # Settings page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                   # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Helper functions
├── prisma/               # Database schema
│   └── schema.prisma
└── public/               # Static assets
\`\`\`

## 🔒 Security

- Passwords are hashed using bcryptjs
- Session-based authentication with NextAuth.js
- API routes protected with authentication middleware
- SQL injection prevention via Prisma ORM

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Charts powered by [Recharts](https://recharts.org/)

---

Made with ❤️ by Arwin Kumar

