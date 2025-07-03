import type React from "react"
import { EmployerSidebar } from "@/components/employer-sidebar"

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <EmployerSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
