"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { Expense } from "./dashboard-content"

interface ExpenseChartsProps {
  expenses: Expense[]
}

const colors = ["#8899e4", "#d64d80", "#841e70", "#a0a5c0", "#e1e4f8", "#ff6b6b", "#4ecdc4", "#ffd93d"]

export function ExpenseCharts({ expenses }: ExpenseChartsProps) {
  // Calculate category data for pie chart (current month)
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  const thisMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date)
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
  })

  const categoryTotals = thisMonthExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)

  const categoryData = Object.entries(categoryTotals)
    .map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }))
    .sort((a, b) => b.value - a.value)

  // Calculate monthly data for line chart (last 6 months)
  const monthlyData = []
  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth - i, 1)
    const monthExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return expenseDate.getMonth() === date.getMonth() && expenseDate.getFullYear() === date.getFullYear()
    })
    const total = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    monthlyData.push({
      month: date.toLocaleString("default", { month: "short" }),
      amount: total,
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Pie Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Spending by Category</CardTitle>
          <CardDescription className="text-muted-foreground">Distribution of expenses this month</CardDescription>
        </CardHeader>
        <CardContent>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #2a2a2a",
                    borderRadius: "8px",
                    color: "#e1e4f8",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              No expenses this month
            </div>
          )}
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Monthly Spending Trend</CardTitle>
          <CardDescription className="text-muted-foreground">Your spending over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          {monthlyData.some((d) => d.amount > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="month" stroke="#a0a5c0" />
                <YAxis stroke="#a0a5c0" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #2a2a2a",
                    borderRadius: "8px",
                    color: "#e1e4f8",
                  }}
                />
                <Line type="monotone" dataKey="amount" stroke="#8899e4" strokeWidth={2} dot={{ fill: "#8899e4" }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              No expense data available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
