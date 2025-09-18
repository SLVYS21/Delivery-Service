import React, { useEffect, useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, Truck, User } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { adminService } from '../../services/admin';
import { Order } from '../../types';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      const data = await adminService.getOrders(statusFilter === 'all' ? undefined : statusFilter);
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'confirmed': return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'in_transit': return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in_transit': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600">Monitor and manage all platform orders</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {['all', 'pending', 'confirmed', 'assigned', 'in_transit', 'delivered', 'cancelled'].map((status) => (
          <Button
            key={status}
            variant={statusFilter === status ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter(status)}
            className="whitespace-nowrap"
          >
            {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
          </Button>
        ))}
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <Card className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">
            {statusFilter === 'all' ? 'No orders available.' : `No ${statusFilter} orders found.`}
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <Card key={order._id} className="hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-mono text-sm text-gray-500">#{order.orderNumber}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">{order.orderType}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <span className="font-medium mr-2">From:</span>
                        {order.pickupLocation.address}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="font-medium mr-2">To:</span>
                        {order.deliveryLocation.address}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <User className="h-4 w-4 mr-1" />
                        <span>Customer ID: {order.customerId}</span>
                      </div>
                      {order.delivererId && (
                        <div className="flex items-center text-gray-600">
                          <Truck className="h-4 w-4 mr-1" />
                          <span>Deliverer ID: {order.delivererId}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="ml-4 flex flex-col items-center space-y-2">
                  {getStatusIcon(order.status)}
                  
                  <div className="flex space-x-2">
                    {order.status === 'confirmed' && !order.delivererId && (
                      <Button size="sm" variant="outline">
                        Assign Deliverer
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;