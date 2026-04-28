import apiClient from './client';

export const getQueueState = async (clinicId) => {
  const response = await apiClient.get(`/queue/${clinicId}`);
  return response.data;
};

export const markAsDone = async (clinicId) => {
  const response = await apiClient.put(`/queue/${clinicId}/next`);
  return response.data;
};

export const resetQueue = async (clinicId) => {
  const response = await apiClient.put(`/queue/${clinicId}/reset`);
  return response.data;
};
