// Chin Ray wrote this
"use client"

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import AddFeed from "@/components/Feeds/AddFeed";
import { logoutSession, getUserInfoFromFirebaseAuth } from "@/lib/session";
import styles from "./page.module.css";

export default function Interests() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserInfoFromFirebaseAuth();
      if (!userData) {
        setIsAuthenticated(false);
        setIsLoading(false);
        window.location.href = "/login";
        return;
      }
      setUser(userData.decodedToken);
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (!isAuthenticated && isLoading) return <p>LOADING...</p>;

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <Header
        user={user}
        onSignOut={async () => {
          await logoutSession();
          window.location.href = "/login";
        }}
      />
      <AddFeed />
      <RenderInterestSelection />
    </div>
  )
}

function RenderInterestSelection() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Interests</h2>
      <div className={styles.container}>
        <div>

        </div>
        <div>
          <h3>Tom's Hardware</h3>
        </div>
        <div>
          <input type="checkbox" id="tomshardwarecheckbox"></input>
        </div>
      </div>
    </div>
  )
}