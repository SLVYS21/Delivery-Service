const express = require('express');
const { createOrder, getMyOrders, updateOrderStatus } = require('../Controllers/order.controller');
const {auth} = require('../Middleware/auth');
const router = express.Router();

router.post('/', auth, createOrder);
router.get('/my-orders', auth, getMyOrders);
router.put('/:orderId/status', auth, updateOrderStatus);

module.exports = router;