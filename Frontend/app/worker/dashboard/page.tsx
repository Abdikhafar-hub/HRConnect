"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Wallet, Briefcase, Star, TrendingUp, MapPin, Clock, DollarSign, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { apiClient } from "../../lib/apiClient"

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  budget: number;
  status: string;
  createdAt: string;
  employer?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function WorkerDashboard() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [appliedCount, setAppliedCount] = useState<number>(0)

  // Polling for real-time updates
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      try {
        const res = await fetch('https://hrconnect-xq5c.onrender.com/api/jobs')
        const data = await res.json()
        setJobs(data.data || [])
      } catch {
        setJobs([])
      }
      setLoading(false)
    }
    fetchJobs()
    // Fetch jobs applied count
    const fetchAppliedCount = async () => {
      try {
        const res = await apiClient.getWorkerApplications()
        setAppliedCount(Array.isArray(res.data) ? res.data.length : 0)
      } catch {
        setAppliedCount(0)
      }
    }
    fetchAppliedCount()
  }, [])

  // Calculate dynamic stats
  const activeJobs = jobs.filter(j => j.status === 'open' || j.status === 'in-progress')

  const handleApply = (job: Job) => {
    if (!job.employer || !job.employer.email) {
      alert('Employer email not available for this job.');
      return;
    }
    const subject = encodeURIComponent(`Job Application for ${job.title}`);
    const body = encodeURIComponent(
      `Hello ${job.employer.firstName},\n\nI am interested in your job posting for &quot;${job.title}&quot;.\n\n[Add your message here]\n\nBest regards,\n[Your Name]`
    );
    window.open(`mailto:${job.employer.email}?subject=${subject}&body=${body}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600">Here&apos;s what&apos;s happening with your work today.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">Find New Jobs</Button>
      </div>

      {/* Stats Cards (dynamic or minimal) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Jobs Applied</p>
                <p className="text-2xl font-bold text-gray-900">{appliedCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">{appliedCount > 0 ? `${appliedCount} total` : 'No applications yet'}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{activeJobs.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">{activeJobs.length > 0 ? `${activeJobs.filter(j => j.status === 'in-progress').length} in progress` : '—'}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-gray-900">—</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">From — reviews</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">—</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">—</span>
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
                <div>Loading jobs...</div>
              ) : activeJobs.length === 0 ? (
                <div>No jobs found.</div>
              ) : (
                activeJobs.map((job) => (
                  <div key={job._id} className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>{job.title?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900">{job.title}</h3>
                          <p className="text-sm text-gray-600">{job.location}</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">{job.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {new Date(job.createdAt).toLocaleString()}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        KSh {job.budget}
                      </div>
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {job.status === 'in-progress' ? 'Started' : job.status}
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => handleApply(job)}>
                        Apply
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => { setSelectedJob(job); setShowModal(true); }}>
                        View Details
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                <Briefcase className="w-4 h-4 mr-2" />
                Find New Jobs
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Wallet className="w-4 h-4 mr-2" />
                Withdraw Money
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Star className="w-4 h-4 mr-2" />
                View Reviews
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">—</p>
                  <p className="text-xs text-gray-600">—</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">—</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">—</p>
                  <p className="text-xs text-gray-600">—</p>
                </div>
                <Badge variant="outline">—</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">—</p>
                  <p className="text-xs text-gray-600">—</p>
                </div>
                <Badge variant="secondary">—</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recent Earnings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Earnings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">—</p>
                  <p className="text-xs text-gray-600">—</p>
                </div>
                <span className="font-semibold text-green-600">—</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">—</p>
                  <p className="text-xs text-gray-600">—</p>
                </div>
                <span className="font-semibold text-green-600">—</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">—</p>
                  <p className="text-xs text-gray-600">—</p>
                </div>
                <span className="font-semibold text-green-600">—</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showModal && selectedJob && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedJob.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <div><strong>Location:</strong> {selectedJob.location}</div>
              <div><strong>Budget:</strong> KSh {selectedJob.budget}</div>
              <div><strong>Description:</strong> {selectedJob.description}</div>
              <div><strong>Employer:</strong> {selectedJob.employer?.firstName} {selectedJob.employer?.lastName}</div>
              <div><strong>Status:</strong> {selectedJob.status}</div>
              {/* Add more fields as needed */}
            </div>
            <DialogFooter>
              <Button onClick={() => setShowModal(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
