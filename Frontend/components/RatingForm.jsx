"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { ratingAPI } from "@/lib/api"
import { toast } from "sonner"

export default function RatingForm({ job, ratee, onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false)
  const [overallRating, setOverallRating] = useState(0)
  const [categories, setCategories] = useState({
    quality: 0,
    punctuality: 0,
    communication: 0,
    professionalism: 0,
    fairness: 0,
    respect: 0,
  })
  const [comment, setComment] = useState("")

  // Determine if this is an employer rating a worker or vice versa
  const isEmployerRatingWorker = ratee.role === 'user'

  const handleCategoryChange = (category, value) => {
    setCategories(prev => ({
      ...prev,
      [category]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (overallRating === 0) {
      toast.error("Please provide an overall rating")
      return
    }

    if (!comment.trim()) {
      toast.error("Please provide a comment")
      return
    }

    setLoading(true)

    try {
      await ratingAPI.create({
        rateeId: ratee._id,
        jobId: job._id,
        overallRating,
        categories,
        comment: comment.trim()
      })

      toast.success("Rating submitted successfully!")
      onSuccess?.()
    } catch (error) {
      console.error('Error submitting rating:', error)
      toast.error(error.message || "Failed to submit rating")
    } finally {
      setLoading(false)
    }
  }

  const renderStarRating = (value, onChange, size = "w-5 h-5") => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="focus:outline-none"
        >
          <Star
            className={`${size} ${
              star <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            } hover:fill-yellow-300 hover:text-yellow-300 transition-colors`}
          />
        </button>
      ))}
    </div>
  )

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">
          Rate {ratee.firstName} {ratee.lastName}
        </CardTitle>
        <p className="text-gray-600">
          Job: {job.title}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Overall Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall Rating *
            </label>
            <div className="flex items-center space-x-4">
              {renderStarRating(overallRating, setOverallRating, "w-8 h-8")}
              <span className="text-lg font-semibold text-gray-700">
                {overallRating > 0 ? `${overallRating}/5` : "Select rating"}
              </span>
            </div>
          </div>

          {/* Category Ratings */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Category Ratings
            </label>
            
            {isEmployerRatingWorker ? (
              // Employer rating worker categories
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Quality of Work</span>
                  {renderStarRating(categories.quality, (value) => handleCategoryChange('quality', value))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Punctuality</span>
                  {renderStarRating(categories.punctuality, (value) => handleCategoryChange('punctuality', value))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Communication</span>
                  {renderStarRating(categories.communication, (value) => handleCategoryChange('communication', value))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Professionalism</span>
                  {renderStarRating(categories.professionalism, (value) => handleCategoryChange('professionalism', value))}
                </div>
              </>
            ) : (
              // Worker rating employer categories
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Communication</span>
                  {renderStarRating(categories.communication, (value) => handleCategoryChange('communication', value))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Fairness</span>
                  {renderStarRating(categories.fairness, (value) => handleCategoryChange('fairness', value))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Punctuality</span>
                  {renderStarRating(categories.punctuality, (value) => handleCategoryChange('punctuality', value))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Respect</span>
                  {renderStarRating(categories.respect, (value) => handleCategoryChange('respect', value))}
                </div>
              </>
            )}
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Comment *
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={`Share your experience working with ${ratee.firstName}...`}
              rows={4}
              className="resize-none"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || overallRating === 0 || !comment.trim()}
            >
              {loading ? "Submitting..." : "Submit Rating"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 