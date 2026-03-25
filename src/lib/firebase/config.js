import { getApp, getApps, initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
};

const hasFirebaseClientConfig = Boolean(
  firebaseConfig.apiKey
  && firebaseConfig.authDomain
  && firebaseConfig.projectId
  && firebaseConfig.appId
);

if (!hasFirebaseClientConfig && typeof window === "undefined") {
  console.warn(
    "Firebase client config is missing. Auth flows will be unavailable until NEXT_PUBLIC_FIREBASE_* envs are set."
  );
}

const app = hasFirebaseClientConfig
  ? getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApp()
  : null;

const auth = app ? getAuth(app) : null;

if (auth && typeof window !== "undefined") {
  void setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.warn("Failed to set Firebase auth persistence:", error);
  });
}

export { app, auth, firebaseConfig, hasFirebaseClientConfig };
