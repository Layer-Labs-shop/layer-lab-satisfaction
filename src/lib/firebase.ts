import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2IfMpmlFidX4U8n9VMRRoZbiKDrPCEDU",
  authDomain: "layerlab-auth.firebaseapp.com",
  projectId: "layerlab-auth",
  storageBucket: "layerlab-auth.firebasestorage.app",
  messagingSenderId: "148258695216",
  appId: "1:148258695216:web:7cdeabcda3d3827316e5f5",
  measurementId: "G-EQDJDD9LTZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
