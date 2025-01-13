"use client";
import React from "react";
import { FaSearch, FaTag, FaClock } from "react-icons/fa";

export default function FeedFilters({
  filter,
  filterCategory,
  timeFilter,
  onFilterChange,
  onCategoryFilterChange,
  onTimeFilterChange,
  categories = [],
}) {
  const timeFilterMap = {
    0: "all",
    1: "last24h",
    2: "last7d",
    3: "last30d",
  };

  const reverseTimeFilterMap = {
    all: 0,
    last24h: 1,
    last7d: 2,
    last30d: 3,
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap items-center gap-4">
      {/* Keyword Filter */}
      <div className="flex items-center gap-2 w-full md:w-auto">
        <FaSearch className="text-blue-500" />
        <input
          type="text"
          value={filter || ""}
          onChange={onFilterChange}
          placeholder="Search"
          className="w-full md:w-40 p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 w-full md:w-auto">
        <FaTag className="text-green-500" />
        <select
          value={filterCategory || ""}
          onChange={onCategoryFilterChange}
          className="w-full md:w-40 p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            // category.map((cat) => (
            //   <option key={cat} value={cat}>
            //     {cat}
            //   </option>
            // ))
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Time Filter */}
      <div className="flex items-center gap-2 w-full md:w-auto">
        <FaClock className="text-yellow-500" />
        <div className="flex flex-col">
          <input
            type="range"
            min="0"
            max="3"
            value={reverseTimeFilterMap[timeFilter] || 0}
            onChange={(e) => {
              onTimeFilterChange(timeFilterMap[e.target.value] || "all");
            }}
            className="slider w-40"
          />
          <div className="flex justify-between text-xs mt-1">
            <span>All</span>
            <span>24h</span>
            <span>7d</span>
            <span>30d</span>
          </div>
        </div>
      </div>
    </div>
  );
}
