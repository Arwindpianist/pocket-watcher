import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
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

    const expenses = await prisma.expense.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        date: "desc",
      },
    })

    return NextResponse.json({ expenses })
  } catch (error) {
    console.error("Get expenses error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
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

    const { description, category, amount, date, notes } = await req.json()

    // Validate required fields
    if (!description || !category || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const expense = await prisma.expense.create({
      data: {
        userId: user.id,
        description,
        category,
        amount: parseFloat(amount),
        date: date ? new Date(date) : new Date(),
        notes: notes || null,
      },
    })

    return NextResponse.json({ expense }, { status: 201 })
  } catch (error) {
    console.error("Create expense error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}

