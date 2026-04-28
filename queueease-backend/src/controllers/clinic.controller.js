// ============================================
// Clinic Controller
// ============================================
// Handles clinic registration, retrieval, search,
// nearby lookup, and updates. Includes image
// uploads to Cloudinary and queue state management.

const prisma = require("../config/db");
const { uploadToCloudinary, uploadMultipleToCloudinary } = require("../config/cloudinary");
const { asyncHandler, sendResponse, AppError } = require("../utils/helpers");

// ============================================
// POST /api/clinics — Register a new clinic
// ============================================
/**
 * Creates a new clinic for the logged-in ADMIN.
 *
 * Flow:
 * 1. Check if admin already has a registered clinic
 * 2. Upload clinic images and doctor photo to Cloudinary
 * 3. Create clinic record in database
 * 4. Create an initial QueueState record for the clinic
 * 5. Return the created clinic
 */
const createClinic = asyncHandler(async (req, res) => {
  const adminId = req.user.id;

  // 1. Check if this admin already has a clinic
  const existingClinic = await prisma.clinic.findFirst({
    where: { adminId },
  });

  if (existingClinic) {
    throw new AppError(
      "You already have a registered clinic. Each admin can register only one clinic.",
      409
    );
  }

  // 2. Upload images to Cloudinary
  let clinicImageUrls = [];
  let doctorPhotoUrl = null;

  // Upload clinic images (multiple — field name: "clinicImages")
  if (req.files && req.files.clinicImages) {
    clinicImageUrls = await uploadMultipleToCloudinary(
      req.files.clinicImages,
      "queueease/clinics"
    );
  }

  // Upload doctor photo (single — field name: "doctorPhoto")
  if (req.files && req.files.doctorPhoto && req.files.doctorPhoto[0]) {
    doctorPhotoUrl = await uploadToCloudinary(
      req.files.doctorPhoto[0].buffer,
      "queueease/doctors"
    );
  }

  // 3. Extract and parse clinic data from request body
  const {
    name,
    address,
    city,
    state,
    pincode,
    latitude,
    longitude,
    doctorName,
    degree,
    college,
    experience,
    specialization,
    maxPatientsPerDay,
    paymentRequired,
    consultationFee,
  } = req.body;

  // 4. Create clinic record with nested QueueState creation
  const clinic = await prisma.clinic.create({
    data: {
      name,
      address,
      city: city.toLowerCase().trim(),
      state: state.toLowerCase().trim(),
      pincode,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      doctorName,
      degree: degree || null,
      college: college || null,
      experience: (experience !== undefined && experience !== "" && experience !== null) ? parseInt(experience) : null,
      specialization: specialization || null,
      clinicImages: clinicImageUrls,
      doctorPhoto: doctorPhotoUrl,
      maxPatientsPerDay: (maxPatientsPerDay !== undefined && maxPatientsPerDay !== "" && maxPatientsPerDay !== null) ? parseInt(maxPatientsPerDay) : 30,
      paymentRequired: paymentRequired === "true" || paymentRequired === true,
      consultationFee: consultationFee ? parseInt(consultationFee) : null,
      status: "PENDING", // Default — awaits verifier approval
      adminId,
      // Create initial QueueState for this clinic
      queueState: {
        create: {
          currentToken: 0,
          totalBookedToday: 0,
          date: new Date(),
        },
      },
    },
    include: {
      queueState: true,
    },
  });

  sendResponse(res, 201, "Clinic registered successfully. Awaiting verification.", {
    clinic,
  });
});

// ============================================
// GET /api/clinics/my — Get admin's own clinic
// ============================================
/**
 * Returns the clinic registered by the currently
 * logged-in admin, including queue state.
 */
const getMyClinic = asyncHandler(async (req, res) => {
  const clinic = await prisma.clinic.findFirst({
    where: { adminId: req.user.id },
    include: {
      queueState: true,
    },
  });

  if (!clinic) {
    throw new AppError("You have not registered a clinic yet.", 404);
  }

  sendResponse(res, 200, "Your clinic retrieved successfully", {
    clinic,
  });
});

