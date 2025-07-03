import type React from "react"
import { WorkerSidebar } from "@/components/worker-sidebar"

export default function WorkerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <WorkerSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
