import React, { useEffect, useState } from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { serviceService } from '../services/services';
import { Service } from '../types';

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    fetchServices();
  }, [categoryFilter]);

  const fetchServices = async () => {
    try {
      const data = await serviceService.getServices(
        categoryFilter === 'all' ? undefined : categoryFilter,
        searchTerm || undefined
      );
      setServices(data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    fetchServices();
  };

  const categories = [
    { value: 'all', label: 'All Services' },
    { value: 'delivery', label: 'Delivery' },
    { value: 'transport', label: 'Transport' },
    { value: 'course', label: 'Course' },
    { value: 'merchant_service', label: 'Merchant Services' }
  ];

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
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600">Browse available services</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            
            <Button onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
      </Card>

      {/* Services Grid */}
      {services.length === 0 ? (
        <Card className="text-center py-12">
          <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service._id} hover className="cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                <span className="text-xs px-2 py-1 bg-teal-100 text-teal-800 rounded-full">
                  {service.category.replace('_', ' ')}
                </span>
              </div>
              
              {service.description && (
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              )}

              {service.category === 'merchant_service' ? (
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-teal-600">
                    ${service.price?.toFixed(2)}
                  </span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {service.pricing && (
                    <div className="text-sm space-y-1">
                      {service.pricing.moto && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Moto:</span>
                          <span className="font-medium">
                            ${service.pricing.moto.basePrice} + ${service.pricing.moto.pricePerKm}/km
                          </span>
                        </div>
                      )}
                      {service.pricing.voiture && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Car:</span>
                          <span className="font-medium">
                            ${service.pricing.voiture.basePrice} + ${service.pricing.voiture.pricePerKm}/km
                          </span>
                        </div>
                      )}
                      {service.pricing.tricycle && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tricycle:</span>
                          <span className="font-medium">
                            ${service.pricing.tricycle.basePrice} + ${service.pricing.tricycle.pricePerKm}/km
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;