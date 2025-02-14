import { RefineConfig } from "../RefineConfig"

const UserList = dynamic(() => import("@/components/admin/UserList"), { ssr: false })

export const dynamic = "force-dynamic"

export default function AdminUsersPage() {
  return (
    <RefineConfig>
      <UserList />
    </RefineConfig>
  )
}

