const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (worker)
exports.applyForJob = async (req, res, next) => {
  try {
    const { jobId, workerName, workerPhone, message, skills } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Check if job is still open
    if (job.status !== 'open') {
      return res.status(400).json({ success: false, message: 'This job is no longer accepting applications' });
    }

    // Check if user has already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      worker: req.user._id
    });

    if (existingApplication) {
      return res.status(400).json({ success: false, message: 'You have already applied for this job' });
    }

    // Create application
    if (!job.employer) {
      return res.status(400).json({ success: false, message: 'Job is missing employer. Please contact support.' });
    }
    const application = await Application.create({
      job: jobId,
      worker: req.user._id,
      employer: job.employer,
      workerName,
      workerPhone,
      skills,
      message
    });

    // Populate job and worker details
    await application.populate('job', 'title description location budget');
    await application.populate('worker', 'firstName lastName email phone');

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'You have already applied for this job' });
    }
    next(error);
  }
};

// @desc    Get applications for an employer
// @route   GET /api/applications/employer
// @access  Private (employer)
exports.getEmployerApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ employer: req.user._id })
      .populate('job', 'title description location budget status')
      .populate('worker', 'firstName lastName email phone location')
      .sort({ appliedAt: -1 });

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    next(error);
  }
};

// @desc    Get applications for a worker
// @route   GET /api/applications/worker
// @access  Private (worker)
exports.getWorkerApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ worker: req.user._id })
      .populate('job', 'title description location budget status')
      .populate('employer', 'firstName lastName email')
      .sort({ appliedAt: -1 });

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    next(error);
  }
};

// @desc    Update application status (employer only)
// @route   PUT /api/applications/:id
// @access  Private (employer)
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { status, employerNotes } = req.body;

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // Only the employer can update the application
    if (application.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    application.status = status;
    application.employerNotes = employerNotes;
    application.reviewedAt = Date.now();

    await application.save();

    await application.populate('job', 'title description location budget');
    await application.populate('worker', 'firstName lastName email phone');

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all workers (for employer dashboard)
// @route   GET /api/workers
// @access  Private (employer)
exports.getWorkers = async (req, res, next) => {
  try {
    const { search, category, location } = req.query;
    
    let filter = { role: 'user' }; // Only get workers (users with role 'user')
    
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (location && location !== 'All Locations') {
      filter.location = { $regex: location, $options: 'i' };
    }

    const workers = await User.find(filter)
      .select('firstName lastName email phone location profilePicture isVerified createdAt skills rating reviews hourlyRate availability completedJobs responseTime languages bio')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: workers });
  } catch (error) {
    next(error);
  }
}; 