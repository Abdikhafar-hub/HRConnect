"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Clock, DollarSign, Star, Search, Navigation, Heart } from "lucide-react"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"

export default function WorkerJobsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [applyOpen, setApplyOpen] = useState(false)
  const [applyJob, setApplyJob] = useState<any>(null)
  const [applySuccess, setApplySuccess] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

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

  const openJobDialog = (job: any) => {
    setSelectedJob(job)
    setModalOpen(true)
  }
  const closeJobDialog = () => {
    setModalOpen(false)
    setSelectedJob(null)
  }

  const openApplyDialog = (job: any) => {
    setApplyJob(job)
    setApplyOpen(true)
    setApplySuccess(false)
  }
  const closeApplyDialog = () => {
    setApplyOpen(false)
    setApplyJob(null)
    setApplySuccess(false)
  }
  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setApplySuccess(true)
    setTimeout(() => {
      setApplyOpen(false)
      setApplySuccess(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-700 mb-4 drop-shadow-sm">Find Jobs</h1>

          {/* Search and Filters */}
          <div className="w-full max-w-3xl mx-auto rounded-2xl shadow-xl bg-white/80 backdrop-blur-md p-6 flex flex-col gap-4 mb-2 animate-fade-in-up">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                <Input
                  placeholder="Search jobs..."
                  className="pl-12 py-3 rounded-full border-2 border-blue-100 focus:border-blue-400 transition-all shadow-sm w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="rounded-full border-2 border-blue-100 focus:border-blue-400 min-w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="hover:bg-blue-50">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="rounded-full border-2 border-blue-100 focus:border-blue-400 min-w-[150px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location} className="hover:bg-blue-50">
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="nearby" className="space-y-8">
          <TabsList className="flex w-full justify-center bg-blue-50 rounded-full p-1 shadow-inner mb-6">
            <TabsTrigger value="nearby" className="rounded-full px-6 py-2 text-base font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-700 transition-all">Nearby Jobs ({nearbyJobs.length})</TabsTrigger>
            <TabsTrigger value="saved" className="rounded-full px-6 py-2 text-base font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-700 transition-all">Saved Jobs ({savedJobs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="nearby" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {nearbyJobs.map((job, idx) => (
              <Card
                key={job.id}
                className={clsx(
                  "relative bg-white rounded-2xl shadow-xl border-0 hover:scale-[1.025] hover:shadow-2xl transition-transform duration-300 animate-fade-in-up",
                  idx % 2 === 0 ? "md:animate-delay-100" : "md:animate-delay-200"
                )}
              >
                {job.urgent && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant="destructive" className="rounded-full px-3 py-1 text-xs shadow">Urgent</Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-12 h-12 shadow">
                        <AvatarImage src={job.employerPhoto || "/placeholder.svg"} />
                        <AvatarFallback>
                          {job.employer.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                          {job.title}
                          {job.verified && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs ml-2 rounded-full px-2 py-0.5">Verified</Badge>
                          )}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <p className="text-gray-600 font-medium">{job.employer}</p>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold text-gray-700">{job.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-pink-100 group transition-colors">
                      <Heart className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                    </Button>
                  </div>

                  <p className="text-gray-700 mb-4 text-base leading-relaxed min-h-[48px]">{job.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Navigation className="w-4 h-4 text-blue-400" />
                      <span>{job.distance} away</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span>{job.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 text-blue-400" />
                      <span>{job.duration}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Requirements:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="rounded-full px-3 py-1 text-xs bg-blue-50 border-blue-200 text-blue-700 font-medium">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <div className="text-2xl font-extrabold text-green-600">{job.pay}</div>
                      <div className="text-sm text-gray-500">{job.payType}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        className="rounded-full font-semibold border-blue-200"
                        onClick={() => openApplyDialog(job)}
                      >
                        View Details
                      </Button>
                      <Button
                        className="rounded-full font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow"
                        onClick={() => openApplyDialog(job)}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="saved" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedJobs.length === 0 ? (
              <Card className="bg-white/80 shadow-xl rounded-2xl animate-fade-in-up">
                <CardContent className="p-10 text-center">
                  <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-lg font-semibold mb-2">No Saved Jobs</h3>
                  <p className="text-gray-600 mb-4">Save jobs you're interested in to view them later.</p>
                  <Button className="rounded-full font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow">Browse Jobs</Button>
                </CardContent>
              </Card>
            ) : (
              savedJobs.map((job, idx) => (
                <Card key={job.id} className="bg-white rounded-2xl shadow-xl border-0 hover:scale-[1.025] hover:shadow-2xl transition-transform duration-300 animate-fade-in-up">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">{job.title}</h3>
                        <p className="text-gray-600 font-medium">{job.employer}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold text-gray-700">{job.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{job.pay}</div>
                        <div className="text-sm text-gray-500">{job.payType}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span>{job.date}</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 mb-4">Saved on {job.savedDate}</div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        className="flex-1 rounded-full font-semibold border-blue-200 bg-transparent"
                        onClick={() => {/* Remove functionality can be added here */}}
                      >
                        Remove
                      </Button>
                      <Button
                        className="flex-1 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow"
                        onClick={() => openApplyDialog(job)}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold mb-2 flex items-center gap-2">
                  {selectedJob.title}
                  {selectedJob.verified && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs ml-2 rounded-full px-2 py-0.5">Verified</Badge>
                  )}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2 mb-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedJob.employerPhoto || "/placeholder.svg"} />
                    <AvatarFallback>{selectedJob.employer?.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-gray-700">{selectedJob.employer}</span>
                  <span className="flex items-center gap-1 text-yellow-500 ml-2"><Star className="w-4 h-4" /> {selectedJob.rating}</span>
                </DialogDescription>
              </DialogHeader>
              <div className="mb-4 text-gray-700 text-base leading-relaxed">{selectedJob.description}</div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>{selectedJob.location}</span>
                </div>
                {selectedJob.distance && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Navigation className="w-4 h-4 text-blue-400" />
                    <span>{selectedJob.distance} away</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>{selectedJob.date}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 text-blue-400" />
                  <span>{selectedJob.duration || selectedJob.payType}</span>
                </div>
              </div>
              {selectedJob.requirements && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Requirements:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.requirements.map((req: string, index: number) => (
                      <Badge key={index} variant="outline" className="rounded-full px-3 py-1 text-xs bg-blue-50 border-blue-200 text-blue-700 font-medium">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between mt-2 mb-2">
                <div>
                  <div className="text-2xl font-extrabold text-green-600">{selectedJob.pay}</div>
                  <div className="text-sm text-gray-500">{selectedJob.payType}</div>
                </div>
                <Button className="rounded-full font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow" onClick={() => openApplyDialog(selectedJob)}>
                  Apply Now
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={applyOpen} onOpenChange={setApplyOpen}>
        <DialogContent className="max-w-lg">
          {applyJob && !applySuccess && (
            <form onSubmit={handleApplySubmit} className="space-y-4">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold mb-2">Apply for {applyJob.title}</DialogTitle>
                <DialogDescription>Fill in your details and we'll notify the employer.</DialogDescription>
              </DialogHeader>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input ref={nameRef} required placeholder="Your Name" className="rounded-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Input ref={phoneRef} required placeholder="07xx xxx xxx" className="rounded-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea ref={messageRef} placeholder="Optional message" className="w-full rounded-2xl border border-gray-200 p-2 min-h-[60px]" />
              </div>
              <DialogFooter>
                <Button type="submit" className="rounded-full font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow w-full">Submit Application</Button>
              </DialogFooter>
            </form>
          )}
          {applySuccess && (
            <div className="py-10 text-center">
              <div className="text-4xl mb-2">✅</div>
              <div className="text-lg font-semibold mb-2">Application Submitted!</div>
              <div className="text-gray-600">We'll notify the employer and get back to you soon.</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
