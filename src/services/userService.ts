// src/services/userService.ts
import api from './api';

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  roleName: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const userService = {
  getUsers: async (
    page: number,
    size: number,
    username?: string
  ): Promise<PageResponse<UserResponse>> => {
    const response = await api.get<PageResponse<UserResponse>>(
      '/admin/users',
      {
        params: { page, size, username },
        headers: getAuthHeader(),
      },
      
    );
    return response.data;
  },

  updateUserRole: async (userId: number): Promise<void> => {
    await api.put(`/admin/users/${userId}`,
      {
        headers: getAuthHeader(),
      });
  },

  deleteUser: async (userId: number): Promise<void> => {
    await api.delete(`/admin/users/${userId}`, 
      {
        headers: getAuthHeader(),
      });
  },
};