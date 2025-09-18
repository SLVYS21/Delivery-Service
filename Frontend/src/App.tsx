import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoadingSpinner from './components/common/LoadingSpinner';

// Pages
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Dashboard from './pages/Dashboard';
import CreateOrder from './pages/CreateOrder';
import Orders from './pages/Orders';
import Services from './pages/Services';
import AdminUsers from './pages/admin/AdminUsers';
import AdminOrders from './pages/admin/AdminOrders';

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={!isAuthenticated ? <LoginForm /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/register" 
        element={!isAuthenticated ? <RegisterForm /> : <Navigate to="/" replace />} 
      />

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="create-order" element={<CreateOrder />} />
        <Route path="orders" element={<Orders />} />
        <Route path="services" element={<Services />} />
        
        {/* Admin Routes */}
        <Route path="admin/users" element={
          <ProtectedRoute roles={['admin']}>
            <AdminUsers />
          </ProtectedRoute>
        } />
        <Route path="admin/orders" element={
          <ProtectedRoute roles={['admin']}>
            <AdminOrders />
          </ProtectedRoute>
        } />
        
        {/* Merchant Routes */}
        <Route path="merchant/services" element={
          <ProtectedRoute roles={['merchant']}>
            <Services />
          </ProtectedRoute>
        } />
        
        {/* Deliverer Routes */}
        <Route path="deliveries" element={
          <ProtectedRoute roles={['deliverer']}>
            <Orders />
          </ProtectedRoute>
        } />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;