// Puru Wrote this
"use client";
import { getUserInfoFromDatabase } from "@/lib/firebase/auth_database";
import { useState, useEffect } from "react";
import { getCurrentUserID } from "@/lib/session";
import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

import { FIREBASE_FIRESTORE_CLIENT } from "@/lib/firebase/client";
import { setTheme } from "@/components/DarkConfig";

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  
  const toggleTheme = () => {
    setIsDarkMode((dark) => {
      const newTheme = !dark;
      const theme = newTheme ? "dark" : "light";
      document.body.classList.toggle("dark", newTheme);
      document.body.classList.toggle("light", !newTheme);
      localStorage.setItem("theme", theme);
      return newTheme;
    });
  };
  setTheme();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const updateUsername = async () => {
    if (!username.trim()) {
      setMessage("Username cannot be empty.");
      return;
    }

    try {
      setMessage("");
      setIsLoading(true);
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setMessage("No user is currently signed in.");
        return;
      }

      await updateProfile(currentUser, { displayName: username });
      setMessage("Username successfully updated!");
      setUser({ ...user, data: { ...user.data, displayName: username } }); 
    } catch (error) {
      console.error("Error updating username:", error);
      setMessage(`Failed to update username: ${error.message}`);
    } finally {
      setIsLoading(false);
    }

    const usersCollection = collection(FIREBASE_FIRESTORE_CLIENT, "users");
    const userDocRef = doc(usersCollection, await getCurrentUserID());
    await setDoc(userDocRef, {
      email: user.data.email,
      displayName: username,
      photoURL: user.data.photoURL || "",
      createdAt: new Date(),
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await getCurrentUserID();
        const userData = await getUserInfoFromDatabase(userId);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen text-center">
      <div className="flex justify-center">
        {user && user.data.photoURL ? (
          <Image
            src={user.data.photoURL}
            alt="Profile Picture"
            width={150}
            height={150}
            className="rounded-full"
          />
        ) : (
          <FaUserCircle className="text-gray-700 w-[150px] h-[150px]" />
        )}
      </div>
      <h1 className="text-5xl font-semibold">Settings</h1>
      {user ? (
        <>
          <p className="mt-2 text-3xl font-bold">Email: {user.data.email}</p>
          <p className="text-3xl font-bold">Username: {user.data.displayName}</p>
          <button
            className="mt-3 bg-foreground text-background"
            onClick={toggleTheme}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              border: "none",
              borderRadius: "5px",
              transition: "background-color 0.5s, color 0.5s",
            }}
          >
            Toggle Theme
          </button>
          <div className="flex justify-center mt-5">
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter new username"
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginRight: "10px",
                color: "#121212",
              }}
            />
            <button
              onClick={updateUsername}
              disabled={isLoading}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                border: "none",
                borderRadius: "5px",
                backgroundColor: isLoading ? "#ccc" : "#007BFF",
                color: "#fff",
                transition: "background-color 0.5s, color 0.5s",
              }}
            >
              {isLoading ? "Saving..." : "Change Username"}
            </button>
          </div>
          <h1 className="mt-3">{message}</h1>
        </>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
}
