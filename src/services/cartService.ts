import api from './api';
import { BookResponse } from './bookService';

export interface ItemDTO {
  quantity: number;
  status: 'PENDING' | 'PAID' | 'COMPLETED';
}

export interface ItemResponse {
  id: number;
  quantity: number;
  status: string;
  bookResponse: BookResponse;
}

export interface CartResponse {
  id: number;
  itemResponseList: ItemResponse[];
}

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const cartService = {
  getCart: async (id: number): Promise<CartResponse> => {
    const response = await api.get<CartResponse>(
      `/user/carts`,
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  },

  addItem: async (itemId: number, item: ItemDTO): Promise<void> => {
    await api.post(
      `/user/carts/items/${itemId}`,
      item,
      {
        headers: getAuthHeader(),
      }
    );
  },

  updateItem: async (itemId: number, item: ItemDTO): Promise<void> => {
    await api.put(
      `/user/items/${itemId}`,
      item,
      {
        headers: getAuthHeader(),
      }
    );
  },

  deleteItem: async (itemId: number): Promise<void> => {
    await api.delete(
      `/user/items/${itemId}`,
      {
        headers: getAuthHeader(),
      }
    );
  },
};