import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { apiConfig, isDevelopment } from "../../config";

export const apiClient = axios.create(apiConfig);

// Request interceptor для логирования в dev режиме
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (isDevelopment) {
      console.log("🚀 API Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        data: config.data
      });
    }
    return config;
  },
  (error: AxiosError) => {
    if (isDevelopment) {
      console.error("❌ Request Error:", error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor для обработки ошибок
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (isDevelopment) {
      console.log("✅ API Response:", {
        status: response.status,
        url: response.config.url,
        data: response.data
      });
    }
    return response;
  },
  (error: AxiosError) => {
    if (isDevelopment) {
      console.error("❌ Response Error:", {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
        data: error.response?.data
      });
    }

    // Обработка специфичных ошибок
    if (error.code === "ECONNABORTED") {
      console.error("Превышен таймаут запроса");
    }

    if (!error.response) {
      console.error("Сетевая ошибка: Проверьте подключение к интернету");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
