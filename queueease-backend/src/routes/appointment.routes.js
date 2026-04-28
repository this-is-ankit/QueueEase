// ============================================
// Appointment Routes
// ============================================
// Mounts appointment booking endpoints:
// book, cancel, reschedule, list.

const express = require("express");
const router = express.Router();

const {
  bookAppointment,
  getMyAppointments,
  getTodayAppointments,
  cancelAppointment,
  getAppointmentById,
} = require("../controllers/appointment.controller");

const {
  bookAppointmentValidator,
  appointmentIdValidator,
  clinicIdValidator,
} = require("../validators/appointment.validator");

const validate = require("../middlewares/validate.middleware");
const verifyToken = require("../middlewares/auth.middleware");
const requireRole = require("../middlewares/role.middleware");

// ALL appointment routes require authentication
router.use(verifyToken);

/**
 * GET /api/appointments/my
 * Get all appointments for the logged-in user (USER role)
 * Needs to be before /:id param wrapper
 */
router.get("/my", requireRole("USER"), getMyAppointments);

/**
 * GET /api/appointments/clinic/:clinicId/today
 * Get all today's appointments for a clinic (ADMIN role)
 */
router.get(
  "/clinic/:clinicId/today",
  requireRole("ADMIN"),
  clinicIdValidator,
  validate,
  getTodayAppointments
);

/**
 * POST /api/appointments
 * Book a new appointment (USER or ADMIN role)
 */
router.post(
  "/",
  requireRole("USER", "ADMIN"),
  bookAppointmentValidator,
  validate,
  bookAppointment
);

/**
 * PUT /api/appointments/:id/cancel
 * Cancel an appointment (USER or ADMIN role)
 */
router.put(
  "/:id/cancel",
  requireRole("USER", "ADMIN"),
  appointmentIdValidator,
  validate,
  cancelAppointment
);

/**
 * GET /api/appointments/:id
 * Get full details for an appointment by ID
 */
router.get(
  "/:id",
  appointmentIdValidator,
  validate,
  getAppointmentById
);

module.exports = router;
