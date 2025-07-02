"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Star, Shield, Camera, Edit, CheckCircle, Clock, Languages, Briefcase } from "lucide-react"
import clsx from "clsx"

export default function WorkerProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Mwangi",
    phone: "+254 700 123 456",
    location: "Westlands, Nairobi",
    bio: "Experienced cleaner and handyman with 5+ years in residential and commercial cleaning. Reliable, punctual, and detail-oriented.",
    languages: ["English", "Kiswahili"],
    skills: ["House Cleaning", "Garden Maintenance", "Construction Helper"],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    hourlyRate: "300",
    experience: "5+ years",
  })

  const [stats] = useState({
    rating: 4.8,
    totalJobs: 23,
    completionRate: 96,
    responseTime: "< 2 hours",
    joinDate: "March 2024",
  })

  const [verificationStatus] = useState({
    idVerified: true,
    phoneVerified: true,
    addressVerified: false,
    backgroundCheck: true,
  })

  const [recentReviews] = useState([
    {
      id: 1,
      employer: "Sarah Johnson",
      rating: 5,
      comment: "Excellent work! Very thorough and professional. Will definitely hire again.",
      date: "Dec 10, 2024",
      jobTitle: "House Cleaning",
    },
    {
      id: 2,
      employer: "David Kimani",
      rating: 5,
      comment: "Great job on the garden maintenance. Very reliable and hardworking.",
      date: "Dec 8, 2024",
      jobTitle: "Garden Maintenance",
    },
    {
      id: 3,
      employer: "Tech Hub Ltd",
      rating: 4,
      comment: "Good work, arrived on time and completed all tasks as requested.",
      date: "Dec 5, 2024",
      jobTitle: "Office Cleaning",
    },
  ])

  const allSkills = [
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

  const allLanguages = ["English", "Kiswahili", "Hausa", "Amharic", "Arabic", "French"]

  const availabilityDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const handleSkillToggle = (skill: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const handleLanguageToggle = (language: string) => {
    setProfileData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }))
  }

  const handleAvailabilityToggle = (day: string) => {
    setProfileData((prev) => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter((d) => d !== day)
        : [...prev.availability, day],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold tracking-tight text-blue-700 mb-0 drop-shadow-sm">My Profile</h1>
            <Button variant={isEditing ? "default" : "outline"} className="rounded-full font-semibold px-6 py-2 text-base shadow" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? (
                "Save Changes"
              ) : (
                <><Edit className="w-4 h-4 mr-2" />Edit Profile</>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1 space-y-8">
            {/* Basic Info Card */}
            <Card className="bg-gradient-to-br from-blue-100 to-white/80 shadow-xl rounded-2xl animate-fade-in-up">
              <CardContent className="p-8 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-28 h-28 shadow-lg border-4 border-white mx-auto">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback className="text-2xl">JM</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-9 h-9 p-0 bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                      <Camera className="w-5 h-5" />
                    </Button>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-blue-900 mb-1">{profileData.name}</h2>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-lg text-gray-800">{stats.rating}</span>
                  <span className="text-gray-500">({stats.totalJobs} jobs)</span>
                </div>
                <div className="flex items-center justify-center space-x-2 mt-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card className="bg-white/90 shadow-xl rounded-2xl animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-700">
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
                  <span className="text-sm">Address Verified</span>
                  {verificationStatus.addressVerified ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">Verify Now</Button>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Background Check</span>
                  {verificationStatus.backgroundCheck ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-orange-600" />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/90 shadow-xl rounded-2xl animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-blue-700">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="font-semibold text-blue-700">{stats.completionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className="font-semibold text-blue-700">{stats.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="font-semibold text-blue-700">{stats.joinDate}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="details" className="space-y-8">
              <TabsList className="flex w-full justify-center bg-blue-50 rounded-full p-1 shadow-inner mb-6">
                <TabsTrigger value="details" className="rounded-full px-6 py-2 text-base font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-700 transition-all">Details</TabsTrigger>
                <TabsTrigger value="skills" className="rounded-full px-6 py-2 text-base font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-700 transition-all">Skills & Availability</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-full px-6 py-2 text-base font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-700 transition-all">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-8">
                <Card className="bg-white/95 shadow-xl rounded-2xl animate-fade-in-up">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Personal Information</CardTitle>
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
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                        disabled={!isEditing}
                        rows={4}
                        className="rounded-2xl"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="experience">Experience</Label>
                        <Select
                          value={profileData.experience}
                          onValueChange={(value) => setProfileData((prev) => ({ ...prev, experience: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger className="rounded-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="< 1 year">Less than 1 year</SelectItem>
                            <SelectItem value="1-2 years">1-2 years</SelectItem>
                            <SelectItem value="3-5 years">3-5 years</SelectItem>
                            <SelectItem value="5+ years">5+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="hourlyRate">Preferred Hourly Rate (KSh)</Label>
                        <Input
                          id="hourlyRate"
                          type="number"
                          value={profileData.hourlyRate}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, hourlyRate: e.target.value }))}
                          disabled={!isEditing}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-8">
                <Card className="bg-white/95 shadow-xl rounded-2xl animate-fade-in-up">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-blue-700">
                      <Briefcase className="w-5 h-5" />
                      <span>Skills & Services</span>
                    </CardTitle>
                    <CardDescription>Select the services you can provide</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {allSkills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={skill}
                            checked={profileData.skills.includes(skill)}
                            onCheckedChange={() => handleSkillToggle(skill)}
                            disabled={!isEditing}
                          />
                          <Label htmlFor={skill} className="text-sm">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/95 shadow-xl rounded-2xl animate-fade-in-up">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-blue-700">
                      <Languages className="w-5 h-5" />
                      <span>Languages</span>
                    </CardTitle>
                    <CardDescription>Languages you can communicate in</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {allLanguages.map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={language}
                            checked={profileData.languages.includes(language)}
                            onCheckedChange={() => handleLanguageToggle(language)}
                            disabled={!isEditing}
                          />
                          <Label htmlFor={language} className="text-sm">
                            {language}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/95 shadow-xl rounded-2xl animate-fade-in-up">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-blue-700">
                      <Calendar className="w-5 h-5" />
                      <span>Availability</span>
                    </CardTitle>
                    <CardDescription>Days you're available to work</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {availabilityDays.map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox
                            id={day}
                            checked={profileData.availability.includes(day)}
                            onCheckedChange={() => handleAvailabilityToggle(day)}
                            disabled={!isEditing}
                          />
                          <Label htmlFor={day} className="text-sm">
                            {day}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-8">
                <Card className="bg-white/95 shadow-xl rounded-2xl animate-fade-in-up">
                  <CardHeader>
                    <CardTitle className="text-blue-700">Recent Reviews</CardTitle>
                    <CardDescription>What employers are saying about your work</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {recentReviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">{review.employer}</p>
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
