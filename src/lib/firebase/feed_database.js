// Daksh wrote this
import {
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { FIREBASE_FIRESTORE_CLIENT } from "./client";
import { getCurrentUserID } from "../session";

export const addFeedToDatabase = async (feedUrl, category) => {
  const userId = await getCurrentUserID();

  const dataPath = doc(
    FIREBASE_FIRESTORE_CLIENT,
    `users/${userId}/data/feeds`
  );

  const userDoc = await getDoc(dataPath);

  category = category || "Uncategorized";

  if (!userDoc.exists()) {
    await setDoc(dataPath, {
      feeds: [{ url: feedUrl, category }],
    });
  } else {
    const feeds = userDoc.data().feeds || [];
    feeds.push({ url: feedUrl, category });
    await setDoc(dataPath, { feeds });
  }
};

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
