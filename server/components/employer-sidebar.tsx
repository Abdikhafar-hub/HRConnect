"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Plus,
  Wallet,
  User,
  Star,
  Settings,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Users,
  Briefcase,
} from "lucide-react"

export function EmployerSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/employer/dashboard", icon: Home },
    { name: "Post Job", href: "/employer/post-job", icon: Plus },
    { name: "My Jobs", href: "/employer/jobs", icon: Briefcase },
    { name: "Find Workers", href: "/employer/workers", icon: Users },
    { name: "My Wallet", href: "/employer/wallet", icon: Wallet },
    { name: "Profile", href: "/employer/profile", icon: User },
    { name: "Ratings", href: "/employer/ratings", icon: Star },
    { name: "Settings", href: "/employer/settings", icon: Settings },
  ]

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="font-bold text-gray-900">WorkConnect</span>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="p-1">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Sarah Johnson</p>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-500">4.9 • 12 jobs</span>
              </div>
            </div>
          )}
        </div>
        {!collapsed && (
          <div className="mt-3 flex items-center justify-between">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
              Hiring
            </Badge>
            <Button variant="ghost" size="sm" className="p-1">
              <Bell className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className={`w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-50 ${collapsed ? "px-2" : ""}`}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="ml-3">Sign Out</span>}
        </Button>
      </div>
    </div>
  )
}
