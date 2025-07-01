
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSunSmy0Ue9lMIy6ZzHaN2uYiSUTAlvd4",
  authDomain: "alumni-f6f09.firebaseapp.com",
  projectId: "alumni-f6f09",
  storageBucket: "alumni-f6f09.firebasestorage.app",
  messagingSenderId: "346150374858",
  appId: "1:346150374858:web:0b700b07c162bc46521333",
  measurementId: "G-YWGYQX7NRS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };
