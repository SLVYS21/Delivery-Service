
module.exports = {
  ROLES: {
    USER: 'user',
    MERCHANT: 'merchant',
    DELIVERER: 'deliverer',
    ADMIN: 'admin'
  },
  ORDER_TYPES: {
    DELIVERY: 'delivery',
    TRANSPORT: 'transport',
    COURSE: 'course',
    MERCHANT_ORDER: 'merchant_order'
  },
  
  ORDER_STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    ASSIGNED: 'assigned',
    IN_PREPARATION: 'in_preparation',
    READY_FOR_PICKUP: 'ready_for_pickup',
    PICKED_UP: 'picked_up',
    IN_TRANSIT: 'in_transit',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled'
  },
  
  VEHICLE_TYPES: {
    MOTO: 'moto',
    VOITURE: 'voiture',
    TRICYCLE: 'tricycle'
  }
};