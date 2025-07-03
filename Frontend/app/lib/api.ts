const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hrconnect-xq5c.onrender.com/api';

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

// Auth endpoints
export async function login(credentials: { email: string; password: string }) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function register(userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
  location?: string;
}) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

// Job endpoints
export async function getJobs(params?: { employer?: string; status?: string }) {
  const queryParams = params ? `?${new URLSearchParams(params).toString()}` : '';
  return apiRequest(`/jobs${queryParams}`);
}

export async function getJobById(id: string) {
  return apiRequest(`/jobs/${id}`);
}

export async function createJob(jobData: {
  title: string;
  description: string;
  location: string;
  budget: number;
  payType: string;
  duration?: string;
  date?: string;
  requirements?: string[];
  urgent?: boolean;
}) {
  return apiRequest('/jobs', {
    method: 'POST',
    body: JSON.stringify(jobData),
  });
}

export async function updateJob(id: string, jobData: any) {
  return apiRequest(`/jobs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(jobData),
  });
}

export async function deleteJob(id: string) {
  return apiRequest(`/jobs/${id}`, {
    method: 'DELETE',
  });
}

// Worker endpoints
export async function getWorkers(params?: { search?: string; category?: string; location?: string }) {
  const queryParams = params ? `?${new URLSearchParams(params).toString()}` : '';
  return apiRequest(`/workers${queryParams}`);
}

// Application endpoints
export async function applyForJob(applicationData: {
  jobId: string;
  workerName: string;
  workerPhone: string;
  message?: string;
}) {
  return apiRequest('/applications', {
    method: 'POST',
    body: JSON.stringify(applicationData),
  });
}

export async function getEmployerApplications() {
  return apiRequest('/applications/employer');
}

export async function getWorkerApplications() {
  return apiRequest('/applications/worker');
}

export async function updateApplicationStatus(id: string, statusData: {
  status: string;
  employerNotes?: string;
}) {
  return apiRequest(`/applications/${id}`, {
    method: 'PUT',
    body: JSON.stringify(statusData),
  });
}

// Create an API client object for backward compatibility
const apiClient = {
  login,
  register,
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getWorkers,
  applyForJob,
  getEmployerApplications,
  getWorkerApplications,
  updateApplicationStatus,
};

export default apiClient; 