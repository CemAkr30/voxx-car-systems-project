// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { env } = import.meta; 


/**
 * Ensures that a URL uses HTTPS in production environments
 * @param url The URL to ensure HTTPS for
 * @returns The URL with HTTPS protocol
 */
export function ensureHttps(url: string): string {
    // If we're in a browser environment and on HTTPS, ensure the URL is also HTTPS
    if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
        // Replace http:// with https://
        return url.replace(/^http:\/\//, 'https://');
    }
    return url;
}

/**
 * Gets the base API URL ensuring HTTPS is used in production
 * @returns The base API URL
 */
export function getApiBaseUrl(): string {
    console.log(env.VITE_API_BASE_URL);
    if (env.VITE_API_BASE_URL) {
        return env.VITE_API_BASE_URL.replace(/^http:\/\//, "https://");
    }
    return "https://voxxcarsystems.online/api/";
}

