// ============================================
// Appointment Controller
// ============================================
// Handles booking, cancellation, rescheduling,
// and listing user appointments.

const prisma = require("../config/db");
const razorpay = require("../config/razorpay");
const { asyncHandler, sendResponse, AppError } = require("../utils/helpers");

// -------------------------
// Helper: Start / End of Day
// -------------------------
const getDayBounds = (dateInput) => {
  const date = new Date(dateInput);
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return { startOfDay, endOfDay };
};

// ============================================
// POST /api/appointments
// ============================================
/**
 * Books an appointment at a given clinic.
 * Flow:
 * 1. Validate clinic is APPROVED
 * 2. Check if clinic reached maxPatientsPerDay for the requested date
 * 3. Calculate next token number for the date
 * 4. Create appointment (if paymentRequired = true, generate Razorpay order)
 * 5. Update QueueState totalBookedToday if booked for today
 * 6. Emit real-time socket event
 */
const bookAppointment = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const {
    clinicId,
    patientName,
    patientAge,
    patientPhone,
    patientEmail,
    patientAddress,
    appointmentDate,
    // Add mobile app specific fields
    age,
    phone,
    date,
    timeSlot,
  } = req.body;

  // 1. Resolve field mappings and date/time combination
  const finalAge = patientAge || age;
  const finalPhone = patientPhone || phone;
  const finalEmail = patientEmail || req.body.email || null;
  const finalAddress = patientAddress || req.body.address || null;
  
  let finalAppointmentDate;
  if (date && timeSlot) {
    // Combine "YYYY-MM-DD" and "HH:MM AM/PM"
    const [time, modifier] = timeSlot.split(" ");
    let [hours, minutes] = time.split(":");
    if (hours === "12") hours = "00";
    if (modifier === "PM") hours = parseInt(hours, 10) + 12;
    
    // Construct local date string to avoid TZ issues if possible, 
    // or just use new Date with parts
    const [year, month, day] = date.split("-").map(Number);
    finalAppointmentDate = new Date(year, month - 1, day, parseInt(hours, 10), parseInt(minutes, 10));
  } else {
    finalAppointmentDate = new Date(appointmentDate || date);
  }

  // 2. STRICTURE LOGIC: Block if the time slot has already passed
  const now = new Date();
  if (finalAppointmentDate < now) {
    // If it's exactly the same day but the time was not specified (midnight),
    // we might want to allow it for "anytime today", but usually time is expected.
    // However, for safety, if date was provided without timeSlot, we check if it's at least today.
    const isToday = finalAppointmentDate.toDateString() === now.toDateString();
    if (!isToday || (timeSlot && finalAppointmentDate < now)) {
      throw new AppError("The selected appointment time has already passed.", 400);
    }
  }

  const { startOfDay, endOfDay } = getDayBounds(finalAppointmentDate);

  // 3. Validate clinic is APPROVED
  const clinic = await prisma.clinic.findUnique({
    where: { id: clinicId },
    include: { queueState: true },
  });

  if (!clinic) throw new AppError("Clinic not found", 404);
  if (clinic.status !== "APPROVED") {
    throw new AppError("Clinic is not verified and cannot accept bookings yet.", 403);
  }

  // 4. Check maxPatientsPerDay limit for the given date
  const bookedCount = await prisma.appointment.count({
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
  });

  if (bookedCount >= clinic.maxPatientsPerDay) {
    throw new AppError("Clinic has reached maximum booking capacity for this date.", 409);
  }

  // Use a Prisma transaction to ensure token generation is atomic
  const appointment = await prisma.$transaction(async (tx) => {
    // 5. Find the highest token number for this clinic on this date
    const lastAppointment = await tx.appointment.findFirst({
      where: {
        clinicId,
        appointmentDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: { tokenNumber: "desc" },
    });

    const nextTokenNumber = lastAppointment ? lastAppointment.tokenNumber + 1 : 1;

    // 6. Set Payment status
    const DEFAULT_FEE_PAISE = 100 * 100;
    
    let newAppointment = await tx.appointment.create({
      data: {
        userId,
        clinicId,
        patientName,
        patientAge: parseInt(finalAge),
        patientPhone: finalPhone,
        patientEmail: finalEmail,
        patientAddress: finalAddress,
        appointmentDate: finalAppointmentDate,
        tokenNumber: nextTokenNumber,
        status: "BOOKED",
        paymentStatus: clinic.paymentRequired ? "PENDING" : "NOT_REQUIRED",
      },
    });

    // Generate Razorpay Order if required
    if (clinic.paymentRequired) {
      try {
        const orderOptions = {
          amount: DEFAULT_FEE_PAISE,
          currency: "INR",
          receipt: newAppointment.id.slice(0, 40),
        };
        const order = await razorpay.orders.create(orderOptions);

        newAppointment = await tx.appointment.update({
          where: { id: newAppointment.id },
          data: { razorpayOrderId: order.id },
        });
        
        newAppointment.razorpayOrderId = order.id;
        newAppointment.amountToPay = DEFAULT_FEE_PAISE / 100;

      } catch (err) {
        throw new AppError("Failed to initiate payment gateway", 500);
      }
    }

    // 7. Update QueueState aggregate ONLY if the appointment is for TODAY
    const todayBounds = getDayBounds(new Date());
    if (startOfDay.getTime() === todayBounds.startOfDay.getTime() && clinic.queueState) {
      await tx.queueState.update({
        where: { clinicId },
        data: {
          totalBookedToday: { increment: 1 },
          date: todayBounds.startOfDay,
        },
      });
    }

    return newAppointment;
  });

  // 6. Emit Socket.IO event to clinic room
  const io = req.app.get("io");
  if (io) {
    io.to(`clinic_${clinicId}`).emit("queue:updated", {
      clinicId,
      message: "New appointment booked",
    });
  }

  sendResponse(res, 201, "Appointment booked successfully", {
    appointment: {
      ...appointment,
      clinic: {
        id: clinic.id,
        name: clinic.name,
        doctorName: clinic.doctorName,
      },
    },
  });
});

