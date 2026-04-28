// ============================================
// Auth Validators
// ============================================
// express-validator check chains for all auth
// routes: register, login, and FCM token update.

const { body } = require("express-validator");

/**
 * Validation rules for POST /api/auth/register
 * - name: required, 2-100 chars
 * - phone: required, valid Indian mobile number (10 digits)
 * - email: optional but must be valid if provided
 * - password: required, min 6 chars
 * - role: required, must be one of USER / ADMIN / VERIFIER
 */
const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Please enter a valid 10-digit Indian mobile number"),

  body("email")
    .optional({ values: "null" })
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["USER", "ADMIN", "VERIFIER"])
    .withMessage("Role must be one of: USER, ADMIN, VERIFIER"),
];

/**
 * Validation rules for POST /api/auth/login
 * - email: required, valid email
 * - password: required
 */
const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

/**
 * Validation rules for PUT /api/auth/fcm-token
 * - fcmToken: required, non-empty string
 */
const fcmTokenValidator = [
  body("fcmToken")
    .trim()
    .notEmpty()
    .withMessage("FCM token is required"),
];

module.exports = {
  registerValidator,
  loginValidator,
  fcmTokenValidator,
};
