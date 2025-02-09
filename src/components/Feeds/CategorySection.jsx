// Written by Daksh

import dynamic from "next/dynamic";
import { memo, useMemo, useState } from "react";
import FeedRow from "./FeedRow";
import { FaThLarge, FaList } from "react-icons/fa";
import { MdViewCarousel } from "react-icons/md";
import { Pagination } from "actify";
import Autoplay from "embla-carousel-autoplay";
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'

import {FaSearch, FaRegFrown } from "react-icons/fa";
import { Button } from "actify";

const EmblaCarousel = dynamic(() => import("./EmblaCarousel"), { ssr: false });

export default function CategorySection({ category_selected, feeds }) {
  const header =
    category_selected.length === 0
      ? "Your Feeds"
      : `Latest in ${category_selected}`;

  const [viewMode, setViewMode] = useState("tiles");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const totalPages = Math.ceil(feeds.length / selectedPageSize);
  const paginatedFeeds = feeds.slice(
    (currentPage - 1) * selectedPageSize,
    currentPage * selectedPageSize
  );

  // Memoize options and plugins so they don't change on every render.
  const carouselOptions = useMemo(() => ({ axis: "y", loop: true }), []);
  const carouselPlugins = useMemo(
    () => [Autoplay({ stopOnInteraction: true }), WheelGesturesPlugin()],
    []
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
            <FaThLarge />
          </div>
          <div
            className={`w-10 h-10 border rounded-lg cursor-pointer flex items-center justify-center ${
              viewMode === "list"
                ? "bg-secondary-container text-on-surface"
                : "text-on-surface"
            }`}
            onClick={() => setViewMode("list")}
          >
            <FaList />
          </div>
          <div
            className={`w-10 h-10 border rounded-lg cursor-pointer flex items-center justify-center ${
              viewMode === "carousel"
                ? "bg-secondary-container text-on-surface"
                : "text-on-surface"
            }`}
            onClick={() => setViewMode("carousel")}
          >
            <MdViewCarousel className="text-2xl" />
          </div>
        </div>
      </div>

      {
        /* If no feeds at all */
        feeds.length === 0 && (
          <div className="flex flex-col items-center justify-center h-80 text-center bg-surface-container-low rounded-lg shadow-md p-6">
            <FaRegFrown className="text-6xl text-on-surface-variant mb-4" />
            <h2 className="text-2xl font-semibold text-on-surface">
              Oops, No Feeds!
            </h2>
            <p className="text-md text-on-surface-variant mt-2">
              It looks like we couldn't find any feeds here. Try adding or
              exploring different categories.
            </p>
            <Button
              className="mt-5"
              color="primary"
              variant="filled"
              icon={<FaSearch />}
              onClick={() => (window.location.href = "/interests")}
            >
              Discover Interests
            </Button>
          </div>
        )
      }

      {/* View Modes */}
      {viewMode === "tiles" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        <EmblaCarousel
          slides={feeds}
          options={carouselOptions}
          plugins={carouselPlugins}
          renderSlide={(feed, index) => (
            <FeedRow key={index} feed={feed} type="carousel" />
          )}
        />
      )}

      {/* Pagination (not used in carousel view) */}
      {(viewMode !== "carousel" && feeds.length !== 0  )&& (
        <div className="mt-6 flex flex-col items-center text-on-surface-variant">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            pageSizes={[5, 10, 20, 50]}
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
