import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { env, debugLog } from './env';

// Types for API responses
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  statusCode?: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
  details?: any;
}

// Token storage utilities
const safeStorage: Storage | null = (() => {
  try {
    return globalThis?.localStorage ?? null;
  } catch {
    return null; // not available (SSR, private mode, etc.)
  }
})();

export const tokenStorage = {
  getAccessToken: (): string | null => {
    return safeStorage?.getItem('access_token') ?? null;
  },
  setAccessToken: (token: string): void => {
    safeStorage?.setItem('access_token', token);
    debugLog('Access token stored');
  },
  getRefreshToken: (): string | null => {
    return safeStorage?.getItem('refresh_token') ?? null;
  },
  setRefreshToken: (token: string): void => {
    safeStorage?.setItem('refresh_token', token);
    debugLog('Refresh token stored');
  },
  clearTokens: (): void => {
    safeStorage?.removeItem('access_token');
    safeStorage?.removeItem('refresh_token');
    debugLog('Tokens cleared');
  },
  hasValidTokens: (): boolean => {
    return !!(tokenStorage.getAccessToken() && tokenStorage.getRefreshToken());
  },
};

// Create base Axios instance
export const api: AxiosInstance = axios.create({
  baseURL: env.API_URL, // e.g., http://localhost:3001/api
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Track refresh state
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
};

// Axios instance with auth interceptors
export const apiWithAuth: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
apiWithAuth.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    debugLog(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    debugLog('Request Error:', error);
    return Promise.reject(error);
  },
);

// Response interceptor for token refresh
apiWithAuth.interceptors.response.use(
  (response) => {
    debugLog(
      `API Response: ${
        response.status
      } ${response.config.method?.toUpperCase()} ${response.config.url}`,
    );
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      !originalRequest.url?.includes('/auth/refresh') &&
      !originalRequest._retry
    ) {
      const refreshToken = tokenStorage.getRefreshToken();

      if (refreshToken) {
        if (isRefreshing) {
          try {
            const token = await new Promise<string>((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            });
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiWithAuth(originalRequest);
          } catch (queueError) {
            return Promise.reject(error);
          }
        }

        isRefreshing = true;
        originalRequest._retry = true;

        try {
          debugLog('Attempting token refresh...');
          const response = await api.post('/auth/refresh', { refreshToken }).then(
            (res) =>
              res.data as ApiResponse<{
                accessToken: string;
                refreshToken: string;
              }>,
          );

          if (response.success && response.data) {
            tokenStorage.setAccessToken(response.data.accessToken);
            tokenStorage.setRefreshToken(response.data.refreshToken);
            debugLog('Token refreshed successfully');
            processQueue(null, response.data.accessToken);
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return apiWithAuth(originalRequest);
          } else {
            throw new Error('Token refresh failed');
          }
        } catch (refreshError) {
          debugLog('Token refresh failed:', refreshError);
          processQueue(refreshError, null);
          tokenStorage.clearTokens();
          window.dispatchEvent(
            new CustomEvent('auth:logout', {
              detail: { reason: 'token_refresh_failed' },
            }),
          );
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      } else {
        debugLog('No refresh token available');
        tokenStorage.clearTokens();
        window.dispatchEvent(
          new CustomEvent('auth:logout', {
            detail: { reason: 'no_refresh_token' },
          }),
        );
        return Promise.reject(error);
      }
    }

    debugLog('API Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
    });
    return Promise.reject(error);
  },
);

// Helper function to check if API is reachable
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    await api.get('/health');
    return true;
  } catch (error) {
    debugLog('API health check failed:', error);
    return false;
  }
};

// Helper function to get API error message
export const getApiErrorMessage = async (error: any): Promise<string> => {
  if (error.response) {
    try {
      const errorData = error.response.data as ApiError;
      return errorData.message || errorData.error || 'An unexpected error occurred';
    } catch {
      return error.response.statusText || 'An unexpected error occurred';
    }
  }
  return error.message || 'Network error occurred';
};

// Export the main API client (with auth) as default
export default apiWithAuth;
