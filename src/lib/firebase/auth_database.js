// Daksh wrote this
import {
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { FIREBASE_AUTH_CLIENT, FIREBASE_FIRESTORE_CLIENT } from "./client";
import { createSession } from "@/lib/session";

export const SignUpWithEmailPass = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      FIREBASE_AUTH_CLIENT,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: username });

    const usersCollection = collection(FIREBASE_FIRESTORE_CLIENT, "users");
    const userDocRef = doc(usersCollection, user.uid);
    await setDoc(userDocRef, {
      email: user.email,
      displayName: username,
      photoURL: user.photoURL || "",
      createdAt: new Date(),
      bio: "",
    });
    const Idtoken = await userCredential.user.getIdToken();
    await createSession(Idtoken);
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const SignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(FIREBASE_AUTH_CLIENT, provider);
    const user = userCredential.user;

    const usersCollection = collection(FIREBASE_FIRESTORE_CLIENT, "users");
    const userDocRef = doc(usersCollection, user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL || "",
        createdAt: new Date(),
        bio: "",
      });
    }

    const Idtoken = await userCredential.user.getIdToken();
    await createSession(Idtoken);

    return { success: true, user, data: userDoc.data() };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const LoginWithEmailPass = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      FIREBASE_AUTH_CLIENT,
      email,
      password
    );
    const user = userCredential.user;

    const userDocRef = doc(FIREBASE_FIRESTORE_CLIENT, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    return { success: true, user, data: userDoc.data() };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUserInfoFromDatabase = async (uid) => {
  try {
    const userDocRef = doc(FIREBASE_FIRESTORE_CLIENT, "users", uid);
    const userDoc = await getDoc(userDocRef);

    return { success: true, data: userDoc.data() };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
