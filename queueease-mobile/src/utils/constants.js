// App-wide constants for QueueEase

export const APP_NAME = 'QueueEase';

// API
export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000/api';
export const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL || 'http://localhost:5000';
export const RAZORPAY_KEY = process.env.EXPO_PUBLIC_RAZORPAY_KEY || '';
export const GOOGLE_MAPS_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY || '';

// User roles
export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  VERIFIER: 'VERIFIER',
};

// Appointment statuses
export const APPOINTMENT_STATUS = {
  BOOKED: 'BOOKED',
  SERVING: 'SERVING',
  DONE: 'DONE',
  CANCELLED: 'CANCELLED',
};

// Clinic verification statuses
export const CLINIC_STATUS = {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED',
};

// Notification types (FCM data payload `type` field)
export const NOTIFICATION_TYPES = {
  QUEUE_UPDATE: 'queue_update',
  BOOKING_CONFIRMED: 'booking_confirmed',
  CLINIC_APPROVED: 'clinic_approved',
};

// Design tokens (mirrors tailwind.config.js — useful for dynamic styles)
export const COLORS = {
  primary: '#2563EB',
  secondary: '#10B981',
  error: '#EF4444',
  background: '#FFFFFF',
  card: '#F9FAFB',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
};
