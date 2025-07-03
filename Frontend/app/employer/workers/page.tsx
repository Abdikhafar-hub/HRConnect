"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MapPin, Star, MessageSquare, Heart, Eye, CheckCircle, Loader2, Mail, User, Calendar, DollarSign } from "lucide-react"
import { apiClient } from "../../lib/apiClient"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Worker {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  profilePicture?: string;
  isVerified: boolean;
  rating: string;
  reviews: number;
  distance: string;
  skills: string[];
  hourlyRate: number;
  availability: string;
  completedJobs: number;
  responseTime: string;
  languages: string[];
  bio: string;
}

export default function FindWorkersPage() {
  const [workers, setWorkers] = useState<Worker[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>([])
  
  // Dialog states
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null)
  const [showHireDialog, setShowHireDialog] = useState(false)
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [hireForm, setHireForm] = useState({
    jobTitle: "",
    description: "",
    budget: "",
    duration: "",
    startDate: "",
    message: ""
  })

  useEffect(() => {
    fetchWorkers()
  }, [])

  useEffect(() => {
    filterWorkers()
  }, [workers, searchTerm, category, location])

  const fetchWorkers = async () => {
    try {
      setLoading(true)
      setError(null)
      const params: any = {}
      if (searchTerm) params.search = searchTerm
      if (category) params.category = category
      if (location) params.location = location
      
      const response = await apiClient.getWorkers(params)
      setWorkers(Array.isArray(response.data) ? response.data : [])
    } catch (err: any) {
      setError(err.message || "Failed to fetch workers")
    } finally {
      setLoading(false)
    }
  }

  const filterWorkers = () => {
    let filtered = workers

    if (searchTerm) {
      filtered = filtered.filter(worker =>
        `${worker.firstName} ${worker.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (category) {
      filtered = filtered.filter(worker =>
        worker.skills.some(skill => skill.toLowerCase().includes(category.toLowerCase()))
      )
    }

    if (location) {
      filtered = filtered.filter(worker =>
        worker.location?.toLowerCase().includes(location.toLowerCase())
      )
    }

    setFilteredWorkers(filtered)
  }

  const handleSearch = () => {
    fetchWorkers()
  }

  const handleHire = (worker: Worker) => {
    setSelectedWorker(worker)
    setHireForm({
      jobTitle: "",
      description: "",
      budget: "",
      duration: "",
      startDate: "",
      message: `Hi ${worker.firstName}, I'd like to hire you for a job.`
    })
    setShowHireDialog(true)
  }

  const handleMessage = (worker: Worker) => {
    const subject = encodeURIComponent("Job Opportunity from WorkConnect")
    const body = encodeURIComponent(`Hi ${worker.firstName},\n\nI saw your profile on WorkConnect and would like to discuss a potential job opportunity.\n\nBest regards,\n[Your Name]`)
    window.open(`mailto:${worker.email}?subject=${subject}&body=${body}`)
  }

  const handleViewProfile = (worker: Worker) => {
    setSelectedWorker(worker)
    setShowProfileDialog(true)
  }

  const handleSubmitHire = async () => {
    if (!selectedWorker) return
    
    try {
      const jobData = {
        title: hireForm.jobTitle,
        description: hireForm.description,
        location: selectedWorker.location || "To be discussed",
        budget: Number(hireForm.budget),
        payType: "per hour",
        duration: hireForm.duration,
        date: hireForm.startDate,
        requirements: [],
        urgent: false
      }

      await apiClient.createJob(jobData)
      setShowHireDialog(false)
      setSelectedWorker(null)
      alert("Job posted successfully! The worker will be notified.")
    } catch (error: any) {
      alert("Failed to post job: " + error.message)
    }
  }

  const loadMoreWorkers = () => {
    fetchWorkers()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Workers</h1>
        <p className="text-gray-600">Connect with skilled workers in your area</p>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto mb-8">
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search workers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cleaning">House Cleaning</SelectItem>
                <SelectItem value="construction">Construction</SelectItem>
                <SelectItem value="delivery">Delivery</SelectItem>
                <SelectItem value="gardening">Gardening</SelectItem>
                <SelectItem value="cooking">Cooking</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
      </Card>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
          <Button onClick={fetchWorkers} className="mt-4">Try Again</Button>
        </div>
      ) : (
        <>
          <div className="max-w-7xl mx-auto mb-6">
            <p className="text-gray-600">
              Found {filteredWorkers.length} worker{filteredWorkers.length !== 1 ? 's' : ''}
            </p>
          </div>

          {filteredWorkers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No workers found matching your criteria</p>
              <Button onClick={() => {
                setSearchTerm("")
                setCategory("")
                setLocation("")
              }} className="mt-4">Clear Filters</Button>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkers.map((worker) => (
                <Card key={worker._id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="relative">
                  <Avatar className="w-16 h-16">
                          <AvatarImage src={worker.profilePicture} />
                    <AvatarFallback>
                            {worker.firstName.charAt(0)}{worker.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                        {worker.isVerified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {`${worker.firstName} ${worker.lastName}`}
                            </h3>
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
                              <span>{worker.location || "Location not specified"}</span>
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
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleHire(worker)}
                      >
                        Hire Now
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleMessage(worker)}
                      >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Message
                </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewProfile(worker)}
                      >
                  <Eye className="w-4 h-4 mr-1" />
                  Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
          )}
        </>
      )}

      {/* Load More */}
      {!loading && !error && filteredWorkers.length > 0 && (
        <div className="text-center mt-8">
          <Button variant="outline" className="px-8 bg-transparent" onClick={loadMoreWorkers}>
          Load More Workers
        </Button>
      </div>
      )}

      {/* Hire Dialog */}
      <Dialog open={showHireDialog} onOpenChange={setShowHireDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Hire {selectedWorker?.firstName}</DialogTitle>
            <DialogDescription>
              Create a job posting for this worker
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={hireForm.jobTitle}
                onChange={(e) => setHireForm({...hireForm, jobTitle: e.target.value})}
                placeholder="e.g., House Cleaning"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={hireForm.description}
                onChange={(e) => setHireForm({...hireForm, description: e.target.value})}
                placeholder="Describe the job requirements..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">Budget (KSh)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={hireForm.budget}
                  onChange={(e) => setHireForm({...hireForm, budget: e.target.value})}
                  placeholder="1000"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={hireForm.duration}
                  onChange={(e) => setHireForm({...hireForm, duration: e.target.value})}
                  placeholder="2 hours"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={hireForm.startDate}
                onChange={(e) => setHireForm({...hireForm, startDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="message">Message to Worker</Label>
              <Textarea
                id="message"
                value={hireForm.message}
                onChange={(e) => setHireForm({...hireForm, message: e.target.value})}
                placeholder="Add a personal message..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowHireDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitHire} className="bg-green-600 hover:bg-green-700">
              Post Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Profile Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedWorker?.firstName} {selectedWorker?.lastName}</DialogTitle>
            <DialogDescription>
              Detailed worker profile and information
            </DialogDescription>
          </DialogHeader>
          {selectedWorker && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={selectedWorker.profilePicture} />
                  <AvatarFallback>
                    {selectedWorker.firstName.charAt(0)}{selectedWorker.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedWorker.firstName} {selectedWorker.lastName}</h3>
                  <p className="text-gray-600">{selectedWorker.email}</p>
                  {selectedWorker.phone && <p className="text-gray-600">{selectedWorker.phone}</p>}
                  <div className="flex items-center space-x-2 mt-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{selectedWorker.rating}</span>
                    <span className="text-gray-500">({selectedWorker.reviews} reviews)</span>
                    {selectedWorker.isVerified && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Location
                  </h4>
                  <p className="text-gray-600">{selectedWorker.location || "Not specified"}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Hourly Rate
                  </h4>
                  <p className="text-gray-600">KSh {selectedWorker.hourlyRate}/hour</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Availability
                  </h4>
                  <p className="text-gray-600">{selectedWorker.availability}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Completed Jobs
                  </h4>
                  <p className="text-gray-600">{selectedWorker.completedJobs} jobs</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedWorker.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Languages</h4>
                <p className="text-gray-600">{selectedWorker.languages.join(", ")}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Bio</h4>
                <p className="text-gray-600">{selectedWorker.bio}</p>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    setShowProfileDialog(false)
                    handleHire(selectedWorker)
                  }}
                >
                  Hire This Worker
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleMessage(selectedWorker)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
