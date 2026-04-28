// ============================================
// Queue Routes
// ============================================
// Mounts live queue management endpoints.
// Base path: /api/queue

const express = require("express");
const router = express.Router();
const { param } = require("express-validator");

const validate = require("../middlewares/validate.middleware");
const verifyToken = require("../middlewares/auth.middleware");
const requireRole = require("../middlewares/role.middleware");

const {
  fetchQueueState,
  advanceQueue,
  resetQueue,
} = require("../controllers/queue.controller");

// Shared param validator
const queueParamsValidator = [
  param("clinicId")
    .isUUID()
    .withMessage("Invalid clinic ID constraint")
];

/**
 * GET /api/queue/:clinicId
 * Public dashboard: Retrieves static view estimating wait times.
 */
router.get("/:clinicId", queueParamsValidator, validate, fetchQueueState);

/**
 * PUT /api/queue/:clinicId/next
 * Service Provider calls this when dismissing a patient.
 */
router.put(
  "/:clinicId/next",
  verifyToken,
  requireRole("ADMIN"),
  queueParamsValidator,
  validate,
  advanceQueue
);

/**
 * PUT /api/queue/:clinicId/reset
 * Start-Of-Day pipeline. 
 */
router.put(
  "/:clinicId/reset",
  verifyToken,
  requireRole("ADMIN"),
  queueParamsValidator,
  validate,
  resetQueue
);

module.exports = router;
