import apiClient from './client';

export const createOrder = async (appointmentId) => {
  const response = await apiClient.post('/payments/create-order', { appointmentId });
  return response.data;
};

export const verifyPayment = async (data) => {
  const response = await apiClient.post('/payments/verify', data);
  return response.data;
};

export const getPaymentStatus = async (appointmentId) => {
  const response = await apiClient.get(`/payments/status/${appointmentId}`);
  return response.data;
};
