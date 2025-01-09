// This file is written by Daksh
import admin, { credential } from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccount = credential.cert(process.env.FIREBASE_ADMIN_SDK);

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    console.error("Firebase Admin SDK credentials are missing.");
    throw new Error(
      "Firebase Admin initialization failed: Missing credentials."
    );
  }
}

const FIREBASE_FIRESTORE = admin.firestore();
const FIREBASE_AUTH = admin.auth();
const FIREBASE_ADMIN = admin

export { FIREBASE_ADMIN, FIREBASE_FIRESTORE, FIREBASE_AUTH };