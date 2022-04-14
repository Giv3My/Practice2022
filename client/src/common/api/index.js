import axios from 'axios';

export const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('userToken');

  return config;
});

api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;

  if (!error.config._isRetry) {
    originalRequest._isRetry = true;

    try {
      const { headers } = await axios.get(`${API_URL}/refreshToken`);

      localStorage.setItem('userToken', headers.authorization);
      return api.request(originalRequest);
    } catch (err) {
      throw new Error('Refresh token has been expired');
    }
  }
});

export default api;