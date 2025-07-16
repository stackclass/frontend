import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const TOKEN_KEY = "jwt";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!baseURL) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_BACKEND_URL is required in production environment.",
    );
  } else {
    console.warn(
      "NEXT_PUBLIC_BACKEND_URL is not defined. Using default development URL.",
    );
  }
}

// Create an axios instance with default configurations
const http: AxiosInstance = axios.create({
  baseURL: baseURL || "http://localhost:3000",
  timeout: parseInt(process.env.HTTP_TIMEOUT || "10000", 10),
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Automatically add the token to headers
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Only access localStorage in the client-side environment
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

interface ErrorResponse {
  message?: string;
}

// Response interceptor: Standardize success/error responses
http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (error.response) {
      const { status, data } = error.response;
      const message = data?.message || error.message;

      // Handle specific status codes (e.g., 401 for token removal)
      if (status === 401 && typeof window !== "undefined") {
        localStorage.removeItem(TOKEN_KEY);
      }

      return Promise.reject({
        code: status,
        message: message,
      });
    }

    // Network or other errors
    return Promise.reject({
      code: -1,
      message: error.message || "Network error",
    });
  },
);

// Export the instance
export default http;
