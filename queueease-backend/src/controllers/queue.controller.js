// ============================================
// Queue Controller
// ============================================
// Internal logic governing current live metrics
// for dynamic Wait Management interfaces.

const prisma = require("../config/db");
const { asyncHandler, sendResponse, AppError } = require("../utils/helpers");
const { getQueueState, emitQueueUpdate } = require("../services/queue.service");
const { sendPushNotification } = require("../services/notification.service");

// -------------------------
// Helper function to map JS dates
// -------------------------
const getDayBounds = (date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return { startOfDay, endOfDay };
};

// ============================================
// GET /api/queue/:clinicId
// ============================================
/**
 * Public route retrieving standard queue object payload.
 */
const fetchQueueState = asyncHandler(async (req, res) => {
  const { clinicId } = req.params;
  const queueData = await getQueueState(clinicId);

  if (!queueData) throw new AppError("Queue data not found for this clinic", 404);

  sendResponse(res, 200, "Queue data fetched successfully", queueData);
});

// ============================================
// PUT /api/queue/:clinicId/next
// ============================================
/**
 * Used by clinic ADMIN to advance the queue by marking 
 * the current active token as DONE.
 */
const advanceQueue = asyncHandler(async (req, res) => {
  const { clinicId } = req.params;
  const adminId = req.user.id;

  // 1. Verify caller owns clinic
  const clinic = await prisma.clinic.findUnique({
    where: { id: clinicId },
    include: { queueState: true },
  });

  if (!clinic) throw new AppError("Clinic not found", 404);
  if (clinic.adminId !== adminId) {
    throw new AppError("You do not have permission to modify this queue.", 403);
  }

  const { startOfDay, endOfDay } = getDayBounds(new Date());

  // Use a transaction since we are shifting multiple states atomically
  const result = await prisma.$transaction(async (tx) => {
    // Current live token
    const currentQueueState = clinic.queueState;
    if (!currentQueueState) throw new AppError("Queue state missing.", 500);

    const todaysAppointments = await tx.appointment.findMany({
      where: {
        clinicId,
        appointmentDate: { gte: startOfDay, lte: endOfDay },
      },
      orderBy: { tokenNumber: "asc" },
      include: { user: true },
    });

    const activeAppointments = todaysAppointments.filter((appointment) => appointment.status !== "CANCELLED");
    if (activeAppointments.length === 0) {
      throw new AppError("No active appointments for today.", 400);
    }

    // A. Terminate active token
    if (currentQueueState.currentToken > 0) {
      // Find the specific appointment tied to the current token (active one)
      const currentAppt = todaysAppointments.find(
        (appointment) => appointment.tokenNumber === currentQueueState.currentToken
      );

      if (currentAppt && currentAppt.status !== "CANCELLED") {
        await tx.appointment.update({
          where: { id: currentAppt.id },
          data: { status: "DONE" },
        });
      }
    }

    // B. Find the next active patient instead of blindly incrementing into cancelled tokens.
    const nextAppt = activeAppointments.find(
      (appointment) =>
        appointment.status !== "DONE" &&
        appointment.tokenNumber > currentQueueState.currentToken
    );

    if (!nextAppt) {
      const lastServedToken = activeAppointments[activeAppointments.length - 1]?.tokenNumber || currentQueueState.currentToken;
      await tx.queueState.update({
        where: { clinicId },
        data: {
          currentToken: lastServedToken,
          totalBookedToday: activeAppointments.length,
          date: startOfDay,
        },
      });

      return { nextAppt: null, outPatient3: null, queueCompleted: true };
    }

    const nextTokenNumber = nextAppt.tokenNumber;
    const nextTokenNumberAhead3 = nextTokenNumber + 3;

    await tx.queueState.update({
      where: { clinicId },
      data: {
        currentToken: nextTokenNumber,
        totalBookedToday: activeAppointments.length,
        date: startOfDay,
      },
    });

    await tx.appointment.update({
      where: { id: nextAppt.id },
      data: { status: "SERVING" },
    });

    // D. Pre-fetch 'ahead 3' patient
    const outPatient3 = activeAppointments.find(
      (appointment) =>
        appointment.status !== "DONE" &&
        appointment.tokenNumber >= nextTokenNumberAhead3
    ) || null;

    return { nextAppt, outPatient3, queueCompleted: false };
  });

  // 3. Emit real-time update using Socket.IO from queue.service
  const io = req.app.get("io");
  await emitQueueUpdate(io, clinicId);

  // 4. Send Firebase Notifications
  const { nextAppt, outPatient3 } = result;

  if (nextAppt && nextAppt.user && nextAppt.user.fcmToken) {
    await sendPushNotification(
      nextAppt.user.fcmToken,
      "It's Your Turn! 🏥",
      "Please head to the doctor's cabin immediately. Your turn is next."
    );
  }

  if (outPatient3 && outPatient3.user && outPatient3.user.fcmToken) {
    await sendPushNotification(
      outPatient3.user.fcmToken,
      "Get Ready Soon! 🕒",
      "There are only 3 patients in front of you. Please arrive at the clinic."
    );
  }

  sendResponse(res, 200, result.queueCompleted ? "Queue completed for today" : "Queue advanced successfully");
});

// ============================================
// PUT /api/queue/:clinicId/reset
// ============================================
/**
 * Daily routine: Resets the queue back back to zero.
 */
const resetQueue = asyncHandler(async (req, res) => {
  const { clinicId } = req.params;

  const clinic = await prisma.clinic.findUnique({
    where: { id: clinicId },
  });

  if (!clinic) throw new AppError("Clinic not found", 404);
  if (clinic.adminId !== req.user.id) {
    throw new AppError("Access denied", 403);
  }

  const newDate = new Date();
  newDate.setHours(0, 0, 0, 0);

  // Flush Queue back to zero metrics 
  // (TotalBooked stays as is structurally until the next daily booking occurs - or we can zero it too since it implies a new day)
  await prisma.queueState.update({
    where: { clinicId },
    data: {
      currentToken: 0,
      totalBookedToday: 0,
      date: newDate,
    },
  });

  // Refresh sockets
  const io = req.app.get("io");
  await emitQueueUpdate(io, clinicId);

  sendResponse(res, 200, "Queue metrics reset for today.");
});

module.exports = {
  fetchQueueState,
  advanceQueue,
  resetQueue,
};
