"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Coffee, Car, ShoppingBag, Film, Home, Utensils, Plane, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AddExpenseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onExpenseAdded?: () => void
}

const categories = [
  { value: "Food & Dining", label: "Food & Dining", icon: Coffee },
  { value: "Transportation", label: "Transportation", icon: Car },
  { value: "Shopping", label: "Shopping", icon: ShoppingBag },
  { value: "Entertainment", label: "Entertainment", icon: Film },
  { value: "Bills & Utilities", label: "Bills & Utilities", icon: Home },
  { value: "Groceries", label: "Groceries", icon: Utensils },
  { value: "Travel", label: "Travel", icon: Plane },
  { value: "Healthcare", label: "Healthcare", icon: Heart },
]

export function AddExpenseModal({ open, onOpenChange, onExpenseAdded }: AddExpenseModalProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.error || "Failed to add expense",
        })
        return
      }

      toast({
        title: "Success",
        description: "Expense added successfully",
      })

      // Reset form
      setFormData({
        description: "",
        category: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        notes: "",
      })

      onOpenChange(false)
      onExpenseAdded?.()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add New Expense</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter the details of your expense below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Description
            </Label>
            <Input
              id="description"
              placeholder="e.g., Lunch at restaurant"
              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-foreground">
              Category
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              required
              disabled={isLoading}
            >
              <SelectTrigger className="bg-background border-border text-foreground">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {categories.map((category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value}
                    className="text-foreground hover:bg-muted cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <category.icon className="h-4 w-4 text-primary" />
                      {category.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-foreground">
                Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="pl-7 bg-background border-border text-foreground placeholder:text-muted-foreground"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-foreground">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                className="bg-background border-border text-foreground"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-foreground">
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Add any additional details..."
              className="bg-background border-border text-foreground placeholder:text-muted-foreground resize-none"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-border text-foreground hover:bg-muted bg-transparent"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Expense"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
