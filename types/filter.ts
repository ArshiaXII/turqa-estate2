export type FilterType = {
  propertyType?: string
  location?: string
  bedrooms?: string | number
  bathrooms?: string | number
  area?: string | number
  amenities?: string[]
  priceRange?: [number, number]
  sortBy?: string
}

