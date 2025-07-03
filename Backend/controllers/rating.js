const Rating = require('../models/Rating');
const User = require('../models/User');
const Job = require('../models/Job');

// @desc    Create a new rating
// @route   POST /api/ratings
// @access  Private
exports.createRating = async (req, res, next) => {
  try {
    const { rateeId, jobId, overallRating, categories, comment } = req.body;

    // Check if job exists and is completed
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.status !== 'completed') {
      return res.status(400).json({ success: false, message: 'Can only rate completed jobs' });
    }

    // Check if ratee exists
    const ratee = await User.findById(rateeId);
    if (!ratee) {
      return res.status(404).json({ success: false, message: 'User to rate not found' });
    }

    // Check if user has already rated this person for this job
    const existingRating = await Rating.findOne({
      rater: req.user._id,
      ratee: rateeId,
      job: jobId
    });

    if (existingRating) {
      return res.status(400).json({ success: false, message: 'You have already rated this user for this job' });
    }

    // Create the rating
    const rating = await Rating.create({
      rater: req.user._id,
      ratee: rateeId,
      job: jobId,
      overallRating,
      categories,
      comment
    });

    // Populate the rating with user and job details
    await rating.populate('rater', 'firstName lastName profilePicture');
    await rating.populate('ratee', 'firstName lastName profilePicture');
    await rating.populate('job', 'title');

    res.status(201).json({ success: true, data: rating });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'You have already rated this user for this job' });
    }
    next(error);
  }
};

// @desc    Get ratings received by a user
// @route   GET /api/ratings/received
// @access  Private
exports.getReceivedRatings = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const ratings = await Rating.find({ ratee: req.user._id })
      .populate('rater', 'firstName lastName profilePicture')
      .populate('job', 'title')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Rating.countDocuments({ ratee: req.user._id });

    res.status(200).json({
      success: true,
      data: ratings,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasMore: skip + ratings.length < total
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get ratings given by a user
// @route   GET /api/ratings/given
// @access  Private
exports.getGivenRatings = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const ratings = await Rating.find({ rater: req.user._id })
      .populate('ratee', 'firstName lastName profilePicture')
      .populate('job', 'title')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Rating.countDocuments({ rater: req.user._id });

    res.status(200).json({
      success: true,
      data: ratings,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasMore: skip + ratings.length < total
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get rating statistics for a user
// @route   GET /api/ratings/stats/:userId
// @access  Public
exports.getRatingStats = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const ratings = await Rating.find({ ratee: userId });

    if (ratings.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
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
            fairness: 0,
            respect: 0
          }
        }
      });
    }

    // Calculate overall rating
    const totalRating = ratings.reduce((sum, rating) => sum + rating.overallRating, 0);
    const overallRating = totalRating / ratings.length;

    // Calculate star distribution
    const starCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratings.forEach(rating => {
      const stars = Math.round(rating.overallRating);
      starCounts[stars]++;
    });

    // Calculate category averages
    const categoryTotals = {
      quality: 0, punctuality: 0, communication: 0, professionalism: 0,
      fairness: 0, respect: 0
    };
    const categoryCounts = {
      quality: 0, punctuality: 0, communication: 0, professionalism: 0,
      fairness: 0, respect: 0
    };

    ratings.forEach(rating => {
      Object.keys(rating.categories).forEach(category => {
        if (rating.categories[category]) {
          categoryTotals[category] += rating.categories[category];
          categoryCounts[category]++;
        }
      });
    });

    const categories = {};
    Object.keys(categoryTotals).forEach(category => {
      categories[category] = categoryCounts[category] > 0 
        ? Math.round((categoryTotals[category] / categoryCounts[category]) * 10) / 10 
        : 0;
    });

    res.status(200).json({
      success: true,
      data: {
        overallRating: Math.round(overallRating * 10) / 10,
        totalReviews: ratings.length,
        fiveStars: starCounts[5],
        fourStars: starCounts[4],
        threeStars: starCounts[3],
        twoStars: starCounts[2],
        oneStars: starCounts[1],
        categories
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Vote helpful on a rating
// @route   POST /api/ratings/:id/helpful
// @access  Private
exports.voteHelpful = async (req, res, next) => {
  try {
    const rating = await Rating.findById(req.params.id);
    if (!rating) {
      return res.status(404).json({ success: false, message: 'Rating not found' });
    }

    // Check if user has already voted
    const existingVote = rating.helpfulVotes.find(vote => 
      vote.user.toString() === req.user._id.toString()
    );

    if (existingVote) {
      // Remove vote
      rating.helpfulVotes = rating.helpfulVotes.filter(vote => 
        vote.user.toString() !== req.user._id.toString()
      );
      rating.helpful = Math.max(0, rating.helpful - 1);
    } else {
      // Add vote
      rating.helpfulVotes.push({ user: req.user._id });
      rating.helpful += 1;
    }

    await rating.save();

    res.status(200).json({ success: true, data: { helpful: rating.helpful } });
  } catch (error) {
    next(error);
  }
};

// @desc    Get recent ratings for a user (for profile display)
// @route   GET /api/ratings/recent/:userId
// @access  Public
exports.getRecentRatings = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { limit = 3 } = req.query;

    const ratings = await Rating.find({ ratee: userId })
      .populate('rater', 'firstName lastName profilePicture')
      .populate('job', 'title')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({ success: true, data: ratings });
  } catch (error) {
    next(error);
  }
}; 