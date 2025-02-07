// This file is written by Daksh
import CategorySection from "@/components/Feeds/CategorySection";

export default function Feeds({ feeds, keyword, filteredCategory, categories }) {

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
        keyword &&
        !item.title.toLowerCase().includes(keyword.toLowerCase())
      ) {
        return false;
      }
      return true;
    });


  const filteredFeeds = []
  for (const item of allItems) {
   if (item.categories.length === 0) {
     item.categories = ["Uncategorized"];
   }
   
   if (filteredCategory.length > 0) {
      for (const category of item.categories) {
        if (filteredCategory.includes(category)) {
          filteredFeeds.push(item);
          break;
        }
      }
   } else {
      filteredFeeds.push(item);
   }   
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