"use client"

import type React from "react"
import { Refine } from "@refinedev/core"
import { RefineKbarProvider } from "@refinedev/kbar"
import { notificationProvider, Layout } from "@refinedev/antd"
import routerProvider from "@refinedev/nextjs-router/app"
import dataProvider from "@refinedev/simple-rest"
import { authProvider } from "@/utils/authProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

const queryClient = new QueryClient()

export function RefineConfig({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

