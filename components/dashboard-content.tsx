"use client"

import { useEffect, useState } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { StatsCards } from "@/components/stats-cards"
import { ExpenseCharts } from "@/components/expense-charts"
import { ExpensesList } from "@/components/expenses-list"
import { useToast } from "@/hooks/use-toast"

export interface Expense {
  id: string
  userId: string
  description: string
  category: string
  amount: number
  date: string
  notes?: string | null
  createdAt: string
  updatedAt: string
}

export function DashboardContent() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchExpenses = async () => {
    try {
      const response = await fetch("/api/expenses")
      if (!response.ok) {
        throw new Error("Failed to fetch expenses")
      }
      const data = await response.json()
      setExpenses(data.expenses)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load expenses",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  const handleExpenseAdded = () => {
    fetchExpenses()
  }

  const handleExpenseDeleted = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  if (isLoading) {
    return (
      <>
        <DashboardNav onExpenseAdded={handleExpenseAdded} />
        <main className="container mx-auto px-4 py-8 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <DashboardNav onExpenseAdded={handleExpenseAdded} />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Track your expenses and spending patterns</p>
        </div>

        <StatsCards expenses={expenses} />
        <ExpenseCharts expenses={expenses} />
        <ExpensesList
          expenses={expenses}
          onExpenseDeleted={handleExpenseDeleted}
          onExpenseUpdated={fetchExpenses}
        />
      </main>
    </>
  )
}

