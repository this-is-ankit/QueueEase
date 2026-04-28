import apiClient from './client';

export const bookAppointment = async (data) => {
  const response = await apiClient.post('/appointments', data);
  return response.data;
};

export const getMyAppointments = async () => {
  const response = await apiClient.get('/appointments/my');
  return response.data;
};

export const cancelAppointment = async (id) => {
  const response = await apiClient.put(`/appointments/${id}/cancel`);
  return response.data;
};

export const getAppointmentById = async (id) => {
  const response = await apiClient.get(`/appointments/${id}`);
  return response.data;
};

export const getClinicAppointmentsToday = async (clinicId) => {
  const response = await apiClient.get(`/appointments/clinic/${clinicId}/today`);
  return response.data;
};
