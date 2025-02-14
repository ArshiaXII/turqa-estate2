import type React from "react"
import { useGetIdentity } from "@refinedev/core"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export const Header: React.FC = () => {
  const { data: user } = useGetIdentity<{ name: string; avatar: string }>()

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-800">TurqaEstate Admin</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">{user?.name}</span>
        <Avatar>
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <Button variant="outline">Logout</Button>
      </div>
    </header>
  )
}

