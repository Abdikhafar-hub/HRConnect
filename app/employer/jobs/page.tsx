"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, MapPin, Clock, DollarSign, Users, Eye, Edit, Trash2, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

export default function EmployerJobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dialog, setDialog] = useState<{ type: null | "details" | "contact" | "progress"; job: any }>({ type: null, job: null })

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/90 shadow-sm border-b px-0 md:px-8 py-6">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Jobs</h1>
            <p className="text-gray-600">Manage all your job postings and applications</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md px-6 py-3 text-lg">
            <Plus className="w-5 h-5 mr-2" />
            Post New Job
          </Button>
        </div>
      </header>
      <div className="container mx-auto px-4 py-10 space-y-8">
        {/* Search and Filters */}
        <Card className="shadow-xl rounded-2xl border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-md">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative flex-1 w-full">
                <span className="absolute left-3 top-3 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Search className="w-5 h-5 text-blue-600" />
                </span>
                <Input
                  placeholder="Search jobs..."
                  className="pl-14 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="rounded-lg border-blue-200 text-blue-700 font-semibold">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Jobs Tabs */}
        <Tabs defaultValue="active" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 rounded-lg bg-gray-100">
            <TabsTrigger value="active" className="rounded-l-lg">Active Jobs ({activeJobs.length})</TabsTrigger>
            <TabsTrigger value="posted">Posted Jobs ({postedJobs.length})</TabsTrigger>
            <TabsTrigger value="completed" className="rounded-r-lg">Completed ({completedJobs.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-6">
            {activeJobs.map((job) => (
              <Card key={job.id} className="shadow-xl rounded-2xl border-l-4 border-l-green-500 bg-white/80 backdrop-blur-md hover:shadow-2xl transition-shadow">
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
                  <div className="flex flex-wrap gap-2">
                    <Dialog open={dialog.type === "progress" && dialog.job?.id === job.id} onOpenChange={open => !open && setDialog({ type: null, job: null })}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg" onClick={() => setDialog({ type: "progress", job })}>
                          {job.status === "in_progress" ? "Mark Complete" : "View Progress"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Job Progress</DialogTitle>
                          <DialogDescription>
                            {job.title} - {job.worker}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="my-4">
                          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                            <div className="bg-green-500 h-3 rounded-full" style={{ width: job.status === "in_progress" ? "60%" : "100%" }}></div>
                          </div>
                          <div className="text-sm text-gray-600">Status: {job.status === "in_progress" ? "In Progress" : "Confirmed"}</div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button>Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog open={dialog.type === "contact" && dialog.job?.id === job.id} onOpenChange={open => !open && setDialog({ type: null, job: null })}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="rounded-lg border-green-200 text-green-700 font-semibold" onClick={() => setDialog({ type: "contact", job })}>
                          Contact Worker
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Contact Worker</DialogTitle>
                          <DialogDescription>
                            {job.worker}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="my-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={job.workerPhoto || "/placeholder.svg"} />
                              <AvatarFallback>{job.worker.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold">{job.worker}</div>
                              <div className="text-sm text-gray-500">Phone: <span className="font-mono">+254 700 000000</span></div>
                              <div className="text-sm text-gray-500">Email: <span className="font-mono">worker@email.com</span></div>
                            </div>
                          </div>
                          <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">Call Worker</Button>
                          <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white">Send Message</Button>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog open={dialog.type === "details" && dialog.job?.id === job.id} onOpenChange={open => !open && setDialog({ type: null, job: null })}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="rounded-lg border-blue-200 text-blue-700 font-semibold" onClick={() => setDialog({ type: "details", job })}>
                          <Eye className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Job Details</DialogTitle>
                          <DialogDescription>
                            {job.title}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="my-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={job.workerPhoto || "/placeholder.svg"} />
                              <AvatarFallback>{job.worker?.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold">{job.worker}</div>
                              <div className="text-sm text-gray-500">Location: {job.location}</div>
                              <div className="text-sm text-gray-500">Date: {job.date}</div>
                              <div className="text-sm text-gray-500">Pay: {job.pay}</div>
                              <div className="text-sm text-gray-500">Status: {job.status}</div>
                              <div className="text-sm text-gray-500">Rating: {job.rating || job.workerRating || "-"}</div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="posted" className="space-y-6">
            {postedJobs.map((job) => (
              <Card key={job.id} className="shadow-xl rounded-2xl border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-md hover:shadow-2xl transition-shadow">
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
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg">
                      <Users className="w-4 h-4 mr-1" />
                      View Applicants
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-lg border-yellow-200 text-yellow-700 font-semibold">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-lg border-blue-200 text-blue-700 font-semibold">
                      <Eye className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-lg border-red-200 text-red-700 font-semibold bg-transparent">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="completed" className="space-y-6">
            {completedJobs.map((job) => (
              <Card key={job.id} className="shadow-xl rounded-2xl border-l-4 border-l-purple-500 bg-white/80 backdrop-blur-md hover:shadow-2xl transition-shadow">
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
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" className="rounded-lg border-purple-200 text-purple-700 font-semibold">
                      View Contract
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-lg border-green-200 text-green-700 font-semibold">
                      Hire Again
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-lg border-blue-200 text-blue-700 font-semibold">
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
    </div>
  )
}
