// ============================================
// Verifier Routes
// ============================================
// Mounts verifier endpoints dealing with physical
// administrative checks on pending clinics.

const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const {
  getPendingClinics,
  getClinicDetails,
  approveClinic,
  rejectClinic,
  getMyVerificationHistory,
} = require("../controllers/verifier.controller");

const validate = require("../middlewares/validate.middleware");
const verifyToken = require("../middlewares/auth.middleware");
const requireRole = require("../middlewares/role.middleware");
const { upload } = require("../config/cloudinary");

// Accepts an optional file upload representing geometric/spatial visual proof
const proofUpload = upload.single("proofPhoto");

// -------------------------
// Global Auth Block constraints
// -------------------------
router.use(verifyToken, requireRole("VERIFIER"));

// -------------------------
// Check Chains
// -------------------------
const clinicIdValidator = [
  param("id").isUUID().withMessage("Invalid clinic ID constraint format")
];

const rejectionValidator = [
  clinicIdValidator[0],
  body("notes")
    .trim()
    .notEmpty()
    .withMessage("Rejection notes are required and must map specific guidelines missing.")
    .isLength({ min: 10 })
    .withMessage("Please be descriptive with the rejection rule failure (min 10 characters).")
];

/**
 * GET /api/verifier/pending
 * Retrieve logic for fetching awaiting clinics
 */
router.get("/pending", getPendingClinics);

/**
 * GET /api/verifier/history
 * Fetch audit logs of action arrays processed by the verifier 
 */
router.get("/history", getMyVerificationHistory);

/**
 * GET /api/verifier/clinics/:id
 * Retrieve rigorous detailed mappings bound to one UUID pending model
 */
router.get("/clinics/:id", clinicIdValidator, validate, getClinicDetails);

/**
 * PUT /api/verifier/clinics/:id/approve
 * Dispatch state changes allowing the system to run the facility globally 
 */
router.put(
  "/clinics/:id/approve",
  proofUpload,
  clinicIdValidator,
  validate,
  approveClinic
);

/**
 * PUT /api/verifier/clinics/:id/reject
 * Dispatch fail states terminating the registration sequence 
 */
router.put(
  "/clinics/:id/reject",
  proofUpload,
  rejectionValidator,
  validate,
  rejectClinic
);

module.exports = router;
