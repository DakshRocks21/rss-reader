// This file is written by Daksh and Chin Ray

import {
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { FIREBASE_FIRESTORE_CLIENT } from "./client";
import { getCurrentUserID } from "../session";

export const addFeedToDatabase = async ({ name, feedUrl, categories, image = null, description = null}) => {
  const userId = await getCurrentUserID();

  const dataPath = doc(
    FIREBASE_FIRESTORE_CLIENT,
    `users/${userId}/data/feeds`
  );

  const userDoc = await getDoc(dataPath);

  categories = categories || ["Uncategorised"];

  if (!userDoc.exists() || !userDoc.data().feeds) {
    console.log("Creating new doc as it doesn't exist");
    await setDoc(dataPath, {
      "feeds": [{ name: name, url: feedUrl, categories: categories, image: image, description: description }],
    });
  } else {
    const feeds = userDoc.data().feeds || [];
    if (feeds.some((feed) => feed.url.toLowerCase() === feedUrl.toLowerCase())) {
      throw new Error("Feed already exists.");
    }

    feeds.push({ name: name, url: feedUrl, categories: categories, image: image, description: description });
    console.log(feeds);
    await updateDoc(dataPath, { feeds });
  }
};


export const removeFeedFromDatabase = async (feedUrl) => {
  const userId = await getCurrentUserID();

  const dataPath = doc(
    FIREBASE_FIRESTORE_CLIENT,
    `users/${userId}/data/feeds`
  );

  const userDoc = await getDoc(dataPath);

  if (!userDoc.exists()) {
    return;
  }

  const feeds = userDoc.data().feeds || [];
  const newFeeds = feeds.filter((feed) => feed.url.toLowerCase() !== feedUrl.toLowerCase());

  await setDoc(dataPath, { feeds: newFeeds });
}

export const updateFeedCategories = async (feedUrl, categories) => {
  const userId = await getCurrentUserID();

  const dataPath = doc(
    FIREBASE_FIRESTORE_CLIENT,
    `users/${userId}/data/feeds`
  );

  const userDoc = await getDoc(dataPath);

  if (!userDoc.exists()) {
    return;
  }

  const feeds = userDoc.data().feeds || [];
  const feed = feeds.find((feed) => feed.url.toLowerCase() === feedUrl.toLowerCase());

  if (!feed) {
    return;
  }

  feed.categories = categories;
  await setDoc(dataPath, { feeds });
}

export const getFeedsFromDatabase = async () => {
  const userId = await getCurrentUserID();

  const dataPath = doc(
    FIREBASE_FIRESTORE_CLIENT,
    `users/${userId}/data/feeds`
  );

  const userDoc = await getDoc(dataPath);

  if (!userDoc.exists()) {
    return [];
  }

  return userDoc.data().feeds || [];
};
