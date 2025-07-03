const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  payType: {
    type: String,
    enum: ['per hour', 'per day', 'per week', 'per month', 'fixed'],
    default: 'per day'
  },
  duration: {
    type: String,
    trim: true
  },
  date: {
    type: String,
    trim: true
  },
  requirements: [{
    type: String,
    trim: true
  }],
  urgent: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'completed', 'cancelled'],
    default: 'open'
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applicants: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, enum: ['applied', 'reviewed', 'shortlisted', 'selected'], default: 'applied' },
      appliedAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema); 