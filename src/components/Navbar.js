// Daksh wrote this
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">RSSFeed</h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/login">
              <p className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 transition">
                Get Started
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
