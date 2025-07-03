"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MapPin, Star, MessageSquare, Heart, Eye, CheckCircle } from "lucide-react"

export default function FindWorkersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")

  const workers = [
    {
      id: 1,
      name: "John Mwangi",
      photo: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      reviews: 23,
      location: "Westlands, Nairobi",
      distance: "2.1 km",
      skills: ["House Cleaning", "Garden Maintenance"],
      hourlyRate: 300,
      availability: "Available Now",
      verified: true,
      completedJobs: 23,
      responseTime: "< 1 hour",
      languages: ["English", "Kiswahili"],
      bio: "Experienced cleaner with 5+ years in residential and commercial cleaning.",
    },
    {
      id: 2,
      name: "Mary Wanjiku",
      photo: "/placeholder.svg?height=60&width=60",
      rating: 4.9,
      reviews: 31,
      location: "Kilimani, Nairobi",
      distance: "3.5 km",
      skills: ["House Cleaning", "Nanny/Childcare"],
      hourlyRate: 350,
      availability: "Available Tomorrow",
      verified: true,
      completedJobs: 31,
      responseTime: "< 30 min",
      languages: ["English", "Kiswahili"],
      bio: "Professional cleaner and childcare provider. Reliable and trustworthy.",
    },
    {
      id: 3,
      name: "David Kimani",
      photo: "/placeholder.svg?height=60&width=60",
      rating: 4.7,
      reviews: 18,
      location: "Karen, Nairobi",
      distance: "5.2 km",
      skills: ["Garden Maintenance", "Construction Helper"],
      hourlyRate: 280,
      availability: "Available Now",
      verified: true,
      completedJobs: 18,
      responseTime: "< 2 hours",
      languages: ["English", "Kiswahili"],
      bio: "Skilled gardener and construction helper with attention to detail.",
    },
    {
      id: 4,
      name: "Grace Muthoni",
      photo: "/placeholder.svg?height=60&width=60",
      rating: 4.6,
      reviews: 15,
      location: "Eastlands, Nairobi",
      distance: "8.1 km",
      skills: ["Cook/Chef", "House Cleaning"],
      hourlyRate: 320,
      availability: "Available Next Week",
      verified: false,
      completedJobs: 15,
      responseTime: "< 3 hours",
      languages: ["English", "Kiswahili"],
      bio: "Experienced cook and cleaner. Specializes in traditional Kenyan cuisine.",
    },
  ]

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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Find Workers</h1>
          <p className="text-gray-600">Discover skilled workers in your area</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search workers..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
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
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {workers.map((worker) => (
          <Card key={worker.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="relative">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={worker.photo || "/placeholder.svg"} />
                    <AvatarFallback>
                      {worker.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {worker.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{worker.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{worker.rating}</span>
                          <span className="text-gray-500">({worker.reviews})</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {worker.completedJobs} jobs
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{worker.location}</span>
                        <span>•</span>
                        <span>{worker.distance} away</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4">{worker.bio}</p>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {worker.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Hourly Rate</p>
                    <p className="font-semibold">KSh {worker.hourlyRate}/hour</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Response Time</p>
                    <p className="font-semibold">{worker.responseTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Availability</p>
                    <p className="font-semibold text-green-600">{worker.availability}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Languages</p>
                    <p className="font-semibold">{worker.languages.join(", ")}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">Hire Now</Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Message
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" className="px-8 bg-transparent">
          Load More Workers
        </Button>
      </div>
    </div>
  )
}
