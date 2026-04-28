// ============================================
// QueueEase Constants
// ============================================

module.exports = {
  // Service Metrics
  AVG_CONSULTATION_TIME_MINS: 15,
  MAX_CLINIC_IMAGES: 5,
  
  // Security
  TOKEN_EXPIRY: "7d",

  // Application Roles
  ROLES: {
    USER: "USER",
    ADMIN: "ADMIN",
    VERIFIER: "VERIFIER",
  },

  // Appointment Status Transitions
  APPOINTMENT_STATUS: {
    BOOKED: "BOOKED",
    SERVING: "SERVING",
    DONE: "DONE",
    CANCELLED: "CANCELLED",
  },

  // Payment Flags
  PAYMENT_STATUS: {
    PENDING: "PENDING",
    PAID: "PAID",
    NOT_REQUIRED: "NOT_REQUIRED",
  },
};
