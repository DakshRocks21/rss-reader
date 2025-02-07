// Chin Ray wrote this

"use client"

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { addFeedToDatabase, removeFeedFromDatabase } from "@/lib/firebase/feed_database";

export function RenderCheckbox({ feed, feeds }) {
    const [checked, setChecked] = useState(false);
    useEffect(() => setChecked(feed.checked || false), [feed.checked]);
  
    function HandleCheckboxChange(event, url, feedsTemp) {
      if (checked === event.target.isSelected) return;
      if (event.target.checked == true) {
        console.log("Adding", url);
        let feed = feedsTemp.find(x => x.url === url);
        feed.checked = true;
        addFeedToDatabase({ name: feed.name, feedUrl: feed.url, categories: feed.categories, image: feed?.image ?? "", description: feed?.description ?? "" });
      } else {
        console.log("Removing", url);
        feedsTemp.find(x => x.url === url).checked = false;
        removeFeedFromDatabase(url);
      }
      setChecked(event.target.checked);
    }
  
    return <input type="checkbox" checked={checked} onChange={event => HandleCheckboxChange(event, feed.url, feeds)} className={styles.checkbox}/>
  }