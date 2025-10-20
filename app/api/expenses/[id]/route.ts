import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if expense exists and belongs to user
    const existingExpense = await prisma.expense.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingExpense) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 })
    }

    if (existingExpense.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { description, category, amount, date, notes } = await req.json()

    const expense = await prisma.expense.update({
      where: {
        id: params.id,
      },
      data: {
        description,
        category,
        amount: parseFloat(amount),
        date: date ? new Date(date) : existingExpense.date,
        notes: notes || null,
      },
    })

    return NextResponse.json({ expense })
  } catch (error) {
    console.error("Update expense error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if expense exists and belongs to user
    const existingExpense = await prisma.expense.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingExpense) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 })
    }

    if (existingExpense.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await prisma.expense.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete expense error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}

