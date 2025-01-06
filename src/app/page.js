"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [feedUrl, setFeedUrl] = useState("");
  const [feeds, setFeeds] = useState([]);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");

  const addFeed = async () => {
    setError("");
    try {
      const response = await fetch(
        `/api/fetch-rss?feedUrl=${encodeURIComponent(feedUrl)}`
      );
      if (!response.ok) throw new Error("Failed to fetch RSS feed");
      const data = await response.json();
      setFeeds((prev) => [...prev, { url: feedUrl, data }]);
      setFeedUrl("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const handleTimeFilterChange = (e) => {
    setTimeFilter(e.target.value);
  };

  const filterByTime = (pubDate) => {
    if (timeFilter === "all") return true;
    const now = new Date();
    const pubDateObj = new Date(pubDate);

    switch (timeFilter) {
      case "last24h":
        return now - pubDateObj < 24 * 60 * 60 * 1000;
      case "last7d":
        return now - pubDateObj < 7 * 24 * 60 * 60 * 1000;
      case "last30d":
        return now - pubDateObj < 30 * 24 * 60 * 60 * 1000;
      default:
        return true;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">RSS News Reader</h1>
      <div className="mb-6">
        <input
          type="text"
          value={feedUrl}
          onChange={(e) => setFeedUrl(e.target.value)}
          placeholder="Enter RSS Feed URL"
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={addFeed}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Feed
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {feeds.length > 0 && (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Select Feed:
          </label>
          <select
            value={selectedFeed?.url || ""}
            onChange={(e) =>
              setSelectedFeed(
                feeds.find((feed) => feed.url === e.target.value)
              )
            }
            className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">All Feeds</option>
            {feeds.map((feed, index) => (
              <option key={index} value={feed.url}>
                {feed.data.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Filter by keyword:
        </label>
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Enter keyword"
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Filter by time:
        </label>
        <select
          value={timeFilter}
          onChange={handleTimeFilterChange}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="all">All Time</option>
          <option value="last24h">Last 24 Hours</option>
          <option value="last7d">Last 7 Days</option>
          <option value="last30d">Last 30 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(selectedFeed ? [selectedFeed] : feeds).map((feed, feedIndex) =>
          feed.data.items
            .filter(
              (item) =>
                item.title.toLowerCase().includes(filter) &&
                filterByTime(item.pubDate)
            )
            .map((item, index) => (
              <div
                key={`${feedIndex}-${index}`}
                className="p-4 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow"
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  {item.title}
                </a>
                <p className="text-gray-500 text-sm">{item.pubDate}</p>
                <div className="mt-2 text-gray-700">
                  {item.content ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.content,
                      }}
                    />
                  ) : (
                    <ReactMarkdown>{item.contentSnippet || ""}</ReactMarkdown>
                  )}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
