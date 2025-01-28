// Chin Ray wrote this

"use client";

import { useState, useEffect } from "react";
import { getUserInfoFromFirebaseAuth } from "@/lib/session";
import { getFeedsFromDatabase } from "@/lib/firebase/feed_database";
import AddFeed from "@/app/interests/AddFeed";
import Header from "@/components/Header";

import { RenderSubscribedInterests, RenderInterestSelection } from "./RenderInterests";
import { Categories } from "./Filters";

export default function Interests() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [feeds, setFeeds] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryFilterList, setCategoryFilterList] = useState([]);
  const [error, setError] = useState(null);

  const [presetFeeds, setPresetFeeds] = useState([
    {
      name: "Tom's Hardware",
      url: "https://www.tomshardware.com/rss.xml",
      categories: ["Technology", "Hardware"],
      image: "images/TomsHardware.png",
      description: "A technology news outlet specialising in hardware.",
      checked: false
    },
    {
      name: "HardwareZone",
      url: "https://feeds.feedburner.com/hardwarezone/all",
      categories: ["Technology", "Hardware", "Singapore"],
      image: "images/HardwareZone.png",
      description: "An Singaporean technology forum and news outlet specialising in hardware.",
      checked: false
    }
  ])

  // Authentication protection
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
    };

    fetchData();

    // Get list of subscribed feeds and categories
    const fetchFeeds = async () => {
      try {
        const data = await getFeedsFromDatabase();
        const categories = data
          .flatMap((feed) => feed.categories || [])
          .filter((value, index, self) => self.indexOf(value) === index);
        setFeeds(data);
        setCategoryList(categories);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchFeeds();
  }, []);

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (!isAuthenticated && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner />
      </div>
    )
  }

  // Check respective preset feed checkboxes if user is already subscribed to them, remove duplicates
  const populateFeeds = () => {
    for (let i = 0; i < feeds.length; i++) {
      for (let presetFeed of presetFeeds) {
        if (feeds[i].url === presetFeed.url) {
          presetFeed.checked = true;
          feeds.splice(i, 1);
        }
      }
    }

    console.log(presetFeeds)

    feeds.forEach(feed => feed.checked = true); // Check all remaining feeds (since they are subscribed if they are already in the database)
  }

  const handleCategoryFilterChange = (category) => {
    if (categoryFilterList.includes(category)) {
      setCategoryFilterList(categoryFilterList.filter(item => item !== category));
    } else {
      setCategoryFilterList([...categoryFilterList, category]);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b bg-background min-h-screen">
      <Header
        user={user}
        onSignOut={async () => {
          await logoutSession();
          window.location.href = "/login";
        }}
        isOnHomePage={false}
      />
      {populateFeeds()}
      <AddFeed onAddFeed={() => window.location.reload()} />
      <Categories categoryList={categoryList} onCategoryChange={(category) => handleCategoryFilterChange(category)} />
      <RenderSubscribedInterests feeds={feeds} filter={categoryFilterList} />
      <RenderInterestSelection presetFeeds={presetFeeds} filter={categoryFilterList} />
    </div>
  )
}