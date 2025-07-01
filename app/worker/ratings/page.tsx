"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Star, TrendingUp, Calendar, MessageSquare, ThumbsUp, Award } from "lucide-react"

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">Ratings & Reviews</h1>
          <p className="text-gray-600">See what employers are saying about your work</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Rating Overview */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Overall Rating */}
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-5xl font-bold text-yellow-600 mb-2">{ratingStats.overallRating}</div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(ratingStats.overallRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">{ratingStats.totalReviews} reviews</p>
            </CardContent>
          </Card>

          {/* Rating Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Rating Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { stars: 5, count: ratingStats.fiveStars },
                { stars: 4, count: ratingStats.fourStars },
                { stars: 3, count: ratingStats.threeStars },
                { stars: 2, count: ratingStats.twoStars },
                { stars: 1, count: ratingStats.oneStars },
              ].map((item) => (
                <div key={item.stars} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-16">
                    <span className="text-sm">{item.stars}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <Progress value={getRatingPercentage(item.count)} className="flex-1" />
                  <span className="text-sm text-gray-600 w-8">{item.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Category Ratings */}
          <Card>
            <CardHeader>
              <CardTitle>Category Ratings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Quality of Work</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{ratingStats.categories.quality}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Punctuality</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{ratingStats.categories.punctuality}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Communication</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{ratingStats.categories.communication}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Professionalism</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{ratingStats.categories.professionalism}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="reviews" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reviews">All Reviews</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-6">
            {recentReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={review.employerPhoto || "/placeholder.svg"} />
                      <AvatarFallback>
                        {review.employer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{review.employer}</h3>
                          <p className="text-sm text-gray-600">{review.jobTitle}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">{review.date}</p>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{review.comment}</p>

                      {/* Category Ratings */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Quality</p>
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-sm font-semibold">{review.categories.quality}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Punctuality</p>
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-sm font-semibold">{review.categories.punctuality}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Communication</p>
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-sm font-semibold">{review.categories.communication}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Professional</p>
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-sm font-semibold">{review.categories.professionalism}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          Helpful ({review.helpful})
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <Card key={achievement.id} className={achievement.earned ? "border-yellow-200 bg-yellow-50" : ""}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            achievement.earned ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{achievement.title}</h3>
                              <p className="text-sm text-gray-600">{achievement.description}</p>
                            </div>
                            {achievement.earned && (
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                Earned
                              </Badge>
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
