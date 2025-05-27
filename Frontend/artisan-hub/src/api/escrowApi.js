import axios from 'axios';

// Set your backend API base URL (Flask default port)
const API_BASE_URL = 'http://localhost:5000/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- Product API (matches backend Product model) ---

// Get all products
export const getProducts = async () => {
    try {
        const response = await axiosInstance.get('/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Get a single product by prod_id
export const getProductById = async (prod_id) => {
    try {
        const response = await axiosInstance.get(`/products/${prod_id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product ${prod_id}:`, error);
        throw error;
    }
};