//Puru Wrote this
"use client";

import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { FaUserCircle } from "react-icons/fa";// Used for profile picture if user does not have one 
import Image from "next/image";
import { MdArrowDropDown } from "react-icons/md";// Imported for  dropdown
import { SegmentedButton, SegmentedButtonSet, Icon } from "actify";  // Imported for toggle buttons
import { FaArrowLeft } from "react-icons/fa";// used in back button
import { getUserInfoFromDatabase } from "@/lib/firebase/auth_database";
import { getCurrentUserID, getUserInfoFromFirebaseAuth, logoutSession } from "@/lib/session";
import { FIREBASE_FIRESTORE_CLIENT } from "@/lib/firebase/client";
import { setTheme } from "@/components/DarkConfig";// Sets theme whether dark or light
import ChangePassword from "@/components/changePassword";

export default function App() {
  const [user, setUser] = useState(null);// Sets intial user state to null
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");// Used when user want to change username
  const [bio, setBio] = useState(""); // Add state for bio
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [selectedColorMode, setSelectedColorMode] = useState("system");// Uses system state unless changed for theme

  const [isDropdownOpen, setIsDropdownOpen] = useState({// Uses for dropdowns state and when user clicks on dropdown button then it changes to flase
    username: false,
    password: false,
    faq: false,
    bio: false 
  });

  useEffect(() => {// Used to fetch user data otheriwse protects settings page byt redirecting unauthorised user to /login
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
  setTheme();

  const fetchData = async () => {// Authenticates user
    const userData = await getUserInfoFromFirebaseAuth();
    if (!userData) {
      setIsAuthenticated(false);
      window.location.href = "/login";
      return;
    }
    setIsAuthenticated(true);
  };

  const handleChangeColorMode = (mode) => {// Changes color based on ternary operator
    setSelectedColorMode(mode);
    const theme = mode === "dark" ? "dark" : mode === "light";
    document.body.classList.toggle("dark", theme === "dark");
    document.body.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  };
  const goBack = () => {// Used as function for the back button 
    window.location.href = "/home";
  }
  

  const handleSignOut = async () => {// Signs out a user and redirects them to /login page
    await logoutSession();
    window.location.href = "/login";
  };

  const updateUsername = async () => {// Function to update the username of a user as well as 
    if (!username.trim()) {
      setMessage("Username cannot be empty.");
      return;
    }

    try {
      setMessage("");
      setIsLoading(true);
      const auth = getAuth();
      const currentUser = auth.currentUser;// sets current user
      /*
      if (!isAuthenticated) {
        setMessage("No user is currently signed in.");
        return;
      }*/
      await updateProfile(currentUser, { displayName: username });// Updates new username and sets new user data
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
    await setDoc(userDocRef, {// Updates firebase with new paticulars of a user
      email: user.data.email,
      displayName: username,
      photoURL: user.data.photoURL || "",
      bio: bio, 
      createdAt: new Date(),
    });
    await setUsername("");// Sets username to blank 
    
    
  };

  const updateBio = async () => {// Updates bio of a user
    if (!bio.trim()) {// Checks if bio is empty
      setMessage("Username cannot be empty.");
      return;
    }
    try {
      setMessage("");
      setIsLoading(true);
      const auth = getAuth();
      const currentUser = auth.currentUser;// Sets current user

      /*if (!isAuthenticated) {
        setMessage("No user is currently signed in.");
        return;
      }*/

      const usersCollection = collection(FIREBASE_FIRESTORE_CLIENT, "users");
      const userDocRef = doc(usersCollection, await getCurrentUserID());
      await setDoc(userDocRef, {// Updates firebase with new bio
        bio: bio,
      }, { merge: true });

      setMessage("Bio successfully updated!");
      setUser({ ...user, data: { ...user.data, bio: bio } });// Updates users data
    } catch (error) {
      console.error("Error updating bio:", error);
      setMessage("Failed to update bio");
    } finally {
      setIsLoading(false);
      
    }
   setBio("");
  };



  const toggleDropdown = (section) => {// Changes state of specific dropdown 
    setIsDropdownOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const LoadingSpinner = () => (// Html element for custom spinner when page is loading
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (isLoading) {// If page is loading then spinner will be displayed
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }
  

  return (
    <div className="min-h-screen flex justify-center items-center">
        <button 
        onClick={goBack} // The back button 
        className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 text-foreground rounded-md hover:bg-gray-400 transition">
        <FaArrowLeft className="w-5 h-5" /> {/* Arrow for back button*/}
        </button>
        {/*User profile details */}
      <div className="flex flex-row gap-20 p-20 bg-background shadow-md rounded-lg w-full min-h-[700px] max-w-7xl">
        <div className="flex flex-col items-center justify-center border-r pr-24">
          {/* Ternary operator to see if user has a profile picture otherswise sets default profile picture */}
          {user && user.data.photoURL ? (
            <Image src={user.data.photoURL} alt="Profile Picture" width={180} height={180} className="rounded-full" /> 
          ) : (
            <FaUserCircle className="text-gray-700 w-[180px] h-[180px]" />
          )}
          {/*Settings header with users email username and bio if a user inputted one */}
          <h1 className="text-3xl font-semibold mt-3 text-black">Settings</h1>
          {user && (
            <>
                <p className="mt-2 text-xl font-bold text-black">Email: {user.data.email}</p>
                <p className="text-xl font-bold text-black">Username: {user.data.displayName}</p>
              {user.data.bio && (
        
                <p className="font-semibold text-black mt-2 ">Bio: {user.data.bio}</p>
              
              )}
              
            </>
          )}
        </div>
          {/* Change username dropdwon */}
        <div className="flex flex-col items-start justify-center gap-10 w-full max-w-lg">
          <div className="w-full">
            {/*When user clicks the dropdwon button toggleDropdown changes username value to True */}
            <button onClick={() => toggleDropdown("username")} className="border px-3 py-2 text-black rounded-md w-full text-left flex justify-between items-center">
              Change Username
              <MdArrowDropDown className="inline ml-2" />
            </button>
            {/* Displays if dropdwon is open */}
            {isDropdownOpen.username && (
              <div className="mt-2 p-2 border rounded-md bg-white shadow-lg w-full">
                {/* Input where user enters new name, then setUsername will change username value*/}
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter new username" className="border px-3 py-2 text-black rounded-md w-full" />
                <button onClick={updateUsername} disabled={isLoading} className={`px-4 py-2 rounded-md w-full mt-2 ${isLoading ? "bg-gray-400" : "bg-blue-500 text-white hover:bg-blue-600"}`}>
                  {isLoading ? "Saving..." : "Change Username"}
                </button>
              </div>
            )}
          </div>

          {/*Add bio dropdown*/}
          <div className="w-full">
            <button onClick={() => toggleDropdown("bio")} className="border px-3 py-2 text-black rounded-md w-full text-left flex justify-between items-center">
              Add Bio
              <MdArrowDropDown className="inline ml-2" />
            </button>
            {isDropdownOpen.bio && (
              <div className="mt-2 p-2 border rounded-md bg-white shadow-lg w-full">
                {/*textarea allows for multiline input and updates bio once user clicks the Change bio button */}
                <textarea 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Enter your bio"
                  className="border px-3 py-2 text-black rounded-md w-full"
                />
                <button onClick={updateBio} disabled={isLoading} className={`px-4 py-2 rounded-md w-full mt-2 ${isLoading ? "bg-gray-400" : "bg-blue-500 text-white hover:bg-blue-600"}`}>
                  {isLoading ? "Saving..." : "Change Bio"}
                </button>
              </div>
            )}
          </div>
            {/* Password dropdown*/}
          <div className="w-full">
            <button onClick={() => toggleDropdown("password")} className="border px-3 py-2 text-black rounded-md w-full text-left flex justify-between items-center">
              Change Password
              <MdArrowDropDown className="inline ml-2" />
            </button>
            {/* Displays change password when user presses on dropdown */}
            {isDropdownOpen.password && (
              <div className="mt-2 p-2 border rounded-md bg-white shadow-lg w-full">
                <ChangePassword />
                {/* Change password componenet is used which returns the neccessary inputs */}
              </div>
            )}
          </div>
            {/* FAQs dropdwon */}
          <div className="w-full">
            <button onClick={() => toggleDropdown("faq")} className="border px-3 py-2 text-black rounded-md w-full text-left flex justify-between items-center">
              FAQs
              <MdArrowDropDown className="inline ml-2" />
              {/* When dropdown button is clicked FAQs are shown*/}
            </button>
            {isDropdownOpen.faq && (
              <div className="mt-2 p-2 border rounded-md bg-white shadow-lg w-full">
                <p className="text-xl">Q: What does RSS stand for?</p>
                <p className="mt-2">RSS stands for Really Simple Syndication</p>
                <p className="text-xl mt-5">Q: What is an RSS feed?</p>
                <p className="mt-2">RSS is a web feed format that allows users to recieve automatic updates from subscribed websites,blogs,news sites etc.</p>
                <p className="text-xl  mt-5">Q: How does RSS work?</p>
                <p className="mt-2">Users can subscribed to different RSS feeds in the interests page after which updates from that source will come in their feed</p>
              </div>
            )}
          </div>
            {/*Used to show toggle theme buttons */}
          <div className="w-full">
            <SegmentedButtonSet role="presentation" className="w-full" aria-label="Color mode">
              <div role="group" className="h-10 grid w-full grid-flow-col auto-rows-auto auto-cols-[1fr]">
                {/* Button for Dark theme */}
                <SegmentedButton
                  title="dark"
                  data-value="dark"
                  className="rounded-l-full text-black"
                  selected={selectedColorMode === "dark"}
                  icon={<Icon>dark_mode</Icon>}
                  onPress={() => handleChangeColorMode("dark")}
                />
                {/* Button for light theme */}
                <SegmentedButton
                  title="light"
                  data-value="light"
                  className="rounded-r-full text-black"
                  selected={selectedColorMode === "light"}
                  icon={<Icon>light_mode</Icon>}
                  onPress={() => handleChangeColorMode("light")}
                />
              </div>
            </SegmentedButtonSet>
          </div>
            {/* Sign out button */}
          <button onClick={handleSignOut} className="rounded-md bg-red-400 px-4 py-2 text-white transition-all duration-300 ease-in-out hover:bg-red-600 hover:text-white w-full">
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
