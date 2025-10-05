const { getGoldPrice } = require('../services/goldPrice.service');
const {
    getProductsFromFile,
    enrichProduct,
    filterProducts
} = require('../services/products.service');

/**
 * GET /api/products
 * Returns all products with calculated prices
 * Supports filtering via query params
 * 
 * Filter Usage Examples:
 * - /api/products?minPrice=100 (products with price >= $100)
 * - /api/products?maxPrice=500 (products with price <= $500)
 * - /api/products?minPrice=100&maxPrice=500 (products between $100-$500)
 * - /api/products?minPopularity=0.5 (products with popularity >= 0.5/1.0)
 * - /api/products?maxPopularity=0.8 (products with popularity <= 0.8/1.0)
 * - /api/products?minPopularity=0.3&maxPopularity=0.9 (popularity between 0.3-0.9)
 * - /api/products?minPrice=200&minPopularity=0.6 (combine price and popularity filters)
 */
async function getAllProducts(req, res, next) {
    try {
        // Get query filters from request parameters
        // These will be undefined if not provided, which is handled in filterProducts function
        const filters = {
            minPrice: req.query.minPrice,        // Minimum price filter (USD)
            maxPrice: req.query.maxPrice,        // Maximum price filter (USD)
            minPopularity: req.query.minPopularity, // Minimum popularity score (0-1)
            maxPopularity: req.query.maxPopularity  // Maximum popularity score (0-1)
        };

        // Get gold price
        const goldPriceData = await getGoldPrice();
        const goldPrice = goldPriceData.price;

        // Get products from file
        const rawProducts = getProductsFromFile();

        // Enrich products with calculated fields
        const enrichedProducts = rawProducts.map((product, index) =>
            enrichProduct(product, index + 1, goldPrice)
        );

        // Apply filters
        const filteredProducts = filterProducts(enrichedProducts, filters);

        // Response
        res.json({
            success: true,
            data: filteredProducts,
            meta: {
                total: enrichedProducts.length,
                filtered: filteredProducts.length,
                goldPrice: goldPrice,
                goldPriceUnit: 'USD/gram',
                lastUpdated: goldPriceData.timestamp,
                cached: goldPriceData.cached || false
            }
        });

    } catch (error) {
        next(error);
    }
}

/**
 * GET /api/products/:id
 * Returns single product by ID
 */
async function getProductById(req, res, next) {
    try {
        const productId = parseInt(req.params.id);

        if (isNaN(productId) || productId < 1) {
            return res.status(400).json({
                success: false,
                error: 'Invalid product ID'
            });
        }

        // Get gold price
        const goldPriceData = await getGoldPrice();
        const goldPrice = goldPriceData.price;

        // Get products
        const rawProducts = getProductsFromFile();

        // Check if product exists
        if (productId > rawProducts.length) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        // Enrich and return product
        const product = enrichProduct(rawProducts[productId - 1], productId, goldPrice);

        res.json({
            success: true,
            data: product,
            meta: {
                goldPrice: goldPrice,
                lastUpdated: goldPriceData.timestamp
            }
        });

    } catch (error) {
        next(error);
    }
}

/**
 * GET /api/gold-price
 * Returns current gold price (for debugging)
 */
async function getGoldPriceInfo(req, res, next) {
    try {
        const goldPriceData = await getGoldPrice();

        res.json({
            success: true,
            data: {
                price: goldPriceData.price,
                currency: 'USD',
                unit: 'gram',
                source: 'GoldAPI.io',
                lastUpdated: goldPriceData.timestamp,
                cached: goldPriceData.cached || false,
                fallback: goldPriceData.fallback || false
            }
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    getGoldPriceInfo
};