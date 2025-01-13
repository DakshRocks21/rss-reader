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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("tiles"); // tiles, list, carousel

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
      await fetchFeeds();
    };

    fetchData();
    fetchFeeds();
  }, []);

  const fetchFeeds = async () => {
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
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (error) return <p>{error}</p>;
  if (isLoading) return <p>LOADING...</p>;
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
        <Feeds
          feeds={feeds}
          keyword={keywordSearched}
          category={filterCategory}
          categories={categoryList}
          viewMode={viewMode}
        />
      </div>
    </div>
  );
}
