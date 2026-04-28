// ============================================
// Appointment Validators
// ============================================
// express-validator check chains for appointment routes:
// booking, cancellation, etc.

const { body, param } = require("express-validator");

/**
 * Validation rules for POST /api/appointments (Book Appointment)
 */
const bookAppointmentValidator = [
  body("clinicId")
    .isUUID()
    .withMessage("Invalid clinic ID format"),

  body("patientName")
    .trim()
    .notEmpty()
    .withMessage("Patient name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Patient name must be between 2 and 100 characters"),

  body("patientAge")
    .custom((value, { req }) => {
      const age = value !== undefined ? value : req.body.age;
      if (age === undefined || age === null || age === "") {
        throw new Error("Patient age is required");
      }
      const ageInt = parseInt(age);
      if (isNaN(ageInt) || ageInt < 0 || ageInt > 150) {
        throw new Error("Patient age must be a valid number between 0 and 150");
      }
      return true;
    }),

  body("patientPhone")
    .custom((value, { req }) => {
      const phone = value || req.body.phone;
      if (!phone) {
        throw new Error("Patient phone is required");
      }
      if (!/^[6-9]\d{9}$/.test(phone)) {
        throw new Error("Please enter a valid 10-digit Indian mobile number");
      }
      return true;
    }),

  body("patientEmail")
    .optional({ values: "null" })
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("patientAddress")
    .optional({ values: "null" })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Patient address must not exceed 500 characters"),

  body("appointmentDate")
    .custom((value, { req }) => {
      const dateVal = value || req.body.date;
      if (!dateVal) {
        throw new Error("Appointment date is required");
      }
      
      let finalDate;
      const timeSlot = req.body.timeSlot;
      
      if (dateVal && timeSlot) {
        const [time, modifier] = timeSlot.split(" ");
        let [hours, minutes] = time.split(":");
        if (hours === "12") hours = "00";
        if (modifier === "PM") hours = parseInt(hours, 10) + 12;
        const [year, month, day] = dateVal.split("-").map(Number);
        finalDate = new Date(year, month - 1, day, parseInt(hours, 10), parseInt(minutes, 10));
      } else {
        finalDate = new Date(dateVal);
      }

      if (isNaN(finalDate.getTime())) {
        throw new Error("Invalid date format");
      }

      const now = new Date();
      if (finalDate < now) {
        const isToday = finalDate.toDateString() === now.toDateString();
        // If it's today and timeSlot was provided, it MUST be in the future.
        // If it's today and NO timeSlot was provided, we allow it (assumed as 'today').
        if (!isToday || (timeSlot && finalDate < now)) {
          throw new Error("Appointment date or slot cannot be in the past");
        }
      }
      return true;
    }),
];

/**
 * Validation rules for routes expecting appointment ID in params
 */
const appointmentIdValidator = [
  param("id")
    .isUUID()
    .withMessage("Invalid appointment ID format"),
];

/**
 * Validation rules for routes expecting clinic ID in params
 */
const clinicIdValidator = [
  param("clinicId")
    .isUUID()
    .withMessage("Invalid clinic ID format"),
];

module.exports = {
  bookAppointmentValidator,
  appointmentIdValidator,
  clinicIdValidator,
};
