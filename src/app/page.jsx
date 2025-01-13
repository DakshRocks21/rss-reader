// Daksh wrote this
"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 text-center mb-4">
          Welcome to RSSFeed
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 text-center mb-8">
          Stay updated with the latest content from your favourite sources.
        </p>
        <Link
          href="/login"
          className="bg-blue-500 text-white px-6 py-3 rounded text-lg font-semibold hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </div>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2025 RSSFeed. All rights reserved.</p>
      </footer>
    </div>
  );
}
