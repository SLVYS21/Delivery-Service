import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Car, Bike, Truck } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { orderService } from '../services/orders';
import { OrderFormData, Location } from '../types';

const CreateOrder: React.FC = () => {
  const [step, setStep] = useState(1);
  const [orderData, setOrderData] = useState<Partial<OrderFormData>>({
    orderType: 'delivery'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const vehicleTypes = [
    { value: 'moto', label: 'Motorcycle', icon: Bike, description: 'Fast delivery for small items' },
    { value: 'voiture', label: 'Car', icon: Car, description: 'Standard delivery' },
    { value: 'tricycle', label: 'Tricycle', icon: Truck, description: 'Large items delivery' }
  ];

  const orderTypes = [
    { value: 'delivery', label: 'Delivery', description: 'Send packages and documents' },
    { value: 'transport', label: 'Transport', description: 'Personal transportation' },
    { value: 'course', label: 'Course', description: 'Shopping and errands' }
  ];

  const handleSubmit = async () => {
    if (!orderData.pickupLocation || !orderData.deliveryLocation || !orderData.vehicleType) {
      return;
    }

    setLoading(true);
    try {
      const completeOrderData: OrderFormData = {
        orderType: orderData.orderType!,
        description: orderData.description,
        pickupLocation: orderData.pickupLocation,
        deliveryLocation: orderData.deliveryLocation,
        vehicleType: orderData.vehicleType
      };

      await orderService.createOrder(completeOrderData);
      navigate('/orders');
    } catch (error) {
      console.error('Failed to create order:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <Card>
      <h2 className="text-xl font-semibold mb-6">Select Order Type</h2>
      <div className="grid gap-4">
        {orderTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => {
              setOrderData(prev => ({ ...prev, orderType: type.value as any }));
              setStep(2);
            }}
            className={`p-4 border-2 rounded-lg text-left transition-colors ${
              orderData.orderType === type.value
                ? 'border-teal-600 bg-teal-50'
                : 'border-gray-200 hover:border-teal-300'
            }`}
          >
            <h3 className="font-semibold">{type.label}</h3>
            <p className="text-gray-600 text-sm">{type.description}</p>
          </button>
        ))}
      </div>
    </Card>
  );

  const renderStep2 = () => (
    <Card>
      <h2 className="text-xl font-semibold mb-6">Pickup & Delivery Locations</h2>
      <div className="space-y-6">
        <div>
          <div className="flex items-center mb-2">
            <MapPin className="h-5 w-5 text-teal-600 mr-2" />
            <label className="text-sm font-medium text-gray-700">Pickup Location</label>
          </div>
          <Input
            placeholder="Enter pickup address"
            value={orderData.pickupLocation?.address || ''}
            onChange={(e) => setOrderData(prev => ({
              ...prev,
              pickupLocation: {
                address: e.target.value,
                coordinates: { latitude: 0, longitude: 0 }
              }
            }))}
          />
        </div>

        <div>
          <div className="flex items-center mb-2">
            <MapPin className="h-5 w-5 text-orange-600 mr-2" />
            <label className="text-sm font-medium text-gray-700">Delivery Location</label>
          </div>
          <Input
            placeholder="Enter delivery address"
            value={orderData.deliveryLocation?.address || ''}
            onChange={(e) => setOrderData(prev => ({
              ...prev,
              deliveryLocation: {
                address: e.target.value,
                coordinates: { latitude: 0, longitude: 0 }
              }
            }))}
          />
        </div>

        <Input
          label="Description (Optional)"
          placeholder="Add any special instructions"
          value={orderData.description || ''}
          onChange={(e) => setOrderData(prev => ({ ...prev, description: e.target.value }))}
        />

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
          <Button 
            onClick={() => setStep(3)}
            disabled={!orderData.pickupLocation?.address || !orderData.deliveryLocation?.address}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );

  const renderStep3 = () => (
    <Card>
      <h2 className="text-xl font-semibold mb-6">Select Vehicle Type</h2>
      <div className="grid gap-4">
        {vehicleTypes.map((vehicle) => {
          const Icon = vehicle.icon;
          return (
            <button
              key={vehicle.value}
              onClick={() => setOrderData(prev => ({ ...prev, vehicleType: vehicle.value as any }))}
              className={`p-4 border-2 rounded-lg text-left transition-colors ${
                orderData.vehicleType === vehicle.value
                  ? 'border-teal-600 bg-teal-50'
                  : 'border-gray-200 hover:border-teal-300'
              }`}
            >
              <div className="flex items-center">
                <Icon className="h-8 w-8 text-teal-600 mr-4" />
                <div>
                  <h3 className="font-semibold">{vehicle.label}</h3>
                  <p className="text-gray-600 text-sm">{vehicle.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
        <Button 
          onClick={() => setStep(4)}
          disabled={!orderData.vehicleType}
        >
          Next
        </Button>
      </div>
    </Card>
  );

  const renderStep4 = () => (
    <Card>
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Order Type:</span>
          <span className="font-medium">{orderData.orderType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Vehicle:</span>
          <span className="font-medium">{orderData.vehicleType}</span>
        </div>
        <div>
          <span className="text-gray-600">Pickup:</span>
          <p className="font-medium">{orderData.pickupLocation?.address}</p>
        </div>
        <div>
          <span className="text-gray-600">Delivery:</span>
          <p className="font-medium">{orderData.deliveryLocation?.address}</p>
        </div>
        {orderData.description && (
          <div>
            <span className="text-gray-600">Description:</span>
            <p className="font-medium">{orderData.description}</p>
          </div>
        )}
        
        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Estimated Total:</span>
            <span>$15.00</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
        <Button onClick={handleSubmit} loading={loading}>
          Place Order
        </Button>
      </div>
    </Card>
  );

  const steps = [
    { number: 1, title: 'Order Type' },
    { number: 2, title: 'Locations' },
    { number: 3, title: 'Vehicle' },
    { number: 4, title: 'Summary' }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Order</h1>
        <p className="text-gray-600">Follow the steps to place your order</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((stepItem, index) => (
          <div key={stepItem.number} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= stepItem.number 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {stepItem.number}
            </div>
            <span className="ml-2 text-sm font-medium text-gray-900 hidden sm:block">
              {stepItem.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-12 h-px mx-4 ${
                step > stepItem.number ? 'bg-teal-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
    </div>
  );
};

export default CreateOrder;