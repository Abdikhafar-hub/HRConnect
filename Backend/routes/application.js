const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const applicationController = require('../controllers/application');

const router = express.Router();

// Apply for a job (worker only)
router.post('/', protect, authorize('user'), applicationController.applyForJob);

// Get applications for employer
router.get('/employer', protect, authorize('employer'), applicationController.getEmployerApplications);

// Get applications for worker
router.get('/worker', protect, authorize('user'), applicationController.getWorkerApplications);

// Update application status (employer only)
router.put('/:id', protect, authorize('employer'), applicationController.updateApplicationStatus);

module.exports = router; 