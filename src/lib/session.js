
"use server";

import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "@/lib/firebase/server";

export async function getUserData() {
  try {
    const idToken = await getCookie("firebaseToken")
    if (!idToken) return null;

    const decodedToken = await FIREBASE_AUTH.verifySessionCookie(idToken);
    if (!decodedToken?.uid) return null;

    const userSnapshot = await FIREBASE_FIRESTORE.collection("users").doc(decodedToken.uid).get();
    if (!userSnapshot.exists) return null;

    const data = userSnapshot.data();
    const serializedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value?.toDate?.()?.toISOString() || value])
    );

    return { id: userSnapshot.id, ...serializedData };
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    return null;
  }
}

export async function createSession(idToken) {
    if (!idToken) return null;

    try {
        const decodedToken = await FIREBASE_AUTH.verifyIdToken(idToken);
        if (!decodedToken) return { success: false, error: "Invalid token." };

        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
        const sessionCookie = await FIREBASE_AUTH.createSessionCookie(idToken, { expiresIn });

        await setCookie("firebaseToken", sessionCookie, { maxAge: expiresIn / 1000 });
        console.log("Session created for UID:", decodedToken.uid);

        return { success: true, uid: decodedToken.uid };
    } catch (error) {
        console.error("Error creating session:", error.message);
        return { success: false, error: error.message };
    }
}

export async function setCookie(key, value, options = {}) {
    const cookieStore = await cookies();
    cookieStore.set(key, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 5, // Default: 5 days
        ...options,
    });
}

// Get a cookie value
export async function getCookie(key) {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(key);
    return cookie ? cookie.value : null;
}

// Delete a cookie
export async function deleteCookie(key) {
    const cookieStore = await cookies();
    cookieStore.delete(key);
}

export async function logoutSession() {
    try {
        const cookieStore = await cookies(); 
        const sessionCookie = cookieStore.get("firebaseToken")?.value;

        if (sessionCookie) {
            // Revoke all Firebase sessions
            await revokeAllSessions(sessionCookie);

            // Clear the cookie by setting it to an empty value and past date
            cookieStore.delete("firebaseToken")

            // Redirect the user
            redirect("/"); // Redirect to login or home page
        }
    } catch (error) {
        console.error("Error during logout:", error.message);
    }
}

export async function revokeAllSessions(sessionCookie) {
    const decodedIdToken = await FIREBASE_AUTH.verifySessionCookie(sessionCookie);
    await FIREBASE_AUTH.revokeRefreshTokens(decodedIdToken.sub);
}