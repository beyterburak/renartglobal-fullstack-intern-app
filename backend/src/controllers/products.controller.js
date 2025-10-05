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
 */
async function getAllProducts(req, res, next) {
    try {
        // Get query filters
        const filters = {
            minPrice: req.query.minPrice,
            maxPrice: req.query.maxPrice,
            minPopularity: req.query.minPopularity,
            maxPopularity: req.query.maxPopularity
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