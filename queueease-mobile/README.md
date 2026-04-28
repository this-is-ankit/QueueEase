# QueueEase Mobile — React Native (Expo)

Real-time queue management and appointment booking app for India.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native (Expo SDK 51+) |
| Styling | NativeWind (Tailwind CSS) |
| Navigation | React Navigation (Stack + Bottom Tabs) |
| HTTP | Axios |
| Real-time | Socket.IO Client |
| Auth Storage | AsyncStorage |
| Payments | React Native Razorpay |
| Push Notifications | Firebase Cloud Messaging (FCM) |
| Maps | React Native Maps |
| Image Picker | Expo Image Picker / Camera |

---

## Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Android Studio (for Android emulator) **or** physical device with Expo Go
- A running [QueueEase Backend](../queueease-backend/README.md)

---

## Setup

### 1. Install dependencies

```bash
cd queueease-mobile
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
EXPO_PUBLIC_API_URL=http://localhost:5000/api
EXPO_PUBLIC_SOCKET_URL=http://localhost:5000
EXPO_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_api_key
EXPO_PUBLIC_RAZORPAY_KEY=your_razorpay_key_id
```

> **Note:** On a physical device, replace `localhost` with your machine's local IP (e.g., `http://192.168.1.10:5000/api`).

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a project.
2. Add an **Android** app with package name `com.queueease.mobile`.
3. Download `google-services.json` and place it in the project root.
4. For iOS: download `GoogleService-Info.plist` and add via Xcode.

### 4. Razorpay Setup

1. Create an account at [Razorpay Dashboard](https://dashboard.razorpay.com/).
2. Copy your **Key ID** (test mode) into `EXPO_PUBLIC_RAZORPAY_KEY`.
3. Set the backend `RAZORPAY_KEY_SECRET` in `queueease-backend/.env`.

### 5. Google Maps Setup

1. Enable the **Maps SDK for Android** and **Maps SDK for iOS** in [Google Cloud Console](https://console.cloud.google.com/).
2. Copy the API key into `EXPO_PUBLIC_GOOGLE_MAPS_KEY`.
3. Add to `app.json` under `expo.android.config.googleMaps.apiKey` and `expo.ios.config.googleMapsApiKey`.

---

## Running the App

```bash
# Start Expo dev server
npm start

# Run on Android emulator / device
npm run android

# Run on iOS simulator (macOS only)
npm run ios

# Run in web browser (limited native features)
npm run web
```

---

## Project Structure

```
queueease-mobile/
├── App.jsx                  # Root: providers + FCM setup
├── .env                     # Environment variables
├── tailwind.config.js       # NativeWind config
├── babel.config.js          # NativeWind babel plugin
└── src/
    ├── api/
    │   ├── client.js        # Axios instance + JWT interceptor
    │   ├── auth.api.js
    │   ├── clinic.api.js
    │   ├── appointment.api.js
    │   ├── queue.api.js
    │   ├── payment.api.js
    │   └── verifier.api.js
    ├── components/
    │   ├── common/
    │   │   ├── Button.jsx
    │   │   ├── Input.jsx
    │   │   ├── Card.jsx
    │   │   ├── TokenBadge.jsx
    │   │   ├── SkeletonLoader.jsx
    │   │   └── LiveQueueCard.jsx
    │   ├── clinic/
    │   │   ├── ClinicCard.jsx
    │   │   └── ImageCarousel.jsx
    │   └── queue/
    │       ├── QueueProgress.jsx
    │       └── QueueTimeline.jsx
    ├── context/
    │   ├── AuthContext.jsx   # JWT + user state
    │   └── SocketContext.jsx # Socket.IO connection
    ├── hooks/
    │   ├── useAuth.js        # Convenience auth hook
    │   └── useQueue.js       # Real-time queue state
    ├── navigation/
    │   ├── AppNavigator.jsx  # Root stack
    │   ├── UserNavigator.jsx # Patient tabs
    │   ├── AdminNavigator.jsx
    │   └── VerifierNavigator.jsx
    ├── screens/
    │   ├── auth/
    │   │   ├── SplashScreen.jsx
    │   │   ├── LoginScreen.jsx
    │   │   └── RegisterScreen.jsx
    │   ├── user/
    │   │   ├── HomeScreen.jsx
    │   │   ├── ClinicDetailsScreen.jsx
    │   │   ├── BookAppointmentScreen.jsx
    │   │   ├── PaymentScreen.jsx
    │   │   ├── BookingSuccessScreen.jsx
    │   │   ├── QueueTrackingScreen.jsx
    │   │   └── MyAppointmentsScreen.jsx
    │   ├── admin/
    │   │   ├── AdminDashboardScreen.jsx
    │   │   ├── QueueManagementScreen.jsx
    │   │   └── AddClinicScreen.jsx
    │   └── verifier/
    │       ├── VerifierDashboardScreen.jsx
    │       └── VerificationDetailScreen.jsx
    └── utils/
        ├── storage.js        # AsyncStorage helpers
        ├── constants.js
        └── helpers.js
```

---

## Notification Types (FCM Data Payload)

The backend sends FCM push notifications with a `type` field in the data payload. The app routes the user on tap:

| `type` value | Navigates to |
|---|---|
| `queue_update` | `QueueTrackingScreen` (requires `appointmentId`) |
| `booking_confirmed` | `MyAppointmentsScreen` |
| `clinic_approved` | `AdminDashboardScreen` |

---

## User Roles

| Role | Navigator | Description |
|---|---|---|
| `USER` | `UserNavigator` | Patient — books appointments, tracks queue |
| `ADMIN` | `AdminNavigator` | Clinic admin — manages queue, registers clinic |
| `VERIFIER` | `VerifierNavigator` | Field agent — verifies clinics on-site |

---

## Notes

- **Skeleton loaders** are shown on every screen while data is loading — no empty white flashes.
- **Socket.IO** connects automatically after login and disconnects on logout.
- **JWT** is persisted in `AsyncStorage` and automatically attached to every API request via the Axios interceptor.
- **Razorpay** payment is only triggered when `paymentRequired: true` comes back from the booking API.
