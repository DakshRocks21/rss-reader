// This file is written by Daksh
import admin, { credential } from "firebase-admin";

const firebaseAdminSdk = JSON.parse(
  Buffer.from(process.env.FIREBASE_ADMIN_SDK, 'base64').toString('utf8')
);


if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminSdk)
  });
}

const FIREBASE_FIRESTORE = admin.firestore();
const FIREBASE_AUTH = admin.auth();
const FIREBASE_ADMIN = admin

export { FIREBASE_ADMIN, FIREBASE_FIRESTORE, FIREBASE_AUTH };