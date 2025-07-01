"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, MapPin, Clock, DollarSign, Users, Eye, Edit, Trash2, CheckCircle } from "lucide-react"

export default function EmployerJobsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const activeJobs = [
    {
      id: 1,
      title: "House Cleaning",
      worker: "John Mwangi",
      workerPhoto: "/placeholder.svg?height=40&width=40",
      location: "Westlands, Nairobi",
      pay: "KSh 2,500",
      date: "Today, 9:00 AM",
      status: "in_progress",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Garden Maintenance",
      worker: "David Kimani",
      workerPhoto: "/placeholder.svg?height=40&width=40",
      location: "Karen, Nairobi",
      pay: "KSh 3,000",
      date: "Tomorrow, 8:00 AM",
      status: "confirmed",
      rating: 4.9,
    },
  ]

  const postedJobs = [
    {
      id: 3,
      title: "Office Cleaning",
      location: "CBD, Nairobi",
      pay: "KSh 2,200",
      date: "Dec 16, 6:00 PM",
      applicants: 8,
      status: "open",
      postedDate: "Dec 12, 2024",
    },
    {
      id: 4,
      title: "Construction Helper",
      location: "Kiambu Road",
      pay: "KSh 1,500/day",
      date: "Dec 20-25",
      applicants: 12,
      status: "reviewing",
      postedDate: "Dec 10, 2024",
    },
  ]

  const completedJobs = [
    {
      id: 5,
      title: "House Cleaning",
      worker: "Mary Wanjiku",
      workerPhoto: "/placeholder.svg?height=40&width=40",
      location: "Kilimani",
      pay: "KSh 1,800",
      date: "Dec 8, 2024",
      rating: 5,
      workerRating: 4.9,
    },
    {
      id: 6,
      title: "Garden Work",
      worker: "Peter Kamau",
      workerPhoto: "/placeholder.svg?height=40&width=40",
      location: "Westlands",
      pay: "KSh 2,500",
      date: "Dec 5, 2024",
      rating: 4,
      workerRating: 4.6,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Jobs</h1>
          <p className="text-gray-600">Manage all your job postings and applications</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Post New Job
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search jobs..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Jobs ({activeJobs.length})</TabsTrigger>
          <TabsTrigger value="posted">Posted Jobs ({postedJobs.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedJobs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={job.workerPhoto || "/placeholder.svg"} />
                      <AvatarFallback>
                        {job.worker
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-gray-600">{job.worker}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="text-sm text-gray-500">Rating: {job.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={job.status === "in_progress" ? "default" : "secondary"}
                    className={
                      job.status === "in_progress" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }
                  >
                    {job.status === "in_progress" ? "In Progress" : "Confirmed"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.pay}</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span className="text-sm">Active</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    {job.status === "in_progress" ? "Mark Complete" : "View Progress"}
                  </Button>
                  <Button size="sm" variant="outline">
                    Contact Worker
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="posted" className="space-y-4">
          {postedJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-gray-600">Posted on {job.postedDate}</p>
                  </div>
                  <Badge
                    variant={job.status === "open" ? "default" : "secondary"}
                    className={job.status === "open" ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"}
                  >
                    {job.status === "open" ? "Open" : "Reviewing"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.pay}</span>
                  </div>
                  <div className="flex items-center text-blue-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.applicants} applicants</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Users className="w-4 h-4 mr-1" />
                    View Applicants
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    Details
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={job.workerPhoto || "/placeholder.svg"} />
                      <AvatarFallback>
                        {job.worker
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-gray-600">{job.worker}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="text-sm text-gray-500">Worker Rating: {job.workerRating}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.pay}</span>
                  </div>
                  <div className="flex items-center text-yellow-600">
                    <span className="text-sm">You rated: {job.rating}/5</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    View Contract
                  </Button>
                  <Button size="sm" variant="outline">
                    Hire Again
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
