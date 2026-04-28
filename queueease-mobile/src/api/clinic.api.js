import apiClient from './client';

export const getClinics = async (params) => {
  const response = await apiClient.get('/clinics', { params });
  return response.data;
};

export const getClinicById = async (id) => {
  const response = await apiClient.get(`/clinics/${id}`);
  return response.data;
};

export const getNearbyClinics = async (lat, lng, radius = 10) => {
  const response = await apiClient.get('/clinics/nearby', { params: { lat, lng, radius } });
  return response.data;
};

export const getMyClinic = async () => {
  const response = await apiClient.get('/clinics/my');
  return response.data;
};

export const registerClinic = async (formData) => {
  const response = await apiClient.post('/clinics', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const updateClinic = async (id, data) => {
  const response = await apiClient.put(`/clinics/${id}`, data);
  return response.data;
};
