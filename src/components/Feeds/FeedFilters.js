// Daksh wrote this
import React from "react";

export default function FeedFilters({
  filter,
  filterCategory,
  timeFilter,
  onFilterChange,
  onCategoryFilterChange,
  onTimeFilterChange,
  categories,
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Filter by keyword:</label>
        <input
          type="text"
          value={filter}
          onChange={onFilterChange}
          placeholder="Enter keyword"
          className="w-full md:w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Filter by category:</label>
        <select
          value={filterCategory}
          onChange={onCategoryFilterChange}
          className="w-full md:w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Filter by time:</label>
        <select
          value={timeFilter}
          onChange={onTimeFilterChange}
          className="w-full md:w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Time</option>
          <option value="last24h">Last 24 Hours</option>
          <option value="last7d">Last 7 Days</option>
          <option value="last30d">Last 30 Days</option>
        </select>
      </div>
    </div>
  );
}
