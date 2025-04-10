import axios from 'axios'
export const getApiUrl = (): string => {
  const localApi = import.meta.env.VITE_API_URL as string;
  const nodeApi = import.meta.env.VITE_HOST_API as string;
  const isProd = import.meta.env.VITE_NODE_ENV === "production";
  const baseUrl = isProd ? nodeApi : localApi;
  return baseUrl;
};

export const api = axios.create({
  baseURL: getApiUrl(),
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (reason) => Promise.reject(reason)
);

