import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const TOKEN_KEY = "jwt";

const getBaseURL = (): string | undefined =>
  typeof window !== "undefined"
    ? window.env?.NEXT_PUBLIC_BACKEND_URL
    : undefined;

// Request interceptor: Automatically add the token to headers
const setupRequestInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
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
};

interface ErrorResponse {
  message?: string;
}

// Response interceptor: Standardize success/error responses
const setupResponseInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
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
};

// Create an axios instance with default configurations
const createHttpInstance = (baseURL: string): AxiosInstance => {
  const instance: AxiosInstance = axios.create({
    baseURL,
    timeout: parseInt(process.env.HTTP_TIMEOUT || "10000", 10),
    headers: {
      "Content-Type": "application/json",
    },
  });

  setupRequestInterceptors(instance);
  setupResponseInterceptors(instance);

  return instance;
};

let httpInstance: AxiosInstance | null = null;
let lastBaseURL: string | undefined = undefined;

export const getHttpInstance = (): AxiosInstance => {
  const currentBaseURL = getBaseURL();

  if (currentBaseURL === undefined) {
    throw new Error(
      "Cannot initialize HTTP client: NEXT_PUBLIC_BACKEND_URL is not defined. " +
        "Ensure EnvProvider is properly initialized.",
    );
  }

  if (!httpInstance || currentBaseURL !== lastBaseURL) {
    httpInstance = createHttpInstance(currentBaseURL!);
    lastBaseURL = currentBaseURL;
  }

  return httpInstance;
};

const proxy = new Proxy({} as AxiosInstance, {
  get<T extends keyof AxiosInstance>(_: unknown, method: T) {
    const http = getHttpInstance();
    const property = http[method];

    // Handle function properties
    if (typeof property === "function") {
      return (...args: unknown[]) =>
        (property as (...args: unknown[]) => unknown)(...args);
    }

    // Return non-function properties as-is
    return property;
  },
});

export default proxy;
