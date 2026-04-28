// ============================================
// Clinic Validators
// ============================================
// express-validator check chains for clinic routes:
// create, update, nearby search, and listing.

const { body, query, param } = require("express-validator");

/**
 * Validation rules for POST /api/clinics (Create Clinic)
 * All clinic fields validated — images handled separately by multer.
 */
const createClinicValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Clinic name is required")
    .isLength({ min: 2, max: 200 })
    .withMessage("Clinic name must be between 2 and 200 characters"),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ max: 500 })
    .withMessage("Address must not exceed 500 characters"),

  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required")
    .isLength({ max: 100 })
    .withMessage("City must not exceed 100 characters"),

  body("state")
    .trim()
    .notEmpty()
    .withMessage("State is required")
    .isLength({ max: 100 })
    .withMessage("State must not exceed 100 characters"),

  body("pincode")
    .trim()
    .notEmpty()
    .withMessage("Pincode is required")
    .matches(/^\d{6}$/)
    .withMessage("Pincode must be a valid 6-digit Indian pincode"),

  body("latitude")
    .notEmpty()
    .withMessage("Latitude is required")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be between -90 and 90"),

  body("longitude")
    .notEmpty()
    .withMessage("Longitude is required")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be between -180 and 180"),

  body("doctorName")
    .trim()
    .notEmpty()
    .withMessage("Doctor/Provider name is required")
    .isLength({ min: 2, max: 200 })
    .withMessage("Doctor name must be between 2 and 200 characters"),

  body("degree")
    .optional({ values: "null" })
    .trim()
    .isLength({ max: 200 })
    .withMessage("Degree must not exceed 200 characters"),

  body("college")
    .optional({ values: "null" })
    .trim()
    .isLength({ max: 200 })
    .withMessage("College must not exceed 200 characters"),

  body("experience")
    .optional({ checkFalsy: true })
    .isInt({ min: 0, max: 70 })
    .withMessage("Experience must be a number between 0 and 70 years"),

  body("specialization")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 200 })
    .withMessage("Specialization must not exceed 200 characters"),

  body("maxPatientsPerDay")
    .optional({ checkFalsy: true })
    .isInt({ min: 1, max: 500 })
    .withMessage("Max patients per day must be between 1 and 500"),

  body("paymentRequired")
    .optional({ checkFalsy: true })
    .isBoolean()
    .withMessage("paymentRequired must be true or false"),
];

/**
 * Validation rules for PUT /api/clinics/:id (Update Clinic)
 * All fields optional — only provided fields will be updated.
 */
const updateClinicValidator = [
  param("id")
    .isUUID()
    .withMessage("Invalid clinic ID format"),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage("Clinic name must be between 2 and 200 characters"),

  body("address")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Address must not exceed 500 characters"),

  body("city")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("City must not exceed 100 characters"),

  body("state")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("State must not exceed 100 characters"),

  body("pincode")
    .optional()
    .trim()
    .matches(/^\d{6}$/)
    .withMessage("Pincode must be a valid 6-digit Indian pincode"),

  body("latitude")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be between -90 and 90"),

  body("longitude")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be between -180 and 180"),

  body("doctorName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage("Doctor name must be between 2 and 200 characters"),

  body("degree")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Degree must not exceed 200 characters"),

  body("college")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("College must not exceed 200 characters"),

  body("experience")
    .optional()
    .isInt({ min: 0, max: 70 })
    .withMessage("Experience must be a number between 0 and 70 years"),

  body("specialization")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Specialization must not exceed 200 characters"),

  body("maxPatientsPerDay")
    .optional()
    .isInt({ min: 1, max: 500 })
    .withMessage("Max patients per day must be between 1 and 500"),

  body("paymentRequired")
    .optional()
    .isBoolean()
    .withMessage("paymentRequired must be true or false"),
];

/**
 * Validation rules for GET /api/clinics/:id
 */
const getClinicByIdValidator = [
  param("id")
    .isUUID()
    .withMessage("Invalid clinic ID format"),
];

/**
 * Validation rules for GET /api/clinics/nearby
 * Requires latitude, longitude. Radius is optional (default 10km).
 */
const nearbyClinicValidator = [
  query("latitude")
    .custom((value, { req }) => {
      const lat = value !== undefined ? value : req.query.lat;
      if (lat === undefined || lat === null || lat === "") {
        throw new Error("Latitude (or lat) is required");
      }
      const latFloat = parseFloat(lat);
      if (isNaN(latFloat) || latFloat < -90 || latFloat > 90) {
        throw new Error("Latitude must be a number between -90 and 90");
      }
      return true;
    }),

  query("longitude")
    .custom((value, { req }) => {
      const lng = value !== undefined ? value : req.query.lng;
      if (lng === undefined || lng === null || lng === "") {
        throw new Error("Longitude (or lng) is required");
      }
      const lngFloat = parseFloat(lng);
      if (isNaN(lngFloat) || lngFloat < -180 || lngFloat > 180) {
        throw new Error("Longitude must be a number between -180 and 180");
      }
      return true;
    }),

  query("radius")
    .optional()
    .isFloat({ min: 0.1, max: 100 })
    .withMessage("Radius must be between 0.1 and 100 km"),
];

/**
 * Validation rules for GET /api/clinics (List with filters)
 * All query params are optional.
 */
const listClinicsValidator = [
  query("city")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("City filter must not exceed 100 characters"),

  query("specialization")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Specialization filter must not exceed 200 characters"),

  query("search")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Search query must not exceed 200 characters"),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50"),
];

module.exports = {
  createClinicValidator,
  updateClinicValidator,
  getClinicByIdValidator,
  nearbyClinicValidator,
  listClinicsValidator,
};
