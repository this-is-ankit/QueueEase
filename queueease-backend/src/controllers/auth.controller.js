// ============================================
// Auth Controller
// ============================================
// Handles user registration, login, profile
// retrieval, and FCM token updates.

const bcrypt = require("bcryptjs");
const prisma = require("../config/db");
const { asyncHandler, sendResponse, AppError, generateToken } = require("../utils/helpers");

// Replaced internal token generator with the unified helper.

// -------------------------
// Helper: Sanitize user object
// -------------------------
/**
 * Strips sensitive fields (passwordHash) from user object
 * before sending in the API response.
 * @param {object} user - Prisma user object
 * @returns {object} User object without passwordHash
 */
const sanitizeUser = (user) => {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
};

// ============================================
// POST /api/auth/register
// ============================================
/**
 * Register a new user.
 *
 * Flow:
 * 1. Check if phone number already exists
 * 2. Check if email already exists (if provided)
 * 3. Hash the password
 * 4. Create user in database
 * 5. Generate JWT token
 * 6. Return token + user info
 */
const register = asyncHandler(async (req, res) => {
  const { name, phone, email, password, role } = req.body;

  // 1. Check for duplicate phone number
  const existingPhone = await prisma.user.findUnique({
    where: { phone },
  });

  if (existingPhone) {
    throw new AppError("An account with this phone number already exists", 409);
  }

  // 2. Check for duplicate email (only if email is provided)
  if (email) {
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      throw new AppError("An account with this email already exists", 409);
    }
  }

  // 3. Hash the password (salt rounds = 12)
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // 4. Create the user in the database
  const user = await prisma.user.create({
    data: {
      name,
      phone,
      email: email || null,
      passwordHash,
      role,
    },
  });

  // 5. Generate JWT token
  const token = generateToken(user.id, user.role);

  // 6. Return success response with token + user info
  sendResponse(res, 201, "Registration successful", {
    token,
    user: sanitizeUser(user),
  });
});

// ============================================
// POST /api/auth/login
// ============================================
/**
 * Login with email and password.
 *
 * Flow:
 * 1. Find user by email
 * 2. Compare password with stored hash
 * 3. Generate JWT token
 * 4. Return token + user info
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Find user by email (include passwordHash for comparison)
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  // 2. Compare the provided password with the stored hash
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    // Use the same generic message to prevent email enumeration
    throw new AppError("Invalid email or password", 401);
  }

  // 3. Generate JWT token
  const token = generateToken(user.id, user.role);

  // 4. Return success response with token + user info
  sendResponse(res, 200, "Login successful", {
    token,
    user: sanitizeUser(user),
  });
});

// ============================================
// GET /api/auth/me
// ============================================
/**
 * Get the currently authenticated user's profile.
 * req.user is already populated by verifyToken middleware.
 */
const getProfile = asyncHandler(async (req, res) => {
  // req.user is attached by the verifyToken middleware
  // and already excludes passwordHash
  sendResponse(res, 200, "Profile retrieved successfully", {
    user: req.user,
  });
});

// ============================================
// PUT /api/auth/fcm-token
// ============================================
/**
 * Update the user's FCM token for push notifications.
 * Called when the mobile app initializes or refreshes
 * its Firebase token.
 *
 * Flow:
 * 1. Get the new FCM token from request body
 * 2. Update the user record in the database
 * 3. Return success
 */
const updateFcmToken = asyncHandler(async (req, res) => {
  const { fcmToken } = req.body;

  // Update the FCM token for the authenticated user
  await prisma.user.update({
    where: { id: req.user.id },
    data: { fcmToken },
  });

  sendResponse(res, 200, "FCM token updated successfully");
});

module.exports = {
  register,
  login,
  getProfile,
  updateFcmToken,
};
