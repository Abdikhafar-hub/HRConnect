"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Star, Calendar, MessageSquare, ThumbsUp, Award, Users, Loader2 } from "lucide-react"
import { ratingAPI } from "../../../lib/api"
import { toast } from "sonner"

interface RatingStats {
  overallRating: number
  totalReviews: number
  fiveStars: number
  fourStars: number
  threeStars: number
  twoStars: number
  oneStars: number
  categories: {
    communication: number
    fairness: number
    punctuality: number
    respect: number
  }
}

interface Review {
  _id: string
  rater?: {
    firstName: string
    lastName: string
    profilePicture?: string
  }
  job?: {
    title: string
  }
  overallRating: number
  comment: string
  categories: {
    communication: number
    fairness: number
    punctuality: number
    respect: number
  }
  helpful: number
  createdAt: string
}

interface Rating {
  _id: string
  ratee?: {
    firstName: string
    lastName: string
    profilePicture?: string
  }
  job?: {
    title: string
  }
  overallRating: number
  comment: string
  categories: {
    quality: number
    punctuality: number
    communication: number
    professionalism: number
  }
  createdAt: string
}

interface Achievement {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  earned: boolean
  date: string
}

export default function EmployerRatingsPage() {
  const [loading, setLoading] = useState(true)
  const [ratingStats, setRatingStats] = useState<RatingStats>({
    overallRating: 0,
    totalReviews: 0,
    fiveStars: 0,
    fourStars: 0,
    threeStars: 0,
    twoStars: 0,
    oneStars: 0,
    categories: {
      communication: 0,
      fairness: 0,
      punctuality: 0,
      respect: 0,
    },
  })
  const [workerReviews, setWorkerReviews] = useState<Review[]>([])
  const [myRatings, setMyRatings] = useState<Rating[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])

  // Fetch user data and ratings
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Get rating statistics
        const statsResponse = await ratingAPI.getStats()
        setRatingStats(statsResponse.data)

        // Get received ratings (reviews from workers)
        const receivedResponse = await ratingAPI.getReceived(1, 10)
        setWorkerReviews(receivedResponse.data)

        // Get given ratings (reviews given to workers)
        const givenResponse = await ratingAPI.getGiven(1, 10)
        setMyRatings(givenResponse.data)

        // Generate achievements based on stats
        generateAchievements(statsResponse.data)

      } catch {
        toast.error('Failed to load ratings data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const generateAchievements = (stats: RatingStats) => {
    const achievements: Achievement[] = []

    // Top Rated Employer
    if (stats.overallRating >= 4.8 && stats.totalReviews >= 5) {
      achievements.push({
        id: 1,
        title: "Top Rated Employer",
        description: `Maintained ${stats.overallRating}+ rating for ${stats.totalReviews} reviews`,
        icon: Award,
        earned: true,
        date: "Recent",
      })
    }

    // Fair Employer
    if (stats.categories.fairness >= 4.5) {
      achievements.push({
        id: 2,
        title: "Fair Employer",
        description: "Consistently rated high for fairness",
        icon: Users,
        earned: true,
        date: "Recent",
      })
    }

    // Prompt Payer
    if (stats.categories.punctuality >= 4.8) {
      achievements.push({
        id: 3,
        title: "Prompt Payer",
        description: "Excellent payment punctuality ratings",
        icon: Calendar,
        earned: true,
        date: "Recent",
      })
    }

    // Great Communicator
    if (stats.categories.communication >= 4.5) {
      achievements.push({
        id: 4,
        title: "Great Communicator",
        description: "Excellent communication ratings",
        icon: MessageSquare,
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
      setWorkerReviews(prev => 
        prev.map(review => 
          review._id === ratingId 
            ? { ...review, helpful: response.data.helpful }
            : review
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading ratings...</p>
        </div>
      </div>
    )
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

            {workerReviews.length === 0 ? (
              <Card className="shadow-xl rounded-2xl bg-white/80 backdrop-blur-md">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-600">No reviews yet. Complete some jobs to start receiving reviews!</p>
                </CardContent>
              </Card>
            ) : (
              workerReviews.map((review) => (
                <div
                  key={review._id}
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
                        <AvatarImage src={review.rater?.profilePicture || "/placeholder.svg"} />
                      <AvatarFallback>
                          {review.rater ? `${review.rater.firstName} ${review.rater.lastName}`.split(" ").map((n) => n[0]).join("") : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                            <h3 className="font-semibold text-lg">
                              {review.rater ? `${review.rater.firstName} ${review.rater.lastName}` : "Unknown Worker"}
                            </h3>
                            <p className="text-sm text-gray-600">{review.job?.title || "Unknown Job"}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                    i < review.overallRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                            </div>
                            <p className="text-sm text-gray-600">{formatDate(review.createdAt)}</p>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{review.comment}</p>

                      {/* Category Ratings */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Communication</p>
                          <div className="flex items-center justify-center space-x-1">
                              <span className="text-sm font-semibold">{review.categories.communication || 0}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Fairness</p>
                          <div className="flex items-center justify-center space-x-1">
                              <span className="text-sm font-semibold">{review.categories.fairness || 0}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Punctuality</p>
                          <div className="flex items-center justify-center space-x-1">
                              <span className="text-sm font-semibold">{review.categories.punctuality || 0}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Respect</p>
                          <div className="flex items-center justify-center space-x-1">
                              <span className="text-sm font-semibold">{review.categories.respect || 0}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-gray-600"
                            onClick={() => handleVoteHelpful(review._id)}
                          >
                          <ThumbsUp className="w-4 h-4 mr-2" />
                            Helpful ({review.helpful || 0})
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
              ))
            )}
          </TabsContent>

          <TabsContent value="given" className="space-y-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Reviews You&apos;ve Given</h2>
              <Badge variant="secondary">{myRatings.length} reviews</Badge>
            </div>

            {myRatings.length === 0 ? (
              <Card className="shadow-xl rounded-2xl bg-white/80 backdrop-blur-md">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-600">You haven&apos;t given any reviews yet. Complete some jobs to start rating workers!</p>
                </CardContent>
              </Card>
            ) : (
              myRatings.map((rating) => (
                <div
                  key={rating._id}
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
                        <AvatarImage src={rating.ratee?.profilePicture || "/placeholder.svg"} />
                      <AvatarFallback>
                          {rating.ratee ? `${rating.ratee.firstName} ${rating.ratee.lastName}`.split(" ").map((n) => n[0]).join("") : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                            <h3 className="font-semibold text-lg">
                              {rating.ratee ? `${rating.ratee.firstName} ${rating.ratee.lastName}` : "Unknown Worker"}
                            </h3>
                            <p className="text-sm text-gray-600">{rating.job?.title || "Unknown Job"}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                    i < rating.overallRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                            </div>
                            <p className="text-sm text-gray-600">{formatDate(rating.createdAt)}</p>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{rating.comment}</p>

                      {/* Category Ratings */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Quality</p>
                          <div className="flex items-center justify-center space-x-1">
                              <span className="text-sm font-semibold">{rating.categories.quality || 0}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Punctuality</p>
                          <div className="flex items-center justify-center space-x-1">
                              <span className="text-sm font-semibold">{rating.categories.punctuality || 0}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Communication</p>
                          <div className="flex items-center justify-center space-x-1">
                              <span className="text-sm font-semibold">{rating.categories.communication || 0}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Professional</p>
                          <div className="flex items-center justify-center space-x-1">
                              <span className="text-sm font-semibold">{rating.categories.professionalism || 0}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
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
                })
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
