// ============================================
// Cloudinary + Multer Configuration
// ============================================
// Sets up Cloudinary SDK for image uploads and
// provides multer middleware for handling
// multipart/form-data file uploads.
//
// Images are uploaded to Cloudinary and the
// returned URLs are stored in the database.

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const path = require("path");
const { AppError } = require("../utils/helpers");

// -------------------------
// Cloudinary SDK Config
// -------------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// -------------------------
// Multer Storage (Memory)
// -------------------------
// Store files in memory as Buffer objects so we
// can stream them directly to Cloudinary without
// writing to disk.
const storage = multer.memoryStorage();

// -------------------------
// File Filter
// -------------------------
// Only allow image files (JPEG, PNG, WebP)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        "Only image files are allowed (JPEG, PNG, WebP)",
        400
      ),
      false
    );
  }
};

// -------------------------
// Multer Upload Instance
// -------------------------
// Max file size: 5MB per image
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// -------------------------
// Upload Helper: Single File → Cloudinary
// -------------------------
/**
 * Uploads a single file buffer to Cloudinary.
 * @param {Buffer} fileBuffer - The file data from multer
 * @param {string} folder - Cloudinary folder name (e.g., "queueease/clinics")
 * @returns {Promise<string>} The secure URL of the uploaded image
 */
const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        // Auto-optimize: resize large images, convert format
        transformation: [
          { width: 1200, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error) {
          reject(new AppError(`Cloudinary upload failed: ${error.message}`, 500));
        } else {
          resolve(result.secure_url);
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};

// -------------------------
// Upload Helper: Multiple Files → Cloudinary
// -------------------------
/**
 * Uploads multiple file buffers to Cloudinary in parallel.
 * @param {Array} files - Array of multer file objects
 * @param {string} folder - Cloudinary folder name
 * @returns {Promise<string[]>} Array of secure URLs
 */
const uploadMultipleToCloudinary = async (files, folder) => {
  if (!files || files.length === 0) return [];

  const uploadPromises = files.map((file) =>
    uploadToCloudinary(file.buffer, folder)
  );

  return Promise.all(uploadPromises);
};

module.exports = {
  cloudinary,
  upload,
  uploadToCloudinary,
  uploadMultipleToCloudinary,
};
