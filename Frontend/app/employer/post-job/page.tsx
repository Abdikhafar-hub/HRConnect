"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Calendar, DollarSign, Clock, CheckCircle, AlertCircle, Plus, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { apiClient } from "../../lib/apiClient"

export default function PostJobPage() {
  const router = useRouter()
  const { token, user } = useAuth()
  const [step, setStep] = useState(1)
  const [loadingPost, setLoadingPost] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    location: "",
    payType: "",
    payAmount: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    description: "",
    requirements: [] as string[],
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

  const requirementOptions = [
    "Must have experience",
    "Must be punctual",
    "Must be physically fit",
    "Must have own tools",
    "Must be available on weekends",
    "Must speak English",
    "Must have references",
    "Must be willing to travel",
  ]

  const handleRequirementToggle = (requirement: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.includes(requirement)
        ? prev.requirements.filter((r) => r !== requirement)
        : [...prev.requirements, requirement],
    }))
  }

  const handlePostJob = async () => {
    setLoadingPost(true)
    setError(null)
    try {
      // Check if user is authenticated and is an employer
      if (!token || !user || user.role !== 'employer') {
        setError('You must be logged in as an employer to post jobs')
        setLoadingPost(false)
        return
      }

      // Prepare job data for backend
      const jobData = {
        title: formData.title,
        description: formData.description || formData.requirements?.join(', '),
        location: formData.location,
        budget: Number(formData.payAmount),
        status: 'open',
        // Remove employer field as it will be set by the backend from the token
      }

      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.message || 'Failed to post job')
        setLoadingPost(false)
        return
      }

      // Success: redirect to dashboard
      router.push('/employer/dashboard')
    } catch (e: any) {
      setError(e.message || 'Failed to post job')
      setLoadingPost(false)
    }
    setLoadingPost(false)
  }

  const handleRequirementsChange = (value: string) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, value.trim()],
      }))
      setFormData((prev) => ({
        ...prev,
        requirementInput: "",
      }))
    }
  }

  const handleRemoveRequirement = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((req) => req !== value),
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
                    onValueChange={(value: string) => setFormData((prev) => ({ ...prev, category: value }))}
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
                      onValueChange={(value: string) => setFormData((prev) => ({ ...prev, payType: value }))}
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
                  <Label htmlFor="startTime">Start Time</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </span>
                    <Input
                      id="startTime"
                      type="time"
                      className="pl-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-200"
                      value={formData.startTime}
                      onChange={(e) => setFormData((prev) => ({ ...prev, startTime: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </span>
                    <Input
                      id="endTime"
                      type="time"
                      className="pl-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-200"
                      value={formData.endTime}
                      onChange={(e) => setFormData((prev) => ({ ...prev, endTime: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Requirements (Select all that apply)</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {requirementOptions.map((requirement) => (
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
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md py-3 text-lg"
                  onClick={() => setStep(3)}
                  disabled={!formData.startDate || !formData.startTime}
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
                  <p className="text-lg font-semibold text-gray-900">{formData.startTime} - {formData.endTime}</p>
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

          <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md py-3 text-lg" onClick={handlePostJob} disabled={loadingPost}>
            {loadingPost ? 'Posting...' : 'Post Job'}
          </Button>
          {error && <div className="text-red-600 text-center mt-2">{error}</div>}
        </div>
      </div>
    </div>
  )
}
