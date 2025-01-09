// Daksh wrote this but seriously, change it to something more meaningful.
"use client"

import React from "react";

export default function Header({ user, onSignOut }) {
  return (
    <header className="flex items-center justify-between mb-8">
      <h2>Welcome Back, {user.name}</h2>
      <h1 className="text-3xl font-bold text-gray-800">RSS News Reader</h1>
      <button
        onClick={() => onSignOut()}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
      >
        Sign Out
      </button>
    </header>
  );
}
