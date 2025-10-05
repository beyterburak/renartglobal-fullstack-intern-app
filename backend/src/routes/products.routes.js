const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    getGoldPriceInfo
} = require('../controllers/products.controller');

// GET /api/products - Get all products with optional filters
router.get('/', getAllProducts);

// GET /api/products/:id - Get single product by ID
router.get('/:id', getProductById);

module.exports = router;