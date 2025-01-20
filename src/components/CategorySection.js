// This file is written by Daksh

import FeedRow from "@/components/Feeds/FeedRow";

export default function CategorySection({ category, feeds, viewMode }) {
  if (!feeds.length) return null;

  return (
    <div className="mb-8 mt-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {category === "Your Feeds" ? category : `Latest in ${category}`}
      </h2>
      {viewMode === "tiles" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {feeds.map((feed, index) => (
            <FeedRow key={index} feed={feed} type="tiles" />
          ))}
        </div>
      )}
      {viewMode === "list" && (
        <div className="space-y-4">
          {feeds.map((feed, index) => (
            <FeedRow key={index} feed={feed} type="list" />
          ))}
        </div>
      )}
      {viewMode === "carousel" && (
        <div className="flex overflow-x-scroll space-x-4">
          {feeds.map((feed, index) => (
            <FeedRow key={index} feed={feed} type="carousel" />
          ))}
        </div>
      )}
    </div>
  );
}
