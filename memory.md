# Food and Health Web App

## Key Details
- **Project Goal:** Premium, dark-mode Food and Health Dashboard.
- **Tech Stack:** Vanilla HTML, CSS, JavaScript bundled via Node.js/Vite.
- **Backend Architecture (Firebase):**
  - **Firebase Authentication:** Handles user signup, login, and secured session state persistence.
  - **Cloud Firestore:** Zero-configuration NoSQL database syncing data per-user dynamically using `firestoreService.js`. Stores `users` and tracks metrics like `hydration` uniquely per `user.uid`.
  - **Deployment Ready:** Configured via unbundled web CDN imports (`https://www.gstatic.com/firebasejs/...`) to maintain Vercel/Netlify zero-build compatibility.
- **Core Features Implemented (SPA):**
  - **Single Page App Routing:** Hash-based custom router without page refreshes, gated securely by Firebase `onAuthStateChanged`.
  - **Dashboard:** Core summary page with dynamic Firestore macros, step tracker, and personalized header.
  - **Meals Page:** Daily food tracking grid (Breakfast, Lunch, Dinner).
  - **Activity Page:** Weekly steps chart and active minutes UI directly fueled by Firebase endpoints.
  - **Hydration Page:** Dedicated large-scale interactive water widget automatically merged with Firestore on click.
  - **Settings Page:** Modern toggle switches (Push Notifications, Custom themes).

## Aesthetic Keypoints
- Dark Mode base using `#0a0b10` and `#13151f`.
- Premium accents using Neon Green (`#b0ff4c`) & Soft Purple (`#a374ff`).
- Extensive use of modern Glassmorphism (backdrop blurring on translucent cards).
- Outfit & Phosphor Icons used for typography and geometric iconography.

## Recent Architecture Updates
- **Security Improved:** Firebase configuration and API keys are moved into a separate `firebase-config.js` file, which is added to `.gitignore` to protect sensitive data. A `firebase-config.example.js` template is maintained in the repository for developer guidance.
- **SPA Initialization Fixed:** Implemented a structured initialization sequence (`initApp` in `app.js`). The app now explicitly waits for Firebase `onAuthStateChanged` (wrapped in a Promise via `initAuth` in `auth.js`) and fetches prerequisite user data from Firestore *before* rendering the dashboard.
- **Routing & Loading UX:** Unauthenticated users attempting to access protected routes are successfully redirected to `signin.html`. A "Loading dashboard..." UI spinner is displayed during the initial load to prevent empty screen flashes.