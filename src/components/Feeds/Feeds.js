// This file is written by Daksh

import CategorySection from "@/components/CategorySection";

export default function Feeds({ feeds, keyword, category }) {
  
  const allItems = feeds
    .flatMap((feed) => {
      const publisher = feed.data.title || "Unknown Publisher";
      return feed.data.items.map((item) => ({
        publisher,
        categories: feed.categories || [],
        ...item,
      }));
    })
    .filter((item) => {
      if (
        keyword &&
        !item.title.toLowerCase().includes(keyword.toLowerCase())
      ) {
        return false;
      }
      if (
        category.length &&
        !category.some((cat) => item.categories.includes(cat))
      ) {
        return false;
      }
      return true;
    });

  allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  const groupedFeeds = category.length
    ? category.reduce((acc, cat) => {
        acc[cat] = allItems.filter((item) => item.categories.includes(cat));
        return acc;
      }, {})
    : { "Your Feeds": allItems };

  return (
    <div>
      {Object.keys(groupedFeeds).map((category, index) => (
        <CategorySection
          key={index}
          category={category}
          feeds={groupedFeeds[category]}
        />
      ))}
    </div>
  );
}
