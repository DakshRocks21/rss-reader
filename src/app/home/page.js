"use client";

import { useState, useEffect } from "react";
import { getUserInfoFromFirebaseAuth } from "@/lib/session";
import { getFeedsFromDatabase } from "@/lib/firebase/feed_database";
import Sidebar from "@/components/Sidebar";
import Feeds from "@/components/Feeds/Feeds";
import Header from "@/components/Header";
import { Checkbox, CheckboxGroup, CircularProgress } from "actify";
import { FaFilter } from "react-icons/fa";
import BottomNav from "@/components/mobile/BottomNav";
import BottomSheet from "@/components/mobile/BottomSheet";
import { useApplyStoredTheme } from "@/components/DarkConfig";
import { FaSearch, FaRegSadTear } from "react-icons/fa";
import { Button } from "actify";

export default function HomePage() {
  useApplyStoredTheme();

  const [feeds, setFeeds] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [keywordSearched, setKeywordSearched] = useState("");
  const [filterCategory, setFilterCategory] = useState([]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingFeeds, setIsLoadingFeeds] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Check screen size for dynamic UI updates
    const checkScreenSize = () => setIsMobile(window.innerWidth < 1200);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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
      console.log("Fetched feeds", data);
      console.log("Categories", categories);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingFeeds(false);
    }
  };

  const handleCategoryChange = (selected) => {
    setSelectedCategories(selected);
    setFilterCategory(selected);
  };

  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!isAuthenticated) return null;

  return (
    // Use an inline style to directly show the effect of var(--md-sys-color-background)
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: `rgb(var(--md-sys-color-background))` }}
    >
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sidebar
          user={user}
          categoryList={categoryList}
          setFilterCategory={setFilterCategory}
        />
      )}

      <div className="flex-1 p-6">
        <Header
          user={user}
          keywordSearched={keywordSearched}
          setKeywordSearched={setKeywordSearched}
          isMobile={isMobile}
        />

        {isLoadingFeeds ? (
          <div className="h-64 flex items-center justify-center">
            <CircularProgress isIndeterminate={true} />
          </div>
        ) : // Filter feeds based on selected categories
        feeds.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-80 text-center bg-surface-container-low rounded-lg shadow-md p-6">
            <FaRegSadTear className="text-6xl text-on-surface-variant mb-4" />
            <h2 className="text-2xl font-semibold text-on-surface">
              No Feeds Found
            </h2>
            <p className="text-md text-on-surface-variant mt-2">
              It looks like you haven’t added any interests yet. Start exploring
              topics that matter to you!
            </p>
            <Button
              className="mt-5"
              color="primary"
              variant="filled"
              icon={<FaSearch />}
              onClick={() => (window.location.href = "/interests")}
            >
              Explore Interests
            </Button>
          </div>
        ) : (
          <Feeds
            feeds={
              filterCategory.length > 0
                ? feeds.filter((feed) =>
                    feed.categories.some((category) =>
                      filterCategory.includes(category)
                    )
                  )
                : feeds
            }
            keywordSearched={keywordSearched}
            filteredCategory={filterCategory}
          />
        )}
      </div>

      {/* Mobile: Floating Filter Button */}
      {isMobile && (
        <button
          onClick={() => setIsFilterOpen(true)}
          className="fixed bottom-20 right-6 bg-primary p-3 rounded-full shadow-md z-50"
          aria-label="Open Filter"
        >
          <FaFilter className="text-white text-xl" />
        </button>
      )}

      {/* Mobile: Custom Bottom Sheet */}
      <BottomSheet isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
        {isLoadingFeeds ? (
          <div className="text-on-surface-variant text-sm">
            Loading categories...
          </div>
        ) : (
          <CheckboxGroup
            label="Categories"
            value={selectedCategories}
            onChange={handleCategoryChange}
            className="space-y-3 text-on-primary-container text-xl"
          >
            {categoryList.map((category) => (
              <div key={category} className="flex items-center space-x-3">
                <Checkbox value={category} />
                <span className="text-on-primary-container">{category}</span>
              </div>
            ))}
          </CheckboxGroup>
        )}
      </BottomSheet>

      {isMobile && <BottomNav />}
    </div>
  );
}
