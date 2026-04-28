// ============================================
// Auth Routes
// ============================================
// Mounts all authentication-related endpoints.
// Base path: /api/auth

const express = require("express");
const router = express.Router();

// Controller methods
const {
  register,
  login,
  getProfile,
  updateFcmToken,
} = require("../controllers/auth.controller");

// Validators (express-validator check chains)
const {
  registerValidator,
  loginValidator,
  fcmTokenValidator,
} = require("../validators/auth.validator");

// Middleware
const validate = require("../middlewares/validate.middleware");
const verifyToken = require("../middlewares/auth.middleware");

// -------------------------
// Public Routes (no auth required)
// -------------------------

/**
 * POST /api/auth/register
 * Register a new user (USER / ADMIN / VERIFIER)
 * Body: { name, phone, email?, password, role }
 */
router.post("/register", registerValidator, validate, register);

/**
 * POST /api/auth/login
 * Login with email and password
 * Body: { email, password }
 */
router.post("/login", loginValidator, validate, login);

// -------------------------
// Protected Routes (JWT required)
// -------------------------

/**
 * GET /api/auth/me
 * Get the currently authenticated user's profile
 * Headers: Authorization: Bearer <token>
 */
router.get("/me", verifyToken, getProfile);

/**
 * PUT /api/auth/fcm-token
 * Update the user's FCM token for push notifications
 * Headers: Authorization: Bearer <token>
 * Body: { fcmToken }
 */
router.put("/fcm-token", verifyToken, fcmTokenValidator, validate, updateFcmToken);

module.exports = router;
