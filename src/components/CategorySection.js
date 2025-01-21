// This file is written by Daksh

import FeedRow from "@/components/Feeds/FeedRow";
import { useState } from "react";
import { FaThLarge, FaList } from "react-icons/fa";

export default function CategorySection({ category, feeds }) {
  if (!feeds.length) return null;

  const [viewMode, setViewMode] = useState("tiles"); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 


  const totalPages = Math.ceil(feeds.length / itemsPerPage);
  const paginatedFeeds = feeds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="mb-8 mt-4">
      <div className="flex flex-row items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {category === "Your Feeds" ? category : `Latest in ${category}`}
        </h2>
        <div className="flex flex-row justify-center gap-x-4">
          <div
            className={`w-10 h-10 border rounded-lg cursor-pointer flex items-center justify-center ${
              viewMode === "tiles" ? "bg-blue-100 border-blue-500" : ""
            }`}
            onClick={() => setViewMode("tiles")}
          >
            <FaThLarge className="inline" />
          </div>
          <div
            className={`w-10 h-10 border rounded-lg cursor-pointer flex items-center justify-center ${
              viewMode === "list" ? "bg-blue-100 border-blue-500" : ""
            }`}
            onClick={() => setViewMode("list")}
          >
            <FaList className="inline" />
          </div>
        </div>
      </div>

      {viewMode === "tiles" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedFeeds.map((feed, index) => (
            <FeedRow key={index} feed={feed} type="tiles" />
          ))}
        </div>
      )}
      {viewMode === "list" && (
        <div className="space-y-4">
          {paginatedFeeds.map((feed, index) => (
            <FeedRow key={index} feed={feed} type="list" />
          ))}
        </div>
      )}
      {viewMode === "carousel" && (
        <div className="flex overflow-x-scroll space-x-4">
          {paginatedFeeds.map((feed, index) => (
            <FeedRow key={index} feed={feed} type="carousel" />
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <button
          className={`px-4 py-2 bg-gray-200 rounded-md ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p className="text-gray-600">
          Page {currentPage} of {totalPages}
        </p>
        <button
          className={`px-4 py-2 bg-gray-200 rounded-md ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
