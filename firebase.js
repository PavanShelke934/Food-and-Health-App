import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqMM34lHX_jDX0deFf1AYiwMi0uP8kTks",
  authDomain: "foodhealthamd.firebaseapp.com",
  projectId: "foodhealthamd",
  storageBucket: "foodhealthamd.firebasestorage.app",
  messagingSenderId: "746396227577",
  appId: "1:746396227577:web:22bf6a4dbd1dac932ccf28",
  measurementId: "G-S5WNL68WZN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
