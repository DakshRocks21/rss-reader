// Daksh wrote this
"use client";
import React from "react";
import FeedItem from "./FeedItem";

export default function FeedList({ feeds, filter, filterCategory, timeFilter, filterByTime }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {feeds
        .filter((feed) => {
          if (filterCategory) {
            for (const category of feed.category) {
              console.log(category, filterCategory)
              if (category.includes(filterCategory)){
                console.log(feed)
                return true;
              }
              return false;
            }
          }
          return true;
        })
        .flatMap((feed, feedIndex) => {
          if (!feed.data || !feed.data.items) return [];
          return feed.data.items
            .filter(
              (item) =>
                item.title.toLowerCase().includes(filter) && filterByTime(item.pubDate)
            )
            .map((item, index) => (
              <FeedItem key={`${feedIndex}-${index}`} item={item} categories={feed.category} />
            ));
        })}
    </div>
  );
}
