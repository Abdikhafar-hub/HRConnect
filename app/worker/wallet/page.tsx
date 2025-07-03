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
import clsx from "clsx"

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-green-700 mb-2 drop-shadow-sm">My Wallet</h1>
          <p className="text-lg text-gray-600">Manage your earnings and withdrawals</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10">
        {/* Wallet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="bg-gradient-to-br from-green-100 to-white/80 shadow-xl rounded-2xl animate-fade-in-up">
            <CardContent className="p-8 text-center">
              <Wallet className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <div className="text-4xl font-extrabold text-green-700">KSh {walletStats.availableBalance.toLocaleString()}</div>
              <div className="text-base text-gray-600">Available Balance</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-100 to-white/80 shadow-xl rounded-2xl animate-fade-in-up">
            <CardContent className="p-8 text-center">
              <Clock className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <div className="text-4xl font-extrabold text-orange-600">KSh {walletStats.pendingEarnings.toLocaleString()}</div>
              <div className="text-base text-gray-600">Pending Earnings</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-100 to-white/80 shadow-xl rounded-2xl animate-fade-in-up">
            <CardContent className="p-8 text-center">
              <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <div className="text-4xl font-extrabold text-blue-700">KSh {walletStats.thisMonth.toLocaleString()}</div>
              <div className="text-base text-gray-600">This Month</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-100 to-white/80 shadow-xl rounded-2xl animate-fade-in-up">
            <CardContent className="p-8 text-center">
              <ArrowUpRight className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <div className="text-4xl font-extrabold text-purple-700">KSh {walletStats.totalEarned.toLocaleString()}</div>
              <div className="text-base text-gray-600">Total Earned</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Pending Payments */}
        <Card className="mb-10 bg-white/90 shadow-xl rounded-2xl animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Withdraw Money */}
              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-blue-700">Withdraw Money</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="amount">Amount (KSh)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="rounded-full border-2 border-blue-100 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="method">Withdrawal Method</Label>
                    <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
                      <SelectTrigger className="rounded-full border-2 border-blue-100 focus:border-blue-400">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        {withdrawalMethods.map((method) => {
                          const Icon = method.icon
                          return (
                            <SelectItem key={method.value} value={method.value} className="hover:bg-blue-50">
                              <div className="flex items-center space-x-2">
                                <Icon className="w-5 h-5 text-blue-500" />
                                <span>{method.label}</span>
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    className="w-full rounded-full font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg py-3 text-lg mt-2"
                    disabled={
                      !withdrawAmount ||
                      !withdrawMethod ||
                      Number.parseInt(withdrawAmount) > walletStats.availableBalance
                    }
                  >
                    <ArrowDownLeft className="w-5 h-5 mr-2" />
                    Withdraw Money
                  </Button>
                  {Number.parseInt(withdrawAmount) > walletStats.availableBalance && (
                    <p className="text-sm text-red-600">Insufficient balance</p>
                  )}
                </div>
              </div>

              {/* Pending Payments Summary */}
              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-green-700">Pending Payments</h3>
                <div className="space-y-3">
                  {pendingPayments.slice(0, 3).map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 bg-green-50 rounded-xl shadow-sm animate-fade-in-up">
                      <div>
                        <p className="font-semibold text-base text-green-900">{payment.jobTitle}</p>
                        <p className="text-xs text-gray-600">{payment.employer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-700 text-lg">KSh {payment.amount.toLocaleString()}</p>
                        <Badge className="rounded-full bg-green-200 text-green-800 px-3 py-1 text-xs mt-1">{payment.daysLeft} days left</Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent rounded-full font-semibold border-green-200 text-green-700 hover:bg-green-50">View All Pending</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="bg-white/90 shadow-xl rounded-2xl animate-fade-in-up">
          <CardContent>
            <Tabs defaultValue="all" className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <h2 className="text-2xl font-bold text-blue-700">Transaction History</h2>
                <TabsList className="bg-blue-50 rounded-full p-1 shadow-inner">
                  <TabsTrigger value="all" className="rounded-full px-6 py-2 text-base font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-700 transition-all">All</TabsTrigger>
                  <TabsTrigger value="earnings" className="rounded-full px-6 py-2 text-base font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-700 transition-all">Earnings</TabsTrigger>
                  <TabsTrigger value="withdrawals" className="rounded-full px-6 py-2 text-base font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-700 transition-all">Withdrawals</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="space-y-4">
                {transactions.map((transaction) => (
                  <Card key={transaction.id} className="rounded-xl shadow border-0 bg-white/95 hover:shadow-lg transition-shadow animate-fade-in-up">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={clsx(
                              "w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold",
                              transaction.type === "earning"
                                ? "bg-green-100 text-green-600"
                                : "bg-blue-100 text-blue-600"
                            )}
                          >
                            {transaction.type === "earning" ? (
                              <ArrowUpRight className="w-6 h-6" />
                            ) : (
                              <ArrowDownLeft className="w-6 h-6" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-base">{transaction.description}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
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
                            className={clsx(
                              "text-xl font-extrabold",
                              transaction.amount > 0 ? "text-green-600" : "text-blue-600"
                            )}
                          >
                            {transaction.amount > 0 ? "+" : "-"}KSh {Math.abs(transaction.amount).toLocaleString()}
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            {transaction.status === "completed" ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : transaction.status === "pending" ? (
                              <Clock className="w-5 h-5 text-orange-600" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-red-600" />
                            )}
                            <Badge
                              variant={
                                transaction.status === "completed"
                                  ? "secondary"
                                  : transaction.status === "pending"
                                    ? "default"
                                    : "destructive"
                              }
                              className={clsx(
                                "rounded-full px-3 py-1 text-xs font-semibold",
                                transaction.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : transaction.status === "pending"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-red-100 text-red-800"
                              )}
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
                    <Card key={transaction.id} className="rounded-xl shadow border-0 bg-white/95 hover:shadow-lg transition-shadow animate-fade-in-up">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                              <ArrowUpRight className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="font-semibold text-base">{transaction.description}</p>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {transaction.date} at {transaction.time}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500">Job ID: {transaction.jobId}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-extrabold text-green-600">
                              +KSh {transaction.amount.toLocaleString()}
                            </div>
                            <Badge
                              variant={transaction.status === "completed" ? "secondary" : "default"}
                              className={clsx(
                                "rounded-full px-3 py-1 text-xs font-semibold",
                                transaction.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-orange-100 text-orange-800"
                              )}
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
                    <Card key={transaction.id} className="rounded-xl shadow border-0 bg-white/95 hover:shadow-lg transition-shadow animate-fade-in-up">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                              <ArrowDownLeft className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="font-semibold text-base">{transaction.description}</p>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {transaction.date} at {transaction.time}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500">Ref: {transaction.reference}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-extrabold text-blue-600">
                              -KSh {Math.abs(transaction.amount).toLocaleString()}
                            </div>
                            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800">
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
