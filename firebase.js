// Import Firebase using CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDqMM34lHX_jDX0deFf1AYiwMi0uP8kTks",
  authDomain: "foodhealthamd.firebaseapp.com",
  projectId: "foodhealthamd",
  storageBucket: "foodhealthamd.firebasestorage.app",
  messagingSenderId: "746396227577",
  appId: "1:746396227577:web:22bf6a4dbd1dac932ccf28",
  measurementId: "G-S5WNL68WZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth + Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
