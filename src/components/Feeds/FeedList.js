// Daksh wrote this
import React from "react";
import FeedItem from "./FeedItem";

export default function FeedList({ feeds, filter, filterCategory, timeFilter, filterByTime }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {feeds
        .filter((feed) => !filterCategory || feed.category === filterCategory)
        .flatMap((feed, feedIndex) => {
          if (!feed.data || !feed.data.items) return [];
          return feed.data.items
            .filter(
              (item) =>
                item.title.toLowerCase().includes(filter) && filterByTime(item.pubDate)
            )
            .map((item, index) => (
              <FeedItem key={`${feedIndex}-${index}`} item={item} category={feed.category} />
            ));
        })}
    </div>
  );
}
