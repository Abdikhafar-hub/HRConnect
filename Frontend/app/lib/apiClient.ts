const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
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
    console.error('API Error:', error);
    throw error;
  }
}

export const apiClient = {
  // Auth endpoints
  login: async (credentials: { email: string; password: string }) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    phone?: string;
    location?: string;
  }) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Job endpoints
  getJobs: async (params?: { employer?: string; status?: string }) => {
    const queryParams = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiRequest(`/jobs${queryParams}`);
  },

  getJobById: async (id: string) => {
    return apiRequest(`/jobs/${id}`);
  },

  createJob: async (jobData: {
    title: string;
    description: string;
    location: string;
    budget: number;
    payType: string;
    duration?: string;
    date?: string;
    requirements?: string[];
    urgent?: boolean;
  }) => {
    return apiRequest('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  },

  updateJob: async (id: string, jobData: any) => {
    return apiRequest(`/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(jobData),
    });
  },

  deleteJob: async (id: string) => {
    return apiRequest(`/jobs/${id}`, {
      method: 'DELETE',
    });
  },

  // Worker endpoints
  getWorkers: async (params?: { search?: string; category?: string; location?: string }) => {
    const queryParams = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiRequest(`/workers${queryParams}`);
  },

  // Application endpoints
  applyForJob: async (applicationData: {
    jobId: string;
    workerName: string;
    workerPhone: string;
    skills?: string;
    message?: string;
  }) => {
    return apiRequest('/applications', {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  },

  getEmployerApplications: async () => {
    return apiRequest('/applications/employer');
  },

  getWorkerApplications: async () => {
    return apiRequest('/applications/worker');
  },

  updateApplicationStatus: async (id: string, statusData: {
    status: string;
    employerNotes?: string;
  }) => {
    return apiRequest(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(statusData),
    });
  },

  // User endpoints
  getMe: async () => {
    return apiRequest('/auth/me');
  },
  updateProfile: async (profileData: any) => {
    return apiRequest('/auth/updatedetails', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
}; 