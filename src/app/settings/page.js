"use client";

import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { MdArrowDropDown } from "react-icons/md";

import { getUserInfoFromDatabase } from "@/lib/firebase/auth_database";
import {
  getCurrentUserID,
  getUserInfoFromFirebaseAuth,
  logoutSession,
} from "@/lib/session";
import { FIREBASE_FIRESTORE_CLIENT } from "@/lib/firebase/client";

import { useApplyStoredTheme } from "@/components/DarkConfig";
import ChangePassword from "@/components/changePassword";
import ThemeControl from "@/components/ThemeControl";

export default function App() {
  useApplyStoredTheme();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [isDropdownOpen, setIsDropdownOpen] = useState({
    username: false,
    password: false,
    theme: false,
  });

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

  const handleSignOut = async () => {
    await logoutSession();
    window.location.href = "/login";
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

      if (!isAuthenticated) {
        setMessage("No user is currently signed in.");
        return;
      }
      await updateProfile(currentUser, { displayName: username });
      setMessage("Username successfully updated!");
      setUser({ ...user, data: { ...user.data, displayName: username } });
    } catch (error) {
      console.error("Error updating username:", error);
      setMessage("Failed to update username");
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

  const toggleDropdown = (section) => {
    setIsDropdownOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-row gap-20 p-20 bg-white shadow-md rounded-lg w-full min-h-[700px] max-w-7xl">
        <div className="flex flex-col items-center justify-center border-r pr-24">
          {user && user.data.photoURL ? (
            <Image
              src={user.data.photoURL}
              alt="Profile Picture"
              width={180}
              height={180}
              className="rounded-full"
            />
          ) : (
            <FaUserCircle className="text-gray-700 w-[180px] h-[180px]" />
          )}
          <h1 className="text-3xl font-semibold mt-3 text-black">Settings</h1>
          {user && (
            <>
              <p className="mt-2 text-xl font-bold text-black">
                Email: {user.data.email}
              </p>
              <p className="text-xl font-bold text-black">
                Username: {user.data.displayName}
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col items-start justify-center gap-10 w-full max-w-lg">
          <div className="w-full">
            <button
              onClick={() => toggleDropdown("username")}
              className="border px-3 py-2 text-black rounded-md w-full text-left flex justify-between items-center"
            >
              Change Username
              <MdArrowDropDown className="inline ml-2" />
            </button>
            {isDropdownOpen.username && (
              <div className="mt-2 p-2 border rounded-md bg-white shadow-lg w-full">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter new username"
                  className="border px-3 py-2 text-black rounded-md w-full"
                />
                <button
                  onClick={updateUsername}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-md w-full mt-2 ${
                    isLoading
                      ? "bg-gray-400"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {isLoading ? "Saving..." : "Change Username"}
                </button>
              </div>
            )}
          </div>

          <div className="w-full">
            <button
              onClick={() => toggleDropdown("password")}
              className="border px-3 py-2 text-black rounded-md w-full text-left flex justify-between items-center"
            >
              Change Password
              <MdArrowDropDown className="inline ml-2" />
            </button>
            {isDropdownOpen.password && (
              <div className="mt-2 p-2 border rounded-md bg-white shadow-lg w-full">
                <ChangePassword />
              </div>
            )}
          </div>

          {/* Use the ThemeControl component */}
          <div className="w-full">
            <ThemeControl initialTheme="system" />
          </div>

          <button
            onClick={handleSignOut}
            className="rounded-md bg-red-400 px-4 py-2 text-white transition-all duration-300 ease-in-out hover:bg-red-600 hover:text-white w-full"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
