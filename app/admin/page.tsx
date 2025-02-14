import { RefineConfig } from "./RefineConfig"

const AdminDashboard = dynamic(() => import("@/components/admin/AdminDashboard"), { ssr: false })

export const dynamic = "force-dynamic"

export default function AdminPage() {
  return (
    <RefineConfig>
      <AdminDashboard />
    </RefineConfig>
  )
}

