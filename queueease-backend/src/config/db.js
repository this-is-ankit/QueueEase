// ============================================
// Database Configuration — Prisma Client
// ============================================
// Initializes and exports a singleton Prisma Client
// instance to be used across the application.
//
// Prisma v7 requires a driver adapter for direct
// database connections. We use @prisma/adapter-pg
// with the native 'pg' driver for PostgreSQL.

const { PrismaClient } = require("../generated/prisma");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

// Create a PostgreSQL connection pool using DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create the Prisma driver adapter for PostgreSQL
const adapter = new PrismaPg(pool);

// Use a singleton pattern to prevent multiple
// Prisma Client instances in development (hot reload)
const prisma =
  global.__prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prisma;
}

module.exports = prisma;
