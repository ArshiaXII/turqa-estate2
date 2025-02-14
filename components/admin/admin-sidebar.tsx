"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Building, Users, MessageSquare, FileText, BarChart2, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/admin" },
  { icon: Building, label: "Properties", href: "/admin/properties" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: MessageSquare, label: "Inquiries", href: "/admin/inquiries" },
  { icon: FileText, label: "Content", href: "/admin/content" },
  { icon: BarChart2, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

interface AdminSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function AdminSidebar({ open, setOpen }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <>
      <div
        className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${open ? "block" : "hidden"}`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r border-gray-200 lg:translate-x-0 lg:static lg:inset-0 ${
          open ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between flex-shrink-0 p-4">
          <span className="text-xl font-semibold">TurqaEstate</span>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="lg:hidden">
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-5 space-y-2 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2 transition-colors duration-200 rounded-lg ${
                pathname === item.href
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

