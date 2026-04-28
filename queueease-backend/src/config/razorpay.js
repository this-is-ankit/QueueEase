// ============================================
// Razorpay Configuration
// ============================================
// Initializes Razorpay instance for payment
// processing (UPI, cards, QR).

const Razorpay = require("razorpay");

// Allow the server to start even if Razorpay isn't fully configured
// in the .env file during development.
let razorpay = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
} else {
  console.warn("⚠️ Razorpay keys are missing. Payments will fail.");
}

module.exports = razorpay;
