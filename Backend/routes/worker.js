const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const applicationController = require('../controllers/application');

const router = express.Router();

// Get all workers (for employer dashboard)
router.get('/', protect, authorize('employer'), applicationController.getWorkers);

module.exports = router; 