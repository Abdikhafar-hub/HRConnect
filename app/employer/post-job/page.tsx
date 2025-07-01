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
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" onClick={() => router.back()} className="mb-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">Post a New Job</h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>Tell us about the job you need help with</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Job Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select job category" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobCategories.map((category) => (
                        <SelectItem key={category} value={category}>
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
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="location"
                      placeholder="Enter your address or area"
                      className="pl-10"
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="payType">Payment Type</Label>
                    <Select
                      value={formData.payType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, payType: value }))}
                    >
                      <SelectTrigger>
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
                      <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="payAmount"
                        type="number"
                        placeholder="2500"
                        className="pl-10"
                        value={formData.payAmount}
                        onChange={(e) => setFormData((prev) => ({ ...prev, payAmount: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full"
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
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" onClick={() => setStep(1)} className="mb-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Schedule & Requirements</h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>When do you need this work done?</CardTitle>
                <CardDescription>Set your schedule and requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="startDate"
                        type="date"
                        className="pl-10"
                        value={formData.startDate}
                        onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date (Optional)</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="endDate"
                        type="date"
                        className="pl-10"
                        value={formData.endDate}
                        onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workHours">Work Hours</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="workHours"
                      placeholder="e.g., 9:00 AM - 5:00 PM"
                      className="pl-10"
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
                        />
                        <Label htmlFor={requirement} className="text-sm">
                          {requirement}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preferredLanguage">Preferred Language</Label>
                    <Select
                      value={formData.preferredLanguage}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, preferredLanguage: value }))}
                    >
                      <SelectTrigger>
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
                      <SelectTrigger>
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
                  className="w-full"
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
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => setStep(2)} className="mb-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Review & Post Job</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Summary</CardTitle>
              <CardDescription>Review your job details before posting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Category</Label>
                  <p className="text-lg">{formData.category}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Title</Label>
                  <p className="text-lg">{formData.title}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Location</Label>
                  <p className="text-lg">{formData.location}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Payment</Label>
                  <p className="text-lg">
                    KSh {formData.payAmount} {formData.payType}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Start Date</Label>
                  <p className="text-lg">{formData.startDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Work Hours</Label>
                  <p className="text-lg">{formData.workHours}</p>
                </div>
              </div>

              {formData.requirements.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Requirements</Label>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    {formData.requirements.map((req) => (
                      <li key={req} className="text-sm">
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estimated Cost</CardTitle>
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
                    KSh {Number.parseInt(formData.payAmount) + Math.round(Number.parseInt(formData.payAmount) * 0.05)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-4">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(2)}>
              Edit Job
            </Button>
            <Button className="flex-1" onClick={() => router.push("/employer/dashboard")}>
              Post Job
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
