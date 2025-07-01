"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Smartphone,
  TrendingDown,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
} from "lucide-react"

export default function EmployerWalletPage() {
  const [topUpAmount, setTopUpAmount] = useState("")
  const [topUpMethod, setTopUpMethod] = useState("")

  const [walletStats] = useState({
    availableBalance: 25000,
    escrowBalance: 8700,
    totalSpent: 156000,
    thisMonth: 18500,
  })

  const [transactions] = useState([
    {
      id: 1,
      type: "payment",
      description: "House Cleaning - John Mwangi",
      amount: -2500,
      date: "Dec 14, 2024",
      time: "3:00 PM",
      status: "completed",
      jobId: "JOB-001",
    },
    {
      id: 2,
      type: "topup",
      description: "M-Pesa Top Up",
      amount: 15000,
      date: "Dec 12, 2024",
      time: "9:30 AM",
      status: "completed",
      reference: "MPX987654321",
    },
    {
      id: 3,
      type: "escrow",
      description: "Garden Maintenance - David Kimani",
      amount: -3000,
      date: "Dec 11, 2024",
      time: "2:15 PM",
      status: "held",
      jobId: "JOB-002",
    },
    {
      id: 4,
      type: "payment",
      description: "Office Cleaning - Mary Wanjiku",
      amount: -2200,
      date: "Dec 10, 2024",
      time: "6:45 PM",
      status: "completed",
      jobId: "JOB-003",
    },
    {
      id: 5,
      type: "refund",
      description: "Cancelled Job Refund",
      amount: 1800,
      date: "Dec 8, 2024",
      time: "11:20 AM",
      status: "completed",
      jobId: "JOB-004",
    },
    {
      id: 6,
      type: "topup",
      description: "Bank Transfer",
      amount: 20000,
      date: "Dec 5, 2024",
      time: "10:00 AM",
      status: "completed",
      reference: "BNK123456789",
    },
  ])

  const [escrowPayments] = useState([
    {
      id: 1,
      jobTitle: "Garden Maintenance",
      worker: "David Kimani",
      amount: 3000,
      heldSince: "Dec 11, 2024",
      releaseDate: "Dec 16, 2024",
      status: "in_progress",
    },
    {
      id: 2,
      jobTitle: "Construction Helper",
      worker: "Peter Kamau",
      amount: 4500,
      heldSince: "Dec 10, 2024",
      releaseDate: "Dec 15, 2024",
      status: "completed_pending",
    },
    {
      id: 3,
      jobTitle: "House Cleaning",
      worker: "Grace Muthoni",
      amount: 1200,
      heldSince: "Dec 9, 2024",
      releaseDate: "Dec 14, 2024",
      status: "ready_to_release",
    },
  ])

  const topUpMethods = [
    { value: "mpesa", label: "M-Pesa", icon: Smartphone },
    { value: "airtel", label: "Airtel Money", icon: Smartphone },
    { value: "mtn", label: "MTN Mobile Money", icon: Smartphone },
    { value: "bank", label: "Bank Transfer", icon: CreditCard },
    { value: "card", label: "Credit/Debit Card", icon: CreditCard },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">My Wallet</h1>
          <p className="text-gray-600">Manage your payments and funding</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Wallet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Wallet className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-green-600">
                KSh {walletStats.availableBalance.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Available Balance</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-10 h-10 text-orange-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-orange-600">KSh {walletStats.escrowBalance.toLocaleString()}</div>
              <div className="text-sm text-gray-600">In Escrow</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <TrendingDown className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold">KSh {walletStats.thisMonth.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Spent This Month</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <ArrowDownLeft className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold">KSh {walletStats.totalSpent.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Add Money */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Add Money to Wallet</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="amount">Amount (KSh)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="method">Payment Method</Label>
                    <Select value={topUpMethod} onValueChange={setTopUpMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        {topUpMethods.map((method) => {
                          const Icon = method.icon
                          return (
                            <SelectItem key={method.value} value={method.value}>
                              <div className="flex items-center space-x-2">
                                <Icon className="w-4 h-4" />
                                <span>{method.label}</span>
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" disabled={!topUpAmount || !topUpMethod}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Money
                  </Button>
                </div>
              </div>

              {/* Escrow Summary */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Escrow Payments</h3>
                <div className="space-y-3">
                  {escrowPayments.slice(0, 3).map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{payment.jobTitle}</p>
                        <p className="text-xs text-gray-600">{payment.worker}</p>
                        <Badge
                          variant={
                            payment.status === "ready_to_release"
                              ? "default"
                              : payment.status === "completed_pending"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs mt-1"
                        >
                          {payment.status === "ready_to_release"
                            ? "Ready to Release"
                            : payment.status === "completed_pending"
                              ? "Completed"
                              : "In Progress"}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-orange-600">KSh {payment.amount.toLocaleString()}</p>
                        {payment.status === "ready_to_release" && (
                          <Button size="sm" className="mt-1">
                            Release
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Escrow
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Transaction History</h2>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="topups">Top Ups</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-4">
            {transactions.map((transaction) => (
              <Card key={transaction.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === "topup" || transaction.type === "refund"
                            ? "bg-green-100 text-green-600"
                            : transaction.type === "escrow"
                              ? "bg-orange-100 text-orange-600"
                              : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {transaction.type === "topup" || transaction.type === "refund" ? (
                          <ArrowUpRight className="w-5 h-5" />
                        ) : (
                          <ArrowDownLeft className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {transaction.date} at {transaction.time}
                          </span>
                        </div>
                        {transaction.jobId && <p className="text-xs text-gray-500">Job ID: {transaction.jobId}</p>}
                        {transaction.reference && <p className="text-xs text-gray-500">Ref: {transaction.reference}</p>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${
                          transaction.amount > 0
                            ? "text-green-600"
                            : transaction.type === "escrow"
                              ? "text-orange-600"
                              : "text-blue-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}KSh {Math.abs(transaction.amount).toLocaleString()}
                      </div>
                      <div className="flex items-center space-x-1">
                        {transaction.status === "completed" ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : transaction.status === "held" ? (
                          <Clock className="w-4 h-4 text-orange-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-600" />
                        )}
                        <Badge
                          variant={
                            transaction.status === "completed"
                              ? "secondary"
                              : transaction.status === "held"
                                ? "default"
                                : "destructive"
                          }
                          className={
                            transaction.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : transaction.status === "held"
                                ? "bg-orange-100 text-orange-800"
                                : ""
                          }
                        >
                          {transaction.status === "held" ? "In Escrow" : transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            {transactions
              .filter((t) => t.type === "payment" || t.type === "escrow")
              .map((transaction) => (
                <Card key={transaction.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "escrow"
                              ? "bg-orange-100 text-orange-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          <ArrowDownLeft className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {transaction.date} at {transaction.time}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">Job ID: {transaction.jobId}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-lg font-bold ${
                            transaction.type === "escrow" ? "text-orange-600" : "text-blue-600"
                          }`}
                        >
                          KSh {Math.abs(transaction.amount).toLocaleString()}
                        </div>
                        <Badge
                          variant={transaction.status === "completed" ? "secondary" : "default"}
                          className={
                            transaction.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : transaction.status === "held"
                                ? "bg-orange-100 text-orange-800"
                                : ""
                          }
                        >
                          {transaction.status === "held" ? "In Escrow" : transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="topups" className="space-y-4">
            {transactions
              .filter((t) => t.type === "topup" || t.type === "refund")
              .map((transaction) => (
                <Card key={transaction.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {transaction.date} at {transaction.time}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">Ref: {transaction.reference}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          +KSh {transaction.amount.toLocaleString()}
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
