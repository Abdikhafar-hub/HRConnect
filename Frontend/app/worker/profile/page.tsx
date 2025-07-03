"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Clock, DollarSign, CheckCircle, Edit, Save, X, Shield, Briefcase, Languages, Calendar } from "lucide-react"
import { apiClient } from "../../lib/apiClient"

interface Profile {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  bio: string
  skills: string[]
  hourlyRate: number
  availability: string[]
  responseTime: string
  languages: string[]
  profilePicture?: string
  isVerified: boolean
  rating: number
  reviews: Array<{
    employer: string
    jobTitle: string
    rating: number
    comment: string
    date: string
  }>
  totalJobs?: number
  completionRate?: number
  joinDate?: string
  phoneVerified?: boolean
  addressVerified?: boolean
  backgroundCheck?: boolean
  idVerified?: boolean
  experience?: string
}

export default function WorkerProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    skills: [],
    hourlyRate: 0,
    availability: [],
    responseTime: "",
    languages: [],
    profilePicture: "",
    isVerified: false,
    rating: 0,
    reviews: [],
    totalJobs: 0,
    completionRate: 0,
    joinDate: "",
    phoneVerified: false,
    addressVerified: false,
    backgroundCheck: false,
    idVerified: false,
    experience: ""
  })
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const res = await apiClient.getMe()
      setProfile(res.data as Profile)
    } catch (error: unknown) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean)
    setProfile(prev => ({ ...prev, skills }))
  }

  const handleLanguagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const languages = e.target.value.split(',').map(lang => lang.trim()).filter(Boolean)
    setProfile(prev => ({ ...prev, languages }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccess(false)
    setError(null)
    try {
      await apiClient.updateProfile(profile)
      setSuccess(true)
      setEditing(false)
      setTimeout(() => setSuccess(false), 3000)
    } catch (e: any) {
      setError(e.message || "Failed to save profile")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>
  if (!profile) return <div className="p-8 text-center">No profile data</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold tracking-tight text-blue-700 mb-0 drop-shadow-sm">My Profile</h1>
            <Button variant="outline" className="rounded-full font-semibold px-6 py-2 text-base shadow">
              <Edit className="w-4 h-4 mr-2" />Edit Profile
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
                </div>
                <h2 className="text-2xl font-bold text-blue-900 mb-1">{profile.firstName} {profile.lastName}</h2>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-lg text-gray-800">{profile.rating}</span>
                  <span className="text-gray-500">({profile.totalJobs} jobs)</span>
                </div>
                <div className="flex items-center justify-center space-x-2 mt-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
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
                  {profile.idVerified ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-orange-600" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Phone Verified</span>
                  {profile.phoneVerified ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-orange-600" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Address Verified</span>
                  {profile.addressVerified ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">Verify Now</Button>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Background Check</span>
                  {profile.backgroundCheck ? (
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
                  <span className="font-semibold text-blue-700">{profile.completionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className="font-semibold text-blue-700">{profile.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="font-semibold text-blue-700">{profile.joinDate}</span>
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
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profile.firstName}
                          onChange={handleChange}
                          placeholder="First Name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profile.lastName}
                          onChange={handleChange}
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={handleChange}
                        placeholder="Location"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={handleChange}
                        placeholder="Bio"
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="experience">Experience</Label>
                        <Select
                          value={profile.experience}
                          onValueChange={(value: string) => setProfile((prev: any) => ({ ...prev, experience: value }))}
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
                          value={profile.hourlyRate}
                          onChange={handleChange}
                          placeholder="Hourly Rate"
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
                      {profile.skills?.map((skill: string, i: number) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Checkbox
                            id={skill}
                            checked={profile.skills.includes(skill)}
                            onCheckedChange={(checked: boolean) => {
                              if (checked) {
                                setProfile((prev: any) => ({ ...prev, skills: [...prev.skills, skill] }))
                              } else {
                                setProfile((prev: any) => ({ ...prev, skills: prev.skills.filter((s: string) => s !== skill) }))
                              }
                            }}
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
                      {profile.languages?.map((language: string, i: number) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Checkbox
                            id={language}
                            checked={profile.languages.includes(language)}
                            onCheckedChange={(checked: boolean) => {
                              if (checked) {
                                setProfile((prev: any) => ({ ...prev, languages: [...prev.languages, language] }))
                              } else {
                                setProfile((prev: any) => ({ ...prev, languages: prev.languages.filter((l: string) => l !== language) }))
                              }
                            }}
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
                    <CardDescription>Days you&apos;re available to work</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Array.isArray(profile.availability) && profile.availability.length > 0 ? (
                        profile.availability.map((day: string, i: number) => (
                          <div key={i} className="flex items-center space-x-2">
                          <Checkbox
                            id={day}
                              checked={profile.availability.includes(day)}
                              onCheckedChange={(checked: boolean) => {
                                if (checked) {
                                  setProfile((prev: any) => ({ ...prev, availability: [...prev.availability, day] }))
                                } else {
                                  setProfile((prev: any) => ({ ...prev, availability: prev.availability.filter((d: string) => d !== day) }))
                                }
                              }}
                          />
                          <Label htmlFor={day} className="text-sm">
                            {day}
                          </Label>
                        </div>
                        ))
                      ) : (
                        <div className="text-gray-500">No availability set.</div>
                      )}
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
                    {Array.isArray(profile.reviews) && profile.reviews.length > 0 ? (
                      profile.reviews.map((review: any, i: number) => (
                        <div key={i} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">{review.employer}</p>
                            <p className="text-sm text-gray-600">{review.jobTitle}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, j) => (
                                <Star
                                    key={j}
                                  className={`w-4 h-4 ${
                                      j < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">{review.date}</p>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                      ))
                    ) : (
                      <div className="text-gray-500">No reviews yet.</div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium mb-1">Skills (comma separated)</label>
            <Input name="skills" value={profile.skills?.join(", ") || ""} onChange={handleSkillsChange} />
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.skills?.map((skill: string, i: number) => <Badge key={i}>{skill}</Badge>)}
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Hourly Rate (KSh)</label>
            <Input name="hourlyRate" type="number" value={profile.hourlyRate || ""} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium mb-1">Availability</label>
            <Input name="availability" value={Array.isArray(profile.availability) ? profile.availability.join(", ") : ""} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium mb-1">Response Time</label>
            <Input name="responseTime" value={profile.responseTime || ""} onChange={handleChange} />
          </div>
          <div>
            <label className="block font-medium mb-1">Languages (comma separated)</label>
            <Input name="languages" value={profile.languages?.join(", ") || ""} onChange={handleLanguagesChange} />
          </div>
          <div>
            <label className="block font-medium mb-1">Bio</label>
            <Textarea name="bio" value={profile.bio || ""} onChange={handleChange} />
          </div>
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Profile"}</Button>
          {success && <div className="text-green-600 mt-2">Profile updated!</div>}
        </form>
      </div>
    </div>
  )
}
