const express = require('express');
const { getServices, createMerchantService } = require('../Controllers/service.controller');
const {auth, roleCheck} = require('../Middleware/auth');
const router = express.Router();

router.get('/', getServices);
router.post('/', auth, roleCheck(['merchant']), createMerchantService);

module.exports = router;