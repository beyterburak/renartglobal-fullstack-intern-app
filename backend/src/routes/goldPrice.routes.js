const express = require('express');
const router = express.Router();
const { getGoldPriceInfo } = require('../controllers/products.controller');

// GET /api/gold-price - Get current gold price info
router.get('/', getGoldPriceInfo);

module.exports = router;