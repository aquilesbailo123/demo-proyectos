import axios from "axios";

const axiosInstance = axios.create({
    // Set this to your backend root, e.g. http://localhost:8000
    // If VITE_API_URL is not set, default to root so dj-rest-auth endpoints (/auth/...) work
    baseURL: import.meta.env.VITE_API_URL || "/",
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
