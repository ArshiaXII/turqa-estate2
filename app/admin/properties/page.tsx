import { RefineConfig } from "../RefineConfig"

const PropertyList = dynamic(() => import("@/components/admin/PropertyList"), { ssr: false })

export const dynamic = "force-dynamic"

export default function AdminPropertiesPage() {
  return (
    <RefineConfig>
      <PropertyList />
    </RefineConfig>
  )
}

