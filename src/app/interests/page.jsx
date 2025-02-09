// Chin Ray wrote this

"use client";

import { useState, useEffect } from "react";
import { getUserInfoFromFirebaseAuth } from "@/lib/session";
import { getFeedsFromDatabase } from "@/lib/firebase/feed_database";
import AddFeed from "@/app/interests/AddFeed";
import Header from "@/components/Header";
import BottomNav from "@/components/mobile/BottomNav";

import { RenderSubscribedInterests, RenderInterestSelection } from "./RenderInterests";
import { Categories } from "./Filters";
import { CircularProgress } from "actify";

export default function Interests() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [feeds, setFeeds] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryFilterList, setCategoryFilterList] = useState([]);
  const [error, setError] = useState(null);

  const [isMobile, setIsMobile] = useState(false);

  const [presetFeeds, setPresetFeeds] = useState([
    {
      name: "Tom's Hardware",
      url: "https://www.tomshardware.com/rss.xml",
      categories: ["Technology", "Hardware"],
      image: "images/TomsHardware.png",
      description: "A technology news outlet specialising in hardware."
    },
    {
      name: "HardwareZone",
      url: "https://feeds.feedburner.com/hardwarezone/all",
      categories: ["Technology", "Hardware", "Singapore"],
      image: "images/HardwareZone.png",
      description: "An Singaporean technology forum and news outlet specialising in hardware."
    },
    {
      name: "RedSports",
      url: "https://www.redsports.sg/feed",
      categories: ["Sports", "Singapore"],
      image: "images/RedSports.png",
      description: "A Singaporean sports news outlet."
    },
    {
      name: "CNA (Latest News)",
      url: "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml",
      categories: ["Singapore", "News"],
      image: "images/ChannelNewsAsia.png",
      description: "A Singaporean mainstream news outlet."
    },
    {
      name: "Fox News",
      url: "https://moxie.foxnews.com/google-publisher/latest.xml",
      categories: ["United States", "News", "Politics"],
      image: "images/FoxNews.png",
      description: "A conservative news outlet in the United States."
    },
    {
      name: "NDTV (India)",
      url: "https://feeds.feedburner.com/ndtvnews-india-news",
      categories: ["India", "News", "Politics"],
      image: "images/NDTV.png",
      description: "A pro-BJP news outlet in India."
    },
    {
      name: "Zee News (Nation)",
      url: "https://zeenews.india.com/rss/india-national-news.xml",
      categories: ["India", "News", "Politics"],
      image: "images/ZeeNews.png",
      description: "A pro-BJP news outlet in India."
    }
  ])

  // Authentication protection
  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserInfoFromFirebaseAuth();
      if (!userData) {
        setIsAuthenticated(false);
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

        const presetCategories = presetFeeds
          .flatMap((feed) => feed.categories || [])
          .filter((value, index, self) => self.indexOf(value) === index);

        setFeeds(data);
        setCategoryList(Array.from(new Set([...categories, ...presetCategories])));
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchFeeds();
  }, []);

  useEffect(() => {
    // Check screen size for dynamic UI updates
    const checkScreenSize = () => setIsMobile(window.innerWidth < 1200);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Check respective preset feed checkboxes if user is already subscribed to them, remove duplicates
  useEffect(() => {
    if (!isLoading && presetFeeds.length > 0 && presetFeeds[0].checked === undefined) {
      const populateFeeds = () => {
        let newPresetFeeds = presetFeeds.map(presetFeed => {
          const feed = feeds.find(feed => feed.url === presetFeed.url);
          if (feed) {
            return { ...presetFeed, checked: true };
          }
          return { ...presetFeed, checked: false };
        });

        let newFeeds = feeds.filter(feed => {
          const presetFeed = presetFeeds.find(presetFeed => presetFeed.url === feed.url);
          return !presetFeed
        }).map(feed => ({ ...feed, checked: true }));

        return [newFeeds, newPresetFeeds];
      };

      const [newFeeds, newPresetFeeds] = populateFeeds();
      setFeeds(newFeeds);
      setPresetFeeds(newPresetFeeds);
    };

  }, [isLoading, presetFeeds])

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center w-screen h-screen bg-background">
      <CircularProgress isIndeterminate={true} />
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <LoadingSpinner />
      </div>
    )
  }

  const handleCategoryFilterChange = (category) => {
    if (categoryFilterList.includes(category)) {
      setCategoryFilterList(categoryFilterList.filter(item => item !== category));
    } else {
      setCategoryFilterList([...categoryFilterList, category]);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <Header
        user={user}
        onSignOut={async () => {
          await logoutSession();
          window.location.href = "/login";
        }}
        isOnHomePage={false}
        isMobile={isMobile}
      />
      <AddFeed categoryList={categoryList} onAddFeed={() => window.location.reload()} />
      <Categories categoryList={categoryList} onCategoryChange={(category) => handleCategoryFilterChange(category)} isMobile={isMobile} />
      <RenderSubscribedInterests feeds={feeds} filter={categoryFilterList} isMobile={isMobile}/>
      <RenderInterestSelection presetFeeds={presetFeeds} filter={categoryFilterList} isMobile={isMobile}/>
      {isMobile && <BottomNav />}
    </div>
  )
}