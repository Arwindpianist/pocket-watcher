"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Coffee, Car, ShoppingBag, Film, Home, Utensils, Plane, Heart, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Expense } from "./dashboard-content"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ExpensesListProps {
  expenses: Expense[]
  onExpenseDeleted: (id: string) => void
  onExpenseUpdated: () => void
}

const categoryIcons: Record<string, any> = {
  "Food & Dining": Coffee,
  Transportation: Car,
  Shopping: ShoppingBag,
  Entertainment: Film,
  "Bills & Utilities": Home,
  Groceries: Utensils,
  Travel: Plane,
  Healthcare: Heart,
}

const categoryColors: Record<string, string> = {
  "Food & Dining": "bg-primary/20 text-primary border-primary/30",
  Transportation: "bg-accent/20 text-accent border-accent/30",
  Shopping: "bg-secondary/20 text-secondary border-secondary/30",
  Entertainment: "bg-muted text-muted-foreground border-border",
  "Bills & Utilities": "bg-foreground/10 text-foreground border-foreground/20",
  Groceries: "bg-primary/20 text-primary border-primary/30",
  Travel: "bg-accent/20 text-accent border-accent/30",
  Healthcare: "bg-secondary/20 text-secondary border-secondary/30",
}

export function ExpensesList({ expenses, onExpenseDeleted, onExpenseUpdated }: ExpensesListProps) {
  const { toast } = useToast()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/expenses/${deleteId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete expense")
      }

      toast({
        title: "Success",
        description: "Expense deleted successfully",
      })

      onExpenseDeleted(deleteId)
      setDeleteId(null)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete expense",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Expenses</CardTitle>
          <CardDescription className="text-muted-foreground">Your latest transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {expenses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground mb-2">No expenses yet</p>
              <p className="text-sm text-muted-foreground">Click "Add Expense" to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {expenses.map((expense) => {
                const Icon = categoryIcons[expense.category] || Coffee
                return (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{expense.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className={categoryColors[expense.category] || categoryColors["Entertainment"]}
                          >
                            {expense.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{formatDate(expense.date)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-semibold text-foreground">${expense.amount.toFixed(2)}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => setDeleteId(expense.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This action cannot be undone. This will permanently delete this expense.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="border-border text-foreground hover:bg-muted bg-transparent"
              disabled={isDeleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
