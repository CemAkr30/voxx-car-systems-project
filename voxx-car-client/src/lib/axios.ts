import axios, {AxiosError, type AxiosResponse, type InternalAxiosRequestConfig,} from "axios";
import env from "../env";

interface ApiError {
    message: string;
    status: number;
    data?: unknown;
}

// Environment-based base URL
const getBaseURL = () => {
    // Environment variable'dan al
    if (env.VITE_API_BASE_URL) {
        return env.VITE_API_BASE_URL;
    }
    
    // Production'da her zaman HTTPS kullan
    if (window.location.protocol === 'https:') {
        return "https://voxxcarsystems.online/api/";
    }
    
    // Development'da localhost kullan
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return "http://localhost/api/";
    }
    
    // Fallback olarak HTTPS kullan
    return "https://voxxcarsystems.online/api/";
};

export const axiosClient = axios.create({
    baseURL: getBaseURL(),
    timeout: 10000, // Add timeout for better UX
    withCredentials: true, // Enable credentials for CORS
});

// Request interceptor with better error handling
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            
            // Force HTTPS for production - AGGRESSIVE
            if (window.location.protocol === 'https:') {
                // Base URL'i zorla HTTPS yap
                if (config.baseURL && config.baseURL.startsWith('http://')) {
                    config.baseURL = config.baseURL.replace('http://', 'https://');
                }
                
                // URL'i zorla HTTPS yap
                if (config.url && config.url.startsWith('http://')) {
                    config.url = config.url.replace('http://', 'https://');
                }
                
                // Full URL'i kontrol et
                const fullUrl = config.baseURL + config.url;
                if (fullUrl.startsWith('http://')) {
                    config.url = fullUrl.replace('http://', 'https://');
                }
            }
            
            // Ensure proper headers for CORS
            config.headers['Content-Type'] = 'application/json';
            config.headers['Accept'] = 'application/json, text/plain, */*';
            
            // Debug log
            console.log('Request URL:', config.baseURL + config.url);
            console.log('Protocol:', window.location.protocol);
            
        } catch (error) {
            console.warn("Failed to retrieve access token from localStorage:", error);
            // Continue without token rather than failing the request
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error),
);

// Response interceptor with typed error handling
axiosClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            try {
                localStorage.removeItem("accessToken");
                // Optional: Dispatch an event or call a callback for logout handling
                window.dispatchEvent(new CustomEvent("auth:logout"));

                // If you're using React Router or similar, handle navigation here
                // window.location.href = '/login';
            } catch (storageError) {
                console.warn(
                    "Failed to remove access token from localStorage:",
                    storageError,
                );
            }
        }

        // Create a more structured error object
        const apiError: ApiError = {
            message: error.message || "An error occurred",
            status: error.response?.status || 0,
            data: error.response?.data,
        };

        return Promise.reject(apiError);
    },
);
