"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Wallet, Briefcase, Star, TrendingUp, MapPin, Clock, DollarSign, CheckCircle, AlertCircle } from "lucide-react"

export default function WorkerDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600">Here's what's happening with your work today.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">Find New Jobs</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Balance</p>
                <p className="text-2xl font-bold text-gray-900">KSh 15,400</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">1 starting today</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">From 23 reviews</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">KSh 12,300</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600">8 jobs completed</span>
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
                <Badge variant="secondary">2 active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">House Cleaning</h3>
                      <p className="text-sm text-gray-600">Sarah Johnson</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Today</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    Westlands, Nairobi
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    9:00 AM - 1:00 PM
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    KSh 2,500
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirmed
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Check In
                  </Button>
                  <Button size="sm" variant="outline">
                    Contact Client
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>DK</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">Garden Maintenance</h3>
                      <p className="text-sm text-gray-600">David Kimani</p>
                    </div>
                  </div>
                  <Badge variant="outline">Tomorrow</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    Karen, Nairobi
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    8:00 AM - 2:00 PM
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    KSh 3,000
                  </div>
                  <div className="flex items-center text-orange-600">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Pending
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Contact Client
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
                  <p className="font-medium text-sm">Today</p>
                  <p className="text-xs text-gray-600">House Cleaning</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">9:00 AM</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Tomorrow</p>
                  <p className="text-xs text-gray-600">Garden Work</p>
                </div>
                <Badge variant="outline">8:00 AM</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Wednesday</p>
                  <p className="text-xs text-gray-600">Available</p>
                </div>
                <Badge variant="secondary">Free</Badge>
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
                  <p className="font-medium text-sm">Office Cleaning</p>
                  <p className="text-xs text-gray-600">Dec 12</p>
                </div>
                <span className="font-semibold text-green-600">+KSh 2,200</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">House Cleaning</p>
                  <p className="text-xs text-gray-600">Dec 10</p>
                </div>
                <span className="font-semibold text-green-600">+KSh 2,500</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Garden Work</p>
                  <p className="text-xs text-gray-600">Dec 8</p>
                </div>
                <span className="font-semibold text-green-600">+KSh 3,000</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
