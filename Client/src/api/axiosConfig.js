import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:9191",
    headers: {
        "Content-Type": "application/json"
    }
});

// You can add an interceptor to include JWT token in requests automatically
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
