const mongoose = require('mongoose');
const Rating = require('../backend/models/Rating');
const User = require('../backend/models/User');
const Job = require('../backend/models/Job');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/africa-jobs-platform');

const sampleRatings = [
  // Employer rating worker
  {
    rater: null, // Will be set to employer ID
    ratee: null, // Will be set to worker ID
    job: null, // Will be set to job ID
    overallRating: 5,
    categories: {
      quality: 5,
      punctuality: 5,
      communication: 4,
      professionalism: 5,
    },
    comment: "Excellent work! Very thorough and professional. The house was spotless and John even organized some areas without being asked. Highly recommend!",
    helpful: 3,
  },
  {
    rater: null,
    ratee: null,
    job: null,
    overallRating: 4,
    categories: {
      quality: 4,
      punctuality: 5,
      communication: 4,
      professionalism: 4,
    },
    comment: "Good work on the garden. David was punctual and completed all the tasks. The garden looks much better now. Would hire again.",
    helpful: 2,
  },
  {
    rater: null,
    ratee: null,
    job: null,
    overallRating: 5,
    categories: {
      quality: 5,
      punctuality: 5,
      communication: 5,
      professionalism: 5,
    },
    comment: "Outstanding cleaning service! Mary is very reliable and does excellent work. She pays attention to detail and is very professional. Definitely hiring again.",
    helpful: 4,
  },
  // Worker rating employer
  {
    rater: null, // Will be set to worker ID
    ratee: null, // Will be set to employer ID
    job: null,
    overallRating: 5,
    categories: {
      communication: 5,
      fairness: 5,
      punctuality: 5,
      respect: 5,
    },
    comment: "Sarah is an excellent employer! Very clear with instructions, provides all necessary supplies, and always pays on time. The house is well-organized and she's very respectful. Highly recommend working for her!",
    helpful: 4,
  },
  {
    rater: null,
    ratee: null,
    job: null,
    overallRating: 5,
    categories: {
      communication: 5,
      fairness: 5,
      punctuality: 5,
      respect: 5,
    },
    comment: "Great employer to work for. Always treats workers with respect and dignity. Payment is always prompt and she provides clear expectations. Would definitely work for her again.",
    helpful: 3,
  },
  {
    rater: null,
    ratee: null,
    job: null,
    overallRating: 4,
    categories: {
      communication: 4,
      fairness: 4,
      punctuality: 5,
      respect: 4,
    },
    comment: "Good employer, fair payment and clear about what needs to be done. Sometimes the timeline is a bit tight but overall a positive experience. Would work for again.",
    helpful: 2,
  },
  {
    rater: null,
    ratee: null,
    job: null,
    overallRating: 5,
    categories: {
      communication: 5,
      fairness: 5,
      punctuality: 5,
      respect: 5,
    },
    comment: "Wonderful employer! Very professional and understanding. She provides all cleaning supplies and is always available if you have questions. Payment is always on time. Highly recommended!",
    helpful: 5,
  },
];

async function seedRatings() {
  try {
    console.log('Starting to seed ratings...');

    // Get sample users
    const users = await User.find().limit(4);
    if (users.length < 4) {
      console.log('Need at least 4 users (2 employers, 2 workers) to seed ratings');
      return;
    }

    const employers = users.filter(user => user.role === 'employer');
    const workers = users.filter(user => user.role === 'user');

    if (employers.length < 1 || workers.length < 1) {
      console.log('Need at least 1 employer and 1 worker to seed ratings');
      return;
    }

    // Get sample jobs
    const jobs = await Job.find().limit(3);
    if (jobs.length === 0) {
      console.log('No jobs found. Please create some jobs first.');
      return;
    }

    // Clear existing ratings
    await Rating.deleteMany({});
    console.log('Cleared existing ratings');

    // Create sample ratings
    const ratingsToCreate = [];

    // Employer rating workers
    for (let i = 0; i < Math.min(3, workers.length, jobs.length); i++) {
      const rating = {
        ...sampleRatings[i],
        rater: employers[0]._id,
        ratee: workers[i]._id,
        job: jobs[i]._id,
        createdAt: new Date(Date.now() - (i * 7 * 24 * 60 * 60 * 1000)) // Different dates
      };
      ratingsToCreate.push(rating);
    }

    // Workers rating employer
    for (let i = 0; i < Math.min(4, workers.length, jobs.length); i++) {
      const rating = {
        ...sampleRatings[i + 3],
        rater: workers[i]._id,
        ratee: employers[0]._id,
        job: jobs[i % jobs.length]._id,
        createdAt: new Date(Date.now() - (i * 5 * 24 * 60 * 60 * 1000)) // Different dates
      };
      ratingsToCreate.push(rating);
    }

    // Insert ratings
    const createdRatings = await Rating.insertMany(ratingsToCreate);
    console.log(`Created ${createdRatings.length} ratings`);

    // Update user rating statistics
    for (const user of users) {
      const userRatings = await Rating.find({ ratee: user._id });
      if (userRatings.length > 0) {
        const totalRating = userRatings.reduce((sum, rating) => sum + rating.overallRating, 0);
        const averageRating = totalRating / userRatings.length;
        
        await User.findByIdAndUpdate(user._id, {
          rating: Math.round(averageRating * 10) / 10,
          reviews: userRatings.length
        });
      }
    }

    console.log('Successfully seeded ratings and updated user statistics!');
    console.log(`Created ratings for ${employers.length} employers and ${workers.length} workers`);

  } catch (error) {
    console.error('Error seeding ratings:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seeding
seedRatings(); 