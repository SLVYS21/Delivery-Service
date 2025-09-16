const express = require('express');
const { 
  upgradeToMerchant, 
  assignOrderToDeliverer, 
  getAllUsers, 
  getAllOrders 
} = require('../Controllers/service.controller');
const {auth, roleCheck} = require('../Middleware/auth');
const router = express.Router();

router.use(auth);
router.use(roleCheck(['admin']));

router.put('/users/:userId/upgrade-merchant', upgradeToMerchant);
router.put('/orders/:orderId/assign', assignOrderToDeliverer);
router.get('/users', getAllUsers);
router.get('/orders', getAllOrders);

module.exports = router;