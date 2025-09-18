export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'merchant' | 'deliverer' | 'admin';
  address?: {
    street: string;
    city: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  vehicleType?: 'moto' | 'voiture' | 'tricycle';
  isAvailable?: boolean;
  companyName?: string;
  companyId?: string;
  companyDescription?: string;
  businessCategory?: string;
  isVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  _id: string;
  name: string;
  description?: string;
  category: 'delivery' | 'transport' | 'course' | 'merchant_service';
  pricing?: {
    moto?: { basePrice: number; pricePerKm: number };
    voiture?: { basePrice: number; pricePerKm: number };
    tricycle?: { basePrice: number; pricePerKm: number };
  };
  merchantId?: string;
  price?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customerId: string;
  orderType: 'delivery' | 'transport' | 'course' | 'merchant_order';
  description?: string;
  pickupLocation: {
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  deliveryLocation: {
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  totalAmount: number;
  vehicleType?: 'moto' | 'voiture' | 'tricycle';
  merchantId?: string;
  items?: Array<{
    serviceId: string;
    quantity: number;
    price: number;
  }>;
  delivererId?: string;
  status: 'pending' | 'confirmed' | 'assigned' | 'in_preparation' | 'ready_for_pickup' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  statusHistory: Array<{
    status: string;
    timestamp: string;
    updatedBy: string;
  }>;
  customerNotes?: string;
  delivererNotes?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  isAuthenticated: boolean;
  upgradeToMerchant: (data: MerchantUpgradeData) => Promise<void>;
  loading: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: 'user' | 'merchant' | 'deliverer';
  vehicleType?: 'moto' | 'voiture' | 'tricycle';
  companyName?: string;
}

export interface MerchantUpgradeData {
  companyName: string;
  companyDescription?: string;
  businessCategory?: string;
}

export interface Location {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface OrderFormData {
  orderType: 'delivery' | 'transport' | 'course' | 'merchant_order';
  description?: string;
  pickupLocation: Location;
  deliveryLocation: Location;
  vehicleType?: 'moto' | 'voiture' | 'tricycle';
  merchantId?: string;
  items?: Array<{
    serviceId: string;
    quantity: number;
    price: number;
  }>;
}