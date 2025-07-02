"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, Card_Header, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Users,
  Briefcase,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function AdminDashboard() {
  const [stats] = useState({
    totalUsers: 15420,
    activeJobs: 342,
    totalJobs: 8765,
    disputes: 23,
    revenue: 125000,
    newUsers: 156,
  })

  const [pendingVerifications] = useState([
    {
      id: 1,
      name: "John Mwangi",
      type: "worker",
      phone: "+254700123456",
      location: "Nairobi",
      submittedAt: "2024-12-14 10:30",
      documents: ["ID", "Selfie"],
    },
    {
      id: 2,
      name: "Sarah Johnson",
      type: "employer",
      phone: "+254711987654",
      location: "Mombasa",
      submittedAt: "2024-12-14 09:15",
      documents: ["ID", "Business License"],
    },
  ])

  const [disputes] = useState([
    {
      id: 1,
      jobTitle: "House Cleaning",
      worker: "Mary Wanjiku",
      employer: "David Kimani",
      issue: "Payment not released",
      status: "open",
      reportedAt: "2024-12-13 14:20",
      amount: "KSh 2,500",
    },
    {
      id: 2,
      jobTitle: "Garden Maintenance",
      worker: "Peter Kamau",
      employer: "Grace Muthoni",
      issue: "Work not completed",
      status: "investigating",
      reportedAt: "2024-12-12 16:45",
      amount: "KSh 3,000",
    },
  ])

  const [flaggedUsers] = useState([
    {
      id: 1,
      name: "James Ochieng",
      type: "worker",
      reason: "Multiple no-shows",
      reports: 3,
      lastActive: "2024-12-10",
      status: "under_review",
    },
    {
      id: 2,
      name: "Tech Solutions Ltd",
      type: "employer",
      reason: "Late payments",
      reports: 2,
      lastActive: "2024-12-11",
      status: "warning_issued",
    },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-600">WorkConnect Platform Management</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input placeholder="Search users, jobs..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Users</div>
              <div className="text-xs text-green-600 mt-1">+{stats.newUsers} this week</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Briefcase className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.activeJobs}</div>
              <div className="text-sm text-gray-600">Active Jobs</div>
              <div className="text-xs text-blue-600 mt-1">{stats.totalJobs.toLocaleString()} total</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.disputes}</div>
              <div className="text-sm text-gray-600">Open Disputes</div>
              <div className="text-xs text-red-600 mt-1">Needs attention</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">KSh {stats.revenue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Revenue (MTD)</div>
              <div className="text-xs text-green-600 mt-1">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                +12%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">2</div>
              <div className="text-sm text-gray-600">Pending Verifications</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Ban className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">2</div>
              <div className="text-sm text-gray-600">Flagged Users</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="verifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="verifications">Verifications</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
            <TabsTrigger value="flagged">Flagged Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="verifications" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Pending Verifications</h2>
              <Badge variant="secondary">{pendingVerifications.length} pending</Badge>
            </div>

            {pendingVerifications.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.png?height=50&width=50" />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-gray-600">{user.phone}</p>
                        <p className="text-sm text-gray-500">{user.location}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant={user.type === "worker" ? "default" : "secondary"}>{user.type}</Badge>
                          <span className="text-xs text-gray-500">Submitted: {user.submittedAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Review
                      </Button>
                      <Button variant="outline" size="sm" className="text-green-600 bg-transparent">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Documents submitted:</p>
                    <div className="flex space-x-2">
                      {user.documents.map((doc) => (
                        <Badge key={doc} variant="outline">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="disputes" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Active Disputes</h2>
              <Badge variant="destructive">{disputes.length} open</Badge>
            </div>

            {disputes.map((dispute) => (
              <Card key={dispute.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{dispute.jobTitle}</h3>
                      <p className="text-gray-600">{dispute.issue}</p>
                      <p className="text-sm text-gray-500 mt-1">Reported: {dispute.reportedAt}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{dispute.amount}</div>
                      <Badge variant={dispute.status === "open" ? "destructive" : "secondary"}>
                        {dispute.status === "open" ? "Open" : "Investigating"}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Worker</p>
                      <p>{dispute.worker}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Employer</p>
                      <p>{dispute.employer}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm">Resolve Dispute</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="flagged" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Flagged Users</h2>
              <Badge variant="secondary">{flaggedUsers.length} flagged</Badge>
            </div>

            {flaggedUsers.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.png?height=50&width=50" />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-gray-600">{user.reason}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant={user.type === "worker" ? "default" : "secondary"}>{user.type}</Badge>
                          <Badge variant="destructive">{user.reports} reports</Badge>
                          <span className="text-xs text-gray-500">Last active: {user.lastActive}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Investigate
                      </Button>
                      <Button variant="outline" size="sm" className="text-orange-600 bg-transparent">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Warn
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                        <Ban className="w-4 h-4 mr-2" />
                        Suspend
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>New user registrations over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    [Chart: User Growth Over Time]
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Job Categories</CardTitle>
                  <CardDescription>Most popular job types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>House Cleaning</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 rounded">
                          <div className="w-20 h-2 bg-blue-600 rounded"></div>
                        </div>
                        <span className="text-sm">2,341</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Construction</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 rounded">
                          <div className="w-16 h-2 bg-green-600 rounded"></div>
                        </div>
                        <span className="text-sm">1,876</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Delivery</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 rounded">
                          <div className="w-12 h-2 bg-purple-600 rounded"></div>
                        </div>
                        <span className="text-sm">1,234</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Platform revenue over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">[Chart: Revenue Trends]</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Health</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Job Completion Rate</span>
                      <span className="font-semibold text-green-600">94.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Rating</span>
                      <span className="font-semibold">4.7/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dispute Rate</span>
                      <span className="font-semibold text-orange-600">2.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>User Retention (30d)</span>
                      <span className="font-semibold text-blue-600">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
