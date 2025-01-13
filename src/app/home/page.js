// Daksh made this file.
"use client";

import { useState, useEffect } from "react";
import { logoutSession, getUserInfoFromFirebaseAuth } from "@/lib/session";
import { getFeedsFromDatabase } from "@/lib/firebase/feed_database";

import Select from "react-select";
import { FaSearch, FaUserCircle, FaThLarge, FaList, FaPlayCircle } from "react-icons/fa";

import Image from "next/image";

export default function HomePage() {
  const [feeds, setFeeds] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [keywordSearched, setKeywordSearched] = useState("");
  const [filterCategory, setFilterCategory] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

      const categories = data
        .flatMap((feed) => feed.categories || [])
        .filter((value, index, self) => self.indexOf(value) === index);
      
      console.log("Categories:", categories);

      console.log("Feeds:", data);

      setCategoryList(categories);
      setFeeds(data || []);
    } catch (err) {
      console.error("Error fetching feeds:", err);
    }
  };

  const handleKeywordChange = (e) => setKeywordSearched(e.target.value);
  const handleCategoryFilterChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setFilterCategory(values);
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleSignOut = async () => {
    await logoutSession();
    window.location.href = "/login";
  };

  if (!isAuthenticated && isLoading) return <p>LOADING...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="bg-white shadow-md w-64 p-4">
        <h2 className="text-lg font-medium mb-4">Filter by Category</h2>
        <Select
          options={categoryList.map((cat) => ({
            value: cat,
            label: cat,
          }))}
          isMulti
          onChange={handleCategoryFilterChange}
          placeholder="Select categories..."
        />
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-2">View Mode</h2>
          <div className="space-y-2">
            <div
              className={`p-4 border rounded-lg cursor-pointer ${
                viewMode === "tiles" ? "bg-blue-100 border-blue-500" : ""
              }`}
              onClick={() => setViewMode("tiles")}
            >
              <FaThLarge className="inline mr-2" />
              Tiles
            </div>
            <div
              className={`p-4 border rounded-lg cursor-pointer ${
                viewMode === "list" ? "bg-blue-100 border-blue-500" : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              <FaList className="inline mr-2" />
              List
            </div>
            <div
              className={`p-4 border rounded-lg cursor-pointer ${
                viewMode === "carousel" ? "bg-blue-100 border-blue-500" : ""
              }`}
              onClick={() => setViewMode("carousel")}
            >
              <FaPlayCircle className="inline mr-2" />
              Carousel
            </div>
          </div>
        </div>
      </div>


      <div className="flex-1 p-6">
        <div className="bg-white shadow-md p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">
            <a href="/">RSS Feeds</a>
          </h1>

          <div className="relative flex items-center w-full max-w-md text-black">
            <FaSearch className="absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search articles..."
              onChange={handleKeywordChange}
              className="pl-10 p-2 w-full border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <div className="cursor-pointer" onClick={toggleDropdown}>
              {user && user.picture ? (
                <Image
                  src={user.picture}
                  alt="Profile Picture"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <FaUserCircle className="text-2xl text-gray-700" />
              )}
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

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

const Feeds = ({ feeds, keyword, category, viewMode }) => {
  const allItems = feeds
    .flatMap((feed) => {
      const publisher = feed.data.title || "Unknown Publisher";
      return feed.data.items.map((item) => ({
        publisher,
        title: item.title,
        description: item.description || "No description available.",
        pubDate: item.pubDate,
        link: item.link,
        categories: feed.categories || [],
      }));
    })
    .filter((item) => {
      if (keyword && !item.title.toLowerCase().includes(keyword.toLowerCase())) {
        return false;
      }
      if (
        category.length &&
        !category.some((cat) => item.categories.includes(cat))
      ) {
        return false;
      }
      return true;
    });

  allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  const groupedFeeds = category.length
    ? category.reduce((acc, cat) => {
        acc[cat] = allItems.filter((item) => item.categories.includes(cat));
        return acc;
      }, {})
    : { "Your Feeds": allItems };

  return (
    <div>
      {Object.keys(groupedFeeds).map((category, index) => (
        <CategorySection
          key={index}
          category={category}
          feeds={groupedFeeds[category]}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

const CategorySection = ({ category, feeds, viewMode }) => {
  if (!feeds.length) return null;

  return (
    <div className="mb-8 mt-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {category === "Your Feeds" ? category : `Latest in ${category}`}
      </h2>
      {viewMode === "tiles" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {feeds.map((feed, index) => (
            <FeedRow key={index} feed={feed} />
          ))}
        </div>
      )}
      {viewMode === "list" && (
        <div className="space-y-4">
          {feeds.map((feed, index) => (
            <FeedRow key={index} feed={feed} />
          ))}
        </div>
      )}
      {viewMode === "carousel" && (
        <div className="flex overflow-x-scroll space-x-4">
          {feeds.map((feed, index) => (
            <FeedRow key={index} feed={feed} />
          ))}
        </div>
      )}
    </div>
  );
};

const FeedRow = ({ feed }) => {
  const { publisher, title, description, pubDate, link } = feed;

  const timeAgo = calculateTimeAgo(pubDate);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-xs">
      <div className="text-gray-600 mb-2">
        <span className="font-semibold text-red-700">{publisher}</span>
        <span className="mx-2">•</span>
        <span>{timeAgo}</span>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-lg font-medium text-black hover:underline"
      >
        {title}
      </a>
      <p className="mt-2 text-gray-700 text-sm">{description}</p>
    </div>
  );
};


// i love math :D
const calculateTimeAgo = (pubDate) => {
  const now = new Date();
  const published = new Date(pubDate);
  const diffMs = now - published;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) {
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return `${diffMinutes} minutes ago`;
  }
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffHours < 48) return "Yesterday";
  if (diffHours < 720) return `${Math.floor(diffHours / 24)} days ago`;
  return published.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
