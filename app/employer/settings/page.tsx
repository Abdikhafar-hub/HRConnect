"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Bell, Shield, CreditCard, Smartphone, Mail, Lock, Eye, Download, Building } from "lucide-react"

export default function EmployerSettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 px-2 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Business Settings */}
          <div className="bg-white/70 backdrop-blur-md border border-blue-100 shadow-xl rounded-2xl p-8 transition-transform hover:scale-[1.01] hover:shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Business Settings</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="business-name">Business Name</Label>
                <Input id="business-name" placeholder="Your business name" />
              </div>
              <div>
                <Label htmlFor="business-type">Business Type</Label>
                <Select defaultValue="individual">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="small-business">Small Business</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                    <SelectItem value="contractor">Contractor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="tax-id">Tax ID (Optional)</Label>
              <Input id="tax-id" placeholder="Enter your tax identification number" />
            </div>
          </div>
          {/* Notification Preferences */}
          <div className="bg-white/70 backdrop-blur-md border border-purple-100 shadow-xl rounded-2xl p-8 transition-transform hover:scale-[1.01] hover:shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Notification Preferences</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Applications</p>
                <p className="text-sm text-gray-600">Get notified when workers apply to your jobs</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Job Completion</p>
                <p className="text-sm text-gray-600">Receive updates when jobs are completed</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Payment Reminders</p>
                <p className="text-sm text-gray-600">Reminders about pending payments</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Reports</p>
                <p className="text-sm text-gray-600">Get weekly summaries of your hiring activity</p>
              </div>
              <Switch />
            </div>
          </div>
          {/* Hiring Preferences */}
          <div className="bg-white/70 backdrop-blur-md border border-green-100 shadow-xl rounded-2xl p-8 transition-transform hover:scale-[1.01] hover:shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Hiring Preferences</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-match Workers</p>
                <p className="text-sm text-gray-600">Automatically suggest workers for your jobs</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Verified Workers Only</p>
                <p className="text-sm text-gray-600">Only show verified workers in search results</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="max-distance">Maximum Distance (km)</Label>
                <Select defaultValue="10">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 km</SelectItem>
                    <SelectItem value="10">10 km</SelectItem>
                    <SelectItem value="20">20 km</SelectItem>
                    <SelectItem value="50">50 km</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="min-rating">Minimum Rating</Label>
                <Select defaultValue="4.0">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3.0">3.0+</SelectItem>
                    <SelectItem value="3.5">3.5+</SelectItem>
                    <SelectItem value="4.0">4.0+</SelectItem>
                    <SelectItem value="4.5">4.5+</SelectItem>
                    <SelectItem value="none">No minimum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          {/* Privacy & Security */}
          <div className="bg-white/70 backdrop-blur-md border border-gray-100 shadow-xl rounded-2xl p-8 transition-transform hover:scale-[1.01] hover:shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gray-700 to-blue-600 bg-clip-text text-transparent">Privacy & Security</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Profile Visibility</p>
                <p className="text-sm text-gray-600">Control who can see your employer profile</p>
              </div>
              <Select defaultValue="public">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="verified">Verified Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Contact Info</p>
                <p className="text-sm text-gray-600">Display contact information to workers</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add extra security to your account</p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <div className="space-y-8">
          {/* Account Actions */}
          <div className="bg-white/60 backdrop-blur-lg border border-blue-200 shadow-lg rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Account Actions</h3>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Eye className="w-4 h-4 mr-2" />
              View Public Profile
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download Data
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
          </div>
          {/* Payment Methods */}
          <div className="bg-white/60 backdrop-blur-lg border border-green-200 shadow-lg rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2"><CreditCard className="w-5 h-5" /> Payment Methods</h3>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-sm">M-Pesa</p>
                  <p className="text-xs text-gray-600">+254 711 ***654</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-sm">Visa Card</p>
                  <p className="text-xs text-gray-600">****1234</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              Add Payment Method
            </Button>
          </div>
          {/* Support */}
          <div className="bg-white/60 backdrop-blur-lg border border-purple-200 shadow-lg rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Support</h3>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Help Center
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
