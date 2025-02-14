"use client"

import type React from "react"
import { useState } from "react"
import {
  CContainer,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CNavItem,
  CNavTitle,
  CHeader,
  CHeaderToggler,
  CHeaderBrand,
  CHeaderNav,
  CNavLink,
} from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilMenu } from "@coreui/icons"
import "@coreui/coreui/dist/css/coreui.min.css"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarShow, setSidebarShow] = useState(true)

  return (
    <div className="admin-layout">
      <CSidebar
        position="fixed"
        visible={sidebarShow}
        onVisibleChange={(visible) => {
          setSidebarShow(visible)
        }}
      >
        <CSidebarBrand>TurqaEstate Admin</CSidebarBrand>
        <CSidebarNav>
          <CNavTitle>Navigation</CNavTitle>
          <CNavItem href="/admin">Dashboard</CNavItem>
          <CNavItem href="/admin/properties">Properties</CNavItem>
          <CNavItem href="/admin/users">Users</CNavItem>
          <CNavItem href="/admin/settings">Settings</CNavItem>
        </CSidebarNav>
      </CSidebar>

      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <CHeader position="sticky" className="mb-4">
          <CContainer fluid>
            <CHeaderToggler className="ps-1" onClick={() => setSidebarShow(!sidebarShow)}>
              <CIcon icon={cilMenu} size="lg" />
            </CHeaderToggler>
            <CHeaderBrand className="mx-auto d-md-none" to="/">
              TurqaEstate
            </CHeaderBrand>
            <CHeaderNav className="d-none d-md-flex me-auto">
              <CNavLink href="/admin" active>
                Dashboard
              </CNavLink>
              <CNavLink href="/admin/properties">Properties</CNavLink>
              <CNavLink href="/admin/users">Users</CNavLink>
            </CHeaderNav>
          </CContainer>
        </CHeader>

        <CContainer fluid>{children}</CContainer>
      </div>
    </div>
  )
}

