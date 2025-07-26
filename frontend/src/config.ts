export const apiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "300000"),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
};

export const isDevelopment = import.meta.env.DEV;
