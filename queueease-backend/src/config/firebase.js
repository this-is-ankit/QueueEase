// ============================================
// Firebase Configuration
// ============================================
// Initializes the Firebase Admin SDK enabling
// backend to push messages via Firebase Cloud
// Messaging (FCM).

const admin = require("firebase-admin");

// Initialize Firebase using a fully stringified JSON service account
// stored within the .env file. Fails cleanly to allow local 
// development testing without crashing the Node.js process.
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error("❌ Failed to parse FIREBASE_SERVICE_ACCOUNT JSON. Push tracking disabled.", error.message);
  }
} else {
  console.warn("⚠️ FIREBASE_SERVICE_ACCOUNT is missing from .env. Push notifications are disabled.");
}

// Export the initialized messaging instance binding internally to admin
module.exports = admin;
