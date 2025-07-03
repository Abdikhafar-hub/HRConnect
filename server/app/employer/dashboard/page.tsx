"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Plus,
  Wallet,
  Briefcase,
  Star,
  Users,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export default function EmployerDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Sarah!</h1>
          <p className="text-gray-600">Manage your jobs and find the perfect workers.</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
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
                <p className="text-sm font-medium text-gray-600">Wallet Balance</p>
                <p className="text-2xl font-bold text-gray-900">KSh 25,000</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">Available for jobs</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">2 in progress</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.9</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">From 12 reviews</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applicants</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">+5 this week</span>
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
                <Badge variant="secondary">3 active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>JM</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">House Cleaning</h3>
                      <p className="text-sm text-gray-600">John Mwangi</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">In Progress</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    Westlands, Nairobi
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    Today, 9:00 AM
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    KSh 2,500
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Started
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Mark Complete
                  </Button>
                  <Button size="sm" variant="outline">
                    Contact Worker
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">Garden Maintenance</h3>
                    <p className="text-sm text-gray-600">5 applicants</p>
                  </div>
                  <Badge variant="outline">Open</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    Karen, Nairobi
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    Tomorrow, 8:00 AM
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    KSh 3,000
                  </div>
                  <div className="flex items-center text-orange-600">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Needs Review
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Review Applicants
                  </Button>
                  <Button size="sm" variant="outline">
                    Edit Job
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">Office Cleaning</h3>
                    <p className="text-sm text-gray-600">8 applicants</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Reviewing</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    CBD, Nairobi
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    Dec 16, 6:00 PM
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    KSh 2,200
                  </div>
                  <div className="flex items-center text-blue-600">
                    <Users className="w-4 h-4 mr-2" />8 applicants
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Select Worker
                  </Button>
                  <Button size="sm" variant="outline">
                    View Applications
                  </Button>
                </div>
              </div>
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
              <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Users className="w-4 h-4 mr-2" />
                Find Workers
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Wallet className="w-4 h-4 mr-2" />
                Add Funds
              </Button>
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>MW</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Mary Wanjiku</p>
                  <p className="text-xs text-gray-600">Garden Maintenance</p>
                </div>
                <Badge className="bg-green-100 text-green-800 text-xs">New</Badge>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>PK</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Peter Kamau</p>
                  <p className="text-xs text-gray-600">Office Cleaning</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  2h ago
                </Badge>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>GM</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Grace Muthoni</p>
                  <p className="text-xs text-gray-600">Office Cleaning</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  5h ago
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recent Payments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">House Cleaning</p>
                  <p className="text-xs text-gray-600">John Mwangi • Dec 12</p>
                </div>
                <span className="font-semibold text-red-600">-KSh 2,500</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Garden Work</p>
                  <p className="text-xs text-gray-600">David Kimani • Dec 10</p>
                </div>
                <span className="font-semibold text-red-600">-KSh 3,000</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Office Cleaning</p>
                  <p className="text-xs text-gray-600">Mary Wanjiku • Dec 8</p>
                </div>
                <span className="font-semibold text-red-600">-KSh 2,200</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
