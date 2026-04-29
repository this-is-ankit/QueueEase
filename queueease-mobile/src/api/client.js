import axios from 'axios';
import { getToken, removeToken, removeUserData } from '../utils/storage';

// ─── Base URL ──────────────────────────────────────────────────────────────────
const BASE_URL = 'https://queueease-ep4f.onrender.com/api';

// ─── Axios instance ────────────────────────────────────────────────────────────
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request interceptor: attach JWT ──────────────────────────────────────────
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('[API] Could not read token from storage:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response interceptor: clear auth on 401 ──────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await removeToken().catch(() => {});
      await removeUserData().catch(() => {});
    }

    if (!error.response && (error.code === 'ERR_NETWORK' || error.message === 'Network Error')) {
      console.error(`[API] Cannot reach backend at ${BASE_URL}`);
    }

    if (error.code === 'ECONNABORTED') {
      console.error('[API] Request timed out');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
