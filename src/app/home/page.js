"use client";

import { useState, useEffect } from "react";
import { getUserInfoFromFirebaseAuth } from "@/lib/session";
import { getFeedsFromDatabase } from "@/lib/firebase/feed_database";
import Sidebar from "@/components/Sidebar";
import Feeds from "@/components/Feeds/Feeds";
import Header from "@/components/Header";

export default function HomePage() {
  const [feeds, setFeeds] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [keywordSearched, setKeywordSearched] = useState("");
  const [filterCategory, setFilterCategory] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingFeeds, setIsLoadingFeeds] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("tiles"); // tiles, list, carousel

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserInfoFromFirebaseAuth();
        if (!userData) {
          setIsAuthenticated(false);
          setIsLoadingUser(false);
          window.location.href = "/login";
          return;
        }
        setUser(userData.decodedToken);
        setIsAuthenticated(true);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchFeeds();
    }
  }, [isAuthenticated]);

  const fetchFeeds = async () => {
    setIsLoadingFeeds(true);
    try {
      const data = await getFeedsFromDatabase();
      for (const feed of data) {
        const response = await fetch(
          `/api/fetch-rss?feedUrl=${encodeURIComponent(feed.url)}`
        );
        if (!response.ok) throw new Error("Failed to fetch RSS feed");
        feed.data = await response.json();
      }

      const categories = data
        .flatMap((feed) => feed.categories || [])
        .filter((value, index, self) => self.indexOf(value) === index);

      setCategoryList(categories);
      setFeeds(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingFeeds(false);
    }
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (error) return <p>{error}</p>;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar
        categoryList={categoryList}
        setFilterCategory={setFilterCategory}
        setViewMode={setViewMode}
        viewMode={viewMode}
      />
      <div className="flex-1 p-6">
        <Header
          user={user}
          keywordSearched={keywordSearched}
          setKeywordSearched={setKeywordSearched}
        />
        {isLoadingFeeds ? (
          <div className="h-64 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <Feeds
            feeds={feeds}
            keyword={keywordSearched}
            category={filterCategory}
            categories={categoryList}
            viewMode={viewMode}
          />
        )}
      </div>
    </div>
  );
}
