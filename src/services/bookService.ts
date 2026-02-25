import api from './api';

export interface BookResponse {
  id: number;
  title: string;
  author: string;
  type: string;
  description?: string;
  price?: number;
  imagesStringUrl: string[];
}

export interface BookSearchParams {
  text: string;
  type: string;
  page: number;
  size: number;
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

export const bookService = {
  getBooks: async (params: BookSearchParams) => {
    const response = await api.get<PageResponse<BookResponse>>('/home/books', {
      params,
      headers: getAuthHeader()
    });
    return response.data;
  },

  getBookById: async (id: number) => {
    const response = await api.get<BookResponse>(`/home/books/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  // Admin endpoints
  addBook: async (formData: FormData) => {
    const token = localStorage.getItem('token');
    await api.post('/admin/books', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });
  },

  updateBook: async (id: number, formData: FormData) => {
    const token = localStorage.getItem('token');
    await api.put(`/admin/books/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });
  },

  deleteBook: async (id: number) => {
    await api.delete(`/admin/books/${id}`, {
      headers: getAuthHeader()
    });
  },
};

