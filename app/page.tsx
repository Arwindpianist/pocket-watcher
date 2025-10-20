import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wallet, TrendingDown, PieChart, Shield } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />

        <div className="relative">
          {/* Navigation */}
          <nav className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-foreground">Pocket Watcher</span>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/login">
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
                </Link>
              </div>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="container mx-auto px-4 py-20 md:py-32">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance">
                    <span className="text-foreground">Track smarter.</span>
                    <br />
                    <span className="text-primary">Spend wiser.</span>
                  </h1>
                  <p className="text-xl text-muted-foreground text-pretty max-w-xl">
                    Take control of your finances with Pocket Watcher. Track expenses, analyze spending patterns, and
                    make smarter financial decisions.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
                    >
                      Start Tracking Free
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto bg-transparent"
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Illustration */}
              <div className="relative">
                <div className="relative rounded-2xl bg-card border border-border p-8 shadow-2xl">
                  <div className="space-y-6">
                    {/* Mock Dashboard Preview */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Total Spent</p>
                        <p className="text-3xl font-bold text-foreground">$2,847.50</p>
                      </div>
                      <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <TrendingDown className="h-8 w-8 text-primary" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: "Food & Dining", amount: "$842.30", color: "bg-primary" },
                        { label: "Transportation", amount: "$324.50", color: "bg-accent" },
                        { label: "Shopping", amount: "$567.20", color: "bg-secondary" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <div className={`h-3 w-3 rounded-full ${item.color}`} />
                            <span className="text-sm text-foreground">{item.label}</span>
                          </div>
                          <span className="text-sm font-semibold text-foreground">{item.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
                <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Everything you need to manage your money</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features to help you understand and control your spending habits
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: PieChart,
              title: "Visual Analytics",
              description: "Beautiful charts and graphs to visualize your spending patterns and trends over time.",
            },
            {
              icon: TrendingDown,
              title: "Smart Tracking",
              description: "Automatically categorize expenses and track your spending across different categories.",
            },
            {
              icon: Shield,
              title: "Secure & Private",
              description: "Your financial data is encrypted and secure. We never share your information.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to take control of your finances?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already tracking smarter and spending wiser.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Wallet className="h-6 w-6 text-primary" />
              <span className="font-semibold text-foreground">Pocket Watcher</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 Pocket Watcher. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
