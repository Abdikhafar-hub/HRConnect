"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Star, TrendingUp, Calendar, MessageSquare, ThumbsUp, Award, Loader2 } from "lucide-react"
import { ratingAPI } from "../../../lib/api"
import { toast } from "sonner"

export default function WorkerRatingsPage() {
  const [loading, setLoading] = useState(true)
  const [ratingStats, setRatingStats] = useState({
    overallRating: 0,
    totalReviews: 0,
    fiveStars: 0,
    fourStars: 0,
    threeStars: 0,
    twoStars: 0,
    oneStars: 0,
    categories: {
      quality: 0,
      punctuality: 0,
      communication: 0,
      professionalism: 0,
    },
  })
  const [recentReviews, setRecentReviews] = useState<any[]>([])
  const [achievements, setAchievements] = useState<any[]>([])

  // Fetch user data and ratings
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Get rating statistics
        const statsResponse = await ratingAPI.getStats()
        setRatingStats(statsResponse.data)

        // Get received ratings (reviews from employers)
        const receivedResponse = await ratingAPI.getReceived(1, 10)
        setRecentReviews(receivedResponse.data)

        // Generate achievements based on stats
        generateAchievements(statsResponse.data)

      } catch (err) {
        console.error('Error fetching ratings data:', err)
        toast.error('Failed to load ratings data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const generateAchievements = (stats: any) => {
    const achievements: any[] = []

    // Top Rated Worker
    if (stats.overallRating >= 4.8 && stats.totalReviews >= 5) {
      achievements.push({
        id: 1,
        title: "Top Rated Worker",
        description: `Maintained ${stats.overallRating}+ rating for ${stats.totalReviews} reviews`,
        icon: Award,
        earned: true,
        date: "Recent",
      })
    }

    // Punctuality Pro
    if (stats.categories.punctuality >= 4.8) {
      achievements.push({
        id: 2,
        title: "Punctuality Pro",
        description: "Excellent punctuality ratings",
        icon: Calendar,
        earned: true,
        date: "Recent",
      })
    }

    // Customer Favorite
    if (stats.fiveStars >= 10) {
      achievements.push({
        id: 3,
        title: "Customer Favorite",
        description: `${stats.fiveStars}+ five-star reviews`,
        icon: Star,
        earned: true,
        date: "Recent",
      })
    }

    // Rising Star
    if (stats.totalReviews >= 5 && stats.overallRating >= 4.5) {
      achievements.push({
        id: 4,
        title: "Rising Star",
        description: "Completed first 5 jobs successfully",
        icon: TrendingUp,
        earned: true,
        date: "Recent",
      })
    }

    setAchievements(achievements)
  }

  const handleVoteHelpful = async (ratingId: string) => {
    try {
      const response = await ratingAPI.voteHelpful(ratingId)
      // Update the helpful count in the local state
      setRecentReviews((prev: any[]) =>
        prev.map((review) =>
          review._id === ratingId ? { ...review, helpful: response.data.helpful } : review
        )
      )
      toast.success('Vote recorded!')
    } catch (err) {
      toast.error('Failed to record vote')
    }
  }

  const getRatingPercentage = (count: number) => {
    return ratingStats.totalReviews > 0 ? (count / ratingStats.totalReviews) * 100 : 0
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading ratings...</p>
        </div>
      </div>
    )
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
        <Tabs defaultValue="reviews" className="space-y-10">
          <TabsList className="grid w-full grid-cols-2 rounded-lg bg-gray-100 mb-4">
            <TabsTrigger value="reviews">Recent Reviews</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">What Employers Say About You</h2>
              <Badge variant="secondary">{recentReviews.length} reviews</Badge>
            </div>

            {recentReviews.length === 0 ? (
              <Card className="shadow-xl rounded-2xl bg-white/80 backdrop-blur-md">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-600">No reviews yet. Complete some jobs to start receiving reviews!</p>
                </CardContent>
              </Card>
            ) : (
              recentReviews.map((review) => (
                <Card key={review._id} className="bg-white/95 shadow-xl rounded-2xl animate-fade-in-up">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <Avatar className="w-14 h-14 shadow border-2 border-white">
                        <AvatarImage src={review.rater?.profilePicture || "/placeholder.svg"} />
                        <AvatarFallback>
                          {review.rater ? `${review.rater.firstName} ${review.rater.lastName}`.split(" ").map((n) => n[0]).join("") : "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-blue-800">
                              {review.rater ? `${review.rater.firstName} ${review.rater.lastName}` : "Unknown Employer"}
                            </h3>
                            <p className="text-sm text-gray-600">{review.job?.title || "Unknown Job"}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-5 h-5 ${i < review.overallRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">{formatDate(review.createdAt)}</p>
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
                              <span className="text-sm font-semibold text-blue-700">{review.categories.quality || 0}</span>
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-600">Punctuality</p>
                            <div className="flex items-center justify-center space-x-1">
                              <span className="text-sm font-semibold text-blue-700">{review.categories.punctuality || 0}</span>
                              <Star className="w-3 h-3 fill-green-400 text-green-400" />
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-600">Communication</p>
                            <div className="flex items-center justify-center space-x-1">
                              <span className="text-sm font-semibold text-blue-700">{review.categories.communication || 0}</span>
                              <Star className="w-3 h-3 fill-blue-400 text-blue-400" />
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-600">Professional</p>
                            <div className="flex items-center justify-center space-x-1">
                              <span className="text-sm font-semibold text-blue-700">{review.categories.professionalism || 0}</span>
                              <Star className="w-3 h-3 fill-purple-400 text-purple-400" />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-green-700 hover:bg-green-100"
                            onClick={() => handleVoteHelpful(review._id)}
                          >
                            <ThumbsUp className="w-4 h-4 mr-2 text-green-500" />
                            Helpful ({review.helpful || 0})
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
              ))
            )}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {achievements.length === 0 ? (
                <Card className="shadow rounded-2xl bg-white/90 backdrop-blur-md col-span-2">
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-600">No achievements yet. Keep working to earn badges!</p>
                  </CardContent>
                </Card>
              ) : (
                achievements.map((achievement) => {
                  const Icon = achievement.icon
                  return (
                    <Card key={achievement.id} className={`shadow rounded-2xl bg-white/90 backdrop-blur-md ${achievement.earned ? "border-blue-200 bg-blue-50" : ""}`}>
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-6">
                          <div
                            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
                              achievement.earned ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
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
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
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
                })
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
