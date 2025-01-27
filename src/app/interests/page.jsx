// Chin Ray wrote this

"use client";

import { useState, useEffect } from "react";
import { getUserInfoFromFirebaseAuth } from "@/lib/session";
import { getFeedsFromDatabase, addFeedToDatabase, removeFeedFromDatabase } from "@/lib/firebase/feed_database";
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
      categories: ["Technology", "Hardware"],
      image: "images/HardwareZone.png",
      description: "An Singaporean technology forum and news outlet specialising in hardware.",
      checked: false
    }
  ])

  // Get list of subscribed feeds and categories
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

  let feedsTemp = feeds;
  let presetFeedsTemp = presetFeeds;

  // Check respective preset feed checkboxes if user is already subscribed to them, remove duplicates
  for (let i = 0; i < feedsTemp.length; i++) {
    for (let presetFeed of presetFeedsTemp) {
      if (feeds[i].url === presetFeed.url) {
        presetFeed.checked = true;
        feedsTemp.splice(i, 1);
      }
    }
  }

  console.log(presetFeedsTemp)

  feedsTemp.forEach(feed => feed.checked = true); // Check all remaining feeds (since they are subscribed if they are already in the database)

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <Header
        user={user}
        onSignOut={async () => {
          await logoutSession();
          window.location.href = "/login";
        }}
        isOnHomePage={false}
      />
      <AddFeed onAddFeed={() => window.location.reload()}/>
      <RenderSubscribedInterests feeds={feedsTemp} />
      <RenderInterestSelection presetFeeds={presetFeedsTemp} />
    </div>
  )
}

// Already subscribed interests section (pull from Firebase)
function RenderSubscribedInterests({ feeds }) {
  return (
    <>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Subscribed Interests</h2>
      <div className="flex flex-row flex-wrap">
        {feeds.map((feed) => (
          <div className={`bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200 w-fit max-w-2xl mr-6 flex items-center`} key={feed.url}>
            <div className={styles.container}>
              {feed.name && feed.name != "" ? (
                <>
                  {
                    feed.image && feed.image != "" ? (
                      <img src={feed.image} alt={feed.name} className={styles["image"]} />
                    ) : (
                      <CiGlobe className={styles["image"]} />
                    )
                  }
                  <div className={styles.centrediv}>
                    <h3 className={styles.interestname}>{feed.name}</h3>
                    <p className={styles.description}>{feed.description}</p>
                    <p>{feed.url}</p>
                  </div>
                </>
              ) : (
                <>
                  <CiGlobe className={styles["image"]} />
                  <div className={styles.centrediv}>
                    <h3 className={styles.interestname}>{feed.url.toString().replace("https://", "").split("/")[0].split(".").slice(-2).join(".")}</h3>
                    <p>{feed.url}</p>
                  </div>
                </>
              )}

              <div className={styles.rightalign}>
                <Checkbox feed={feed} feeds={feeds} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

// Preset interests selection section
function RenderInterestSelection({ presetFeeds }) {
  return (
    <>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Interests</h2>
      <div className="flex flex-row flex-wrap">
        {
          presetFeeds.map((feed) => (
            <div className={`bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200 w-fit max-w-2xl mr-6 flex items-center`} key={feed.url}>
              <div className={styles.container}>
                <img src={feed.image} alt={feed.name} className={styles["image"]} />
                <div className={styles.centrediv}>
                  <h3 className={styles.interestname}>{feed.name}</h3>
                  <p className={styles.description}>{feed.description}</p>
                  <p>{feed.url}</p>
                </div>
                <div className={styles.centrediv}>
                  <Checkbox feed={feed} feeds={presetFeeds} />
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

function Checkbox({ feed, feeds }) {
  const [checked, setChecked] = useState(false);
  useEffect(() => setChecked(feed.checked), [feed.checked]);

  function HandleCheckboxChange(event, url, feedsTemp) {
    if (event.target.checked == true) {
      console.log("Adding", url);
      let feed = feedsTemp.find(x => x.url === url);
      feed.checked = true;
      addFeedToDatabase({ name: feed.name, feedUrl: feed.url, categories: feed.categories, image: feed?.image ?? "", description: feed?.description ?? "" });
    } else {
      console.log("Removing", url);
      feedsTemp.find(x => x.url === url).checked = false;
      // } else {
      //   feedsTemp.splice(feedsTemp.indexOf(feedsTemp.find(x => x.url === url)), 1);
      // }
      removeFeedFromDatabase(url);
    }
    setChecked(event.target.checked);
  }

  return <input type="checkbox" checked={checked} onChange={event => HandleCheckboxChange(event, feed.url, feeds)} className={styles.checkbox}></input>
}