"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import type React from "react" // Import React and useState

interface PropertyFiltersProps {
  filters: {
    status: string
    type: string
    minPrice: string
    maxPrice: string
    location: string
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      status: string
      type: string
      minPrice: string
      maxPrice: string
      location: string
    }>
  >
}

export function PropertyFilters({ filters, setFilters }: PropertyFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      status: "",
      type: "",
      minPrice: "",
      maxPrice: "",
      location: "",
    })
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem> {/* Changed default value */}
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem> {/* Changed default value */}
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="House">House</SelectItem>
                <SelectItem value="Villa">Villa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="minPrice">Min Price</Label>
            <Input
              type="number"
              id="minPrice"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              placeholder="Min Price"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxPrice">Max Price</Label>
            <Input
              type="number"
              id="maxPrice"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              placeholder="Max Price"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              type="text"
              id="location"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              placeholder="Search by location"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={clearFilters} variant="outline" className="mr-2">
            Clear Filters
          </Button>
          <Button onClick={() => console.log("Apply filters")}>Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  )
}

