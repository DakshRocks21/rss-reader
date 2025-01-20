// This file is written by Daksh

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { FIREBASE_FIRESTORE_CLIENT } from "./client";
import { getCurrentUserID } from "../session";

export const addFeedToDatabase = async (feedUrl, categories) => {
  const userId = await getCurrentUserID();

  const dataPath = doc(
    FIREBASE_FIRESTORE_CLIENT,
    `users/${userId}/data/feeds`
  );

  const userDoc = await getDoc(dataPath);

  categories = categories || ["Uncategorized"];

  if (!userDoc.exists()) {
    await setDoc(dataPath, {
      feeds: [{ url: feedUrl, categories: [categories] }],
    });
  } else {
    const feeds = userDoc.data().feeds || [];
    if (feeds.some((feed) => feed.url.toLowerCase() === feedUrl.toLowerCase())) {
      throw new Error("Feed already exists.");
    }

    feeds.push({ url: feedUrl, categories: [categories] });
    await setDoc(dataPath, { feeds });
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
