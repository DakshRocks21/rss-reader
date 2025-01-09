// This file is written by Daksh
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

let app;

const getFirebaseApp = () => {
  if (!app) {
    app = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_CLIENT,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_CLIENT,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_CLIENT,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_CLIENT,
      messagingSenderId:
        process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_CLIENT,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID_CLIENT,
    });
  }
  return app;
};

const FIREBASE_APP_CLIENT = getFirebaseApp();
export const FIREBASE_AUTH_CLIENT = getAuth(FIREBASE_APP_CLIENT);
export const FIREBASE_FIRESTORE_CLIENT = getFirestore(FIREBASE_APP_CLIENT);