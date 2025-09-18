import api from './api';
import { Service } from '../types';

export interface CreateServiceData {
  name: string;
  description?: string;
  price: number;
}

export const serviceService = {
  async getServices(category?: string, search?: string): Promise<Service[]> {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    
    const response = await api.get(`/services?${params.toString()}`);
    return response.data;
  },

  async createService(data: CreateServiceData): Promise<Service> {
    const response = await api.post('/services', data);
    return response.data;
  }
};