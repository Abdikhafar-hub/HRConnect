"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Bell, Shield, Globe, CreditCard, Smartphone, Mail, Lock, Eye, Download } from "lucide-react"
import clsx from "clsx"

export default function WorkerSettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-blue-700 mb-1 drop-shadow-sm">Settings</h1>
        <p className="text-lg text-gray-600">Manage your account preferences and privacy settings</p>
      </div>

      <div className="container mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-8">
            {/* Notifications */}
            <Card className="bg-white/90 shadow-xl rounded-2xl animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-yellow-600">
                  <Bell className="w-5 h-5 text-yellow-400" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Job Alerts</p>
                    <p className="text-sm text-gray-600">Get notified about new job opportunities</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Payment Notifications</p>
                    <p className="text-sm text-gray-600">Receive updates about payments and earnings</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-600">Receive important updates via SMS</p>
                  </div>
                  <Switch className="data-[state=checked]:bg-green-500" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-600">Get weekly summaries and updates</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card className="bg-white/90 shadow-xl rounded-2xl animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-700">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span>Privacy & Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Profile Visibility</p>
                    <p className="text-sm text-gray-600">Control who can see your profile</p>
                  </div>
                  <Select defaultValue="public">
                    <SelectTrigger className="w-32 rounded-full border-2 border-blue-100 focus:border-blue-400">
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
                    <p className="font-medium">Show Location</p>
                    <p className="text-sm text-gray-600">Display your location to employers</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add extra security to your account</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full border-blue-200 text-blue-700">Enable</Button>
                </div>
              </CardContent>
            </Card>

            {/* Language & Region */}
            <Card className="bg-white/90 shadow-xl rounded-2xl animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <Globe className="w-5 h-5 text-green-500" />
                  <span>Language & Region</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="rounded-full border-2 border-green-100 focus:border-green-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="sw">Kiswahili</SelectItem>
                        <SelectItem value="ha">Hausa</SelectItem>
                        <SelectItem value="am">Amharic</SelectItem>
                        <SelectItem value="ar">Arabic</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="eat">
                      <SelectTrigger className="rounded-full border-2 border-green-100 focus:border-green-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                        <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
                        <SelectItem value="wat">West Africa Time (WAT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Account Actions */}
            <Card className="bg-white/90 shadow-xl rounded-2xl animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-blue-700">Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent rounded-full border-blue-200 text-blue-700">
                  <Eye className="w-4 h-4 mr-2 text-blue-500" />
                  View Public Profile
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent rounded-full border-purple-200 text-purple-700">
                  <Download className="w-4 h-4 mr-2 text-purple-500" />
                  Download Data
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent rounded-full border-green-200 text-green-700">
                  <Lock className="w-4 h-4 mr-2 text-green-500" />
                  Change Password
                </Button>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="bg-white/90 shadow-xl rounded-2xl animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-purple-700">
                  <CreditCard className="w-5 h-5 text-purple-500" />
                  <span>Payment Methods</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-sm">M-Pesa</p>
                      <p className="text-xs text-gray-600">+254 700 ***456</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-700">Edit</Button>
                </div>
                <Button variant="outline" className="w-full bg-transparent rounded-full border-green-200 text-green-700">
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="bg-white/90 shadow-xl rounded-2xl animate-fade-in-up">
              <CardHeader>
                <CardTitle className="text-green-700">Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent rounded-full border-blue-200 text-blue-700">
                  <Mail className="w-4 h-4 mr-2 text-blue-500" />
                  Contact Support
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent rounded-full border-green-200 text-green-700">
                  Help Center
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent rounded-full border-red-200">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
