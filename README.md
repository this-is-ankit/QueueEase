<div align="center">

<img src="https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/platform-Android-green?style=for-the-badge&logo=android" />
<img src="https://img.shields.io/badge/backend-Node.js-brightgreen?style=for-the-badge&logo=node.js" />
<img src="https://img.shields.io/badge/database-PostgreSQL-blue?style=for-the-badge&logo=postgresql" />
<img src="https://img.shields.io/badge/realtime-Socket.IO-black?style=for-the-badge&logo=socket.io" />

<br/><br/>

```
  ___  _   _  _____  _   _  _____  _____ ______ _____  _____ _____ 
 / _ \| | | ||  ___|| | | ||  ___||  ___||  _  \|  ___|/  _  /  ___|
/ /_\ \ | | || |__  | | | || |__  | |__  | | | || |__  | | | \ `--.  
|  _  | | | ||  __| | | | ||  __| |  __| | | | ||  __| | | | |`--. \ 
| | | | |_| || |___ | |_| || |___ | |___ | |/ / | |___ \ \_/ /\__/ /
\_| |_/\___/ \____/  \___/ \____/ \____/ |___/  \____/  \___/\____/ 
```

# 🏥 QueueEase
### *Skip the Queue. Save Your Time.*

**A real-time queue management and appointment booking platform built for India.**  
No more standing in long lines at clinics, barber shops, or LPG agencies.  
Book your slot, track your turn live, and arrive just in time.

<br/>

