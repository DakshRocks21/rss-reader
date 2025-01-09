// Daksh wrote this
"use client"
import React, { useState } from "react";

export default function AddFeed({ onAddFeed, error }) {
  const [feedUrl, setFeedUrl] = useState("");
  const [feedCategory, setFeedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFeed = async () => {
    if (feedUrl.trim() && feedCategory.trim()) {
      setIsLoading(true);
      await onAddFeed(feedUrl, feedCategory);
      setIsLoading(false);
      setFeedUrl("");
      setFeedCategory("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Add a New Feed</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Feed URL Input */}
        <div>
          <label htmlFor="feed-url" className="block text-sm font-medium text-gray-700 mb-1">
            RSS Feed URL
          </label>
          <input
            id="feed-url"
            type="text"
            value={feedUrl}
            onChange={(e) => setFeedUrl(e.target.value)}
            placeholder="Enter RSS Feed URL"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Feed Category Input */}
        <div>
          <label htmlFor="feed-category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            id="feed-category"
            type="text"
            value={feedCategory}
            onChange={(e) => setFeedCategory(e.target.value)}
            placeholder="Enter Feed Category"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}

      {/* Action Button */}
      <div className="mt-4 flex items-center">
        <button
          onClick={handleAddFeed}
          disabled={!feedUrl.trim() || !feedCategory.trim() || isLoading}
          className={`px-4 py-2 rounded-md font-semibold text-white ${
            isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } transition-all`}
        >
          {isLoading ? "Adding..." : "Add Feed"}
        </button>
      </div>
    </div>
  );
}
