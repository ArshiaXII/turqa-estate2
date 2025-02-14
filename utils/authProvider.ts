import type { AuthBindings } from "@refinedev/core"

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    // You should implement proper authentication here
    if (email === "admin@example.com" && password === "password") {
      localStorage.setItem("auth", JSON.stringify({ email }))
      return {
        success: true,
        redirectTo: "/admin",
      }
    }
    return {
      success: false,
      error: {
        message: "Invalid email or password",
        name: "Invalid login",
      },
    }
  },
  logout: async () => {
    localStorage.removeItem("auth")
    return {
      success: true,
      redirectTo: "/login",
    }
  },
  check: async () => {
    const auth = localStorage.getItem("auth")
    if (auth) {
      return {
        authenticated: true,
      }
    }
    return {
      authenticated: false,
      redirectTo: "/login",
    }
  },
  getPermissions: async () => ["admin"],
  getIdentity: async () => {
    const auth = localStorage.getItem("auth")
    if (auth) {
      return JSON.parse(auth)
    }
    return null
  },
}

