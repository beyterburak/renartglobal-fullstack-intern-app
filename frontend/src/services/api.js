import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProducts = async (filters = {}) => {
    try {
        const params = new URLSearchParams();
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        if (filters.minPopularity) params.append('minPopularity', filters.minPopularity);

        const response = await apiClient.get(`/products?${params.toString()}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await apiClient.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getGoldPrice = async () => {
    try {
        const response = await apiClient.get('/gold-price');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default apiClient;