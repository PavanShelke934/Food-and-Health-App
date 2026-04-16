import { auth, db } from "./firebase.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const getUid = () => {
    return auth.currentUser ? auth.currentUser.uid : null;
};

export async function getUserProfile() {
    const uid = getUid();
    if (!uid) return null;
    const docRef = doc(db, "users", uid);
    const snap = await getDoc(docRef);
    return snap.exists() ? snap.data() : null;
}

const defaultSteps = [
    { day: "Mon", steps: 0 },
    { day: "Tue", steps: 0 },
    { day: "Wed", steps: 0 },
    { day: "Thu", steps: 0 },
    { day: "Fri", steps: 0 },
    { day: "Sat", steps: 0 },
    { day: "Sun", steps: 0 }
];

export async function getWeeklySteps() {
    const uid = getUid();
    if (!uid) return defaultSteps;
    const docRef = doc(db, "activity", uid);
    const snap = await getDoc(docRef);
    if (snap.exists() && snap.data().weeklySteps) {
        return snap.data().weeklySteps;
    }
    return defaultSteps;
}

export async function getHydrationCount() {
    const uid = getUid();
    if (!uid) return 0;
    const docRef = doc(db, "hydration", uid);
    const snap = await getDoc(docRef);
    if (snap.exists() && snap.data().waterGlasses !== undefined) {
        return snap.data().waterGlasses;
    }
    return 0;
}

export async function saveHydrationCount(count) {
    const uid = getUid();
    if (!uid) return;
    await setDoc(doc(db, "hydration", uid), {
        waterGlasses: count,
        lastUpdated: new Date().toISOString()
    }, { merge: true });
}

export async function saveUserProfile(data) {
    const uid = getUid();
    if (!uid) return;
    await setDoc(doc(db, "users", uid), {
        ...data,
        plan: "Free Plan",
        updatedAt: new Date().toISOString()
    }, { merge: true });
}