[📱 Download APK](#-installation) · [🚀 Live API](https://queueease-ep4f.onrender.com) · [📖 API Docs](#-api-reference) · [🐛 Report Bug](https://github.com/this-is-ankit/QueueEase/issues)

<br/>

---

</div>

## 📌 Table of Contents

- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [Features](#-features)
- [System Architecture](#-system-architecture)
- [User Roles & Flows](#-user-roles--flows)
- [Tech Stack](#-tech-stack)
- [Real-Time Queue Flow](#-real-time-queue-flow)
- [Database Schema](#-database-schema)
- [API Reference](#-api-reference)
- [Installation & Setup](#-installation--setup)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)

---

## 😤 The Problem

> Every day, millions of Indians waste hours waiting in queues.

```
Patient arrives at clinic at 9:00 AM
         ↓
Waits in crowded waiting room
         ↓
Doctor running 45 minutes late
         ↓
Patient misses work, loses half their day
         ↓
Still doesn't know when their turn is
```

This problem exists in:
- 🏥 Private clinics and hospitals
- ✂️ Barber shops
- 🛢️ LPG gas agencies
- 🏛️ Government offices
- 🏦 Banks and service centers

---

## ✨ The Solution

QueueEase digitizes the entire queue experience:

```
Patient books appointment from phone
         ↓
Gets assigned Token #36
         ↓
Sees live: "Now Serving #12 · Est. Wait: 35 mins"
         ↓
Gets notified: "Only 3 patients before you!"
         ↓
Arrives at clinic just in time
         ↓
Zero waiting. Maximum efficiency.
```

---

## 🌟 Features

### 👤 For Users (Patients / Customers)
| Feature | Description |
|---|---|
| 🔍 **Smart Search** | Search clinics by name, specialization, or location |
| 📍 **Nearby Clinics** | GPS-based discovery of clinics around you |
| 📅 **Appointment Booking** | Multi-step booking with date and slot selection |
| 🎫 **Token System** | Get assigned a unique token number per day |
| 📡 **Live Queue Tracking** | Real-time token updates via Socket.IO |
| 🔔 **Smart Notifications** | Get alerted when your turn is approaching |
| 💳 **Online Payment** | Pay consultation fees via UPI, cards, or QR |
| 📋 **My Appointments** | View all upcoming and past appointments |

### 👨‍⚕️ For Admins (Doctors / Service Providers)
| Feature | Description |
|---|---|
| 🏥 **Clinic Registration** | Register clinic with full details and photos |
| 📊 **Live Dashboard** | Real-time view of today's queue and patient stats |
| ✅ **Queue Management** | Mark patients as done, auto-advance queue |
| 📈 **Analytics** | Daily patient count, peak hours, revenue tracking |
| 💰 **Payment Settings** | Configure whether appointments require payment |

### 🔍 For Verifiers (Field Agents)
| Feature | Description |
|---|---|
| 📋 **Pending List** | View all clinics awaiting verification |
| 🗺️ **Navigation** | One-tap navigation to clinic location |
| ✅ **Approve / Reject** | Mark clinics as verified with photo proof |
| 📝 **Verification Notes** | Add detailed notes for each clinic visit |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    MOBILE APP (React Native)                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   User   │  │  Admin   │  │Verifier  │  │   Auth   │   │
│  │  Screens │  │ Screens  │  │ Screens  │  │  Screens │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │              │              │              │          │
│  ┌────▼──────────────▼──────────────▼──────────────▼─────┐  │
│  │           Axios Client + Socket.IO Client              │  │
│  └──────────────────────┬─────────────────────────────────┘  │
└─────────────────────────┼───────────────────────────────────┘
                          │ HTTPS + WSS
┌─────────────────────────▼───────────────────────────────────┐
│                   BACKEND (Node.js + Express)                │
│                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐  │
│  │  /auth   │ │/clinics  │ │/appoint- │ │   /queue     │  │
│  │          │ │          │ │  ments   │ │   /verifier  │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Socket.IO Server                        │   │
│  │   join:clinic → queue:updated → leave:clinic        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐  │
│  │  Prisma  │ │Cloudinary│ │ Razorpay │ │   Firebase   │  │
│  │   ORM    │ │ (Images) │ │(Payments)│ │    (Push)    │  │
│  └────┬─────┘ └──────────┘ └──────────┘ └──────────────┘  │
└───────┼─────────────────────────────────────────────────────┘
        │
┌───────▼──────────────────────────────────────────────────────┐
│              CLOUD DATABASE (Neon PostgreSQL)                  │
│   users · clinics · appointments · queue_states · verif_logs  │
└──────────────────────────────────────────────────────────────┘
```

---

## 👥 User Roles & Flows

### 🧑 User Flow

```
📱 Download App
      │
      ▼
📝 Register as USER
      │
      ▼
🔍 Search Clinic / Service
      │
      ▼
🏥 View Clinic Details
      │
   ┌──┴──────────────────────┐
   │   LIVE QUEUE CARD       │
   │  Now Serving:  #12      │
   │  Total Today:   35      │
   │  Est. Wait:  25 mins    │
   │  Your Token:    #36     │
   └──┬──────────────────────┘
      │
      ▼
📅 Book Appointment
   Step 1: Patient Details
   Step 2: Select Date & Slot
   Step 3: Confirm Booking
      │
      ├──► [Payment Required?]
      │         │ YES
      │         ▼
      │    💳 Razorpay Payment
      │         │
      │    ◄────┘ 
      │
      ▼
🎫 Token Assigned → Booking Confirmed
      │
      ▼
📡 Live Queue Tracking
   Your Token: #36
   Now Serving: #12
   24 patients ahead
      │
      ▼
🔔 Notification: "Only 3 patients before you!"
      │
      ▼
🏥 Arrive at Clinic → Get Consulted ✅
```

### 👨‍⚕️ Admin Flow

```
📱 Register as ADMIN
      │
      ▼
🏥 Submit Clinic Registration Form
   • Clinic name, address, photos
   • Doctor details, specialization
   • Max patients per day
   • Payment settings
      │
      ▼
⏳ Status: PENDING VERIFICATION
      │
      ▼  [Verifier visits and approves]
      │
      ▼
✅ Clinic APPROVED → Now Live on Platform
      │
      ▼
📊 Admin Dashboard
   • Live patient count
   • Current token being served
   • Today's appointment list
      │
      ▼
✅ Mark Patient as Done
      │
      ▼
🔄 Queue auto-advances → All users notified in real-time
```

### 🔍 Verifier Flow

```
📱 Register as VERIFIER
      │
      ▼
📋 View Pending Clinics (sorted by distance)
      │
      ▼
🗺️ Navigate to Clinic
      │
      ▼
🔍 Inspect Clinic
      │
      ├──► ✅ Approve → Clinic goes LIVE
      │         • Upload proof photo
      │         • Add notes
      │         • Admin notified instantly
      │
      └──► ❌ Reject → Admin notified with reason
```

---

## 🛠️ Tech Stack

### Mobile (Frontend)
| Technology | Purpose |
|---|---|
| **React Native + Expo SDK 54** | Cross-platform mobile app |
| **NativeWind v4** | Tailwind CSS styling for React Native |
| **React Navigation** | Stack + Bottom Tab navigation |
| **Axios** | HTTP API calls with JWT interceptor |
| **Socket.IO Client** | Real-time queue updates |
| **AsyncStorage** | JWT token persistence |
| **expo-notifications** | Push notification support |
| **expo-location** | GPS for nearby clinic search |
| **expo-image-picker** | Clinic and verification photo uploads |
| **react-native-toast-message** | In-app notifications |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express.js** | REST API server |
| **Prisma ORM v7** | Database queries and schema management |
| **PostgreSQL (Neon)** | Cloud-hosted relational database |
| **Socket.IO** | Real-time bidirectional communication |
| **JWT** | Stateless authentication + role-based access |
| **bcryptjs** | Password hashing |
| **Cloudinary** | Clinic and doctor image storage |
| **Razorpay** | Payment gateway (UPI, cards, QR) |
| **Firebase Admin** | Server-side push notifications |
| **express-validator** | Request input validation |
| **helmet + morgan** | Security headers + request logging |

### Infrastructure
| Service | Purpose |
|---|---|
| **Render** | Backend hosting (auto-deploy from GitHub) |
| **Neon** | Serverless PostgreSQL database |
| **Cloudinary** | Image CDN and storage |
| **EAS Build** | Cloud APK compilation |
| **GitHub** | Version control and CI/CD |

---

## 📡 Real-Time Queue Flow

```
ADMIN DEVICE                    SERVER                    USER DEVICE
     │                             │                           │
     │                             │◄──── join:clinic ─────────│
     │                             │      (clinicId)           │
     │                             │                           │
     │  [Taps "Mark as Done"]      │                           │
     │──── PUT /api/queue/next ───►│                           │
     │                             │  UPDATE appointments      │
     │                             │  UPDATE queue_states      │
     │                             │                           │
     │                             │──── queue:updated ───────►│
     │                             │   {                       │
     │◄─── 200 OK ─────────────────│     currentToken: 13,     │
     │                             │     totalToday: 35,       │
     │                             │     remaining: 22,        │
     │                             │     estimatedWait: 330    │
     │                             │   }                       │
     │                             │                           │
  Dashboard                        │                    Token card
  updates to                       │                    animates:
  Token #13 ✅                     │                    #12 → #13 ✅
```

**Update propagates to ALL connected users in under 100ms.**

---

## 🗄️ Database Schema

```
┌─────────────────┐         ┌─────────────────────┐
│      users      │         │       clinics        │
├─────────────────┤         ├─────────────────────┤
│ id (uuid) PK    │────┐    │ id (uuid) PK        │
│ name            │    │    │ name                │
│ phone (unique)  │    │    │ address, city, state│
│ email (unique)  │    └───►│ adminId (FK→users)  │
│ passwordHash    │         │ doctorName, degree  │
│ role            │         │ specialization      │
│ fcmToken        │         │ maxPatientsPerDay   │
│ createdAt       │         │ paymentRequired     │
└─────────────────┘         │ consultationFee     │
                            │ status (PENDING/    │
                            │  APPROVED/REJECTED) │
                            └──────────┬──────────┘
                                       │
              ┌────────────────────────┼────────────────────────┐
              │                        │                        │
              ▼                        ▼                        ▼
┌─────────────────────┐  ┌─────────────────────┐  ┌──────────────────────┐
│    appointments     │  │    queue_states      │  │  verification_logs   │
├─────────────────────┤  ├─────────────────────┤  ├──────────────────────┤
│ id (uuid) PK        │  │ id (uuid) PK        │  │ id (uuid) PK         │
│ userId (FK→users)   │  │ clinicId (FK,unique)│  │ clinicId (FK)        │
│ clinicId (FK)       │  │ currentToken        │  │ verifierId (FK)      │
│ patientName, age    │  │ totalBookedToday    │  │ status               │
│ appointmentDate     │  │ date                │  │ notes                │
│ tokenNumber         │  │ updatedAt           │  │ proofImageUrl        │
│ status              │  └─────────────────────┘  │ createdAt            │
│ paymentStatus       │                            └──────────────────────┘
│ razorpayOrderId     │
│ razorpayPaymentId   │
└─────────────────────┘
```

---

## 📖 API Reference

### Authentication
```
POST   /api/auth/register          Register new user (USER/ADMIN/VERIFIER)
POST   /api/auth/login             Login and receive JWT token
GET    /api/auth/me                Get current user profile [🔒 Auth]
PUT    /api/auth/fcm-token         Update FCM push token [🔒 Auth]
```

### Clinics
```
POST   /api/clinics                Register new clinic [🔒 ADMIN]
GET    /api/clinics                Get all approved clinics (search, filter)
GET    /api/clinics/my             Get admin's own clinic [🔒 ADMIN]
GET    /api/clinics/nearby         Get clinics by GPS coordinates
GET    /api/clinics/:id            Get clinic details + queue state
PUT    /api/clinics/:id            Update clinic info [🔒 ADMIN]
```

### Appointments
```
POST   /api/appointments           Book appointment [🔒 Auth]
GET    /api/appointments/my        Get my appointments [🔒 Auth]
GET    /api/appointments/:id       Get appointment details [🔒 Auth]
PUT    /api/appointments/:id/cancel Cancel appointment [🔒 Auth]
GET    /api/appointments/clinic/:id/today  Today's list [🔒 ADMIN]
```

### Queue
```
GET    /api/queue/:clinicId        Get live queue state
PUT    /api/queue/:clinicId/next   Mark current as done [🔒 ADMIN]
PUT    /api/queue/:clinicId/reset  Reset queue [🔒 ADMIN]
```

### Payments
```
POST   /api/payments/create-order  Create Razorpay order [🔒 Auth]
POST   /api/payments/verify        Verify payment signature [🔒 Auth]
GET    /api/payments/status/:id    Get payment status [🔒 Auth]
```

### Verifier
```
GET    /api/verifier/pending       Get pending clinics [🔒 VERIFIER]
GET    /api/verifier/clinics/:id   Get clinic details [🔒 VERIFIER]
PUT    /api/verifier/clinics/:id/approve  Approve clinic [🔒 VERIFIER]
PUT    /api/verifier/clinics/:id/reject   Reject clinic [🔒 VERIFIER]
GET    /api/verifier/history       My verification history [🔒 VERIFIER]
```

### Socket.IO Events
```
CLIENT → SERVER:
  join:clinic   { clinicId }     Join real-time queue room
  leave:clinic  { clinicId }     Leave queue room

SERVER → CLIENT:
  queue:updated { currentToken, totalBookedToday, remaining, estimatedWaitTime }
  appointment:status:changed { appointmentId, status }
```

---

## 🚀 Installation & Setup

### Prerequisites
```
Node.js >= 18
PostgreSQL (local) or Neon account (cloud)
Expo CLI + EAS CLI
Android device or emulator
```

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/this-is-ankit/QueueEase.git
cd QueueEase/queueease-backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Fill in your values in .env

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Start the server
node server.js
```

### Environment Variables (Backend)
```bash
# Database
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"

# Security
JWT_SECRET="your_super_secret_key_minimum_64_chars"

# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Cloudinary (image uploads)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Razorpay (payments)
RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="your_secret"

# Firebase (push notifications)
FIREBASE_SERVICE_ACCOUNT='{"type":"service_account",...}'

# Google Maps
GOOGLE_MAPS_API_KEY="AIzaSyxxxxxxxxxx"
```

### Mobile Setup

```bash
cd QueueEase/queueease-mobile

# Install dependencies
npm install

# Create environment file
# Create .env with:
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:5000/api
EXPO_PUBLIC_SOCKET_URL=http://YOUR_LOCAL_IP:5000
EXPO_PUBLIC_GOOGLE_MAPS_KEY=your_key
EXPO_PUBLIC_RAZORPAY_KEY=your_razorpay_key_id

# Start Expo (development)
npx expo start --clear
```

> **Note:** Replace `YOUR_LOCAL_IP` with your machine's local IP address (e.g., `192.168.1.23`). Do not use `localhost` — it won't work on a physical Android device.

---

## ☁️ Deployment

### Backend → Render

1. Push code to GitHub
2. Create Web Service on [render.com](https://render.com)
3. Set build command: `npm install && npx prisma generate && npx prisma db push`
4. Set start command: `node server.js`
5. Add all environment variables in Render dashboard
6. Deploy 🚀

### Database → Neon

1. Create project at [neon.tech](https://neon.tech)
2. Copy connection string
3. Set as `DATABASE_URL` in Render environment variables
4. Run `npx prisma db push` to sync schema

### Mobile → EAS Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS
eas build:configure

# Build APK for testing
eas build -p android --profile preview

# Build AAB for Play Store
eas build -p android --profile production
```

---

## 🗺️ Roadmap

### Version 1.0 (Current)
- [x] User registration and authentication (3 roles)
- [x] Clinic registration and verification workflow
- [x] Real-time queue tracking via Socket.IO
- [x] Appointment booking with token assignment
- [x] Payment integration (Razorpay)
- [x] Admin queue management dashboard
- [x] Verifier approval workflow
- [x] Push notifications
- [x] GPS-based nearby clinic search

### Version 1.1 (Planned)
- [ ] ⭐ Clinic ratings and reviews
- [ ] 📱 OTP-based phone number authentication
- [ ] 🔁 Recurring appointment booking
- [ ] 📊 Advanced analytics dashboard for admins
- [ ] 🌐 Web app for admins (React)
- [ ] 🗓️ Calendar integration

### Version 2.0 (Future)
- [ ] 🤖 AI-powered wait time prediction
- [ ] 💬 In-app chat between patient and clinic
- [ ] 🏥 Multi-doctor support per clinic
- [ ] 🌍 Multi-language support (Hindi, Bengali, Tamil)
- [ ] 📺 Queue display screen for clinic waiting rooms
- [ ] 🔗 Hospital management system integration

---

## 🤝 Contributing

Contributions are welcome! Here's how:

```bash
# Fork the repository
# Create your feature branch
git checkout -b feature/amazing-feature

# Commit your changes
git commit -m "feat: add amazing feature"

# Push to the branch
git push origin feature/amazing-feature

# Open a Pull Request
```

### Commit Convention
```
feat:     New feature
fix:      Bug fix
docs:     Documentation update
style:    Formatting changes
refactor: Code refactoring
test:     Adding tests
chore:    Build/config changes
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Ankit Kumar**

Built with ❤️ to solve a real problem faced by millions of Indians every day.

---

<div align="center">

**If QueueEase helped you, give it a ⭐ on GitHub!**

```
Made in India 🇮🇳 · Built with React Native + Node.js · Powered by Socket.IO
```

<img src="https://img.shields.io/badge/Made%20in-India-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/Built%20with-❤️-red?style=for-the-badge" />
<img src="https://img.shields.io/badge/Powered%20by-Socket.IO-black?style=for-the-badge&logo=socket.io" />

</div>

## 👨‍💻 Author

<div align="center">

**Ankit Kumar**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/this-is-ankit)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](linkedin.com/in/ankit-kumar-9036a0346)

*Built with ☕, late nights, and a love for clean architecture.*

</div>

---

<div align="center">

If you found this project useful, consider giving it a ⭐ — it genuinely helps!

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12&height=100&section=footer" width="100%"/>

</div>