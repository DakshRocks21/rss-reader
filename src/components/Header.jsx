// Daksh laid the groundwork, search and motion
// Chin Ray added the back button and did some styling

"use client";

import { useState, useEffect } from "react";
import {
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaPlus,
} from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import Image from "next/image";
import ThemeControl from "@/components/ThemeControl";
import { logoutSession } from "@/lib/session";
import { motion } from "framer-motion";

export default function Header({
  user,
  keywordSearched,
  setKeywordSearched,
  isOnHomePage = true,
  isMobile = false,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((isOpen) => !isOpen);

  const handleSignOut = async () => {
    await logoutSession();
    window.location.href = "/login";
  };

  const goToSettings = () => {
    window.location.href = "/settings";
  };

  if (isOnHomePage) {
    return (
      <div className="z-50 flex flex-row items-center justify-between p-4 rounded-lg sticky top-0 space-x-4">
        <div className={`relative flex items-center w-full`}>
          <FaSearch className="absolute left-3 text-on-surface-variant" />
          <input
            type="text"
            placeholder="Search articles..."
            value={keywordSearched}
            onChange={(e) => setKeywordSearched(e.target.value)}
            className="pl-10 p-2 w-full text-on-surface-variant border rounded-md bg-primary-container shadow-sm focus:outline-none focus:ring-2 focus:ring-tertiary-container focus:border-tertiary-container"
          />
        </div>
        {!isMobile && (
          <button
            className="p-2 bg-primary-container rounded-full cursor-pointer"
            onClick={() => (window.location.href = "/interests")}
          >
            <FaPlus className="text-xl text-on-primary-container" />
          </button>
        )}
      </div>
    );
  }

  return (
    <motion.nav className="bg-secondary-container p-4 text-white flex items-center justify-between rounded-lg w-full sticky top-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      <a href="/">
        <div className="flex flex-row items-center space-x-2 ml-1.5">
          <IoMdArrowRoundBack className="w-5 h-5 text-on-secondary-container" />
          <h1 className="text-xl font-bold text-on-secondary-container">Back to Feeds</h1>
        </div>
      </a>

      <div className="flex flex-row items-center space-x-6 mr-1.5">
        <div className="w-52">
          <ThemeControl initialTheme="system"/>
        </div>
        <div className="relative">
          <div className="cursor-pointer">
            {user && user.picture ? (
              <Image
                src={user.picture}
                alt="Profile Picture"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <FaUserCircle className="text-2xl text-on-secondary-container" onClick={toggleDropdown} />
            )}
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 w-40 bg-white border rounded-md shadow-lg z-10">
              <button
                onClick={goToSettings}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <FaCog className="mr-2 text-gray-600" />
                Settings
              </button>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 flex items-center"
              >
                <FaSignOutAlt className="mr-2 text-red-600" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}