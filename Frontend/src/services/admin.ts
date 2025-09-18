import api from './api';
import { User, Order } from '../types';

export const adminService = {
  async getUsers(role?: string): Promise<User[]> {
    const params = role ? `?role=${role}` : '';
    const response = await api.get(`/admin/users${params}`);
    return response.data;
  },

  async getOrders(status?: string, orderType?: string): Promise<Order[]> {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (orderType) params.append('orderType', orderType);
    
    const response = await api.get(`/admin/orders?${params.toString()}`);
    return response.data;
  },

  async assignOrder(orderId: string, delivererId: string): Promise<Order> {
    const response = await api.put(`/admin/orders/${orderId}/assign`, { delivererId });
    return response.data;
  }
};