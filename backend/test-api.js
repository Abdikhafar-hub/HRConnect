const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test the basic endpoint
async function testBasicEndpoint() {
  try {
    const response = await axios.get('http://localhost:5000/');
    console.log('✅ Basic endpoint test passed:', response.data);
  } catch (error) {
    console.log('❌ Basic endpoint test failed:', error.message);
  }
}

// Test user registration
async function testUserRegistration() {
  try {
    const userData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
      phone: '+1234567890',
      location: 'Nairobi, Kenya'
    };

    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    console.log('✅ User registration test passed:', response.data.success);
    return response.data.token;
  } catch (error) {
    console.log('❌ User registration test failed:', error.response?.data || error.message);
    return null;
  }
}

// Test user login
async function testUserLogin() {
  try {
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };

    const response = await axios.post(`${BASE_URL}/auth/login`, loginData);
    console.log('✅ User login test passed:', response.data.success);
    return response.data.token;
  } catch (error) {
    console.log('❌ User login test failed:', error.response?.data || error.message);
    return null;
  }
}

// Test get current user
async function testGetCurrentUser(token) {
  try {
    const response = await axios.get(`${BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Get current user test passed:', response.data.success);
  } catch (error) {
    console.log('❌ Get current user test failed:', error.response?.data || error.message);
  }
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting API tests...\n');
  
  await testBasicEndpoint();
  console.log('');
  
  await testUserRegistration();
  console.log('');
  
  const loginToken = await testUserLogin();
  console.log('');
  
  if (loginToken) {
    await testGetCurrentUser(loginToken);
  }
  
  console.log('\n✨ API tests completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = { runTests }; 