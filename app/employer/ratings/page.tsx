"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Star, Calendar, MessageSquare, ThumbsUp, Award, Users } from "lucide-react"
import { Car } from "@/components/ui/car" // Declare the Car variable

export default function EmployerRatingsPage() {
  const [ratingStats] = useState({
    overallRating: 4.9,
    totalReviews: 12,
    fiveStars: 10,
    fourStars: 2,
    threeStars: 0,
    twoStars: 0,
    oneStars: 0,
    categories: {
      communication: 4.9,
      fairness: 4.8,
      punctuality: 5.0,
      respect: 4.9,
    },
  })

  const [workerReviews] = useState([
    {
      id: 1,
      worker: "John Mwangi",
      workerPhoto: "/placeholder.svg?height=40&width=40",
      jobTitle: "House Cleaning",
      rating: 5,
      date: "Dec 14, 2024",
      comment:
        "Sarah is an excellent employer! Very clear with instructions, provides all necessary supplies, and always pays on time. The house is well-organized and she's very respectful. Highly recommend working for her!",
      categories: {
        communication: 5,
        fairness: 5,
        punctuality: 5,
        respect: 5,
      },
      helpful: 4,
    },
    {
      id: 2,
      worker: "Mary Wanjiku",
      workerPhoto: "/placeholder.svg?height=40&width=40",
      jobTitle: "House Cleaning",
      rating: 5,
      date: "Nov 28, 2024",
      comment:
        "Great employer to work for. Always treats workers with respect and dignity. Payment is always prompt and she provides clear expectations. Would definitely work for her again.",
      categories: {
        communication: 5,
        fairness: 5,
        punctuality: 5,
        respect: 5,
      },
      helpful: 3,
    },
    {
      id: 3,
      worker: "David Kimani",
      workerPhoto: "/placeholder.svg?height=40&width=40",
      jobTitle: "Garden Maintenance",
      rating: 4,
      date: "Nov 15, 2024",
      comment:
        "Good employer, fair payment and clear about what needs to be done. Sometimes the timeline is a bit tight but overall a positive experience. Would work for again.",
      categories: {
        communication: 4,
        fairness: 4,
        punctuality: 5,
        respect: 4,
      },
      helpful: 2,
    },
    {
      id: 4,
      worker: "Grace Muthoni",
      workerPhoto: "/placeholder.svg?height=40&width=40",
      jobTitle: "House Cleaning",
      rating: 5,
      date: "Oct 20, 2024",
      comment:
        "Wonderful employer! Very professional and understanding. She provides all cleaning supplies and is always available if you have questions. Payment is always on time. Highly recommended!",
      categories: {
        communication: 5,
        fairness: 5,
        punctuality: 5,
        respect: 5,
      },
      helpful: 5,
    },
  ])

  const [myRatings] = useState([
    {
      id: 1,
      worker: "John Mwangi",
      workerPhoto: "/placeholder.svg?height=40&width=40",
      jobTitle: "House Cleaning",
      myRating: 5,
      date: "Dec 14, 2024",
      comment:
        "Excellent work! Very thorough and professional. The house was spotless and John even organized some areas without being asked. Highly recommend!",
      categories: {
        quality: 5,
        punctuality: 5,
        communication: 5,
        professionalism: 5,
      },
    },
    {
      id: 2,
      worker: "David Kimani",
      workerPhoto: "/placeholder.svg?height=40&width=40",
      jobTitle: "Garden Maintenance",
      myRating: 4,
      date: "Nov 15, 2024",
      comment:
        "Good work on the garden. David was punctual and completed all the tasks. The garden looks much better now. Would hire again.",
      categories: {
        quality: 4,
        punctuality: 5,
        communication: 4,
        professionalism: 4,
      },
    },
    {
      id: 3,
      worker: "Mary Wanjiku",
      workerPhoto: "/placeholder.svg?height=40&width=40",
      jobTitle: "House Cleaning",
      myRating: 5,
      date: "Nov 28, 2024",
      comment:
        "Outstanding cleaning service! Mary is very reliable and does excellent work. She pays attention to detail and is very professional. Definitely hiring again.",
      categories: {
        quality: 5,
        punctuality: 5,
        communication: 5,
        professionalism: 5,
      },
    },
  ])

  const [achievements] = useState([
    {
      id: 1,
      title: "Top Rated Employer",
      description: "Maintained 4.8+ rating for 6 months",
      icon: Award,
      earned: true,
      date: "Nov 2024",
    },
    {
      id: 2,
      title: "Fair Employer",
      description: "Consistently rated high for fairness",
      icon: Users,
      earned: true,
      date: "Oct 2024",
    },
    {
      id: 3,
      title: "Prompt Payer",
      description: "100% on-time payment record",
      icon: Calendar,
      earned: true,
      date: "Sep 2024",
    },
    {
      id: 4,
      title: "Great Communicator",
      description: "Excellent communication ratings",
      icon: MessageSquare,
      earned: true,
      date: "Aug 2024",
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
          <p className="text-gray-600">See what workers are saying about working for you</p>
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
              <p className="text-gray-600">{ratingStats.totalReviews} reviews from workers</p>
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
                <span className="text-sm">Communication</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{ratingStats.categories.communication}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Fairness</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{ratingStats.categories.fairness}</span>
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
                <span className="text-sm">Respect</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{ratingStats.categories.respect}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="received" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="received">Reviews Received</TabsTrigger>
            <TabsTrigger value="given">Reviews Given</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="received" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">What Workers Say About You</h2>
              <Badge variant="secondary">{workerReviews.length} reviews</Badge>
            </div>

            {workerReviews.map((review) => (
              <Car key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={review.workerPhoto || "/placeholder.svg"} />
                      <AvatarFallback>
                        {review.worker
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{review.worker}</h3>
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
                          <p className="text-xs text-gray-600">Communication</p>
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-sm font-semibold">{review.categories.communication}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Fairness</p>
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-sm font-semibold">{review.categories.fairness}</span>
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
                          <p className="text-xs text-gray-600">Respect</p>
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-sm font-semibold">{review.categories.respect}</span>
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
              </Car>
            ))}
          </TabsContent>

          <TabsContent value="given" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Reviews You've Given</h2>
              <Badge variant="secondary">{myRatings.length} reviews</Badge>
            </div>

            {myRatings.map((rating) => (
              <Card key={rating.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={rating.workerPhoto || "/placeholder.svg"} />
                      <AvatarFallback>
                        {rating.worker
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{rating.worker}</h3>
                          <p className="text-sm text-gray-600">{rating.jobTitle}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < rating.myRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">{rating.date}</p>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{rating.comment}</p>

                      {/* Category Ratings */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Quality</p>
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-sm font-semibold">{rating.categories.quality}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Punctuality</p>
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-sm font-semibold">{rating.categories.punctuality}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Communication</p>
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-sm font-semibold">{rating.categories.communication}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Professional</p>
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-sm font-semibold">{rating.categories.professionalism}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
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
