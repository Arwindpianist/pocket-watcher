import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, PieChart } from "lucide-react"
import { Expense } from "./dashboard-content"

interface StatsCardsProps {
  expenses: Expense[]
}

export function StatsCards({ expenses }: StatsCardsProps) {
  // Calculate total spent this month
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  const thisMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date)
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
  })

  const totalSpent = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  // Calculate daily average
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const avgPerDay = totalSpent / daysInMonth

  // Find highest category
  const categoryTotals = thisMonthExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)

  const highestCategory = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0] || ["None", 0]
  const highestCategoryPercent = totalSpent > 0 ? (highestCategory[1] / totalSpent) * 100 : 0

  const stats = [
    {
      title: "Total Spent",
      value: `$${totalSpent.toFixed(2)}`,
      description: "This month",
      icon: DollarSign,
      trend: expenses.length > 0 ? `${thisMonthExpenses.length} transactions` : "No transactions yet",
    },
    {
      title: "Average per Day",
      value: `$${avgPerDay.toFixed(2)}`,
      description: "Daily average",
      icon: TrendingUp,
      trend: `Based on ${daysInMonth} days`,
    },
    {
      title: "Highest Category",
      value: highestCategory[0],
      description: `$${highestCategory[1].toFixed(2)} spent`,
      icon: PieChart,
      trend: `${highestCategoryPercent.toFixed(1)}% of total`,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, i) => (
        <Card key={i} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            <p className="text-xs text-primary mt-2">{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
