import type { DataProvider } from "@refinedev/core"
import { generateFilter } from "./generateFilter"
import queryString from "query-string"

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters }) => {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/${resource}`)

    if (pagination) {
      url.searchParams.append("_start", String((pagination.current - 1) * pagination.pageSize))
      url.searchParams.append("_end", String(pagination.current * pagination.pageSize))
    }

    if (sorters && sorters.length > 0) {
      url.searchParams.append("_sort", sorters[0].field)
      url.searchParams.append("_order", sorters[0].order)
    }

    if (filters) {
      const filter = generateFilter(filters)
      if (filter) {
        url.searchParams.append("q", JSON.stringify(filter))
      }
    }

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error("Something went wrong")
    }

    const data = await response.json()
    const total = Number(response.headers.get("X-Total-Count")) || data.length

    return {
      data,
      total,
    }
  },

  getOne: async ({ resource, id }) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${resource}/${id}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("Something went wrong")
    }

    const data = await response.json()

    return {
      data,
    }
  },

  create: async ({ resource, variables }) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${resource}`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variables),
    })

    if (!response.ok) {
      throw new Error("Something went wrong")
    }

    const data = await response.json()

    return {
      data,
    }
  },

  update: async ({ resource, id, variables }) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${resource}/${id}`
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variables),
    })

    if (!response.ok) {
      throw new Error("Something went wrong")
    }

    const data = await response.json()

    return {
      data,
    }
  },

  deleteOne: async ({ resource, id }) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${resource}/${id}`
    const response = await fetch(url, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Something went wrong")
    }

    return {
      data: null,
    }
  },

  getMany: async ({ resource, ids }) => {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/${resource}`)
    url.searchParams.append("id", ids.join(","))

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error("Something went wrong")
    }

    const data = await response.json()

    return {
      data,
    }
  },

  custom: async ({ url, method, filters, sorters, payload, query, headers }) => {
    let requestUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`

    if (query) {
      requestUrl = `${requestUrl}?${queryString.stringify(query)}`
    }

    if (filters) {
      const filter = generateFilter(filters)
      if (filter) {
        requestUrl = `${requestUrl}&q=${JSON.stringify(filter)}`
      }
    }

    if (sorters && sorters.length > 0) {
      const sort = sorters[0].field
      const order = sorters[0].order

      requestUrl = `${requestUrl}&_sort=${sort}&_order=${order}`
    }

    const response = await fetch(requestUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...(payload && { body: JSON.stringify(payload) }),
    })

    if (!response.ok) {
      throw new Error("Something went wrong")
    }

    const data = await response.json()

    return { data }
  },
}

