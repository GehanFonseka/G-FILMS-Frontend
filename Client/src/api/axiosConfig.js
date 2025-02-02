import axios from "axios";

const API_BASE_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:9191"  // Local backend for development
    : "https://g-films.onrender.com";  // Production backend

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Automatically attach JWT token if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
