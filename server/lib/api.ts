const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error');
    }
  }

  // Authentication methods
  async register(data: RegisterData): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginData): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCurrentUser(token: string): Promise<{ success: boolean; data: User }> {
    return this.request<{ success: boolean; data: User }>('/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async updateUserDetails(
    token: string,
    data: Partial<Pick<User, 'firstName' | 'lastName' | 'email' | 'phone' | 'location'>>
  ): Promise<{ success: boolean; data: User }> {
    return this.request<{ success: boolean; data: User }>('/auth/updatedetails', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  async updatePassword(
    token: string,
    currentPassword: string,
    newPassword: string
  ): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/updatepassword', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });
  }

  async logout(token: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>('/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
}

export const apiService = new ApiService(); 