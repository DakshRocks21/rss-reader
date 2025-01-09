import admin, { credential } from "firebase-admin";

// Ensure Firebase Admin is initialized only once
if (!admin.apps.length) {
  const serviceAccount = credential.cert(process.env.FIREBASE_ADMIN_SDK);

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, // Add your storage bucket
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