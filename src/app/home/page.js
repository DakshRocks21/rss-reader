// Written by Daksh

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

  // Feed loading states
  const [isLoadingFeeds, setIsLoadingFeeds] = useState(false);
  const [feedLoadingMessage, setFeedLoadingMessage] = useState("");

  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Check screen size for dynamic UI updates
    // This is used to determine if the sidebar should be shown or not
    // This is also used for the header component to show/hide the plus buttom
    const checkScreenSize = () => setIsMobile(window.innerWidth < 1200);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    console.log(keywordSearched);
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
    // Once the user is authenticated, fetch feeds from the database
    // then for each feed, fetch the RSS feed data
    setIsLoadingFeeds(true);
    setFeedLoadingMessage("Starting feed fetch...");

    try {
      const data = await getFeedsFromDatabase();
      const fetchedFeeds = [];

      // Fetch each feed in sequence, ignoring IP-based rate-limit errors
      for (const feed of data) {
        const feedName = feed.title || feed.name || feed.url;
        setFeedLoadingMessage(`Loading feed: ${feedName}`);

        try {
          const response = await fetch(
            `/api/fetch-rss?feedUrl=${encodeURIComponent(feed.url)}`
          );

          if (!response.ok) {
            if (response.status === 429 || response.status === 500) {
              console.warn(`Skipping feed due to rate limit or server error: ${feedName}`);
              continue; 
            } else {
              // dont crash the app if the feed fails to load, just continue without that feed
              console.log(`Failed to fetch ${feedName} (status ${response.status})`);
              continue;
            }
          }

          // If it's okay, parse and store the feed data
          feed.data = await response.json();
          fetchedFeeds.push(feed);

        } catch (innerError) {
          if (
            innerError.message.includes("rate limit") ||
            innerError.message.includes("429")
          ) {
            console.warn(`Skipping feed: ${feedName} due to IP-based rate limit`);
          } else {
            //lets not throw the error, just log it... 
            //throw innerError;
            console.log(innerError);
          }
        }
      }

      const categories = fetchedFeeds
        .flatMap((feed) => feed.categories || [])
        .filter((value, index, self) => self.indexOf(value) === index);

      setFeeds(fetchedFeeds);
      setCategoryList(categories);
      console.log("Fetched feeds", fetchedFeeds);
      console.log("Categories", categories);
    } catch (err) {
      // Only set error here for non-rate-limit-related problems
      setError(err.message);
    } finally {
      setFeedLoadingMessage("");
      setIsLoadingFeeds(false);
    }
  };

  const handleCategoryChange = (selected) => {
    setSelectedCategories(selected);
    setFilterCategory(selected);
  };

  if (error) return <p className="p-4 text-red-500">{error}<br/>Reload the page or try again later.</p>;
  if (!isAuthenticated) return null;

  return (
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
          <div className="h-64 flex flex-col items-center justify-center space-y-3">
            <CircularProgress isIndeterminate={true} />
            {feedLoadingMessage && (
              <p className="text-on-surface-variant">{feedLoadingMessage}</p>
            )}
          </div>
        ) : feeds.length === 0 ? (
          // If no feeds at all
          <div className="flex flex-col items-center justify-center h-80 text-center bg-surface-container-low rounded-lg shadow-md p-6">
            <FaRegSadTear className="text-6xl text-on-surface-variant mb-4" />
            <h2 className="text-2xl font-semibold text-on-surface">
              No Feeds Found
            </h2>
            <p className="text-md text-on-surface-variant mt-2">
              It looks like you haven't added any interests yet. Start exploring
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
          // Filter feeds based on selected categories
          <Feeds
            feeds={
              filterCategory.length > 0
                ? feeds.filter((feed) =>
                    feed.categories?.some((category) =>
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
