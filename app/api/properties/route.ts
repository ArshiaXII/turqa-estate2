import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const properties = [
  { id: 1, title: "Luxury Villa", price: 500000, location: "Antalya", status: "active" },
  { id: 2, title: "Seaside Apartment", price: 300000, location: "Bodrum", status: "active" },
  { id: 3, title: "City Center Flat", price: 200000, location: "Istanbul", status: "pending" },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (id) {
    const property = properties.find((p) => p.id === Number.parseInt(id))
    return property
      ? NextResponse.json(property)
      : NextResponse.json({ message: "Property not found" }, { status: 404 })
  }

  return NextResponse.json({ data: properties, total: properties.length })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const newProperty = { id: properties.length + 1, ...body }
  properties.push(newProperty)
  return NextResponse.json(newProperty, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const body = await request.json()
  const index = properties.findIndex((p) => p.id === body.id)
  if (index === -1) {
    return NextResponse.json({ message: "Property not found" }, { status: 404 })
  }
  properties[index] = { ...properties[index], ...body }
  return NextResponse.json(properties[index])
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 })
  }

  const index = properties.findIndex((p) => p.id === Number.parseInt(id))
  if (index === -1) {
    return NextResponse.json({ message: "Property not found" }, { status: 404 })
  }

  properties.splice(index, 1)
  return NextResponse.json({ message: "Property deleted successfully" })
}

