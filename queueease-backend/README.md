# QueueEase Backend Platform

Scalable, asynchronous backend architecture built for **QueueEase** — a real-time queue management and appointment booking platform.

## 🚀 Tech Stack

- **Node.js + Express.js**: RESTful service frameworks
- **Prisma v7**: Next-gen Node.js and TypeScript ORM managing PostgreSQL
- **Socket.IO**: Emits unblocked realtime queue mutations asynchronously
- **HMAC + Razorpay**: Dynamic gateway validation
- **Firebase Admin SDK**: Direct FCM Push integrations mapped dynamically
- **Cloudinary SDK**: Visual asset hosting & native geometric proof submissions

---

## 🛠 Setup & Installation

1. **Clone the Repository**

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   - Copy `.env.example` to `.env`
   - Fill in your `DATABASE_URL`, `JWT_SECRET`, `CLOUDINARY_` keys, `RAZORPAY_` keys, and the stringified JSON `FIREBASE_SERVICE_ACCOUNT` mapping.

4. **Initialize Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the Application**
   ```bash
   npm run dev
   ```

---

## 🔌 API Endpoints Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint             | Access | Description                           |
|--------|----------------------|--------|---------------------------------------|
| `POST` | `/register`          | Public | Create USER, ADMIN, or VERIFIER role  |
| `POST` | `/login`             | Public | Issue bounded JWT token               |
| `GET`  | `/me`                | All    | Retrieve authenticated logic payload  |
| `PUT`  | `/fcm-token`         | All    | Attaches Firebase push target string  |

### 🏥 Clinics (`/api/clinics`)
| Method | Endpoint             | Access | Description                           |
|--------|----------------------|--------|---------------------------------------|
| `GET`  | `/nearby`            | Public | Haversine coordinates radius search   |
| `GET`  | `/`                  | Public | Paginated fetch with sorting bounds   |
| `GET`  | `/my`                | ADMIN  | Retrieve localized owning entity      |
| `GET`  | `/:id`               | Public | Raw payload of one strict clinic UUID |
| `POST` | `/`                  | ADMIN  | Create Clinic & Cloudinary photos     |
| `PUT`  | `/:id`               | ADMIN  | Mutate facility arrays internally     |

### 📅 Appointments (`/api/appointments`)
| Method | Endpoint             | Access       | Description                           |
|--------|----------------------|--------------|---------------------------------------|
| `POST` | `/`                  | USER/ADMIN   | Book slot & hit max bound capacities  |
| `GET`  | `/my`                | USER         | Historical pipeline for client track  |
| `GET`  | `/clinic/:id/today`  | ADMIN        | Strict active fetching restricted ID  |
| `PUT`  | `/:id/cancel`        | USER/ADMIN   | Failsafe termination of specific slot |
| `GET`  | `/:id`               | USER/ADMIN/V | Retrieve single mapping properties    |

### 💳 Payments (`/api/payments`)
| Method | Endpoint             | Access | Description                           |
|--------|----------------------|--------|---------------------------------------|
| `POST` | `/create-order`      | USER   | Generate network ticket via Razorpay  |
| `POST` | `/verify`            | USER   | Match HMAC hashes unlocking to PAID   |
| `GET`  | `/status/:id`        | USER   | Fetch internal DB transaction boolean |

### 👥 Real-Time Queue (`/api/queue`)
| Method | Endpoint             | Access | Description                           |
|--------|----------------------|--------|---------------------------------------|
| `GET`  | `/:clinicId`         | Public | Dashboard polling & math estimates    |
| `PUT`  | `/:clinicId/next`    | ADMIN  | Shifts $transaction boundary by +1    |
| `PUT`  | `/:clinicId/reset`   | ADMIN  | Daily chron sweeping routine to zero  |

### 🛡️ Physical Verifiers (`/api/verifier`)
| Method | Endpoint             | Access   | Description                           |
|--------|----------------------|----------|---------------------------------------|
| `GET`  | `/pending`           | VERIFIER | Pull unapproved nodes for assignment  |
| `GET`  | `/history`           | VERIFIER | Fetch internal completed log tracks   |
| `GET`  | `/clinics/:id`       | VERIFIER | Detailed breakdown including old logs |
| `PUT`  | `/clinics/:id/approve`| VERIFIER | Unlocks clinic for Public access     |
| `PUT`  | `/clinics/:id/reject`| VERIFIER | Submits specific failure text markers |

---

## 🔌 WebSocket References

Native **Socket.IO** connections map directly matching your root server URL.

**Commands Payload List:**
- emit `join:clinic` (`clinicId`) -> Connects local view to broadcast room.
- emit `leave:clinic` (`clinicId`) -> Detaches.

**Passive Listeners:**
- on `queue:updated` -> Receives synchronized math payload properties.

## 🎉 Environments
Run locally without crashes! Missing Firebase/Razorpay values log cleanly.
