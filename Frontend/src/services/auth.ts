import api from './api';
import { User, RegisterData, MerchantUpgradeData } from '../types';

export interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(data: RegisterData): Promise<LoginResponse> {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  async upgradeToMerchant(userId: string, data: MerchantUpgradeData): Promise<User> {
    const response = await api.put(`/admin/users/${userId}/upgrade-merchant`, data);
    return response.data;
  }
};