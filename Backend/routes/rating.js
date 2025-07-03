const express = require('express');
const router = express.Router();
const {
  createRating,
  getReceivedRatings,
  getGivenRatings,
  getRatingStats,
  voteHelpful,
  getRecentRatings
} = require('../controllers/rating');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// Create a new rating
router.post('/', createRating);

// Get ratings received by the authenticated user
router.get('/received', getReceivedRatings);

// Get ratings given by the authenticated user
router.get('/given', getGivenRatings);

// Vote helpful on a rating
router.post('/:id/helpful', voteHelpful);

// Get rating statistics for a user (public)
router.get('/stats/:userId', getRatingStats);

// Get recent ratings for a user (public)
router.get('/recent/:userId', getRecentRatings);

module.exports = router; 