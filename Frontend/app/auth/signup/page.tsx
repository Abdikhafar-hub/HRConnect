"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Briefcase,
  ArrowLeft,
  CheckCircle,
  Phone,
  User,
  MapPin,
  Globe,
  Wrench,
  Calendar,
  Shield,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function SignUpPage() {
  const searchParams = useSearchParams()
  const initialRole = searchParams.get("role") || ""
  const router = useRouter()
  const { register, loading, error, clearError } = useAuth()

  const [step, setStep] = useState(1)
  const [role, setRole] = useState(initialRole)
  const [formData, setFormData] = useState({
    phone: "",
    language: "",
    location: "",
    name: "",
    skills: [] as string[],
    availability: [] as string[],
  })
  const [account, setAccount] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  })
  const [submitError, setSubmitError] = useState<string | null>(null)

  const languages = [
    { value: "en", label: "English" },
    { value: "sw", label: "Kiswahili" },
    { value: "ha", label: "Hausa" },
    { value: "am", label: "አማርኛ (Amharic)" },
    { value: "ar", label: "العربية (Arabic)" },
    { value: "fr", label: "Français" },
  ]

  const jobCategories = [
    "House Cleaning",
    "Construction Helper",
    "Boda Boda Rider",
    "Security Guard",
    "Farm Worker",
    "Delivery Person",
    "Gardener",
    "Mechanic Helper",
    "Cook/Chef",
    "Nanny/Childcare",
  ]

  const availabilityOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const handleAvailabilityToggle = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter((d) => d !== day)
        : [...prev.availability, day],
    }))
  }

  const handleSignup = async () => {
    setSubmitError(null);
    clearError();
    try {
      await register({
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        password: account.password,
        role: role === "worker" ? "user" : "employer",
        phone: formData.phone,
        location: formData.location,
      });
      // Redirect to login page instead of dashboard
      router.push("/auth/login?success=registered");
    } catch (err: any) {
      setSubmitError(err.message || "Registration failed");
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  WorkConnect
                </span>
              </div>
              <Badge variant="secondary" className="mb-4">
                <Shield className="w-3 h-3 mr-1" />
                Secure Registration
              </Badge>
            </div>

            <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-2xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Choose Your Role
                </CardTitle>
                <CardDescription className="text-gray-600">How do you want to use WorkConnect?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant={role === "worker" ? "default" : "outline"}
                  className={`w-full h-20 text-left transition-all duration-300 ${
                    role === "worker"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
                      : "hover:bg-blue-50 hover:border-blue-200"
                  }`}
                  onClick={() => setRole("worker")}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        role === "worker" ? "bg-white/20" : "bg-blue-100"
                      }`}
                    >
                      <Users className={`w-6 h-6 ${role === "worker" ? "text-white" : "text-blue-600"}`} />
                    </div>
                    <div>
                      <div className={`font-semibold ${role === "worker" ? "text-white" : "text-gray-900"}`}>
                        I&apos;m a Worker
                      </div>
                      <div className={`text-sm ${role === "worker" ? "text-blue-100" : "text-gray-500"}`}>
                        Looking for job opportunities
                      </div>
                    </div>
                  </div>
                </Button>

                <Button
                  variant={role === "employer" ? "default" : "outline"}
                  className={`w-full h-20 text-left transition-all duration-300 ${
                    role === "employer"
                      ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
                      : "hover:bg-green-50 hover:border-green-200"
                  }`}
                  onClick={() => setRole("employer")}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        role === "employer" ? "bg-white/20" : "bg-green-100"
                      }`}
                    >
                      <Briefcase className={`w-6 h-6 ${role === "employer" ? "text-white" : "text-green-600"}`} />
                    </div>
                    <div>
                      <div className={`font-semibold ${role === "employer" ? "text-white" : "text-gray-900"}`}>
                        I&apos;m an Employer
                      </div>
                      <div className={`text-sm ${role === "employer" ? "text-green-100" : "text-gray-500"}`}>
                        Need to hire workers
                      </div>
                    </div>
                  </div>
                </Button>

                <Button
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all duration-300"
                  disabled={!role}
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>

                <div className="text-center text-sm text-gray-600 pt-4">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                    Sign in
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-2xl">
              <CardHeader className="pb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-fit -ml-2 hover:bg-gray-100/50"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      Basic Information
                    </CardTitle>
                    <CardDescription className="text-gray-600">Let&apos;s set up your account</CardDescription>
                  </div>
                  <Badge variant="secondary">Step 2 of {role === "worker" ? "4" : "3"}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+254 700 000 000"
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language" className="text-sm font-medium text-gray-700">
                    Preferred Language
                  </Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-400 z-10" />
                    <Select
                      value={formData.language}
                      onValueChange={(value: string) => setFormData((prev) => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select your language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                    Location
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="location"
                      placeholder="City, Area"
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
                  <Input id="firstName" placeholder="First Name" value={account.firstName} onChange={e => setAccount(a => ({ ...a, firstName: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
                  <Input id="lastName" placeholder="Last Name" value={account.lastName} onChange={e => setAccount(a => ({ ...a, lastName: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                  <Input id="email" type="email" placeholder="you@email.com" value={account.email} onChange={e => setAccount(a => ({ ...a, email: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                  <Input id="password" type="password" placeholder="Password" value={account.password} onChange={e => setAccount(a => ({ ...a, password: e.target.value }))} />
                </div>

                <Button
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all duration-300"
                  onClick={() => setStep(3)}
                  disabled={!formData.phone || !formData.name || !formData.language || !formData.location || !account.email || !account.password || !account.firstName || !account.lastName}
                >
                  Continue
                </Button>
                {submitError && <div className="text-red-600 text-sm text-center mt-2">{submitError}</div>}
                {error && <div className="text-red-600 text-sm text-center mt-2">{error}</div>}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (step === 3 && role === "worker") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-2xl">
              <CardHeader className="pb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-fit -ml-2 hover:bg-gray-100/50"
                  onClick={() => setStep(2)}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      Your Skills
                    </CardTitle>
                    <CardDescription className="text-gray-600">Select the types of work you can do</CardDescription>
                  </div>
                  <Badge variant="secondary">Step 3 of 4</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Wrench className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-blue-700 font-medium">Select all skills that apply to you</span>
                </div>

                <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                  {jobCategories.map((category) => (
                    <div
                      key={category}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                        formData.skills.includes(category)
                          ? "bg-blue-50 border-blue-200 shadow-sm"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => handleSkillToggle(category)}
                    >
                      <Checkbox
                        id={category}
                        checked={formData.skills.includes(category)}
                        onCheckedChange={() => handleSkillToggle(category)}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <Label htmlFor={category} className="text-sm font-medium cursor-pointer flex-1">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="text-center text-sm text-gray-500">
                  {formData.skills.length} skill{formData.skills.length !== 1 ? "s" : ""} selected
                </div>

                <Button
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all duration-300"
                  onClick={() => setStep(4)}
                  disabled={formData.skills.length === 0}
                >
                  Continue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (step === 4 && role === "worker") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-2xl">
              <CardHeader className="pb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-fit -ml-2 hover:bg-gray-100/50"
                  onClick={() => setStep(3)}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      Availability
                    </CardTitle>
                    <CardDescription className="text-gray-600">Which days are you available to work?</CardDescription>
                  </div>
                  <Badge variant="secondary">Step 4 of 4</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">Select your available days</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {availabilityOptions.map((day) => (
                    <div
                      key={day}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                        formData.availability.includes(day)
                          ? "bg-green-50 border-green-200 shadow-sm"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => handleAvailabilityToggle(day)}
                    >
                      <Checkbox
                        id={day}
                        checked={formData.availability.includes(day)}
                        onCheckedChange={() => handleAvailabilityToggle(day)}
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                      <Label htmlFor={day} className="text-sm font-medium cursor-pointer flex-1">
                        {day}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="text-center text-sm text-gray-500">
                  {formData.availability.length} day{formData.availability.length !== 1 ? "s" : ""} selected
                </div>

                <Button
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all duration-300"
                  onClick={handleSignup}
                  disabled={formData.availability.length === 0 || loading}
                >
                  {loading ? "Creating Account..." : "Complete Registration"}
                </Button>
                {submitError && <div className="text-red-600 text-sm text-center mt-2">{submitError}</div>}
                {error && <div className="text-red-600 text-sm text-center mt-2">{error}</div>}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (step === 3 && role === "employer") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-2xl">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Ready to Create Account!
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg">Complete your registration as an employer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-green-800 font-medium">Review your information:</p>
                      <p className="text-green-600 text-sm mt-1">
                        Name: {account.firstName} {account.lastName}<br/>
                        Email: {account.email}<br/>
                        Phone: {formData.phone}<br/>
                        Location: {formData.location}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg transition-all duration-300"
                  onClick={handleSignup}
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
                {submitError && <div className="text-red-600 text-sm text-center mt-2">{submitError}</div>}
                {error && <div className="text-red-600 text-sm text-center mt-2">{error}</div>}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Final step - Complete signup
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Account Created!
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">Welcome to WorkConnect</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-4">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-green-800 font-medium">Your account has been created successfully!</p>
                    <p className="text-green-600 text-sm mt-1">
                      Please sign in to start {role === "worker" ? "finding jobs" : "hiring workers"} on WorkConnect.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{formData.skills.length || "0"}</div>
                      <div className="text-xs text-blue-600">Skills Added</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{formData.availability.length || "0"}</div>
                      <div className="text-xs text-purple-600">Days Available</div>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg transition-all duration-300"
                onClick={() => {
                  router.push("/auth/login?success=registered")
                }}
              >
                Sign In to Continue
              </Button>

              <div className="text-center text-sm text-gray-500">You can update your profile anytime in settings</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