// ============================================
// GET /api/clinics — List all clinics
// ============================================
/**
 * Returns a paginated list of APPROVED clinics.
 * Supports filtering by city, specialization, and name search.
 *
 * Query params:
 *   - city: filter by city name (case-insensitive)
 *   - specialization: filter by specialization (partial match)
 *   - search: search by clinic name (partial match)
 *   - page: page number (default: 1)
 *   - limit: results per page (default: 10, max: 50)
 */
const listClinics = asyncHandler(async (req, res) => {
  const {
    city,
    specialization,
    search,
    page = 1,
    limit = 10,
  } = req.query;

  const pageNum = parseInt(page);
  const limitNum = Math.min(parseInt(limit) || 10, 50);
  const skip = (pageNum - 1) * limitNum;

  // Build dynamic filter — only show APPROVED clinics
  const where = {
    status: "APPROVED",
  };

  if (city) {
    where.city = {
      equals: city.toLowerCase().trim(),
      mode: "insensitive",
    };
  }

  if (specialization) {
    where.specialization = {
      contains: specialization.trim(),
      mode: "insensitive",
    };
  }

  if (search) {
    const searchTrimmed = search.trim();
    where.OR = [
      { name: { contains: searchTrimmed, mode: "insensitive" } },
      { specialization: { contains: searchTrimmed, mode: "insensitive" } },
      { doctorName: { contains: searchTrimmed, mode: "insensitive" } },
    ];
  }

  // Fetch clinics + total count in parallel for pagination
  const [clinics, total] = await Promise.all([
    prisma.clinic.findMany({
      where,
      select: {
        id: true,
        name: true,
        address: true,
        city: true,
        state: true,
        pincode: true,
        latitude: true,
        longitude: true,
        doctorName: true,
        specialization: true,
        doctorPhoto: true,
        clinicImages: true,
        maxPatientsPerDay: true,
        paymentRequired: true,
        queueState: {
          select: {
            currentToken: true,
            totalBookedToday: true,
          },
        },
      },
      skip,
      take: limitNum,
      orderBy: { createdAt: "desc" },
    }),
    prisma.clinic.count({ where }),
  ]);

  sendResponse(res, 200, "Clinics retrieved successfully", {
    clinics,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  });
});

// ============================================
// GET /api/clinics/:id — Get clinic by ID
// ============================================
/**
 * Returns full clinic details including today's
 * queue state (currentToken, totalBookedToday).
 */
const getClinicById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const clinic = await prisma.clinic.findUnique({
    where: { id },
    include: {
      queueState: true,
      admin: {
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
        },
      },
    },
  });

  if (!clinic) {
    throw new AppError("Clinic not found", 404);
  }

  sendResponse(res, 200, "Clinic retrieved successfully", {
    clinic,
  });
});

// ============================================
// GET /api/clinics/nearby — Find nearby clinics
// ============================================
/**
 * Returns APPROVED clinics within a given radius
 * of the user's location, sorted by distance.
 *
 * Uses the Haversine formula to calculate great-circle
 * distance between two latitude/longitude points.
 *
 * Query params:
 *   - latitude: user's current latitude
 *   - longitude: user's current longitude
 *   - radius: search radius in km (default: 10)
 */
const getNearbyClinics = asyncHandler(async (req, res) => {
  const {
    latitude,
    longitude,
    lat,
    lng,
    radius = 10,
  } = req.query;

  const userLat = parseFloat(latitude || lat);
  const userLng = parseFloat(longitude || lng);
  const radiusKm = parseFloat(radius);

  // Fetch all approved clinics (with coordinates)
  // In production, use PostGIS for better performance
  const allClinics = await prisma.clinic.findMany({
    where: { status: "APPROVED" },
    select: {
      id: true,
      name: true,
      address: true,
      city: true,
      state: true,
      pincode: true,
      latitude: true,
      longitude: true,
      doctorName: true,
      specialization: true,
      doctorPhoto: true,
      maxPatientsPerDay: true,
      paymentRequired: true,
      queueState: {
        select: {
          currentToken: true,
          totalBookedToday: true,
        },
      },
    },
  });

  // Calculate distance for each clinic using Haversine formula
  const nearbyClinics = allClinics
    .map((clinic) => {
      const distance = haversineDistance(
        userLat,
        userLng,
        clinic.latitude,
        clinic.longitude
      );
      return { ...clinic, distance: Math.round(distance * 100) / 100 };
    })
    .filter((clinic) => clinic.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance);

  sendResponse(res, 200, `Found ${nearbyClinics.length} clinics within ${radiusKm}km`, {
    clinics: nearbyClinics,
    searchParams: {
      latitude: userLat,
      longitude: userLng,
      radiusKm,
    },
  });
});

