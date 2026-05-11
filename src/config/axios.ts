import axios, { AxiosRequestConfig } from 'axios';

const _instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  headers: { 'Content-Type': 'application/json' },
});

_instance.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

_instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message ?? error.message;
    return Promise.reject(new Error(message));
  }
);

export const axiosInstance = {
  get: <T, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<T> =>
    _instance.get(url, config) as Promise<T>,
  post: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> =>
    _instance.post(url, data, config) as Promise<T>,
  put: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> =>
    _instance.put(url, data, config) as Promise<T>,
  patch: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> =>
    _instance.patch(url, data, config) as Promise<T>,
  delete: <T, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<T> =>
    _instance.delete(url, config) as Promise<T>,
};
