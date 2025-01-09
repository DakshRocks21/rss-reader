"use client";

import { useEffect } from "react";
import { getIdToken, signOut, onAuthStateChanged } from "firebase/auth";
import { createSession } from "../lib/session";
import { FIREBASE_AUTH_CLIENT } from "../lib/firebase/client";

export default function AuthComp() {
    useEffect(() => {
        
        const refresh = async (user) => {
            try {
                if (!user) {
                    console.log("No user logged in. Skipping session refresh.");
                    return;
                }

                const idToken = await getIdToken(user, true);
                const response = await createSession(idToken);

                if (!response.success) {
                    console.warn("Session refresh failed. Redirecting to login.");

                }
            } catch (error) {
                await signOut(FIREBASE_AUTH_CLIENT);
                console.log("Error refreshing session (USEEFFECT):", error);
            }
        };

        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH_CLIENT, (user) => {
            refresh(user);
        });

        return () => unsubscribe();
    }, []);

    return <></>;
}