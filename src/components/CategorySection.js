// Made by Daksh

import FeedRow from "@/components/Feeds/FeedRow";
import { useState } from "react";
import { FaThLarge, FaList } from "react-icons/fa";
import { Carousel, CarouselItem, Pagination } from "actify";

export default function CategorySection({ category_selected, feeds }) {
  const header =
    category_selected.length === 0
      ? "Your Feeds"
      : `Latest in ${category_selected}`;

  const [viewMode, setViewMode] = useState("tiles");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(10); // Default page size

  const totalPages = Math.ceil(feeds.length / selectedPageSize);

  // Slice feeds based on the current page and selected page size
  const paginatedFeeds = feeds.slice(
    (currentPage - 1) * selectedPageSize,
    currentPage * selectedPageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mb-8 mt-4 h-full bg-surface-container-low p-6 rounded-lg shadow-lg">
      {/* Section Header */}
      <div className="flex flex-row items-center justify-between mb-4 h-full">
        <h2 className="text-xl font-semibold text-on-surface">{header}</h2>
        {/* View Mode Buttons */}
        <div className="flex flex-row justify-center gap-x-4">
          <div
            className={`w-10 h-10 border rounded-lg cursor-pointer flex items-center justify-center ${
              viewMode === "tiles"
                ? "bg-secondary-container text-on-surface"
                : "text-on-surface"
            }`}
            onClick={() => setViewMode("tiles")}
          >
            <FaThLarge className="inline" />
          </div>
          <div
            className={`w-10 h-10 border rounded-lg cursor-pointer flex items-center justify-center ${
              viewMode === "list"
                ? "bg-secondary-container text-on-surface"
                : "text-on-surface"
            }`}
            onClick={() => setViewMode("list")}
          >
            <FaList className="inline" />
          </div>
          <div
            className={`w-10 h-10 border rounded-lg cursor-pointer flex items-center justify-center ${
              viewMode === "carousel"
                ? "bg-secondary-container text-on-surface"
                : "text-on-surface"
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
        <Carousel control infinite className="h-[40rem] w-full" interval={5000}>
          {feeds.map((feed, index) => (
            <CarouselItem key={index} className="">
              <FeedRow feed={feed} type="carousel" />
            </CarouselItem>
          ))}
        </Carousel>
      )}

      {/* Pagination */}
      {viewMode !== "carousel" && (
        <div className="mt-6 flex flex-col items-center text-on-surface-variant">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            pageSizes={[5, 10, 20, 50]} // Options for page sizes
            selectedPageSize={selectedPageSize}
            setSelectedPageSize={setSelectedPageSize}
            onPageChange={handlePageChange}
          />
          <p className="mt-4 text-sm">
            Showing {paginatedFeeds.length} of {feeds.length} feeds
          </p>
        </div>
      )}
    </div>
  );
}
