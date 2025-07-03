"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, MapPin, DollarSign, Clock, Calendar } from "lucide-react"

export default function PostJobPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    location: "",
    payType: "",
    payAmount: "",
    startDate: "",
    endDate: "",
    workHours: "",
    requirements: [] as string[],
    preferredLanguage: "",
    preferredGender: "",
    description: "",
  })

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

  const requirements = [
    "Must have ID",
    "Previous experience required",
    "Must speak English",
    "Must speak Swahili",
    "Must have references",
    "Must be punctual",
    "Must have own transport",
    "Must be physically fit",
  ]

  const handleRequirementToggle = (requirement: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.includes(requirement)
        ? prev.requirements.filter((r) => r !== requirement)
        : [...prev.requirements, requirement],
    }))
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="flex items-center justify-between px-0 md:px-8 py-6 bg-white/90 shadow-sm border-b">
          <div className="container mx-auto flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => router.back()} className="rounded-full bg-green-50 hover:bg-green-100 text-green-700 font-semibold shadow-none">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 ml-2">Post a New Job</h1>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl rounded-2xl border-l-4 border-l-green-500 bg-white/80 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Job Details</CardTitle>
                <CardDescription className="text-gray-600">Tell us about the job you need help with</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-2">
                  <Label htmlFor="category">Job Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="rounded-lg border-gray-300 focus:ring-2 focus:ring-green-200">
                      <SelectValue placeholder="Select job category" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobCategories.map((category) => (
                        <SelectItem key={category} value={category} className="rounded-md">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Weekly house cleaning"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    className="rounded-lg border-gray-300 focus:ring-2 focus:ring-green-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </span>
                    <Input
                      id="location"
                      placeholder="Enter your address or area"
                      className="pl-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-green-200"
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="payType">Payment Type</Label>
                    <Select
                      value={formData.payType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, payType: value }))}
                    >
                      <SelectTrigger className="rounded-lg border-gray-300 focus:ring-2 focus:ring-green-200">
                        <SelectValue placeholder="Select payment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Per Hour</SelectItem>
                        <SelectItem value="daily">Per Day</SelectItem>
                        <SelectItem value="weekly">Per Week</SelectItem>
                        <SelectItem value="monthly">Per Month</SelectItem>
                        <SelectItem value="fixed">Fixed Price</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payAmount">Amount (KSh)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-green-600" />
                      </span>
                      <Input
                        id="payAmount"
                        type="number"
                        placeholder="2500"
                        className="pl-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-green-200"
                        value={formData.payAmount}
                        onChange={(e) => setFormData((prev) => ({ ...prev, payAmount: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md py-3 text-lg"
                  onClick={() => setStep(2)}
                  disabled={
                    !formData.category ||
                    !formData.title ||
                    !formData.location ||
                    !formData.payType ||
                    !formData.payAmount
                  }
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

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="flex items-center justify-between px-0 md:px-8 py-6 bg-white/90 shadow-sm border-b">
          <div className="container mx-auto flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => setStep(1)} className="rounded-full bg-green-50 hover:bg-green-100 text-green-700 font-semibold shadow-none">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 ml-2">Schedule & Requirements</h1>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl rounded-2xl border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">When do you need this work done?</CardTitle>
                <CardDescription className="text-gray-600">Set your schedule and requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </span>
                      <Input
                        id="startDate"
                        type="date"
                        className="pl-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-200"
                        value={formData.startDate}
                        onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date (Optional)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </span>
                      <Input
                        id="endDate"
                        type="date"
                        className="pl-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-200"
                        value={formData.endDate}
                        onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workHours">Work Hours</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </span>
                    <Input
                      id="workHours"
                      placeholder="e.g., 9:00 AM - 5:00 PM"
                      className="pl-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-200"
                      value={formData.workHours}
                      onChange={(e) => setFormData((prev) => ({ ...prev, workHours: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Requirements (Select all that apply)</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {requirements.map((requirement) => (
                      <div key={requirement} className="flex items-center space-x-2">
                        <Checkbox
                          id={requirement}
                          checked={formData.requirements.includes(requirement)}
                          onCheckedChange={() => handleRequirementToggle(requirement)}
                          className="rounded-md border-blue-300 focus:ring-2 focus:ring-blue-200"
                        />
                        <Label htmlFor={requirement} className="text-sm">
                          {requirement}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="preferredLanguage">Preferred Language</Label>
                    <Select
                      value={formData.preferredLanguage}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, preferredLanguage: value }))}
                    >
                      <SelectTrigger className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-200">
                        <SelectValue placeholder="Any language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Language</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="sw">Kiswahili</SelectItem>
                        <SelectItem value="ha">Hausa</SelectItem>
                        <SelectItem value="am">Amharic</SelectItem>
                        <SelectItem value="ar">Arabic</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredGender">Preferred Gender</Label>
                    <Select
                      value={formData.preferredGender}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, preferredGender: value }))}
                    >
                      <SelectTrigger className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-200">
                        <SelectValue placeholder="No preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">No Preference</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md py-3 text-lg"
                  onClick={() => setStep(3)}
                  disabled={!formData.startDate || !formData.workHours}
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

  // Step 3 - Review and Post
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-0 md:px-8 py-6 bg-white/90 shadow-sm border-b">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => setStep(2)} className="rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold shadow-none">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 ml-2">Review & Post Job</h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto space-y-8">
          <Card className="shadow-xl rounded-2xl border-l-4 border-l-purple-500 bg-white/80 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Job Summary</CardTitle>
              <CardDescription className="text-gray-600">Review your job details before posting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Category</Label>
                  <p className="text-lg font-semibold text-gray-900">{formData.category}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Title</Label>
                  <p className="text-lg font-semibold text-gray-900">{formData.title}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Location</Label>
                  <p className="text-lg font-semibold text-gray-900">{formData.location}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Payment</Label>
                  <p className="text-lg font-semibold text-gray-900">
                    KSh {formData.payAmount} {formData.payType}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Start Date</Label>
                  <p className="text-lg font-semibold text-gray-900">{formData.startDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Work Hours</Label>
                  <p className="text-lg font-semibold text-gray-900">{formData.workHours}</p>
                </div>
              </div>

              {formData.requirements.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Requirements</Label>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    {formData.requirements.map((req) => (
                      <li key={req} className="text-sm text-gray-800">
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-xl rounded-2xl border-l-4 border-l-green-500 bg-white/80 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Estimated Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Job Payment</span>
                  <span>KSh {formData.payAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee (5%)</span>
                  <span>KSh {Math.round(Number.parseInt(formData.payAmount) * 0.05)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total Cost</span>
                  <span>
                    KSh {Number(formData.payAmount) + Math.round(Number.parseInt(formData.payAmount) * 0.05)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md py-3 text-lg">
            Post Job
          </Button>
        </div>
      </div>
    </div>
  )
}
