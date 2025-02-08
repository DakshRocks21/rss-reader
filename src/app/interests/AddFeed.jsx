// Daksh and Chin Ray wrote this
"use client"
import React, { useState } from "react";
import { addFeedToDatabase } from "@/lib/firebase/feed_database";
import CreatableSelect from "react-select/creatable";

export default function AddFeed({ onAddFeed, error, categoryList }) {
  const [feedName, setFeedName] = useState("");
  const [feedUrl, setFeedUrl] = useState("");
  const [feedCategory, setFeedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFeed = async () => {
    console.log("Adding feed", feedUrl, feedCategory);
    if (feedUrl.trim()) {
      setIsLoading(true);
      console.log()
      await addFeedToDatabase({name: feedName, feedUrl: feedUrl, categories: feedCategory.map(category => category.label) || ["Uncategorised"] });
      await onAddFeed();
      setIsLoading(false);
      setFeedUrl("");
      setFeedCategory("");
    }
  };

  return (
    <>
      <h2 className="text-lg font-semibold text-on-surface mb-4 mt-5">Add a New Feed</h2>
      <div className="bg-surface-bright p-6 rounded-lg drop-shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Feed URL Input */}
          <div>
            <label htmlFor="feed-name" className="block text-l font-medium text-on-surface mb-1">
              Feed Name
            </label>
            <input
              id="feed-name"
              type="text"
              value={feedName}
              onChange={(e) => setFeedName(e.target.value)}
              placeholder="Enter RSS Feed Name"
              className="w-full p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Feed URL Input */}
          <div>
            <label htmlFor="feed-url" className="block text-l font-medium text-on-surface mb-1">
              RSS Feed URL
            </label>
            <input
              id="feed-url"
              type="text"
              value={feedUrl}
              onChange={(e) => setFeedUrl(e.target.value)}
              placeholder="Enter RSS Feed URL"
              className="w-full p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Feed Category Input */}
          <div>
            <label htmlFor="feed-category" className="block text-l font-medium text-on-surface mb-1">
              Category
            </label>
            <CreatableSelect
              id="feed-category"
              isMulti
              options={categoryList.map(category => ({ value: category, label: category }))}
              onChange={(choice) => setFeedCategory(choice)}
              placeholder="Enter Feed Categories (delimited by commas)"
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
            disabled={!feedUrl.trim() || isLoading}
            className={`px-4 py-2 rounded-md font-semibold text-on-secondary-container ${
              isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-secondary-container hover:bg-outline cursor-pointer"
            } transition-all`}
          >
            {isLoading ? "Adding..." : "Add Feed"}
          </button>
        </div>
      </div>
    </>
  );
}
