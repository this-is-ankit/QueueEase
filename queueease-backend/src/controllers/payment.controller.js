// ============================================
// Payment Controller
// ============================================
// Handles Razorpay order creation, verification,
// and payment status tracking.

const prisma = require("../config/db");
const razorpay = require("../config/razorpay");
const { asyncHandler, sendResponse, verifyRazorpaySignature, AppError } = require("../utils/helpers");
const { getQueueState, emitQueueUpdate } = require("../services/queue.service");
const { sendPushNotification } = require("../services/notification.service");

// Fallback constant representing Rs 100 flat fee for clinics
// requiring payment.
const DEFAULT_FEE_PAISE = 100 * 100; 

// ============================================
// POST /api/payments/create-order
// ============================================
/**
 * Creates a Razorpay order for an appointment.
 * Client sends appointmentId.
 */
const createOrder = asyncHandler(async (req, res) => {
  const { appointmentId } = req.body;
  const userId = req.user.id;

  if (!razorpay) {
    throw new AppError("Payment gateway is not configured on this server.", 501);
  }

  // Find appointment
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: { clinic: true },
  });

  if (!appointment) throw new AppError("Appointment not found", 404);
  
  if (appointment.userId !== userId) {
    throw new AppError("Access denied", 403);
  }

  if (appointment.paymentStatus === "PAID") {
    throw new AppError("This appointment is already paid", 400);
  }

  if (!appointment.clinic.paymentRequired) {
    throw new AppError("This clinic does not require upfront payments", 400);
  }

  // Create Razorpay Order
  const orderOptions = {
    amount: DEFAULT_FEE_PAISE,
    currency: "INR",
    receipt: appointment.id.slice(0, 40),
  };

  const order = await razorpay.orders.create(orderOptions);

  // Bind orderId to appointment
  await prisma.appointment.update({
    where: { id: appointment.id },
    data: { razorpayOrderId: order.id, paymentStatus: "PENDING" },
  });

  sendResponse(res, 201, "Payment order created", {
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    key: process.env.RAZORPAY_KEY_ID, 
  });
});

// ============================================
// POST /api/payments/verify
// ============================================
/**
 * Verifies payment via HMAC signature.
 */
const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    throw new AppError("Missing Razorpay signature properties", 400);
  }

  // Check the HMAC hash using crypto
  const isValid = verifyRazorpaySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);

  if (!isValid) {
    throw new AppError("Payment verification failed. Invalid signature.", 400);
  }

  // Signature is valid. Find mapping appointment.
  const appointment = await prisma.appointment.findFirst({
    where: { razorpayOrderId },
    include: { user: true, clinic: { include: { queueState: true } } },
  });

  if (!appointment) throw new AppError("Mismatched or stray payment record", 404);

  const { startOfDay } = getDayBounds(new Date());
  const isToday = appointment.appointmentDate.getTime() === startOfDay.getTime();

  // Handle the DB updates atomically
  await prisma.$transaction(async (tx) => {
    // 1. Mark as PAID & BOOKED
    await tx.appointment.update({
      where: { id: appointment.id },
      data: {
        paymentStatus: "PAID",
        status: "BOOKED", // Advance from soft-locked state
        razorpayPaymentId
      },
    });

    // 2. Increment totalBookedToday ONLY if booking corresponds to today
    if (isToday && appointment.clinic.queueState) {
       await tx.queueState.update({
         where: { clinicId: appointment.clinicId },
         data: {
            totalBookedToday: { increment: 1 },
            date: startOfDay,
         }
       });
    }
  });

  // Emit Real-Time Socket
  const io = req.app.get("io");
  await emitQueueUpdate(io, appointment.clinicId);

  // Send Booking Confirmation wrapper
  if (appointment.user && appointment.user.fcmToken) {
    await sendPushNotification(
      appointment.user.fcmToken,
      "Appointment Confirmed! ✅",
      `Payment successful. You are token #${appointment.tokenNumber}.`,
      { type: "payment_success", appointmentId: appointment.id }
    );
  }

  sendResponse(res, 200, "Payment verified successfully", {
    appointmentId: appointment.id,
    tokenNumber: appointment.tokenNumber,
  });
});

// ============================================
// GET /api/payments/status/:appointmentId
// ============================================
/**
 * Retrieves the specific payment status flag.
 */
const getPaymentStatus = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;

  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    select: { paymentStatus: true, razorpayOrderId: true, userId: true },
  });

  if (!appointment) throw new AppError("Appointment not found", 404);
  
  if (appointment.userId !== req.user.id) {
    throw new AppError("Access denied", 403);
  }

  sendResponse(res, 200, "Status fetched", {
    paymentStatus: appointment.paymentStatus,
    razorpayOrderId: appointment.razorpayOrderId,
  });
});

// Internal helper for bounds logic parity
const getDayBounds = (date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return { startOfDay, endOfDay };
};

module.exports = {
  createOrder,
  verifyPayment,
  getPaymentStatus,
};
