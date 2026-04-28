// ============================================
// Authentication Middleware
// ============================================
// Verifies JWT tokens from the Authorization header.
// Attaches the full user object (from DB) to req.user.
// Returns 401 if token is missing, invalid, or expired.

const jwt = require("jsonwebtoken");
const prisma = require("../config/db");

/**
 * Middleware: verifyToken
 *
 * Extracts the Bearer token from the Authorization header,
 * verifies it against JWT_SECRET, fetches the user from the
 * database, and attaches it to req.user.
 *
 * Usage: router.get("/protected", verifyToken, handler)
 */
const verifyToken = async (req, res, next) => {
  try {
    // 1. Extract the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // 2. Pull the token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // 3. Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Fetch the user from the database to ensure they still exist
    //    and to get the latest role/info
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        role: true,
        fcmToken: true,
        createdAt: true,
        updatedAt: true,
        // Explicitly exclude passwordHash
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User associated with this token no longer exists.",
      });
    }

    // 5. Attach user to the request object for downstream use
    req.user = user;
    next();
  } catch (error) {
    // Handle specific JWT errors with clear messages
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please login again.",
      });
    }

    // Unexpected error — pass to global error handler
    next(error);
  }
};

module.exports = verifyToken;
