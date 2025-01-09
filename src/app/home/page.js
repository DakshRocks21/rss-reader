"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import FeedFilters from "@/components/Feeds/FeedFilters";
import FeedList from "@/components/Feeds/FeedList";
import AddFeed from "@/components/Feeds/AddFeed";
import { logoutSession, getUserInfoFromFirebaseAuth } from "@/lib/session";
import {
  addFeedToDatabase,
  getFeedsFromDatabase,
} from "@/lib/firebase/feed_database";

// Daksh wrote this
export default function HomePage() {
  const [feeds, setFeeds] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [error, setError] = useState("");
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
      await fetchFeeds();
    };

    fetchData();
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
      setFeeds(data || []);
    } catch (err) {
      console.error("Error fetching feeds:", err);
    }
  };

  const addFeed = async (feedUrl, feedCategory) => {
    setError("");
    try {
      const response = await fetch(
        `/api/fetch-rss?feedUrl=${encodeURIComponent(feedUrl)}`
      );
      if (!response.ok) throw new Error("Failed to fetch RSS feed");
      await addFeedToDatabase(feedUrl, feedCategory);
      const data = await response.json();
      setFeeds((prev) => [
        ...prev,
        { url: feedUrl, category: feedCategory, data },
      ]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFilterChange = (e) => setFilter(e.target.value.toLowerCase());
  const handleCategoryFilterChange = (e) => setFilterCategory(e.target.value);
  const handleTimeFilterChange = (e) => setTimeFilter(e.target.value);

  const filterByTime = (pubDate) => {
    if (timeFilter === "all") return true;
    const now = new Date();
    const pubDateObj = new Date(pubDate);
    const timeDurations = {
      last24h: 24 * 60 * 60 * 1000,
      last7d: 7 * 24 * 60 * 60 * 1000,
      last30d: 30 * 24 * 60 * 60 * 1000,
    };
    return now - pubDateObj < timeDurations[timeFilter];
  };

  if (!isAuthenticated && isLoading) return <p>LOADING...</p>;
  if (!isAuthenticated) return <p>STOP HACKING ME!!</p>;

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <Header
        user={user}
        onSignOut={async () => {
          await logoutSession();
          window.location.href = "/login";
        }}
      />
      {/* <AddFeed onAddFeed={addFeed} error={error} /> */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Add a New Feed</h2>
        <h3>This page has moved.</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mt-4 flex items-center">
              <a href="/interests">
                <button
                  className={`px-4 py-2 rounded-md font-semibold text-white bg-blue-500 hover:bg-blue-600 cursor-pointer transition-all`}>
                  Configure Interests →
                </button>
              </a>
            </div>
          </div>
      </div>
      <FeedFilters
        filter={filter}
        filterCategory={filterCategory}
        timeFilter={timeFilter}
        onFilterChange={handleFilterChange}
        onCategoryFilterChange={handleCategoryFilterChange}
        onTimeFilterChange={handleTimeFilterChange}
        categories={Array.from(new Set(feeds.map((feed) => feed.category)))}
      />
      <FeedList
        feeds={feeds}
        filter={filter}
        filterCategory={filterCategory}
        timeFilter={timeFilter}
        filterByTime={filterByTime}
      />
    </div>
  );
}
