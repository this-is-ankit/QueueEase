// ============================================
// Verifier Controller
// ============================================
// Handles physical verification of clinics by
// agents (Verifiers). Allows approving or
// rejecting clinics before they appear public.

const prisma = require("../config/db");
const { asyncHandler, sendResponse, AppError } = require("../utils/helpers");
const { uploadToCloudinary } = require("../config/cloudinary");
const { sendPushNotification } = require("../services/notification.service");

// ============================================
// Helper: Haversine Distance Calculator
// ============================================
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// ============================================
// GET /api/verifier/pending
// ============================================
/**
 * Retrieves all clinics with status PENDING.
 * Supports filtering by city or nearby coordinates.
 */
const getPendingClinics = asyncHandler(async (req, res) => {
  const { city, latitude, longitude, radius = 20 } = req.query;

  const where = { status: "PENDING" };
  
  if (city) {
    where.city = { equals: city.toLowerCase().trim(), mode: "insensitive" };
  }

  const clinics = await prisma.clinic.findMany({
    where,
    include: {
      admin: {
        select: { name: true, phone: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  let pendingClinics = clinics;

  // Filter by proximity if coordinates are provided and valid
  const searchLat = parseFloat(latitude);
  const searchLng = parseFloat(longitude);
  const radiusKm = parseFloat(radius);

  if (!isNaN(searchLat) && !isNaN(searchLng)) {
    pendingClinics = clinics
      .map(clinic => {
        const distance = haversineDistance(searchLat, searchLng, clinic.latitude, clinic.longitude);
        return {
          ...clinic,
          distance: distance < 1 ? `${(distance * 1000).toFixed(0)}m away` : `${distance.toFixed(1)}km away`,
          distanceNum: distance
        };
      })
      .filter(clinic => clinic.distanceNum <= radiusKm)
      .sort((a, b) => a.distanceNum - b.distanceNum);
  } else {
    // If no coordinates, still add a default distance or just return the list
    pendingClinics = clinics.map(clinic => ({
      ...clinic,
      distance: 'Location not specified'
    }));
  }

  sendResponse(res, 200, "Pending clinics retrieved", {
    clinics: pendingClinics,
  });
});

// ============================================
// GET /api/verifier/clinics/:id
// ============================================
/**
 * Retrieves full details of a specific pending clinic.
 */
const getClinicDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const clinic = await prisma.clinic.findUnique({
    where: { id },
    include: {
      admin: {
        select: { id: true, name: true, phone: true, email: true },
      },
      verificationLogs: {
        include: {
          verifier: { select: { name: true } }
        },
        orderBy: { createdAt: "desc" }
      }
    },
  });

  if (!clinic) throw new AppError("Clinic not found", 404);

  sendResponse(res, 200, "Clinic details retrieved", { clinic });
});

// ============================================
// PUT /api/verifier/clinics/:id/approve
// ============================================
/**
 * Approves a clinic and activates it on the platform.
 */
const approveClinic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const verifierId = req.user.id;
  const { notes } = req.body;

  const clinic = await prisma.clinic.findUnique({
    where: { id },
    include: { admin: true },
  });

  if (!clinic) throw new AppError("Clinic not found", 404);
  if (clinic.status === "APPROVED") throw new AppError("Clinic is already approved", 400);

  // Handle proof image upload natively
  let cloudinaryProofUrl = req.body.proofImageUrl || null;
  if (req.file) {
    cloudinaryProofUrl = await uploadToCloudinary(req.file.buffer, "queueease/verifications");
  }

  // Atomic state transaction
  await prisma.$transaction(async (tx) => {
    await tx.clinic.update({
      where: { id },
      data: { status: "APPROVED" },
    });

    await tx.verificationLog.create({
      data: {
        clinicId: id,
        verifierId,
        status: "APPROVED",
        notes: notes || "Clinic approved during physical visit.",
        proofImageUrl: cloudinaryProofUrl,
      },
    });
  });

  // Push Notification Dispatch
  if (clinic.admin && clinic.admin.fcmToken) {
    await sendPushNotification(
      clinic.admin.fcmToken,
      "Clinic Approved! 🎉",
      "Your clinic has been successfully verified and is now live on QueueEase."
    );
  }

  sendResponse(res, 200, "Clinic successfully approved.");
});

// ============================================
// PUT /api/verifier/clinics/:id/reject
// ============================================
/**
 * Rejects a clinic mapping missing/failed criteria.
 */
const rejectClinic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const verifierId = req.user.id;
  const { notes } = req.body;

  if (!notes) {
    throw new AppError("Rejection notes are strictly required to inform the administrator.", 400);
  }

  const clinic = await prisma.clinic.findUnique({
    where: { id },
    include: { admin: true },
  });

  if (!clinic) throw new AppError("Clinic not found", 404);

  // Handle proof image upload natively
  let cloudinaryProofUrl = req.body.proofImageUrl || null;
  if (req.file) {
    cloudinaryProofUrl = await uploadToCloudinary(req.file.buffer, "queueease/verifications");
  }

  // Atomic state transaction
  await prisma.$transaction(async (tx) => {
    await tx.clinic.update({
      where: { id },
      data: { status: "REJECTED" },
    });

    await tx.verificationLog.create({
      data: {
        clinicId: id,
        verifierId,
        status: "REJECTED",
        notes,
        proofImageUrl: cloudinaryProofUrl,
      },
    });
  });

  // Push Notification Dispatch
  if (clinic.admin && clinic.admin.fcmToken) {
    await sendPushNotification(
      clinic.admin.fcmToken,
      "Registration Rejected ❌",
      "Your clinic verification failed. Please align your facility constraints with QueueEase rules."
    );
  }

  sendResponse(res, 200, "Clinic successfully rejected.");
});

// ============================================
// GET /api/verifier/history
// ============================================
/**
 * Returns complete verification logs specific to the verifier.
 */
const getMyVerificationHistory = asyncHandler(async (req, res) => {
  const verifierId = req.user.id;

  const history = await prisma.verificationLog.findMany({
    where: { verifierId },
    include: {
      clinic: {
        select: { name: true, city: true, status: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  sendResponse(res, 200, "Verification history retrieved", { history });
});

module.exports = {
  getPendingClinics,
  getClinicDetails,
  approveClinic,
  rejectClinic,
  getMyVerificationHistory,
};
