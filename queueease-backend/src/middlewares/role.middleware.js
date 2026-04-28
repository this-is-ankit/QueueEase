// ============================================
// Role-Based Access Middleware
// ============================================
// Restricts route access based on the user's role.
// Must be used AFTER verifyToken middleware (req.user must exist).

/**
 * Middleware factory: requireRole
 *
 * Returns a middleware that checks if req.user.role
 * is one of the allowed roles. Returns 403 if not.
 *
 * @param  {...string} allowedRoles - Roles allowed to access the route
 * @returns {Function} Express middleware
 *
 * Usage:
 *   router.get("/admin-only", verifyToken, requireRole("ADMIN"), handler)
 *   router.get("/staff", verifyToken, requireRole("ADMIN", "VERIFIER"), handler)
 */
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    // verifyToken must have run first and attached req.user
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login first.",
      });
    }

    // Check if the user's role is in the allowed list
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. This route requires one of: ${allowedRoles.join(", ")}. Your role: ${req.user.role}`,
      });
    }

    next();
  };
};

module.exports = requireRole;
