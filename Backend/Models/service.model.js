const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  category: {
    type: String,
    enum: ['delivery', 'transport', 'course', 'merchant_service'],
    required: true
  },
  // Pour les services de l'agence (delivery, transport, course)
  pricing: {
    moto: {
      basePrice: Number,
      pricePerKm: Number
    },
    voiture: {
      basePrice: Number,
      pricePerKm: Number
    },
    tricycle: {
      basePrice: Number,
      pricePerKm: Number
    }
  },
  // Pour les services des marchands
  merchantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() { return this.category === 'merchant_service'; }
  },
  price: {
    type: Number,
    required: function() { return this.category === 'merchant_service'; }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);