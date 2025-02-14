"use client"

import type React from "react"
import { Refine } from "@refinedev/core"
import { RefineKbarProvider } from "@refinedev/kbar"
import { notificationProvider, Layout } from "@refinedev/antd"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import "@refinedev/antd/dist/reset.css"
import routerProvider from "@refinedev/nextjs-router/app"
import dataProvider from "@refinedev/simple-rest"
import { authProvider } from "@/utils/authProvider"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <RefineKbarProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          notificationProvider={notificationProvider}
          authProvider={authProvider}
          resources={[
            {
              name: "properties",
              list: "/admin/properties",
              create: "/admin/properties/create",
              edit: "/admin/properties/edit/:id",
              show: "/admin/properties/show/:id",
            },
            {
              name: "users",
              list: "/admin/users",
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Layout>{children}</Layout>
        </Refine>
      </RefineKbarProvider>
    </AntdRegistry>
  )
}

