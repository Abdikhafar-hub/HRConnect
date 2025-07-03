"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Star, TrendingUp, Calendar, MessageSquare, ThumbsUp, Award } from "lucide-react"
import clsx from "clsx"

export default function WorkerRatingsPage() {
  const [ratingStats] = useState({
    overallRating: 4.8,
    totalReviews: 23,
    fiveStars: 18,
    fourStars: 4,
    threeStars: 1,
    twoStars: 0,
    oneStars: 0,
    categories: {
      quality: 4.9,
      punctuality: 4.8,
      communication: 4.7,
      professionalism: 4.8,
    },
  })

  const [recentReviews] = useState([
    {
      id: 1,
      employer: "Sarah Johnson",
      employerPhoto: "/placeholder.svg?height=40&width=40",
      jobTitle: "House Cleaning",
      rating: 5,
      date: "Dec 14, 2024",
      comment:
        "Absolutely fantastic work! John was punctual, professional, and did an incredible job cleaning our house. Every corner was spotless and he even organized some areas without being asked. Highly recommend!",
      categories: {
        quality: 5,
        punctuality: 5,
        communication: 5,
        professionalism: 5,
      },
      helpful: 3,
    },
    {
      id: 2,
      employer: "David Kimani",
      employerPhoto: "/placeholder.svg?height=40&width=40",
      jobTitle: "Garden Maintenance",
      rating: 5,
      date: "Dec 11, 2024",
      comment:
        "Great job on the garden maintenance. John was very thorough and knew exactly what needed to be done. The garden looks amazing now. Will definitely hire again for future work.",
      categories: {
        quality: 5,
        punctuality: 5,
        communication: 4,
        professionalism: 5,
      },
      helpful: 2,
    },
    {
      id: 3,
      employer: "Tech Hub Ltd",
      employerPhoto: "/placeholder.svg?height=40&width=40",
      jobTitle: "Office Cleaning",
      rating: 4,
      date: "Dec 8, 2024",
      comment:
        "Good work overall. Arrived on time and completed all the cleaning tasks as requested. The office was clean and tidy. Would consider hiring again.",
      categories: {
        quality: 4,
        punctuality: 5,
        communication: 4,
        professionalism: 4,
      },
      helpful: 1,
    },
    {
      id: 4,
      employer: "Mary Wanjiku",
      employerPhoto: "/placeholder.svg?height=40&width=40",
      jobTitle: "House Cleaning",
      rating: 5,
      date: "Dec 5, 2024",
      comment:
        "Excellent service! Very reliable and does quality work. My house has never been cleaner. John is professional and respectful. Highly recommended!",
      categories: {
        quality: 5,
        punctuality: 4,
        communication: 5,
        professionalism: 5,
      },
      helpful: 4,
    },
    {
      id: 5,
      employer: "Peter Kamau",
      employerPhoto: "/placeholder.svg?height=40&width=40",
      jobTitle: "Construction Helper",
      rating: 4,
      date: "Dec 1, 2024",
      comment:
        "Hard worker and follows instructions well. Helped us complete the construction project on time. Good communication and reliable.",
      categories: {
        quality: 4,
        punctuality: 5,
        communication: 4,
        professionalism: 4,
      },
      helpful: 2,
    },
  ])

  const [achievements] = useState([
    {
      id: 1,
      title: "Top Rated Worker",
      description: "Maintained 4.8+ rating for 3 months",
      icon: Award,
      earned: true,
      date: "Nov 2024",
    },
    {
      id: 2,
      title: "Punctuality Pro",
      description: "100% on-time arrival rate",
      icon: Calendar,
      earned: true,
      date: "Oct 2024",
    },
    {
      id: 3,
      title: "Customer Favorite",
      description: "10+ five-star reviews",
      icon: Star,
      earned: true,
      date: "Sep 2024",
    },
    {
      id: 4,
      title: "Rising Star",
      description: "Completed first 5 jobs successfully",
      icon: TrendingUp,
      earned: true,
      date: "Mar 2024",
    },
  ])

  const getRatingPercentage = (count: number) => {
    return (count / ratingStats.totalReviews) * 100
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-700 mb-1 drop-shadow-sm">Ratings & Reviews</h1>
          <p className="text-lg text-gray-600">See what employers are saying about your work</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10">
        {/* Rating Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          {/* Overall Rating */}
          <Card className="bg-gradient-to-br from-blue-100 to-white/80 shadow-xl rounded-2xl animate-fade-in-up">
            <CardContent className="p-8 text-center">
              <div className="text-6xl font-extrabold text-blue-700 mb-2">{ratingStats.overallRating}</div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-7 h-7 ${i < Math.floor(ratingStats.overallRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-gray-600 text-lg">{ratingStats.totalReviews} reviews</p>
            </CardContent>
          </Card>

          {/* Rating Breakdown */}
          <Card className="bg-white/90 shadow-xl rounded-2xl animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-blue-700">Rating Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { stars: 5, count: ratingStats.fiveStars },
                { stars: 4, count: ratingStats.fourStars },
                { stars: 3, count: ratingStats.threeStars },
                { stars: 2, count: ratingStats.twoStars },
                { stars: 1, count: ratingStats.oneStars },
              ].map((item) => (
                <div key={item.stars} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-16">
                    <span className="text-sm font-semibold text-blue-700">{item.stars}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <Progress value={getRatingPercentage(item.count)} className="flex-1 h-2 bg-blue-100" />
                  <span className="text-sm text-gray-600 w-8 font-semibold">{item.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Category Ratings */}
          <Card className="bg-white/90 shadow-xl rounded-2xl animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-blue-700">Category Ratings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-sm">Quality of Work</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-blue-700">{ratingStats.categories.quality}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Punctuality</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-blue-700">{ratingStats.categories.punctuality}</span>
                  <Star className="w-4 h-4 fill-green-400 text-green-400" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Communication</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-blue-700">{ratingStats.categories.communication}</span>
                  <Star className="w-4 h-4 fill-blue-400 text-blue-400" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Professionalism</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-blue-700">{ratingStats.categories.professionalism}</span>
                  <Star className="w-4 h-4 fill-purple-400 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="reviews" className="space-y-8">
          <TabsList className="flex w-full justify-center bg-blue-50 rounded-full p-1 shadow-inner mb-6">
            <TabsTrigger value="reviews" className="rounded-full px-6 py-2 text-base font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-700 transition-all">All Reviews</TabsTrigger>
            <TabsTrigger value="achievements" className="rounded-full px-6 py-2 text-base font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-700 transition-all">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-8">
            {recentReviews.map((review) => (
              <Card key={review.id} className="bg-white/95 shadow-xl rounded-2xl animate-fade-in-up">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <Avatar className="w-14 h-14 shadow border-2 border-white">
                      <AvatarImage src={review.employerPhoto || "/placeholder.svg"} />
                      <AvatarFallback>
                        {review.employer.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-blue-800">{review.employer}</h3>
                          <p className="text-sm text-gray-600">{review.jobTitle}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">{review.date}</p>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-xl p-4 text-gray-800 mb-4 shadow-inner">
                        {review.comment}
                      </div>

                      {/* Category Ratings */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Quality</p>
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-sm font-semibold text-blue-700">{review.categories.quality}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Punctuality</p>
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-sm font-semibold text-blue-700">{review.categories.punctuality}</span>
                            <Star className="w-3 h-3 fill-green-400 text-green-400" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Communication</p>
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-sm font-semibold text-blue-700">{review.categories.communication}</span>
                            <Star className="w-3 h-3 fill-blue-400 text-blue-400" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Professional</p>
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-sm font-semibold text-blue-700">{review.categories.professionalism}</span>
                            <Star className="w-3 h-3 fill-purple-400 text-purple-400" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Button variant="ghost" size="sm" className="text-green-700 hover:bg-green-100">
                          <ThumbsUp className="w-4 h-4 mr-2 text-green-500" />
                          Helpful ({review.helpful})
                        </Button>
                        <Button variant="ghost" size="sm" className="text-blue-700 hover:bg-blue-100">
                          <MessageSquare className="w-4 h-4 mr-2 text-blue-500" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {achievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <Card key={achievement.id} className={clsx("rounded-2xl shadow-xl animate-fade-in-up border-0", achievement.earned ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-100") }>
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-6">
                        <div className={clsx("w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold", achievement.earned ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-400") }>
                          <Icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg text-blue-800">{achievement.title}</h3>
                              <p className="text-sm text-gray-600">{achievement.description}</p>
                            </div>
                            {achievement.earned && (
                              <Badge variant="secondary" className="bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-xs font-semibold">Earned</Badge>
                            )}
                          </div>
                          {achievement.earned && (
                            <p className="text-xs text-gray-500 mt-2">Earned in {achievement.date}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
