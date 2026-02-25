import api from './api';

export interface UserLoginDTO {
  username: string;
  password: string;
}

export interface UserDTO {
  username: string;
  password: string;
  email: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  roleName: string;
}

export const authService = {
  login: async (credentials: UserLoginDTO): Promise<string> => {
    const response = await api.post<string>('/home/login', credentials);
    return response.data;
  },

  register: async (userData: UserDTO): Promise<void> => {
    await api.post('/home/register', userData);
  },

  verify: async (email: string, code: string): Promise<void> => {
    await api.get('/home/verify', {
      params: { email, code },
    });
  },

  resendVerification: async (email: string): Promise<void> => {
    await api.get('/home/resend', {
      params: { email },
    });
  },

  forgotPassword: async (email: string): Promise<void> => {
    await api.get('/home/forgot-password', {
      params: { email },
    });
  },

  getUserByToken: async (token: string): Promise<UserResponse> => {
    const response = await api.get<UserResponse>('/home/token-info', {
      params: { token },
    });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.get('/home/logout');
  },

  oauth2Token: async (accessToken: string): Promise<string> => {
    const response = await api.get<string>('/home/oauth2/token', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },
};

