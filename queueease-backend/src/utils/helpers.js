// ============================================
// Common Helper Functions
// ============================================
// Centralized utility logic executing globally.

const crypto = require("crypto");
const jwt = require("jsonwebtoken");

/**
 * Wraps an async route handler to catch errors
 * and forward them to the global error handler.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Creates a standardized JSON success response.
 */
const sendResponse = (res, statusCode, message, data = null) => {
  const response = { success: true, message };
  if (data !== null) response.data = data;
  return res.status(statusCode).json(response);
};

/**
 * Generates bounded JWT Token
 */
const generateToken = (userId, role) => {
  const { TOKEN_EXPIRY } = require("./constants"); // internal dependency
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });
};

/**
 * Verifies Razorpay Webhook/Payment Signature using HMAC SHA256.
 */
const verifyRazorpaySignature = (orderId, paymentId, signature) => {
  if (!process.env.RAZORPAY_KEY_SECRET) return false;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return generatedSignature === signature;
};

/**
 * Mathematical Great Circle algorithm fetching exact physical ranges.
 * @returns {number} Distance in kilometers
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

/**
 * Decodes express req.query injecting pagination bounds.
 */
const getPaginationParams = (query) => {
  const page = parseInt(query.page, 10) > 0 ? parseInt(query.page, 10) : 1;
  const limit = parseInt(query.limit, 10) > 0 ? parseInt(query.limit, 10) : 10;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

/**
 * Custom Error Class mapping status constraints synchronously.
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  asyncHandler,
  sendResponse,
  generateToken,
  verifyRazorpaySignature,
  calculateDistance,
  getPaginationParams,
  AppError,
};
