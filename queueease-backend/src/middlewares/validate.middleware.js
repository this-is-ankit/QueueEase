// ============================================
// Request Payload Validator Pipeline
// ============================================
// Generic middleware capturing failed conditions
// from express-validator check chains executed
// within the route definitions.

const { validationResult } = require("express-validator");

/**
 * Evaluates `req` body elements and traps
 * broken conditions natively blocking execution.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Validation errors:", errors.array());
    return res.status(422).json({
      success: false,
      message: "Validation Error",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

module.exports = validate;
