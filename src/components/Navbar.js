// Daksh wrote this
"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const isOnLoginPage = pathname.includes("/login") || pathname.includes("/signup");

  return (
    <nav className="bg-secondary-container p-4 text-white shadow-lg w-full sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-2xl font-bold text-on-secondary-container" href="/">RSSFeed</Link>
        {!isOnLoginPage && (
        <ul className="flex space-x-4">
          <li>
            <Link href="/login">
              <p className="bg-secondary-container px-4 py-2 rounded transition">
                Get Started
              </p>
            </Link>
          </li>
        </ul>
        )}
      </div>
    </nav>
  );
}
