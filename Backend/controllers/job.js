const Job = require('../models/Job');
const User = require('../models/User');

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (employer)
exports.createJob = async (req, res, next) => {
  try {
    const { title, description, location, budget, payType, duration, date, requirements, urgent } = req.body;
    const job = await Job.create({
      title,
      description,
      location,
      budget,
      payType,
      duration,
      date,
      requirements,
      urgent,
      employer: req.user._id
    });
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all jobs (optionally filter by employer)
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.employer) {
      filter.employer = req.query.employer;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    const jobs = await Job.find(filter)
      .populate('employer', 'firstName lastName email profilePicture isVerified')
      .sort({ createdAt: -1 });

    // Format jobs for frontend
    const formattedJobs = jobs.map(job => {
      const jobObj = job.toObject();
      return {
        ...jobObj,
        pay: `KSh ${jobObj.budget.toLocaleString()}`,
        employerPhoto: jobObj.employer.profilePicture || '/placeholder.svg',
        distance: `${(Math.random() * 10 + 1).toFixed(1)} km`, // Mock distance
        rating: (Math.random() * 1 + 4).toFixed(1), // Mock rating
        verified: jobObj.employer.isVerified
      };
    });

    res.status(200).json({ success: true, data: formattedJobs });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single job by ID
// @route   GET /api/jobs/:id
// @access  Public
exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('employer', 'firstName lastName email profilePicture isVerified');
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    
    const jobObj = job.toObject();
    const formattedJob = {
      ...jobObj,
      pay: `KSh ${jobObj.budget.toLocaleString()}`,
      employerPhoto: jobObj.employer.profilePicture || '/placeholder.svg',
      distance: `${(Math.random() * 10 + 1).toFixed(1)} km`,
      rating: (Math.random() * 1 + 4).toFixed(1),
      verified: jobObj.employer.isVerified
    };
    
    res.status(200).json({ success: true, data: formattedJob });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private (employer)
exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    // Only employer can update
    if (job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    // Only update allowed fields, never employer
    const allowedFields = [
      'title', 'description', 'location', 'budget', 'payType', 'duration', 'date', 'requirements', 'urgent', 'status'
    ];
    for (const field of allowedFields) {
      if (field in req.body) {
        job[field] = req.body[field];
      }
    }
    await job.save();
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private (employer)
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    // Only employer can delete
    if (job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    await job.remove();
    res.status(200).json({ success: true, message: 'Job deleted' });
  } catch (error) {
    next(error);
  }
}; 