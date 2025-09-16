const express = require('express');
const cors = require('cors');

// Routes
const authRoutes = require('./Routes/user.route');
const orderRoutes = require('./Routes/order.route');
const serviceRoutes = require('./Routes/service.route');
const adminRoutes = require('./Routes/admin.route');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/admin', adminRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API Agence de Livraison - Fonctionnelle!' });
});

// Gestion des erreurs 404
// app.use('*', (req, res) => {
//   res.status(404).json({ message: 'Route non trouvée' });
// });

module.exports = app;