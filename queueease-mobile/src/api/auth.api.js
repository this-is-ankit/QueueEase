import apiClient from './client';

const unwrap = (res) => res?.data?.data || res?.data || res;

// POST /api/auth/login
export const login = async (email, password) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return unwrap(response); // { token, user }
};

// POST /api/auth/register
export const register = async (name, phone, email, password, role) => {
  const response = await apiClient.post('/auth/register', {
    name,
    phone,
    email,
    password,
    role,
  });
  return unwrap(response); // { token, user }
};

// GET /api/auth/me
export const getProfile = async () => {
  const response = await apiClient.get('/auth/me');
  return unwrap(response); // { user }
};

// PUT /api/auth/fcm-token
export const updateFcmToken = async (token) => {
  const response = await apiClient.put('/auth/fcm-token', { fcmToken: token });
  return unwrap(response);
};
