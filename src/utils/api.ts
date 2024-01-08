import axios, {InternalAxiosRequestConfig} from 'axios';

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8000"
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers['Accept'] = 'application/json';

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default api;