// ============================================
// PUT /api/clinics/:id — Update clinic
// ============================================
/**
 * Updates clinic details. Only the admin who owns
 * the clinic can update it.
 *
 * Flow:
 * 1. Find the clinic and verify ownership
 * 2. Upload new images if provided
 * 3. Update the clinic record
 * 4. Return updated clinic
 */
const updateClinic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const adminId = req.user.id;

  // 1. Find the clinic
  const clinic = await prisma.clinic.findUnique({
    where: { id },
  });

  if (!clinic) {
    throw new AppError("Clinic not found", 404);
  }

  // Verify that the logged-in admin owns this clinic
  if (clinic.adminId !== adminId) {
    throw new AppError("You can only update your own clinic", 403);
  }

  // 2. Handle image uploads if new files are provided
  let clinicImageUrls = undefined; // undefined = don't update
  let doctorPhotoUrl = undefined;

  if (req.files && req.files.clinicImages) {
    clinicImageUrls = await uploadMultipleToCloudinary(
      req.files.clinicImages,
      "queueease/clinics"
    );
  }

  if (req.files && req.files.doctorPhoto && req.files.doctorPhoto[0]) {
    doctorPhotoUrl = await uploadToCloudinary(
      req.files.doctorPhoto[0].buffer,
      "queueease/doctors"
    );
  }

  // 3. Build the update data object — only include provided fields
  const {
    name,
    address,
    city,
    state,
    pincode,
    latitude,
    longitude,
    doctorName,
    degree,
    college,
    experience,
    specialization,
    maxPatientsPerDay,
    paymentRequired,
    consultationFee,
  } = req.body;

  const updateData = {};

  // Only add fields that were actually provided in the request
  if (name !== undefined) updateData.name = name;
  if (address !== undefined) updateData.address = address;
  if (city !== undefined) updateData.city = city.toLowerCase().trim();
  if (state !== undefined) updateData.state = state.toLowerCase().trim();
  if (pincode !== undefined) updateData.pincode = pincode;
  if (latitude !== undefined) updateData.latitude = parseFloat(latitude);
  if (longitude !== undefined) updateData.longitude = parseFloat(longitude);
  if (doctorName !== undefined) updateData.doctorName = doctorName;
  if (degree !== undefined) updateData.degree = degree;
  if (college !== undefined) updateData.college = college;
  if (experience !== undefined) updateData.experience = parseInt(experience);
  if (specialization !== undefined) updateData.specialization = specialization;
  if (maxPatientsPerDay !== undefined)
    updateData.maxPatientsPerDay = parseInt(maxPatientsPerDay);
  if (paymentRequired !== undefined)
    updateData.paymentRequired =
      paymentRequired === "true" || paymentRequired === true;
  if (consultationFee !== undefined)
    updateData.consultationFee = parseInt(consultationFee);

  // Add image URLs only if new files were uploaded
  if (clinicImageUrls !== undefined) updateData.clinicImages = clinicImageUrls;
  if (doctorPhotoUrl !== undefined) updateData.doctorPhoto = doctorPhotoUrl;

  // 4. Update the clinic
  const updatedClinic = await prisma.clinic.update({
    where: { id },
    data: updateData,
    include: {
      queueState: true,
    },
  });

  sendResponse(res, 200, "Clinic updated successfully", {
    clinic: updatedClinic,
  });
});

// ============================================
// Haversine Distance Calculator
// ============================================
/**
 * Calculates the great-circle distance between
 * two points on Earth using the Haversine formula.
 *
 * @param {number} lat1 - Latitude of point 1 (degrees)
 * @param {number} lon1 - Longitude of point 1 (degrees)
 * @param {number} lat2 - Latitude of point 2 (degrees)
 * @param {number} lon2 - Longitude of point 2 (degrees)
 * @returns {number} Distance in kilometers
 */
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
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

module.exports = {
  createClinic,
  getMyClinic,
  listClinics,
  getClinicById,
  getNearbyClinics,
  updateClinic,
};
