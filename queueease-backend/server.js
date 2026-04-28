// ============================================
// QueueEase Backend — Main Server Entry Point
// ============================================
// Sets up Express app with Socket.IO for real-time
// queue updates, security middleware, and route mounting.

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();
const server = http.createServer(app);

// -------------------------
// Socket.IO Configuration
// -------------------------
// Allows real-time communication for live queue updates
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"],
  },
});

// Make io accessible in routes/controllers via req.io
app.set("io", io);

// -------------------------
// Global Middleware
// -------------------------

// Security headers (XSS protection, HSTS, etc.)
app.use(helmet());

// CORS — allow cross-origin requests from the mobile app
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

// Parse incoming JSON payloads
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// HTTP request logging (dev format for development)
app.use(morgan("dev"));

// -------------------------
// Health Check Route
// -------------------------
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "QueueEase API is running 🚀",
    version: "1.0.0",
  });
});

// -------------------------
// API Routes
// -------------------------

// Auth routes (register, login, profile, FCM token)
const authRoutes = require("./src/routes/auth.routes");
app.use("/api/auth", authRoutes);

// Clinic routes (register, search, nearby, update)
const clinicRoutes = require("./src/routes/clinic.routes");
app.use("/api/clinics", clinicRoutes);

// Appointment routes (book, cancel, my, today)
const appointmentRoutes = require("./src/routes/appointment.routes");
app.use("/api/appointments", appointmentRoutes);

// Queue metrics and increment control
const queueRoutes = require("./src/routes/queue.routes");
app.use("/api/queue", queueRoutes);

// Verification agents gateway
const verifierRoutes = require("./src/routes/verifier.routes");
app.use("/api/verifier", verifierRoutes);

// Payment module (create order, verify, status)
const paymentRoutes = require("./src/routes/payment.routes");
app.use("/api/payments", paymentRoutes);

// -------------------------
// Socket.IO Event Handlers
// -------------------------
const setupQueueSocket = require("./src/sockets/queue.socket");
setupQueueSocket(io);

// -------------------------
// 404 Handler
// -------------------------
// Catches any request that doesn't match a defined route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// -------------------------
// Global Error Handler
// -------------------------
// Catches errors thrown in any route/middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// -------------------------
// Start Server
// -------------------------
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`✅ QueueEase server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`);
});

module.exports = { app, server, io };
