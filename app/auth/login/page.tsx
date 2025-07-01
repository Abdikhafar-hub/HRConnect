"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Users, Briefcase, Phone, Globe, ArrowRight, Shield, Zap } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [language, setLanguage] = useState("")
  const [role, setRole] = useState("")

  const languages = [
    { value: "en", label: "English" },
    { value: "sw", label: "Kiswahili" },
    { value: "ha", label: "Hausa" },
    { value: "am", label: "አማርኛ (Amharic)" },
    { value: "ar", label: "العربية (Arabic)" },
    { value: "fr", label: "Français" },
  ]

  const handleLogin = () => {
    // Demo login - redirect based on role
    if (role === "worker") {
      router.push("/worker/dashboard")
    } else if (role === "employer") {
      router.push("/employer/dashboard")
    } else if (role === "admin") {
      router.push("/admin/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            WorkConnect
          </h1>
          <p className="text-gray-600 mt-2">Welcome back to Africa's job platform</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-blue-500/10">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">Sign In</CardTitle>
            <CardDescription className="text-gray-600">Access your WorkConnect account</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">Choose your role</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={role === "worker" ? "default" : "outline"}
                  className={`h-20 flex flex-col transition-all duration-200 ${
                    role === "worker"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25"
                      : "hover:bg-blue-50 hover:border-blue-200"
                  }`}
                  onClick={() => setRole("worker")}
                >
                  <Users className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Worker</span>
                  <span className="text-xs opacity-75">Find Jobs</span>
                </Button>
                <Button
                  variant={role === "employer" ? "default" : "outline"}
                  className={`h-20 flex flex-col transition-all duration-200 ${
                    role === "employer"
                      ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-500/25"
                      : "hover:bg-purple-50 hover:border-purple-200"
                  }`}
                  onClick={() => setRole("employer")}
                >
                  <Briefcase className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Employer</span>
                  <span className="text-xs opacity-75">Hire Workers</span>
                </Button>
              </div>
            </div>

            {/* Language Selection */}
            <div className="space-y-3">
              <Label htmlFor="language" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Language / Lugha
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20">
                  <SelectValue placeholder="Select your preferred language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value} className="py-3">
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Phone Number */}
            <div className="space-y-3">
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+254 700 000 000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>

            {/* Sign In Button */}
            <Button
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 transition-all duration-200"
              onClick={handleLogin}
              disabled={!phone || !language || !role}
            >
              <span className="flex items-center gap-2">
                Sign In
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Create Account
                </Link>
              </p>
            </div>

            {/* Demo Section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-center mb-4">
                <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                  <Zap className="w-3 h-3 mr-1" />
                  Quick Demo Access
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-10 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 bg-transparent"
                  onClick={() => router.push("/worker/dashboard")}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Demo Worker
                </Button>
                <Button
                  variant="outline"
                  className="h-10 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 bg-transparent"
                  onClick={() => router.push("/employer/dashboard")}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Demo Employer
                </Button>
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center text-xs text-gray-500">
              <Shield className="w-3 h-3 mr-1" />
              Secured with end-to-end encryption
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}