// ============================================
// GET /api/appointments/my
// ============================================
/**
 * Returns all appointments for the logged-in user.
 */
const getMyAppointments = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const appointments = await prisma.appointment.findMany({
    where: { userId },
    include: {
      clinic: {
        select: {
          id: true,
          name: true,
          address: true,
          city: true,
          doctorName: true,
          clinicImages: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  sendResponse(res, 200, "Appointments retrieved successfully", {
    appointments,
  });
});

// ============================================
// GET /api/appointments/clinic/:clinicId/today
// ============================================
/**
 * Returns all TODAY's appointments for a specific clinic.
 * Must be requested by the owning ADMIN of that clinic.
 */
const getTodayAppointments = asyncHandler(async (req, res) => {
  const adminId = req.user.id;
  const { clinicId } = req.params;

  // Verify clinic ownership
  const clinic = await prisma.clinic.findUnique({
    where: { id: clinicId },
  });

  if (!clinic) throw new AppError("Clinic not found", 404);
  
  if (clinic.adminId !== adminId) {
    throw new AppError("You do not have permission to view this clinic's appointments", 403);
  }

  const { startOfDay, endOfDay } = getDayBounds(new Date());

  const appointments = await prisma.appointment.findMany({
    where: {
      clinicId,
      appointmentDate: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: { tokenNumber: "asc" },
  });

  sendResponse(res, 200, "Today's appointments retrieved successfully", {
    appointments,
  });
});

// ============================================
// PUT /api/appointments/:id/cancel
// ============================================
/**
 * Cancels an appointment. 
 * Only allowed by the USER who booked it, and only if BOOKED (not SERVING or DONE).
 */
const cancelAppointment = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: { clinic: true },
  });

  if (!appointment) throw new AppError("Appointment not found", 404);

  // Users can only cancel their own appointments
  // But let's theoretically also allow admins to cancel their clinic's appointments
  const isOwner = appointment.userId === userId;
  const isAdminForClinic = req.user.role === "ADMIN" && appointment.clinic.adminId === userId;

  if (!isOwner && !isAdminForClinic) {
    throw new AppError("You do not have permission to cancel this appointment", 403);
  }

  if (appointment.status !== "BOOKED") {
    throw new AppError(`Cannot cancel appointment. Current status is ${appointment.status}`, 400);
  }

  const updatedAppointment = await prisma.appointment.update({
    where: { id },
    data: { status: "CANCELLED" },
  });

  // Emit Socket Event so admin UI updates
  const io = req.app.get("io");
  if (io) {
    io.to(`clinic_${appointment.clinicId}`).emit("queue:updated", {
      clinicId: appointment.clinicId,
      message: "An appointment was cancelled",
    });
  }

  sendResponse(res, 200, "Appointment cancelled successfully", {
    appointment: updatedAppointment,
  });
});

// ============================================
// GET /api/appointments/:id
// ============================================
/**
 * Returns full details of a specific appointment.
 */
const getAppointmentById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: {
      clinic: {
        select: {
          id: true,
          name: true,
          address: true,
          city: true,
          doctorName: true,
          clinicImages: true,
          doctorPhoto: true,
          adminId: true,
        },
      },
    },
  });

  if (!appointment) throw new AppError("Appointment not found", 404);

  // Access check: Only the owning user, or the owning admin, or a verifier
  const isOwner = appointment.userId === req.user.id;
  const isClinicAdmin = appointment.clinic.adminId === req.user.id;
  const isVerifier = req.user.role === "VERIFIER";

  if (!isOwner && !isClinicAdmin && !isVerifier) {
     throw new AppError("Access denied", 403);
  }

  sendResponse(res, 200, "Appointment retrieved successfully", {
    appointment,
  });
});

module.exports = {
  bookAppointment,
  getMyAppointments,
  getTodayAppointments,
  cancelAppointment,
  getAppointmentById,
};
