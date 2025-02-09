// This file is written by Daksh

import CategorySection from "@/components/Feeds/CategorySection";

export default function Feeds({
  feeds,
  keywordSearched,
  filteredCategory
}) {

  const allItems = feeds
    .flatMap((feed) => {
      const publisher = feed.data.title || "Unknown Publisher";
      return feed.data.items.map((item) => ({
        ...item,
        publisher,
        categories: feed.categories || ["Uncategorized"],
      }));
    })
    .filter((item) => {
      if (
        keywordSearched &&
        !item.title.toLowerCase().includes(keywordSearched.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

  const filteredFeeds = [];

  if (filteredCategory.length > 0) {
    console.log("Filtering by category");
    for (const item of allItems) {
      if (item.categories.length === 0) {
        item.categories = ["Uncategorized"];
      }
      for (const category of item.categories) {
        if (filteredCategory.includes(category)) {
          filteredFeeds.push(item);
          break;
        }
      }
    }
  } else {
    filteredFeeds.push(...allItems);
  }

  filteredFeeds.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));


  return (
    <div>
      <CategorySection
        feeds={filteredFeeds}
        category_selected={filteredCategory}
      />
    </div>
  );
}
