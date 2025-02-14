import type { FilterType } from "@/types/filter"

export const generateFilter = (filters: FilterType | null): string | null => {
  if (!filters) {
    return null
  }

  const filterObject: { [key: string]: any } = {}

  for (const key in filters) {
    if (filters[key as keyof FilterType] !== undefined) {
      if (Array.isArray(filters[key as keyof FilterType])) {
        filterObject[key] = filters[key as keyof FilterType]
      } else if (typeof filters[key as keyof FilterType] === "string" && filters[key as keyof FilterType].length > 0) {
        filterObject[key] = filters[key as keyof FilterType]
      } else if (typeof filters[key as keyof FilterType] === "number" && filters[key as keyof FilterType] > 0) {
        filterObject[key] = filters[key as keyof FilterType]
      }
    }
  }

  return Object.keys(filterObject).length > 0 ? JSON.stringify(filterObject) : null
}

