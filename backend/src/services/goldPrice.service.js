const axios = require('axios');
const NodeCache = require('node-cache');

const cache = new NodeCache({
    stdTTL: parseInt(process.env.CACHE_TTL) || 3600,
    checkperiod: 120
});

async function getGoldPrice() {
    try {
        const cachedPrice = cache.get('goldPrice');
        if (cachedPrice) {
            return {
                price: cachedPrice,
                cached: true,
                timestamp: new Date().toISOString()
            };
        }

        const response = await axios.get(process.env.GOLD_API_URL, {
            headers: {
                'x-access-token': process.env.GOLD_API_KEY
            },
            timeout: 5000
        });

        const pricePerGram = response.data.price_gram_24k;

        cache.set('goldPrice', pricePerGram);

        return {
            price: pricePerGram,
            cached: false,
            timestamp: new Date().toISOString()
        };

    } catch (error) {
        const fallbackPrice = 65.50;

        return {
            price: fallbackPrice,
            cached: false,
            fallback: true,
            timestamp: new Date().toISOString()
        };
    }
}

module.exports = { getGoldPrice };