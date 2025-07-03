const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  rater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ratee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  overallRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  categories: {
    // For worker ratings (by employers)
    quality: { type: Number, min: 1, max: 5 },
    punctuality: { type: Number, min: 1, max: 5 },
    communication: { type: Number, min: 1, max: 5 },
    professionalism: { type: Number, min: 1, max: 5 },
    // For employer ratings (by workers)
    fairness: { type: Number, min: 1, max: 5 },
    respect: { type: Number, min: 1, max: 5 }
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  helpful: {
    type: Number,
    default: 0
  },
  helpfulVotes: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    votedAt: { type: Date, default: Date.now }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure one user can only rate another user once per job
ratingSchema.index({ rater: 1, ratee: 1, job: 1 }, { unique: true });

// Update user's average rating when a new rating is added
ratingSchema.post('save', async function() {
  const User = mongoose.model('User');
  
  // Calculate average rating for the ratee
  const ratings = await this.constructor.find({ ratee: this.ratee });
  const totalRating = ratings.reduce((sum, rating) => sum + rating.overallRating, 0);
  const averageRating = totalRating / ratings.length;
  
  // Update user's rating and review count
  await User.findByIdAndUpdate(this.ratee, {
    rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
    reviews: ratings.length
  });
});

// Update user's average rating when a rating is deleted
ratingSchema.post('remove', async function() {
  const User = mongoose.model('User');
  
  const ratings = await this.constructor.find({ ratee: this.ratee });
  const totalRating = ratings.reduce((sum, rating) => sum + rating.overallRating, 0);
  const averageRating = ratings.length > 0 ? totalRating / ratings.length : 0;
  
  await User.findByIdAndUpdate(this.ratee, {
    rating: Math.round(averageRating * 10) / 10,
    reviews: ratings.length
  });
});

module.exports = mongoose.model('Rating', ratingSchema); 