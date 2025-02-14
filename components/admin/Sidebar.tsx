import type React from "react"
import Link from "next/link"
import { useMenu } from "@refinedev/core"
import { Home, Users, MessageSquare, Settings } from "lucide-react"

export const Sidebar: React.FC = () => {
  const { menuItems } = useMenu()

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.key}
            href={item.route ?? ""}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {item.key === "properties" && <Home className="w-5 h-5" />}
            {item.key === "users" && <Users className="w-5 h-5" />}
            {item.key === "inquiries" && <MessageSquare className="w-5 h-5" />}
            <span>{item.label}</span>
          </Link>
        ))}
        <Link
          href="/admin/settings"
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  )
}

