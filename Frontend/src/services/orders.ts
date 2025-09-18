import api from './api';
import { Order, OrderFormData } from '../types';

export const orderService = {
  async createOrder(data: OrderFormData): Promise<Order> {
    const response = await api.post('/orders', data);
    return response.data;
  },

  async getMyOrders(): Promise<Order[]> {
    const response = await api.get('/orders/my-orders');
    return response.data;
  },

  async updateOrderStatus(orderId: string, status: string, notes?: string): Promise<Order> {
    const response = await api.put(`/orders/${orderId}/status`, { status, notes });
    return response.data;
  },

  async getOrderById(orderId: string): Promise<Order> {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  }
};