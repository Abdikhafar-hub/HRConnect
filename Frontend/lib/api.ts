const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hrconnect-xq5c.onrender.com/api';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'employer' | 'admin';
  phone?: string;
  location?: string;
  profilePicture?: string;
  isVerified: boolean;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'user' | 'employer' | 'admin';
  phone?: string;
  location?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ApiError {
  success: false;
  message?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

// Helper function to make API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// Rating API functions
export const ratingAPI = {
  // Get rating statistics for a user
  getStats: (userId?: string) => apiCall(`/ratings/stats/${userId}`),
  
  // Get ratings received by the authenticated user
  getReceived: (page = 1, limit = 10) => 
    apiCall(`/ratings/received?page=${page}&limit=${limit}`),
  
  // Get ratings given by the authenticated user
  getGiven: (page = 1, limit = 10) => 
    apiCall(`/ratings/given?page=${page}&limit=${limit}`),
  
  // Get recent ratings for a user
  getRecent: (userId: string, limit = 3) => 
    apiCall(`/ratings/recent/${userId}?limit=${limit}`),
  
  // Create a new rating
  create: (ratingData: any) => 
    apiCall('/ratings', {
      method: 'POST',
      body: JSON.stringify(ratingData),
    }),
  
  // Vote helpful on a rating
  voteHelpful: (ratingId: string) => 
    apiCall(`/ratings/${ratingId}/helpful`, {
      method: 'POST',
    }),
};

// User API functions
export const userAPI = {
  // Get current user profile
  getProfile: () => apiCall('/auth/me'),
  
  // Update user profile
  updateProfile: (profileData: any) => 
    apiCall('/auth/updateprofile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),
};

// Job API functions
export const jobAPI = {
  // Get jobs
  getJobs: (params: Record<string, any> = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/jobs${queryString ? `?${queryString}` : ''}`);
  },
  
  // Get job by ID
  getJob: (jobId: string) => apiCall(`/jobs/${jobId}`),
  
  // Create job
  createJob: (jobData: any) => 
    apiCall('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    }),
  
  // Update job
  updateJob: (jobId: string, jobData: any) => 
    apiCall(`/jobs/${jobId}`, {
      method: 'PUT',
      body: JSON.stringify(jobData),
    }),
  
  // Delete job
  deleteJob: (jobId: string) => 
    apiCall(`/jobs/${jobId}`, {
      method: 'DELETE',
    }),
};

// Application API functions
export const applicationAPI = {
  // Apply for a job
  apply: (applicationData: any) => 
    apiCall('/applications', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    }),
  
  // Get employer applications
  getEmployerApplications: () => apiCall('/applications/employer'),
  
  // Get worker applications
  getWorkerApplications: () => apiCall('/applications/worker'),
  
  // Update application status
  updateStatus: (applicationId: string, statusData: any) => 
    apiCall(`/applications/${applicationId}`, {
      method: 'PUT',
      body: JSON.stringify(statusData),
    }),
};

// Authentication API functions
export const authAPI = {
  // Login user
  login: (credentials: LoginData) => 
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  // Register user
  register: (userData: RegisterData) => 
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  // Get current user
  getCurrentUser: (token?: string) => {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return apiCall('/auth/me', { headers });
  },
};

// Legacy apiService for backward compatibility
export const apiService = {
  login: authAPI.login,
  register: authAPI.register,
  getCurrentUser: authAPI.getCurrentUser,
};

const api = {
  ratingAPI,
  userAPI,
  jobAPI,
  applicationAPI,
  authAPI,
  apiService,
  apiCall,
};

export default api; 