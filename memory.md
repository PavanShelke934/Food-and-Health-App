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