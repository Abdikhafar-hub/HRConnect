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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/90 shadow-sm border-b px-0 md:px-8 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Ratings & Reviews</h1>
          <p className="text-gray-600">See what workers are saying about working for you</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10">
        {/* Rating Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          {/* Overall Rating */}
          <Card className="shadow-xl rounded-2xl bg-white/80 backdrop-blur-md">
            <CardContent className="p-8 text-center">
              <div className="text-5xl font-bold text-yellow-600 mb-2 drop-shadow">{ratingStats.overallRating}</div>
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
          <Card className="shadow-xl rounded-2xl bg-white/80 backdrop-blur-md">
            <CardHeader>
              <CardTitle>Rating Breakdown</CardTitle>
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
                    <span className="text-sm font-semibold">{item.stars}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <Progress value={getRatingPercentage(item.count)} className="flex-1 bg-gray-200 rounded-full h-2" />
                  <span className="text-sm text-gray-600 w-8">{item.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Category Ratings */}
          <Card className="shadow-xl rounded-2xl bg-white/80 backdrop-blur-md">
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
        <Tabs defaultValue="received" className="space-y-10">
          <TabsList className="grid w-full grid-cols-3 rounded-lg bg-gray-100 mb-4">
            <TabsTrigger value="received">Reviews Received</TabsTrigger>
            <TabsTrigger value="given">Reviews Given</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="received" className="space-y-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">What Workers Say About You</h2>
              <Badge variant="secondary">{workerReviews.length} reviews</Badge>
            </div>

            {workerReviews.map((review) => (
              <div
                key={review.id}
                className="relative group rounded-2xl bg-white/90 backdrop-blur-md shadow-xl border-2 border-transparent hover:border-blue-400 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                style={{
                  boxShadow:
                    '0 8px 32px 0 rgba(31, 38, 135, 0.15), 0 1.5px 8px 0 rgba(80, 120, 255, 0.08)',
                  borderImage: 'linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%) 1',
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{background: 'linear-gradient(120deg, #dbeafe55 0%, #f3e8ff55 100%)'}} />
                <CardContent className="relative z-10 p-8">
                  <div className="flex items-start space-x-6">
                    <Avatar className="w-14 h-14 shadow border-2 border-blue-100">
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
                          <h3 className="font-semibold text-lg">{review.worker}</h3>
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
              </div>
            ))}
          </TabsContent>

          <TabsContent value="given" className="space-y-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Reviews You've Given</h2>
              <Badge variant="secondary">{myRatings.length} reviews</Badge>
            </div>

            {myRatings.map((rating) => (
              <div
                key={rating.id}
                className="relative group rounded-2xl bg-white/90 backdrop-blur-md shadow-xl border-2 border-transparent hover:border-purple-400 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                style={{
                  boxShadow:
                    '0 8px 32px 0 rgba(120, 80, 255, 0.10), 0 1.5px 8px 0 rgba(80, 120, 255, 0.08)',
                  borderImage: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%) 1',
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{background: 'linear-gradient(120deg, #ede9fe55 0%, #dbeafe55 100%)'}} />
                <CardContent className="relative z-10 p-8">
                  <div className="flex items-start space-x-6">
                    <Avatar className="w-14 h-14 shadow border-2 border-blue-100">
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
                          <h3 className="font-semibold text-lg">{rating.worker}</h3>
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
              </div>
            ))}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {achievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <Card key={achievement.id} className={`shadow rounded-2xl bg-white/90 backdrop-blur-md ${achievement.earned ? "border-yellow-200 bg-yellow-50" : ""}`}>
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-6">
                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
                            achievement.earned ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <Icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{achievement.title}</h3>
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
