// Daksh wrote this

import { useState } from "react";
import { FaSearch, FaUserCircle, FaSignOutAlt, FaCog } from "react-icons/fa";
import Image from "next/image";
import { logoutSession } from "@/lib/session";

export default function Header({
  user,
  keywordSearched,
  setKeywordSearched,
  isOnHomePage = true,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleSignOut = async () => {
    await logoutSession();
    window.location.href = "/login";
  };

  const goToSettings = () => {
    window.location.href = "/settings";
  };

  if (isOnHomePage) {
    return (
      <div
        className={`relative flex items-center w-full`}
      >
        <FaSearch className="absolute left-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search articles..."
          value={keywordSearched}
          onChange={(e) => setKeywordSearched(e.target.value)}
          className="pl-10 p-2 w-full border rounded-md bg-primary-container shadow-sm focus:outline-none focus:ring-2 focus:ring-tertiary-container focus:border-tertiary-container"
        />
      </div>
    );
  }

  return (
    // Chin Ray: Made header rounded, anchor to top of page, implement search bar show/hide
    <div className="bg-white shadow-lg p-4 flex items-center justify-between rounded-lg sticky top-0">
      <h1 className="text-xl font-bold text-gray-800">
        <a href="/">RSS Feeds</a>
      </h1>
      
      <div className="relative">
        <div className="cursor-pointer" onClick={toggleDropdown}>
          {user && user.picture ? (
            <Image
              src={user.picture}
              alt="Profile Picture"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <FaUserCircle className="text-2xl text-gray-700" />
          )}
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
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
  );
}
