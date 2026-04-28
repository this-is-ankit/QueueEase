// ============================================
// Payment Routes
// ============================================
// Mounts payment endpoints:
// create order, verify, status.

const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");

const {
  createOrder,
  verifyPayment,
  getPaymentStatus,
} = require("../controllers/payment.controller");

const validate = require("../middlewares/validate.middleware");
const verifyToken = require("../middlewares/auth.middleware");
const requireRole = require("../middlewares/role.middleware");

// ALL routes require authentication and USER role
router.use(verifyToken, requireRole("USER"));

// -------------------------
// Validation Check Chains
// -------------------------
const createOrderValidator = [
  body("appointmentId")
    .isUUID()
    .withMessage("Invalid appointment ID format")
];

const verifyPaymentValidator = [
  body("razorpayOrderId").notEmpty().withMessage("Order ID missing"),
  body("razorpayPaymentId").notEmpty().withMessage("Payment ID missing"),
  body("razorpaySignature").notEmpty().withMessage("Signature missing"),
];

const getStatusValidator = [
  param("appointmentId")
    .isUUID()
    .withMessage("Invalid appointment ID format")
];

// ===========================
// ROUTE DEFINITIONS
// ===========================

/**
 * POST /api/payments/create-order
 */
router.post(
  "/create-order",
  createOrderValidator,
  validate,
  createOrder
);

/**
 * POST /api/payments/verify
 */
router.post(
  "/verify",
  verifyPaymentValidator,
  validate,
  verifyPayment
);

/**
 * GET /api/payments/status/:appointmentId
 */
router.get(
  "/status/:appointmentId",
  getStatusValidator,
  validate,
  getPaymentStatus
);

module.exports = router;
