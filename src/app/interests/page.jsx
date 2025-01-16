// Chin Ray wrote this

"use client";

import { useState, useEffect } from "react";
import { getUserInfoFromFirebaseAuth } from "@/lib/session";
import { getFeedsFromDatabase } from "@/lib/firebase/feed_database";
import AddFeed from "@/app/interests/AddFeed";
import Header from "@/components/Header";
import styles from "./page.module.css";

import { CiGlobe } from "react-icons/ci";

export default function Interests() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [feeds, setFeeds] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [error, setError] = useState(null);

  const presetFeeds = [
    {
      name: "Tom's Hardware",
      url: "https://www.tomshardware.com/rss.xml",
      categories: ["Technology", "Hardware"],
      image: "images/TomsHardware.png"
    },
    {
      name: "HardwareZone",
      url: "https://www.hardwarezone.com.sg/feeds",
      categories: ["Technology", "Hardware"],
      image: "images/HardwareZone.png"
    }
  ]

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

    const fetchFeeds = async () => {
      try {
        const data = await getFeedsFromDatabase();
        // const categories = data
        //   .flatMap((feed) => feed.categories || [])
        //   .filter((value, index, self) => self.indexOf(value) === index);
        setFeeds(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchFeeds();
  }, []);

  if (!isAuthenticated && isLoading) return <p>LOADING...</p>;

feeds.forEach((feed) => console.log(feed.url));
  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <Header
        user={user}
        onSignOut={async () => {
          await logoutSession();
          window.location.href = "/login";
        }}
        showSearchBar={false}
      />
      <AddFeed />
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Subscribed Interests</h2>
      <div className="flex flex-row flex-wrap">
        {feeds.map((feed) => (
          <div className={`bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200 w-fit max-w-2xl mr-6 flex items-center`}>
            <div className={styles.container}>
              {/* <img src="images/TomsHardware.png" alt="Tom's Hardware" className={styles.image} /> */}
              <CiGlobe className={styles["image-small"]}/>
              <div className={styles.centrediv}>
                <h3 className={styles.interestname}>{feed.url.toString().replace("https://", "").split("/")[0].split(".").slice(-2).join(".")}</h3>
                <p>{feed.url}</p>
              </div>
              <div className={styles.centrediv}>
                <input type="checkbox" checked className={styles.checkbox}></input>
              </div>
            </div>
          </div>
        ))}
      </div>
      <RenderInterestSelection />
    </div>
  )
}

function RenderInterestSelection() {
  return (
    <>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Interests</h2>
      <div className="flex flex-row flex-wrap">
        <div className={`bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200 w-fit max-w-2xl mr-6 flex items-center`}>
          <div className={styles.container}>
            <img src="images/TomsHardware.png" alt="Tom's Hardware" className={styles.image} />
            <div className={styles.centrediv}>
              <h3 className={styles.interestname}>Tom's Hardware</h3>
              <p className={styles.description}>An online publication focused on computer hardware and technology.</p>
              <p>https://www.tomshardware.com/rss.xml</p>
            </div>
            <div className={styles.centrediv}>
              <input type="checkbox" id="tomshardwarecheckbox" className={styles.checkbox}></input>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200 w-fit max-w-2xl mr-6">
          <div className={styles.container}>
            <img src="images/HardwareZone.png" alt="HardwareZone" className={styles.image} />
            <div className={styles.centrediv}>
              <h3 className={styles.interestname}>HardwareZone</h3>
              <p className={styles.description}>An Singaporean online publication and forum focused on computer hardware and technology.</p>
              <p>https://www.hardwarezone.com.sg/feeds</p>
            </div>
            <div className={styles.centrediv}>
              <input type="checkbox" id="hardwarezonecheckbox" className={styles.checkbox}></input>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}