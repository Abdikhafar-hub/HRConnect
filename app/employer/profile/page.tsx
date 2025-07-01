"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star, Shield, Camera, Edit, CheckCircle, Clock, Building, CreditCard } from "lucide-react"

export default function EmployerProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    phone: "+254 711 987 654",
    email: "sarah.johnson@email.com",
    location: "Westlands, Nairobi",
    bio: "Homeowner looking for reliable domestic help. I value punctuality, quality work, and good communication.",
    companyName: "",
    businessType: "individual",
    preferredLanguages: ["English", "Kiswahili"],
    paymentMethods: ["M-Pesa", "Bank Transfer"],
  })

  const [stats] = useState({
    rating: 4.9,
    totalJobs: 12,
    activeJobs: 1,
    responseTime: "< 1 hour",
    joinDate: "June 2024",
    completionRate: 100,
  })

  const [verificationStatus] = useState({
    idVerified: true,
    phoneVerified: true,
    emailVerified: true,
    paymentVerified: true,
  })

  const [recentReviews] = useState([
    {
      id: 1,
      worker: "John Mwangi",
      rating: 5,
      comment:
        "Great employer! Clear instructions, fair payment, and very respectful. Highly recommend working for Sarah.",
      date: "Dec 10, 2024",
      jobTitle: "House Cleaning",
    },
    {
      id: 2,
      worker: "Mary Wanjiku",
      rating: 5,
      comment: "Excellent employer. Always pays on time and provides all necessary supplies. Very professional.",
      date: "Nov 28, 2024",
      jobTitle: "House Cleaning",
    },
    {
      id: 3,
      worker: "David Kimani",
      rating: 4,
      comment: "Good employer, clear about expectations. Payment was prompt. Would work for again.",
      date: "Nov 15, 2024",
      jobTitle: "Garden Maintenance",
    },
  ])

  const [jobHistory] = useState([
    {
      id: 1,
      title: "House Cleaning",
      worker: "John Mwangi",
      amount: "KSh 2,500",
      date: "Dec 14, 2024",
      status: "completed",
      rating: 5,
    },
    {
      id: 2,
      title: "Garden Maintenance",
      worker: "David Kimani",
      amount: "KSh 3,000",
      date: "Dec 11, 2024",
      status: "completed",
      rating: 4,
    },
    {
      id: 3,
      title: "House Cleaning",
      worker: "Mary Wanjiku",
      amount: "KSh 2,200",
      date: "Nov 28, 2024",
      status: "completed",
      rating: 5,
    },
  ])

  const businessTypes = [
    { value: "individual", label: "Individual/Homeowner" },
    { value: "small_business", label: "Small Business" },
    { value: "company", label: "Company" },
    { value: "contractor", label: "Contractor" },
  ]

  const allLanguages = ["English", "Kiswahili", "Hausa", "Amharic", "Arabic", "French"]

  const paymentOptions = ["M-Pesa", "Airtel Money", "MTN Mobile Money", "Bank Transfer", "Credit Card", "Cash"]

  const handleLanguageToggle = (language: string) => {
    setProfileData((prev) => ({
      ...prev,
      preferredLanguages: prev.preferredLanguages.includes(language)
        ? prev.preferredLanguages.filter((l) => l !== language)
        : [...prev.preferredLanguages, language],
    }))
  }

  const handlePaymentToggle = (method: string) => {
    setProfileData((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter((m) => m !== method)
        : [...prev.paymentMethods, method],
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <Button variant={isEditing ? "default" : "outline"} onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? (
                "Save Changes"
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Basic Info Card */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback className="text-2xl">SJ</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <h2 className="text-xl font-bold">{profileData.name}</h2>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{stats.rating}</span>
                  <span className="text-gray-600">({stats.totalJobs} jobs posted)</span>
                </div>
                <div className="flex items-center justify-center space-x-2 mt-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
                <Badge variant="secondary" className="mt-2 bg-blue-100 text-blue-800">
                  {businessTypes.find((t) => t.value === profileData.businessType)?.label}
                </Badge>
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Verification Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">ID Verified</span>
                  {verificationStatus.idVerified ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-orange-600" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Phone Verified</span>
                  {verificationStatus.phoneVerified ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-orange-600" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Verified</span>
                  {verificationStatus.emailVerified ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">
                      Verify Now
                    </Button>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Payment Method</span>
                  {verificationStatus.paymentVerified ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-orange-600" />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Jobs</span>
                  <span className="font-semibold">{stats.activeJobs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="font-semibold">{stats.completionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className="font-semibold">{stats.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="font-semibold">{stats.joinDate}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="details" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">About Me</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                        disabled={!isEditing}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="w-5 h-5" />
                      <span>Business Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="businessType">Business Type</Label>
                      <Select
                        value={profileData.businessType}
                        onValueChange={(value) => setProfileData((prev) => ({ ...prev, businessType: value }))}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {profileData.businessType !== "individual" && (
                      <div>
                        <Label htmlFor="companyName">Company/Business Name</Label>
                        <Input
                          id="companyName"
                          value={profileData.companyName}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, companyName: e.target.value }))}
                          disabled={!isEditing}
                          placeholder="Enter company name"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Communication Preferences</CardTitle>
                    <CardDescription>Select languages you can communicate in</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {allLanguages.map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={language}
                            checked={profileData.preferredLanguages.includes(language)}
                            onChange={() => handleLanguageToggle(language)}
                            disabled={!isEditing}
                            className="rounded"
                          />
                          <Label htmlFor={language} className="text-sm">
                            {language}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="w-5 h-5" />
                      <span>Payment Methods</span>
                    </CardTitle>
                    <CardDescription>Select your preferred payment methods</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {paymentOptions.map((method) => (
                        <div key={method} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={method}
                            checked={profileData.paymentMethods.includes(method)}
                            onChange={() => handlePaymentToggle(method)}
                            disabled={!isEditing}
                            className="rounded"
                          />
                          <Label htmlFor={method} className="text-sm">
                            {method}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reviews from Workers</CardTitle>
                    <CardDescription>What workers are saying about working for you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {recentReviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">{review.worker}</p>
                            <p className="text-sm text-gray-600">{review.jobTitle}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">{review.date}</p>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Job History</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {jobHistory.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-gray-600">{job.worker}</p>
                          <p className="text-xs text-gray-500">{job.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{job.amount}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <span className="text-sm">Rated:</span>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < job.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
