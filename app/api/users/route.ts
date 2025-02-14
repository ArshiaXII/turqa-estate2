import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (id) {
    const user = users.find((u) => u.id === Number.parseInt(id))
    return user ? NextResponse.json(user) : NextResponse.json({ message: "User not found" }, { status: 404 })
  }

  return NextResponse.json({ data: users, total: users.length })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const newUser = { id: users.length + 1, ...body }
  users.push(newUser)
  return NextResponse.json(newUser, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const body = await request.json()
  const index = users.findIndex((u) => u.id === body.id)
  if (index === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }
  users[index] = { ...users[index], ...body }
  return NextResponse.json(users[index])
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 })
  }

  const index = users.findIndex((u) => u.id === Number.parseInt(id))
  if (index === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }

  users.splice(index, 1)
  return NextResponse.json({ message: "User deleted successfully" })
}

