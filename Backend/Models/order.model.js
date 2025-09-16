const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderType: {
    type: String,
    enum: ['delivery', 'transport', 'course', 'merchant_order'],
    required: true
  },
  
  // Informations de base
  description: String,
  
  // Localisation
  pickupLocation: {
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  deliveryLocation: {
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  
  // Prix et paiement
  totalAmount: {
    type: Number,
    required: true
  },
  vehicleType: {
    type: String,
    enum: ['moto', 'voiture', 'tricycle'],
    required: function() { 
      return ['delivery', 'transport', 'course'].includes(this.orderType); 
    }
  },
  
  // Pour les commandes marchands
  merchantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() { return this.orderType === 'merchant_order'; }
  },
  items: [{
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    },
    quantity: Number,
    price: Number
  }],
  
  // Assignation et statut
  delivererId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: [
      'pending',           // En attente
      'confirmed',         // Confirmée
      'assigned',          // Assignée à un livreur
      'in_preparation',    // En préparation (marchands)
      'ready_for_pickup',  // Prête pour collecte
      'picked_up',         // Collectée
      'in_transit',        // En transit
      'delivered',         // Livrée
      'cancelled'          // Annulée
    ],
    default: 'pending'
  },
  
  // Timestamps des changements de statut
  statusHistory: [{
    status: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  
  // Notes et commentaires
  customerNotes: String,
  delivererNotes: String,
  adminNotes: String
}, {
  timestamps: true
});

// Générer un numéro de commande unique
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD${(count + 1).toString().padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
