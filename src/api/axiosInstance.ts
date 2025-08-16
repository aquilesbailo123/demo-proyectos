import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "/api",
    // Send cookies only if your backend uses session auth; keep false by default
    withCredentials: false,
});

// Keep a simple interceptor for potential future headers/extensions.
axiosInstance.interceptors.request.use((config) => {
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default axiosInstance;
