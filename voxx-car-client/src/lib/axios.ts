import axios, {AxiosError, type AxiosResponse, type InternalAxiosRequestConfig,} from "axios";
import { env } from "@/env";
import { getApiBaseUrl } from "./url-utils";

interface ApiError {
    message: string;
    status: number;
    data?: unknown;
}

export const axiosClient = axios.create({
    baseURL: getApiBaseUrl(),
    timeout: 10000, // Add timeout for better UX
});

// Add debugging to see what URLs are being requested
console.log('Axios baseURL:', axiosClient.defaults.baseURL);

// Request interceptor with better error handling
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Debug: Log the full URL being requested
        const fullUrl = `${config.baseURL}${config.url}`;
        console.log('Making request to:', fullUrl);
        
        // Ensure we're not making HTTP requests when we should be using HTTPS
        if (typeof window !== 'undefined' && window.location.protocol === 'https:' && fullUrl.startsWith('http://')) {
            console.error('Blocking HTTP request in HTTPS context:', fullUrl);
            throw new Error('Mixed Content: HTTP requests are not allowed in HTTPS context');
        }
        
        try {
            const token = localStorage.getItem("accessToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
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
