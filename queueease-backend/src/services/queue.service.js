// ============================================
// Queue Service
// ============================================
// Core business logic for queue management:
// wait time estimation, queue state retrieval,
// and centralized Socket.IO event emission.

const prisma = require("../config/db");

// Average consultation time per patient (in minutes)
const AVG_WAIT_PER_PATIENT_MINS = 15;

/**
 * Calculates estimated wait time in minutes
 * based on current queue position.
 * @param {number} currentToken - The token currently being served
 * @param {number} totalBooked - Total tokens issued so far
 * @returns {number} Estimated wait time in minutes
 */
const calculateEstimatedWait = (currentToken, totalBooked) => {
  // If no one is booked or current token has surpassed total booked (shouldn't happen), wait is 0
  if (totalBooked <= 0 || currentToken >= totalBooked) return 0;
  
  // Calculate remaining patients (excluding the one currently being served)
  // Example: Serving 5, Total Booked 10 -> Remaining in queue = (10 - 5) = 5
  const remaining = totalBooked - currentToken;
  
  // Wait time = remaining unserved patients * avg consultation time
  return remaining * AVG_WAIT_PER_PATIENT_MINS;
};

const getDayBounds = (date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return { startOfDay, endOfDay };
};

/**
 * Retrieves the full queue state for a clinic,
 * including calculated wait times.
 * @param {string} clinicId - UUID of the clinic
 * @returns {Promise<object>} Complete queue state payload
 */
const getQueueState = async (clinicId) => {
  const { startOfDay, endOfDay } = getDayBounds(new Date());
  const clinic = await prisma.clinic.findUnique({
    where: { id: clinicId },
    select: {
      id: true,
      maxPatientsPerDay: true,
      queueState: {
        select: {
          currentToken: true,
          totalBookedToday: true,
          date: true,
        },
      },
    },
  });

  if (!clinic || !clinic.queueState) return null;

  const [activeAppointments, servingAppointment] = await Promise.all([
    prisma.appointment.count({
      where: {
        clinicId,
        appointmentDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          not: "CANCELLED",
        },
      },
    }),
    prisma.appointment.findFirst({
      where: {
        clinicId,
        appointmentDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: "SERVING",
      },
      orderBy: { tokenNumber: "asc" },
      select: {
        id: true,
        tokenNumber: true,
        patientName: true,
        status: true,
      },
    }),
  ]);

  const queueDate = clinic.queueState.date ? new Date(clinic.queueState.date) : null;
  const isToday = queueDate && queueDate.toDateString() === startOfDay.toDateString();
  const currentToken = isToday ? clinic.queueState.currentToken : 0;
  const totalBookedToday = activeAppointments;
  const remaining = Math.max(0, totalBookedToday - currentToken);
  
  return {
    clinicId: clinic.id,
    currentToken,
    totalBookedToday,
    maxPatientsPerDay: clinic.maxPatientsPerDay,
    remaining,
    estimatedWaitTime: calculateEstimatedWait(currentToken, totalBookedToday),
    servingAppointment,
    lastUpdated: new Date()
  };
};

/**
 * Emits a real-time queue update to a clinic's Socket.IO room.
 * Should be called whenever the queue advances or new bookings happen.
 * @param {object} io - Socket.IO global server instance
 * @param {string} clinicId - UUID of the clinic's room
 */
const emitQueueUpdate = async (io, clinicId) => {
  const queueState = await getQueueState(clinicId);
  if (!queueState || !io) return;

  // Emit full standardized payload to the specific clinic room
  io.to(`clinic_${clinicId}`).emit("queue:updated", queueState);
};

module.exports = {
  calculateEstimatedWait,
  getQueueState,
  emitQueueUpdate,
};
