"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Clock, DollarSign, Star, Search, Navigation, Heart, Loader2 } from "lucide-react"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { apiClient } from "../../lib/apiClient"

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  budget: number;
  payType: string;
  duration?: string;
  date?: string;
  requirements?: string[];
  urgent: boolean;
  status: string;
  employer: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: string;
    isVerified: boolean;
  };
  pay: string;
  employerPhoto: string;
  distance: string;
  rating: string;
  verified: boolean;
}

interface Application {
  _id: string;
  job: Job;
  status: string;
  appliedAt: string;
  employerNotes?: string;
}

export default function WorkerJobsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [applyOpen, setApplyOpen] = useState(false)
  const [applyJob, setApplyJob] = useState<Job | null>(null)
  const [applySuccess, setApplySuccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [applying, setApplying] = useState(false)
  
  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const skillsRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

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

  const fetchJobs = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiClient.getJobs()
      setJobs(Array.isArray(response.data) ? response.data : [])
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch jobs"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const fetchApplications = async () => {
    try {
      const response = await apiClient.getWorkerApplications()
      setApplications(Array.isArray(response.data) ? response.data : [])
    } catch (err: unknown) {
      // Handle error silently or log it properly
    }
  }

  useEffect(() => {
    fetchJobs()
    fetchApplications()
  }, [])

  const openJobDialog = (job: Job) => {
    setSelectedJob(job)
    setModalOpen(true)
  }

  const openApplyDialog = (job: Job) => {
    setApplyJob(job)
    setApplyOpen(true)
    setApplySuccess(false)
  }
  
  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!applyJob || !nameRef.current || !phoneRef.current) return
    try {
      setApplying(true)
      await apiClient.applyForJob({
        jobId: applyJob._id,
        workerName: nameRef.current.value,
        workerPhone: phoneRef.current.value,
        skills: skillsRef.current?.value || "",
        message: messageRef.current?.value || ""
      })
      setApplySuccess(true)
      await fetchApplications()
      setTimeout(() => {
        setApplyOpen(false)
        setApplySuccess(false)
        setApplying(false)
      }, 1500)
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to submit application"
      alert(errorMessage)
      setApplying(false)
    }
  }

  const filteredJobs = jobs.filter(job => {
    if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !job.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    if (selectedCategory && selectedCategory !== "All Categories") {
      return job.title.toLowerCase().includes(selectedCategory.toLowerCase())
    }
    if (selectedLocation && selectedLocation !== "All Locations") {
      return job.location.toLowerCase().includes(selectedLocation.toLowerCase())
    }
    return true
  })

  const savedJobs = applications.map(app => app.job)

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
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading jobs...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="border-red-200 bg-red-50 mb-6">
            <CardContent className="p-6 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={fetchJobs} variant="outline">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {!loading && !error && (
          <Tabs defaultValue="nearby" className="space-y-8">
            <TabsList className="flex w-full justify-center bg-blue-50 rounded-full p-1 shadow-inner mb-6">
              <TabsTrigger value="nearby" className="rounded-full px-6 py-2 text-base font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-700 transition-all">
                Nearby Jobs ({filteredJobs.length})
              </TabsTrigger>
              <TabsTrigger value="saved" className="rounded-full px-6 py-2 text-base font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-700 transition-all">
                Applied Jobs ({savedJobs.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="nearby" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.length === 0 ? (
                <Card className="bg-white/80 shadow-xl rounded-2xl animate-fade-in-up col-span-full">
                  <CardContent className="p-10 text-center">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Jobs Found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search criteria or check back later.</p>
                    <Button 
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedCategory("")
                        setSelectedLocation("")
                      }} 
                      className="rounded-full font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow"
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredJobs.map((job, idx) => (
                  <Card
                    key={job._id}
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
                              {job.employer ? `${job.employer.firstName} ${job.employer.lastName}`.split(" ").map((n) => n[0]).join("") : "?"}
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
                              <p className="text-gray-600 font-medium">{job.employer ? `${job.employer.firstName} ${job.employer.lastName}` : "Unknown Employer"}</p>
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
                          <span>{job.date || "Flexible"}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <DollarSign className="w-4 h-4 text-blue-400" />
                          <span>{job.duration || job.payType}</span>
                        </div>
                      </div>

                      {job.requirements && job.requirements.length > 0 && (
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
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <div className="text-2xl font-extrabold text-green-600">{job.pay}</div>
                          <div className="text-sm text-gray-500">{job.payType}</div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            className="rounded-full font-semibold border-blue-200"
                            onClick={() => openJobDialog(job)}
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
                ))
              )}
            </TabsContent>

            <TabsContent value="saved" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {savedJobs.length === 0 ? (
                <Card className="bg-white/80 shadow-xl rounded-2xl animate-fade-in-up col-span-full">
                  <CardContent className="p-10 text-center">
                    <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
                    <h3 className="text-lg font-semibold mb-2">No Applied Jobs</h3>
                    <p className="text-gray-600 mb-4">Apply for jobs to see them here.</p>
                    <Button 
                      onClick={() => router.push('/worker/jobs')} 
                      className="rounded-full font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow"
                    >
                      Browse Jobs
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                savedJobs.map((job) => (
                  <Card key={job._id} className="bg-white rounded-2xl shadow-xl border-0 hover:scale-[1.025] hover:shadow-2xl transition-transform duration-300 animate-fade-in-up">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">{job.title}</h3>
                          <p className="text-gray-600 font-medium">{job.employer ? `${job.employer.firstName} ${job.employer.lastName}` : "Unknown Employer"}</p>
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
                          <span>{job.date || "Flexible"}</span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 mb-4">
                        Applied on {new Date(applications.find(app => app.job._id === job._id)?.appliedAt || '').toLocaleDateString()}
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          className="flex-1 rounded-full font-semibold border-blue-200 bg-transparent"
                          onClick={() => openJobDialog(job)}
                        >
                          View Details
                        </Button>
                        <Button
                          className="flex-1 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow"
                          onClick={() => openApplyDialog(job)}
                        >
                          Apply Again
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        )}
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
                    <AvatarFallback>
                      {selectedJob && selectedJob.employer
                        ? `${selectedJob.employer.firstName} ${selectedJob.employer.lastName}`.split(" ").map((n: string) => n[0]).join("")
                        : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-gray-700">
                    {selectedJob && selectedJob.employer
                      ? `${selectedJob.employer.firstName} ${selectedJob.employer.lastName}`
                      : "Unknown Employer"}
                  </span>
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
                  <span>{selectedJob.date || "Flexible"}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 text-blue-400" />
                  <span>{selectedJob.duration || selectedJob.payType}</span>
                </div>
              </div>
              {selectedJob.requirements && selectedJob.requirements.length > 0 && (
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
                <DialogDescription>Fill in your details and we&apos;ll notify the employer.</DialogDescription>
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
                <label className="block text-sm font-medium mb-1">Skills (comma separated)</label>
                <Input ref={skillsRef} placeholder="e.g. Cleaning, Cooking, Gardening" className="rounded-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message (Optional)</label>
                <textarea ref={messageRef} placeholder="Tell the employer why you&apos;re a good fit..." className="w-full rounded-2xl border border-gray-200 p-2 min-h-[60px]" />
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  className="rounded-full font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow w-full"
                  disabled={applying}
                >
                  {applying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
          {applySuccess && (
            <div className="py-10 text-center">
              <div className="text-4xl mb-2">✅</div>
              <div className="text-lg font-semibold mb-2">Application Submitted!</div>
              <div className="text-gray-600">We&apos;ll notify the employer and get back to you soon.</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
