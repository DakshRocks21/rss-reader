"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeControl from "@/components/ThemeControl";
import { Button } from "actify";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isOnLoginPage =
    pathname.includes("/login") || pathname.includes("/signup");

  return (
    <motion.nav className={`bg-secondary-container p-4 text-white ${isMounted && !isOnLoginPage ? "" : "rounded-lg"} shadow-lg w-full sticky top-0 z-50`} // Chin Ray: Rounded corners only when on login page
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}>
      <div className="container mx-auto flex justify-between items-center">
        <Link
          className="text-2xl font-bold text-on-secondary-container"
          href="/"
        >
          RSSFeed
        </Link>
        <div className="flex items-center space-x-8">
          <div className="w-52">
            <ThemeControl initialTheme="system" />
          </div>
          {isMounted && !isOnLoginPage && (
            <Button
              variant="filled"
              color="primary"
              className="w-44 px-2 py-2 rounded transition hover:bg-on-primary-container font-semibold"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Get Started
            </Button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
