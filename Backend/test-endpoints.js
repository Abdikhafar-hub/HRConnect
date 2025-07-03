const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testEndpoints() {
  console.log('Testing API endpoints...\n');

  try {
    // Test 1: Get all jobs
    console.log('1. Testing GET /jobs');
    const jobsResponse = await axios.get(`${API_BASE_URL}/jobs`);
    console.log('✅ Jobs endpoint working');
    console.log(`   Found ${jobsResponse.data.data?.length || 0} jobs\n`);

    // Test 2: Get workers (this will require authentication)
    console.log('2. Testing GET /workers (will fail without auth)');
    try {
      await axios.get(`${API_BASE_URL}/workers`);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Workers endpoint protected (requires authentication)');
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }
    console.log();

    // Test 3: Get applications (this will require authentication)
    console.log('3. Testing GET /applications/employer (will fail without auth)');
    try {
      await axios.get(`${API_BASE_URL}/applications/employer`);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Applications endpoint protected (requires authentication)');
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }
    console.log();

    // Test 4: Test job application (this will require authentication)
    console.log('4. Testing POST /applications (will fail without auth)');
    try {
      await axios.post(`${API_BASE_URL}/applications`, {
        jobId: 'test-job-id',
        workerName: 'Test Worker',
        workerPhone: '0712345678',
        message: 'Test application'
      });
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Application submission endpoint protected (requires authentication)');
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }
    console.log();

    console.log('🎉 All endpoint tests completed!');
    console.log('\nNote: Protected endpoints require authentication tokens.');
    console.log('To test with authentication, you need to:');
    console.log('1. Register/login to get a JWT token');
    console.log('2. Include the token in the Authorization header');
    console.log('3. Create some test data (jobs, users)');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure the backend server is running on port 5000');
      console.log('   Run: cd backend && npm start');
    }
  }
}

testEndpoints(); 