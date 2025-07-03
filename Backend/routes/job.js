const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const jobController = require('../controllers/job');

const router = express.Router();

// Public routes
router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJobById);

// Protected routes (employer only)
router.post('/', protect, authorize('employer'), jobController.createJob);
router.put('/:id', protect, authorize('employer'), jobController.updateJob);
router.delete('/:id', protect, authorize('employer'), jobController.deleteJob);

module.exports = router; 