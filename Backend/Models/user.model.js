const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'merchant', 'deliverer', 'admin'],
    default: 'user'
  },
  address: {
    street: String,
    city: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  // Spécifique aux livreurs
  vehicleType: {
    type: String,
    enum: ['moto', 'voiture', 'tricycle'],
    required: function() { return this.role === 'deliverer'; }
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  // Spécifique aux marchands
  companyName: {
    type: String,
    required: function() { return this.role === 'merchant'; }
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: function() { return this.role === 'merchant'; }
  },
  companyDescription: String,
  businessCategory: String,
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Hash password avant sauvegarde
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Méthode pour vérifier le mot de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);