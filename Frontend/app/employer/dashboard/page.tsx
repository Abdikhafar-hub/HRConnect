"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Briefcase,
  Users,
  TrendingUp,
  CheckCircle,
  MessageSquare,
  Edit,
  Eye,
  Phone,
  Mail,
  Loader2,
  Calendar,
} from "lucide-react"
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
  createdAt: string;
  pay: string;
}

interface Application {
  _id: string;
  job: Job;
  worker: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    location?: string;
  };
  status: string;
  workerName: string;
  workerPhone: string;
  message?: string;
  appliedAt: string;
  employerNotes?: string;
  skills?: string[];
}

export default function EmployerDashboard() {
  const router = useRouter()
  const [contactDialogOpen, setContactDialogOpen] = useState(false)
  const [editJobDialogOpen, setEditJobDialogOpen] = useState(false)
  const [viewApplicationsDialogOpen, setViewApplicationsDialogOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [selectedWorker, setSelectedWorker] = useState<Application['worker'] | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [applicationsLoading, setApplicationsLoading] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

    const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getJobs()
      setJobs(Array.isArray(response.data) ? response.data : [])
    } catch {
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  const fetchApplications = async () => {
    try {
      setApplicationsLoading(true)
      const response = await apiClient.getEmployerApplications()
      setApplications(Array.isArray(response.data) ? response.data : [])
    } catch {
      setApplications([])
    } finally {
      setApplicationsLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
    fetchApplications()
  }, [])

  // Calculate dynamic stats
  const activeJobs = jobs.filter(j => j.status === 'open' || j.status === 'in-progress')
  const totalApplicants = applications.length
  const pendingApplications = applications.filter(app => app.status === 'pending').length
  const thisWeekApplications = applications.filter(app => {
    const appDate = new Date(app.appliedAt)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return appDate >= weekAgo
  }).length

  const handlePostJob = () => {
    router.push('/employer/post-job')
  }

  const handleContactWorker = (worker: Application['worker']) => {
    setSelectedWorker(worker)
    setContactDialogOpen(true)
  }

  const handleEditJob = (job: Job) => {
    setSelectedJob(job)
    setEditJobDialogOpen(true)
  }

  const handleViewApplications = (job: Job) => {
    setSelectedJob(job)
    setViewApplicationsDialogOpen(true)
  }

  const handleUpdateApplicationStatus = async (applicationId: string, status: string, notes?: string) => {
    try {
      setUpdatingStatus(applicationId)
      await apiClient.updateApplicationStatus(applicationId, { status, employerNotes: notes })
      await fetchApplications() // Refresh applications
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update application status"
      alert(errorMessage)
    } finally {
      setUpdatingStatus(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'reviewed': return 'bg-blue-100 text-blue-800'
      case 'shortlisted': return 'bg-purple-100 text-purple-800'
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600">Manage your jobs and find the perfect workers.</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={handlePostJob}>
          <Plus className="w-4 h-4 mr-2" />
          Post New Job
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{activeJobs.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">{activeJobs.filter(j => j.status === 'in-progress').length} in progress</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{totalApplicants}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">{pendingApplications} pending review</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">{thisWeekApplications}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">New applications</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{jobs.filter(j => j.status === 'completed').length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">Successfully completed</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Jobs */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Active Jobs</span>
                <Badge variant="secondary">{activeJobs.length} active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  <span className="ml-2 text-gray-600">Loading jobs...</span>
                </div>
              ) : activeJobs.length === 0 ? (
                <div className="text-center py-8">
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Active Jobs</h3>
                  <p className="text-gray-600 mb-4">Start by posting your first job to find workers.</p>
                  <Button onClick={handlePostJob} className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Job
                  </Button>
                </div>
              ) : (
                activeJobs.map((job) => (
                  <div key={job._id} className="border rounded-lg p-4 bg-green-50 border-green-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>{job.title?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900">{job.title}</h3>
                          <p className="text-sm text-gray-600">{job.location}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">{job.pay}</Badge>
                            <Badge variant="outline" className="text-xs">{job.payType}</Badge>
                            {job.urgent && (
                              <Badge variant="destructive" className="text-xs">Urgent</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewApplications(job)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Applications
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditJob(job)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                      </div>
                    <p className="text-sm text-gray-700 mb-3">{job.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{applications.filter(app => app.job._id === job._id).length} applications</span>
                      </div>
                      <Badge className={job.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                        {job.status}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

          {/* Recent Applications */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Applications</span>
                <Badge variant="secondary">{applications.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {applicationsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  <span className="ml-2 text-gray-600">Loading...</span>
                </div>
              ) : applications.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Applications</h3>
                  <p className="text-gray-600">Applications will appear here when workers apply for your jobs.</p>
                </div>
              ) : (
                applications.slice(0, 5).map((application) => (
                  <div key={application._id} className="border rounded-lg p-3 bg-white">
                    <div className="flex items-start space-x-3 mb-2">
                <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {`${application.worker.firstName} ${application.worker.lastName}`.split(' ').map((n) => n[0]).join('')}
                        </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 truncate">
                          {application.workerName}
                        </h4>
                        <p className="text-xs text-gray-600 truncate">{application.job.title}</p>
                </div>
                      <Badge className={`text-xs ${getStatusColor(application.status)}`}>
                        {application.status}
                      </Badge>
              </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(application.appliedAt).toLocaleDateString()}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => handleViewApplications(application.job)}
                      >
                        View
                      </Button>
                </div>
              </div>
                ))
              )}
              {applications.length > 5 && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setViewApplicationsDialogOpen(true)}
                >
                  View All Applications
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Applications Dialog */}
      <Dialog open={viewApplicationsDialogOpen} onOpenChange={setViewApplicationsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedJob ? `Applications for ${selectedJob.title}` : 'All Applications'}
            </DialogTitle>
            <DialogDescription>
              Review and manage job applications from workers.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {applicationsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading applications...</span>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Applications</h3>
                <p className="text-gray-600">No applications found for this job.</p>
              </div>
            ) : (
              applications
                .filter(app => !selectedJob || app.job._id === selectedJob._id)
                .map((application) => (
                  <Card key={application._id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>
                            {`${application.worker.firstName} ${application.worker.lastName}`.split(' ').map((n) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900">{application.workerName}</h3>
                          <p className="text-sm text-gray-600">{application.job.title}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-600">{application.workerPhone}</span>
                            <Mail className="w-3 h-3 text-gray-400 ml-2" />
                            <span className="text-xs text-gray-600">{application.worker.email}</span>
              </div>
            </div>
            </div>
                      <Badge className={getStatusColor(application.status)}>
                        {application.status}
                      </Badge>
            </div>

                    {application.message && (
                      <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{application.message}</p>
            </div>
                    )}
                    
                    {application.skills && application.skills.length > 0 && (
                      <div className="mb-2">
                        <span className="font-semibold">Skills:</span> {Array.isArray(application.skills) ? application.skills.join(', ') : application.skills}
            </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <span>Applied on {new Date(application.appliedAt).toLocaleDateString()}</span>
                      <span>Job: {application.job.pay} {application.job.payType}</span>
            </div>

                    <div className="flex space-x-2">
                      <Select
                        value={application.status}
                        onValueChange={(value: string) => handleUpdateApplicationStatus(application._id, value)}
                        disabled={updatingStatus === application._id}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                </SelectTrigger>
                <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="reviewed">Reviewed</SelectItem>
                          <SelectItem value="shortlisted">Shortlisted</SelectItem>
                          <SelectItem value="accepted">Accepted</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleContactWorker(application.worker)}
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Contact
                      </Button>
            </div>

                    {updatingStatus === application._id && (
                      <div className="flex items-center mt-2 text-sm text-gray-600">
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Updating status...
            </div>
                    )}
                  </Card>
                ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Worker Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Worker</DialogTitle>
            <DialogDescription>
              Send a message to the worker.
            </DialogDescription>
          </DialogHeader>
          {selectedWorker && (
          <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>
                    {`${selectedWorker.firstName} ${selectedWorker.lastName}`.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                    </Avatar>
                    <div>
                  <h3 className="font-semibold">{`${selectedWorker.firstName} ${selectedWorker.lastName}`}</h3>
                  <p className="text-sm text-gray-600">{selectedWorker.email}</p>
                  {selectedWorker.phone && (
                    <p className="text-sm text-gray-600">{selectedWorker.phone}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  className="mt-1"
                />
            </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setContactDialogOpen(false)}>
                  Cancel
              </Button>
                <Button>Send Message</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Job Dialog */}
      <Dialog open={editJobDialogOpen} onOpenChange={setEditJobDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
            <DialogDescription>Update the job details below and save your changes.</DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <EditJobForm
              job={selectedJob}
              onCancel={() => setEditJobDialogOpen(false)}
              onSave={async (updatedJob) => {
                try {
                  await apiClient.updateJob(selectedJob._id, updatedJob)
                  await fetchJobs()
                  setEditJobDialogOpen(false)
                } catch {
                  alert('Failed to update job')
                }
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// EditJobForm component for editing job details
function EditJobForm({ job, onCancel, onSave }: {
  job: Job,
  onCancel: () => void,
  onSave: (updatedJob: Job) => void
}) {
  const [formData, setFormData] = useState({
    title: job.title,
    description: job.description,
    location: job.location,
    budget: job.budget,
    payType: job.payType,
    duration: job.duration || '',
    date: job.date || '',
    requirements: job.requirements || [],
    urgent: job.urgent,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...job, ...formData })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="budget">Budget</Label>
        <Input id="budget" name="budget" type="number" value={formData.budget} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="payType">Pay Type</Label>
        <Input id="payType" name="payType" value={formData.payType} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="duration">Duration</Label>
        <Input id="duration" name="duration" value={formData.duration} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" value={formData.date} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="requirements">Requirements</Label>
        <Textarea id="requirements" name="requirements" value={formData.requirements.join('\n')} onChange={(e) => setFormData({ ...formData, requirements: e.target.value.split('\n') })} />
      </div>
      <div className="flex items-center space-x-2">
        <input id="urgent" name="urgent" type="checkbox" checked={formData.urgent} onChange={handleChange} />
        <Label htmlFor="urgent">Urgent</Label>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
