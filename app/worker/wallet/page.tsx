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
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

export default function WorkerWalletPage() {
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawMethod, setWithdrawMethod] = useState("")

  const [walletStats] = useState({
    availableBalance: 15400,
    pendingEarnings: 5200,
    totalEarned: 87650,
    thisMonth: 12300,
  })

  const [transactions] = useState([
    {
      id: 1,
      type: "earning",
      description: "House Cleaning - Sarah Johnson",
      amount: 2500,
      date: "Dec 14, 2024",
      time: "2:30 PM",
      status: "completed",
      jobId: "JOB-001",
    },
    {
      id: 2,
      type: "withdrawal",
      description: "M-Pesa Withdrawal",
      amount: -8000,
      date: "Dec 12, 2024",
      time: "10:15 AM",
      status: "completed",
      reference: "MPX123456789",
    },
    {
      id: 3,
      type: "earning",
      description: "Garden Maintenance - David Kimani",
      amount: 3000,
      date: "Dec 11, 2024",
      time: "4:45 PM",
      status: "completed",
      jobId: "JOB-002",
    },
    {
      id: 4,
      type: "earning",
      description: "Office Cleaning - Tech Hub Ltd",
      amount: 2200,
      date: "Dec 10, 2024",
      time: "7:20 PM",
      status: "pending",
      jobId: "JOB-003",
    },
    {
      id: 5,
      type: "earning",
      description: "Construction Helper - Mwangi Builders",
      amount: 7500,
      date: "Dec 8, 2024",
      time: "5:00 PM",
      status: "completed",
      jobId: "JOB-004",
    },
    {
      id: 6,
      type: "withdrawal",
      description: "Airtel Money Withdrawal",
      amount: -5000,
      date: "Dec 6, 2024",
      time: "11:30 AM",
      status: "completed",
      reference: "ATL987654321",
    },
  ])

  const [pendingPayments] = useState([
    {
      id: 1,
      jobTitle: "Office Cleaning",
      employer: "Tech Hub Ltd",
      amount: 2200,
      dueDate: "Dec 16, 2024",
      daysLeft: 2,
    },
    {
      id: 2,
      jobTitle: "House Cleaning",
      employer: "Mary Wanjiku",
      amount: 1800,
      dueDate: "Dec 17, 2024",
      daysLeft: 3,
    },
    {
      id: 3,
      jobTitle: "Garden Work",
      employer: "Peter Kamau",
      amount: 1200,
      dueDate: "Dec 18, 2024",
      daysLeft: 4,
    },
  ])

  const withdrawalMethods = [
    { value: "mpesa", label: "M-Pesa", icon: Smartphone },
    { value: "airtel", label: "Airtel Money", icon: Smartphone },
    { value: "mtn", label: "MTN Mobile Money", icon: Smartphone },
    { value: "bank", label: "Bank Transfer", icon: CreditCard },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">My Wallet</h1>
          <p className="text-gray-600">Manage your earnings and withdrawals</p>
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
              <div className="text-3xl font-bold text-orange-600">
                KSh {walletStats.pendingEarnings.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Pending Earnings</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold">KSh {walletStats.thisMonth.toLocaleString()}</div>
              <div className="text-sm text-gray-600">This Month</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <ArrowUpRight className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold">KSh {walletStats.totalEarned.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Earned</div>
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
              {/* Withdraw Money */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Withdraw Money</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="amount">Amount (KSh)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="method">Withdrawal Method</Label>
                    <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        {withdrawalMethods.map((method) => {
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
                  <Button
                    className="w-full"
                    disabled={
                      !withdrawAmount ||
                      !withdrawMethod ||
                      Number.parseInt(withdrawAmount) > walletStats.availableBalance
                    }
                  >
                    <ArrowDownLeft className="w-4 h-4 mr-2" />
                    Withdraw Money
                  </Button>
                  {Number.parseInt(withdrawAmount) > walletStats.availableBalance && (
                    <p className="text-sm text-red-600">Insufficient balance</p>
                  )}
                </div>
              </div>

              {/* Pending Payments Summary */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pending Payments</h3>
                <div className="space-y-3">
                  {pendingPayments.slice(0, 3).map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{payment.jobTitle}</p>
                        <p className="text-xs text-gray-600">{payment.employer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">KSh {payment.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">{payment.daysLeft} days left</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Pending
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
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
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
                          transaction.type === "earning" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {transaction.type === "earning" ? (
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
                        className={`text-lg font-bold ${transaction.amount > 0 ? "text-green-600" : "text-blue-600"}`}
                      >
                        {transaction.amount > 0 ? "+" : ""}KSh {Math.abs(transaction.amount).toLocaleString()}
                      </div>
                      <div className="flex items-center space-x-1">
                        {transaction.status === "completed" ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : transaction.status === "pending" ? (
                          <Clock className="w-4 h-4 text-orange-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-600" />
                        )}
                        <Badge
                          variant={
                            transaction.status === "completed"
                              ? "secondary"
                              : transaction.status === "pending"
                                ? "default"
                                : "destructive"
                          }
                          className={
                            transaction.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : transaction.status === "pending"
                                ? "bg-orange-100 text-orange-800"
                                : ""
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="earnings" className="space-y-4">
            {transactions
              .filter((t) => t.type === "earning")
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
                          <p className="text-xs text-gray-500">Job ID: {transaction.jobId}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          +KSh {transaction.amount.toLocaleString()}
                        </div>
                        <Badge
                          variant={transaction.status === "completed" ? "secondary" : "default"}
                          className={
                            transaction.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="withdrawals" className="space-y-4">
            {transactions
              .filter((t) => t.type === "withdrawal")
              .map((transaction) => (
                <Card key={transaction.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
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
                          <p className="text-xs text-gray-500">Ref: {transaction.reference}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">
                          KSh {Math.abs(transaction.amount).toLocaleString()}
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
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
