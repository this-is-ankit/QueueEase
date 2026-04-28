import apiClient from './client';

export const getPendingClinics = async (params) => {
  const response = await apiClient.get('/verifier/pending', { params });
  return response.data;
};

export const getClinicDetails = async (id) => {
  const response = await apiClient.get(`/verifier/clinics/${id}`);
  return response.data;
};

export const approveClinic = async (id, data) => {
  const response = await apiClient.put(`/verifier/clinics/${id}/approve`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const rejectClinic = async (id, data) => {
  const response = await apiClient.put(`/verifier/clinics/${id}/reject`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getHistory = async () => {
  const response = await apiClient.get('/verifier/history');
  return response.data;
};
