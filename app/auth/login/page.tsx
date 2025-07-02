"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Users, Briefcase, Phone, Globe, ArrowRight, Shield, Zap, CheckCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, loading, error, clearError } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitError, setSubmitError] = useState<string | null>(null)
  
  const showSuccessMessage = searchParams.get("success") === "registered"

  const languages = [
    { value: "en", label: "English" },
    { value: "sw", label: "Kiswahili" },
    { value: "ha", label: "Hausa" },
    { value: "am", label: "አማርኛ (Amharic)" },
    { value: "ar", label: "العربية (Arabic)" },
    { value: "fr", label: "Français" },
  ]

  const handleLogin = async () => {
    setSubmitError(null)
    clearError()
    try {
      const response = await login({ email, password })
      if (response.user.role === "user") {
        router.push("/worker/dashboard")
      } else if (response.user.role === "employer") {
        router.push("/employer/dashboard")
      } else if (response.user.role === "admin") {
        router.push("/admin/dashboard")
      }
    } catch (err: any) {
      setSubmitError(err.message || "Login failed")
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
            {/* Success Message */}
            {showSuccessMessage && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-green-800 font-medium">Account Created Successfully!</p>
                    <p className="text-green-600 text-sm">Please sign in with your credentials to continue.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Email and Password */}
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</Label>
              <Input id="email" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20" />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
              <Input id="password" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20" />
            </div>

            {/* Sign In Button */}
            <Button
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 transition-all duration-200"
              onClick={handleLogin}
              disabled={!email || !password || loading}
            >
              <span className="flex items-center gap-2">
                {loading ? "Signing In..." : "Sign In"}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>

            {submitError && <div className="text-red-600 text-sm text-center mt-2">{submitError}</div>}
            {error && <div className="text-red-600 text-sm text-center mt-2">{error}</div>}

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
