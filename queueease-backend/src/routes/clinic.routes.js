// ============================================
// Clinic Routes
// ============================================
// Mounts all clinic-related endpoints.
// Base path: /api/clinics
//
// IMPORTANT: Specific paths (/my, /nearby) MUST be
// defined BEFORE the /:id wildcard route to prevent
// Express from treating "my" or "nearby" as an ID.

const express = require("express");
const router = express.Router();

// Controller methods
const {
  createClinic,
  getMyClinic,
  listClinics,
  getClinicById,
  getNearbyClinics,
  updateClinic,
} = require("../controllers/clinic.controller");

// Validators (express-validator check chains)
const {
  createClinicValidator,
  updateClinicValidator,
  getClinicByIdValidator,
  nearbyClinicValidator,
  listClinicsValidator,
} = require("../validators/clinic.validator");

// Middleware
const validate = require("../middlewares/validate.middleware");
const verifyToken = require("../middlewares/auth.middleware");
const requireRole = require("../middlewares/role.middleware");
const { upload } = require("../config/cloudinary");

// -------------------------
// Multer Fields Config
// -------------------------
// Defines which file fields to accept and their limits.
// clinicImages: up to 5 photos of the clinic
// doctorPhoto: 1 photo of the doctor/provider
const clinicUpload = upload.fields([
  { name: "clinicImages", maxCount: 5 },
  { name: "doctorPhoto", maxCount: 1 },
]);

// ===========================
// ROUTE DEFINITIONS
// ===========================
// Order matters: specific paths before wildcards.

/**
 * GET /api/clinics/my
 * Get the clinic registered by the logged-in admin (ADMIN only)
 * Headers: Authorization: Bearer <token>
 */
router.get("/my", verifyToken, requireRole("ADMIN"), getMyClinic);

/**
 * GET /api/clinics/nearby
 * Find clinics near a location within a radius (public)
 * Query: ?latitude=xx&longitude=yy&radius=10
 */
router.get("/nearby", nearbyClinicValidator, validate, getNearbyClinics);

/**
 * GET /api/clinics
 * List all approved clinics with filters + pagination (public)
 * Query: ?city=mumbai&specialization=dentist&search=smile&page=1&limit=10
 */
router.get("/", listClinicsValidator, validate, listClinics);

/**
 * GET /api/clinics/:id
 * Get full details of a specific clinic + queue state (public)
 */
router.get("/:id", getClinicByIdValidator, validate, getClinicById);

/**
 * POST /api/clinics
 * Register a new clinic (ADMIN only)
 * Body: multipart/form-data with clinic fields + images
 * Headers: Authorization: Bearer <token>
 */
router.post(
  "/",
  verifyToken,
  requireRole("ADMIN"),
  clinicUpload,
  createClinicValidator,
  validate,
  createClinic
);

/**
 * PUT /api/clinics/:id
 * Update clinic details (ADMIN, own clinic only)
 * Body: multipart/form-data with updated fields + optional images
 * Headers: Authorization: Bearer <token>
 */
router.put(
  "/:id",
  verifyToken,
  requireRole("ADMIN"),
  clinicUpload,
  updateClinicValidator,
  validate,
  updateClinic
);

module.exports = router;
