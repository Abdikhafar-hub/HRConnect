"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Clock, DollarSign, Star, Search, Navigation, Heart } from "lucide-react"

export default function WorkerJobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")

  const [nearbyJobs] = useState([
    {
      id: 1,
      title: "House Cleaning",
      employer: "Sarah Johnson",
      employerPhoto: "/placeholder.svg?height=40&width=40",
      location: "Westlands, Nairobi",
      distance: "1.2 km",
      pay: "KSh 2,500",
      payType: "per day",
      duration: "4 hours",
      date: "Tomorrow, 9:00 AM",
      rating: 4.8,
      verified: true,
      urgent: false,
      description: "Weekly house cleaning including kitchen, bathrooms, and living areas.",
      requirements: ["Must have ID", "Previous experience preferred", "Must speak English"],
    },
    {
      id: 2,
      title: "Garden Maintenance",
      employer: "David Kimani",
      employerPhoto: "/placeholder.svg?height=40&width=40",
      location: "Karen, Nairobi",
      distance: "2.5 km",
      pay: "KSh 3,000",
      payType: "per day",
      duration: "6 hours",
      date: "Dec 16, 8:00 AM",
      rating: 4.9,
      verified: true,
      urgent: true,
      description: "Lawn mowing, hedge trimming, and general garden maintenance.",
      requirements: ["Must have own tools", "Physically fit", "Experience required"],
    },
    {
      id: 3,
      title: "Construction Helper",
      employer: "Mwangi Builders",
      employerPhoto: "/placeholder.svg?height=40&width=40",
      location: "Kiambu Road",
      distance: "5.2 km",
      pay: "KSh 1,500",
      payType: "per day",
      duration: "8 hours",
      date: "Dec 15-20",
      rating: 4.6,
      verified: true,
      urgent: false,
      description: "Assist with construction work including carrying materials and basic tasks.",
      requirements: ["Must be physically fit", "Safety conscious", "Must have ID"],
    },
    {
      id: 4,
      title: "Office Cleaning",
      employer: "Tech Hub Ltd",
      employerPhoto: "/placeholder.svg?height=40&width=40",
      location: "CBD, Nairobi",
      distance: "3.8 km",
      pay: "KSh 2,200",
      payType: "per day",
      duration: "3 hours",
      date: "Daily, 6:00 PM",
      rating: 4.7,
      verified: true,
      urgent: false,
      description: "Evening office cleaning including desks, floors, and restrooms.",
      requirements: ["Must be reliable", "Evening availability", "Must speak English"],
    },
  ])

  const [savedJobs] = useState([
    {
      id: 5,
      title: "Nanny Position",
      employer: "Grace Muthoni",
      location: "Kilimani",
      pay: "KSh 25,000",
      payType: "per month",
      date: "Starting Jan 1",
      rating: 4.9,
      savedDate: "Dec 10, 2024",
    },
    {
      id: 6,
      title: "Delivery Driver",
      employer: "Quick Delivery Co",
      location: "Eastlands",
      pay: "KSh 1,800",
      payType: "per day",
      date: "Flexible",
      rating: 4.5,
      savedDate: "Dec 8, 2024",
    },
  ])

  const categories = [
    "All Categories",
    "House Cleaning",
    "Construction",
    "Delivery",
    "Security",
    "Gardening",
    "Childcare",
    "Cooking",
    "Farm Work",
  ]

  const locations = ["All Locations", "Nairobi CBD", "Westlands", "Karen", "Kilimani", "Eastlands", "Kiambu"]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold mb-4">Find Jobs</h1>

          {/* Search and Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search jobs..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="nearby" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="nearby">Nearby Jobs ({nearbyJobs.length})</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs ({savedJobs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="nearby" className="space-y-4">
            {nearbyJobs.map((job) => (
              <Card key={job.id} className="relative">
                {job.urgent && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="destructive">Urgent</Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarImage src={job.employerPhoto || "/placeholder.svg"} />
                        <AvatarFallback>
                          {job.employer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <div className="flex items-center space-x-2">
                          <p className="text-gray-600">{job.employer}</p>
                          {job.verified && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{job.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>

                  <p className="text-gray-700 mb-4">{job.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Navigation className="w-4 h-4" />
                      <span>{job.distance} away</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{job.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.duration}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{job.pay}</div>
                      <div className="text-sm text-gray-600">{job.payType}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline">View Details</Button>
                      <Button>Apply Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            {savedJobs.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Saved Jobs</h3>
                  <p className="text-gray-600 mb-4">Save jobs you're interested in to view them later.</p>
                  <Button>Browse Jobs</Button>
                </CardContent>
              </Card>
            ) : (
              savedJobs.map((job) => (
                <Card key={job.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p className="text-gray-600">{job.employer}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{job.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{job.pay}</div>
                        <div className="text-sm text-gray-600">{job.payType}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{job.date}</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 mb-4">Saved on {job.savedDate}</div>

                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Remove
                      </Button>
                      <Button className="flex-1">Apply Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
