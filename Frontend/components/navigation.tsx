"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, Briefcase, User, Wallet, Star, Settings, Menu, Bell, Plus } from "lucide-react"

interface NavigationProps {
  userType: "worker" | "employer" | "admin"
}

export function Navigation({ userType }: NavigationProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const getNavItems = () => {
    switch (userType) {
      case "worker":
        return [
          { href: "/worker/dashboard", label: "Dashboard", icon: Home },
          { href: "/worker/jobs", label: "Find Jobs", icon: Briefcase },
          { href: "/worker/wallet", label: "Wallet", icon: Wallet },
          { href: "/worker/profile", label: "Profile", icon: User },
          { href: "/worker/ratings", label: "Ratings", icon: Star },
        ]
      case "employer":
        return [
          { href: "/employer/dashboard", label: "Dashboard", icon: Home },
          { href: "/employer/post-job", label: "Post Job", icon: Plus },
          { href: "/employer/wallet", label: "Wallet", icon: Wallet },
          { href: "/employer/profile", label: "Profile", icon: User },
          { href: "/employer/ratings", label: "Ratings", icon: Star },
        ]
      case "admin":
        return [
          { href: "/admin/dashboard", label: "Dashboard", icon: Home },
          { href: "/admin/users", label: "Users", icon: User },
          { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
          { href: "/admin/disputes", label: "Disputes", icon: Settings },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  const NavContent = () => (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Link key={item.href} href={item.href}>
            <Button
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setIsOpen(false)}
            >
              <Icon className="w-4 h-4 mr-3" />
              {item.label}
            </Button>
          </Link>
        )
      })}
      <div className="pt-4 border-t">
        <Link href="/settings">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </Button>
        </Link>
      </div>
    </nav>
  )

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <div className="py-4">
              <NavContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-white border-r min-h-screen">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">WorkConnect</span>
          </div>
          <NavContent />
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button variant={isActive ? "default" : "ghost"} size="sm" className="flex flex-col h-12 w-full">
                  <Icon className="w-4 h-4" />
                  <span className="text-xs mt-1">{item.label}</span>
                </Button>
              </Link>
            )
          })}
          <Button variant="ghost" size="sm" className="flex flex-col h-12 w-full">
            <Bell className="w-4 h-4" />
            <span className="text-xs mt-1">Alerts</span>
          </Button>
        </div>
      </div>
    </>
  )
}
