import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from '../services/auth';
import { AuthContextType, User, RegisterData, MerchantUpgradeData } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  useEffect(() => {
    if (token) {
      refreshProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('authToken', response.token);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await authService.register(data);
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('authToken', response.token);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  const refreshProfile = async () => {
    try {
      setLoading(true);
      const userData = await authService.getProfile();
      setUser(userData);
    } catch (error) {
      console.error('Failed to refresh profile:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const upgradeToMerchant = async (data: MerchantUpgradeData) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const updatedUser = await authService.upgradeToMerchant(user._id, data);
      setUser(updatedUser);
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    refreshProfile,
    isAuthenticated,
    upgradeToMerchant,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};