import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';

function useProducts(filters = {}) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getProducts(filters);

                if (isMounted) {
                    setProducts(response.data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.response?.data?.message || err.message || 'Failed to fetch products');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProducts();

        return () => {
            isMounted = false;
        };
    }, [filters.minPrice, filters.maxPrice, filters.minPopularity]);

    return { products, loading, error };
}

export default useProducts;