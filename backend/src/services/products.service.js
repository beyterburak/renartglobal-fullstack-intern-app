const fs = require('fs');
const path = require('path');

function getProductsFromFile() {
    try {
        const filePath = path.join(__dirname, '../data/products.json');
        const rawData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        throw new Error('Failed to load products');
    }
}

function calculatePrice(product, goldPrice) {
    const price = (product.popularityScore + 1) * product.weight * goldPrice;
    return parseFloat(price.toFixed(2));
}

function convertPopularityScore(score) {
    return (score * 5).toFixed(1);
}

function enrichProduct(product, id, goldPrice) {
    const price = calculatePrice(product, goldPrice);

    return {
        id,
        name: product.name,
        popularityScore: product.popularityScore,
        popularityDisplay: convertPopularityScore(product.popularityScore),
        weight: product.weight,
        price: price,
        priceFormatted: `$${price.toFixed(2)} USD`,
        images: product.images
    };
}

function filterProducts(products, filters) {
    let filtered = [...products];

    if (filters.minPrice !== undefined) {
        filtered = filtered.filter(p => p.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice !== undefined) {
        filtered = filtered.filter(p => p.price <= parseFloat(filters.maxPrice));
    }

    if (filters.minPopularity !== undefined) {
        filtered = filtered.filter(p => p.popularityScore >= parseFloat(filters.minPopularity));
    }

    if (filters.maxPopularity !== undefined) {
        filtered = filtered.filter(p => p.popularityScore <= parseFloat(filters.maxPopularity));
    }

    return filtered;
}

module.exports = {
    getProductsFromFile,
    enrichProduct,
    filterProducts
};