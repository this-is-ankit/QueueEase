// ============================================
// Notification Service
// ============================================
// Dedicated wrappers handling Firebase FCM 
// templates dynamically tied to Prisma Models.

const admin = require("../config/firebase");
const prisma = require("../config/db");

/**
 * 1. Base Push Wrapper
 * Silently fetches User token and dispatches Firebase trigger.
 */
const sendNotificationToUser = async (userId, title, body, data = {}) => {
  try {
    // Escape loop natively if Admin is disabled
    if (!admin.apps || admin.apps.length === 0) return;

    // Fetch the target user's precise FCM bound to DB
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { fcmToken: true },
    });

    if (!user || !user.fcmToken) {
      return; // Skip silently
    }

    const message = {
      notification: { title, body },
      data: {
        ...data,
        click_action: "FLUTTER_NOTIFICATION_CLICK"
      },
      token: user.fcmToken,
    };

    await admin.messaging().send(message);
    // console.log(`🔔 Push dispatched: [${title}]`);
  } catch (error) {
    console.error(`❌ FCM Error sending "${title}" to User ${userId}:`, error.message);
  }
};

/**
 * 2. Real-time Queue Tracking Notification
 * Alerts users actively monitoring the Queue.
 */
const sendQueueUpdateNotification = async (userId, currentToken, userToken) => {
  try {
    const patientsAhead = userToken - currentToken;

    if (patientsAhead === 3) {
      await sendNotificationToUser(
        userId,
        "Get Ready Soon! 🕒",
        "Only 3 patients before you!"
      );
    } else if (patientsAhead === 1) {
      await sendNotificationToUser(
        userId,
        "It's Your Turn Next! 🏥",
        "You are next! Please be ready."
      );
    }
  } catch (error) {
    console.error("Queue Update Push Error:", error.message);
  }
};

/**
 * 3. Booking Confirmation Template
 */
const sendBookingConfirmation = async (userId, appointmentDetails) => {
  try {
    const dt = new Date(appointmentDetails.appointmentDate).toLocaleDateString();
    
    await sendNotificationToUser(
      userId,
      "Booking Confirmed! ✅",
      `Your token is #${appointmentDetails.tokenNumber} for ${dt}`,
      { appointmentId: appointmentDetails.id }
    );
  } catch (error) {
    console.error("Booking Confirm Push Error:", error.message);
  }
};

/**
 * 4. Administrator Clinic Approval Wrapper
 */
const sendClinicApprovalNotification = async (adminUserId, clinicName) => {
  try {
    await sendNotificationToUser(
      adminUserId,
      "Clinic Approved! 🎉",
      `Your clinic ${clinicName} has been approved on QueueEase!`
    );
  } catch (error) {
    console.error("Clinic Approval Push Error:", error.message);
  }
};

/**
 * 5. Administrator Clinic Rejection Wrapper
 */
const sendClinicRejectionNotification = async (adminUserId, clinicName, reason) => {
  try {
    await sendNotificationToUser(
      adminUserId,
      "Registration Rejected ❌",
      `Your clinic registration was rejected. Reason: ${reason}`
    );
  } catch (error) {
    console.error("Clinic Rejection Push Error:", error.message);
  }
};

// Also exporting the native backwards compatible push trigger for existing controllers.
const sendPushNotification = async (fcmToken, title, body, data = {}) => {
  if (!fcmToken || !admin.apps || admin.apps.length === 0) return;
  try {
    await admin.messaging().send({
      notification: { title, body },
      data: { ...data, click_action: "FLUTTER_NOTIFICATION_CLICK" },
      token: fcmToken,
    });
  } catch (error) {
    console.error("❌ Native FCM Push Error:", error.message);
  }
};

module.exports = {
  sendNotificationToUser,
  sendQueueUpdateNotification,
  sendBookingConfirmation,
  sendClinicApprovalNotification,
  sendClinicRejectionNotification,
  sendPushNotification
};
