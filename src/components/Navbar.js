"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeControl from "@/components/ThemeControl";
import { Button } from "actify";

export default function Navbar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isOnLoginPage = pathname.includes("/login") || pathname.includes("/signup");

  return (
    <nav className="bg-secondary-container p-4 text-white shadow-lg w-full sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-2xl font-bold text-on-secondary-container" href="/">
          RSSFeed
        </Link>
        <div className="flex items-center space-x-8">
          <ThemeControl initialTheme="system" />
          {isMounted && !isOnLoginPage && (
            <Button 
              variant="filled"
              color="primary"
              className="w-52 px-2 py-2 rounded transition hover:bg-on-primary-container"
              onClick={() => {
                window.location.href = "/login";
              }}
              >
              Get Started
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
