// Daksh wrote this

const STORAGE_KEYS = {
  // We can use this for the sidebar/history, so it loads faster
  FEEDS: "cached_feeds",
  CATEGORIES: "cached_categories",
};

export const saveFeedsToCache = (feeds) => {
  try {
    localStorage.setItem(STORAGE_KEYS.FEEDS, JSON.stringify(feeds));
  } catch (error) {
    console.error("Error saving feeds to cache:", error);
  }
};

export const getFeedsFromCache = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FEEDS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error retrieving feeds from cache:", error);
    return null;
  }
};

export const saveCategoriesToCache = (categories) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  } catch (error) {
    console.error("Error saving categories to cache:", error);
  }
};

export const getCategoriesFromCache = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error retrieving categories from cache:", error);
    return null;
  }
};

export const clearCache = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.FEEDS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
};
