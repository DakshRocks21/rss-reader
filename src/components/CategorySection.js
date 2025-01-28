// This file is written by Daksh

import FeedRow from "@/components/Feeds/FeedRow";
import { useState } from "react";
import { FaThLarge, FaList } from "react-icons/fa";
import { Carousel, CarouselItem, Spacer } from "actify";

export default function CategorySection({ category_selected, feeds }) {

  const header = category_selected.length === 0 ? `Your Feeds` : `Latest in ${category_selected}`;

  
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
    <div className="mb-8 mt-4 h-full">
      {/* Section Header */}
      <div className="flex flex-row items-center justify-between mb-4 h-full ">
        <h2 className="text-xl font-semibold text-gray-800">
          {header}
        </h2>
        {/* View Mode Buttons */}
        <div className="flex flex-row justify-center gap-x-4">
          <div
            className={`w-10 h-10 border rounded-lg cursor-pointer flex items-center justify-center ${
              viewMode === "tiles" ? "bg-primary-light text-on-primary" : ""
            }`}
            onClick={() => setViewMode("tiles")}
          >
            <FaThLarge className="inline" />
          </div>
          <div
            className={`w-10 h-10 border rounded-lg cursor-pointer flex items-center justify-center ${
              viewMode === "list" ? "bg-primary-light text-on-primary" : ""
            }`}
            onClick={() => setViewMode("list")}
          >
            <FaList className="inline" />
          </div>
          <div
            className={`w-10 h-10 border rounded-lg cursor-pointer flex items-center justify-center ${
              viewMode === "carousel" ? "bg-primary-light text-on-primary" : ""
            }`}
            onClick={() => setViewMode("carousel")}
          >
            <FaThLarge className="inline" />
          </div>
        </div>
      </div>
      {/* View Modes */}
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
        <Carousel control infinite className="h-[40rem] w-full " interval={5000}>
          {feeds.map((feed, index) => (
            <CarouselItem key={index} className="">
              <FeedRow feed={feed} type="carousel" />
            </CarouselItem>
          ))}
        </Carousel>
      )}

      {/* Pagination */}
      {viewMode !== "carousel" && (
        <div className="mt-6 flex justify-between items-center">
          <button
            className={`px-4 py-2 bg-gray-200 rounded-md ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
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
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
