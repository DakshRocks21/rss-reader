// This file is written by Daksh

import { FaThLarge, FaList, FaPlayCircle } from "react-icons/fa";

export default function Sidebar({ categoryList, setFilterCategory, setViewMode, viewMode }) {
  const handleCategoryFilterChange = (category) => {
    setFilterCategory((prevCategories) => {
      if (prevCategories.includes(category)) {
        // Remove the category if already selected
        return prevCategories.filter((cat) => cat !== category);
      } else {
        // Add the category if not selected
        return [...prevCategories, category];
      }
    });
  };

  const isLoading = !categoryList || categoryList.length === 0;

  return (
    <div className="shadow-md w-64 p-4">
      <h2 className="text-lg font-medium mb-4">Filter by Category</h2>
      {isLoading ? (
        <p className="text-gray-500">Loading categories...</p>
      ) : (
        <div className="space-y-2">
          {categoryList.map((category) => (
            <label
              key={category}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                value={category}
                className="form-checkbox h-5 w-5 text-blue-600"
                onChange={() => handleCategoryFilterChange(category)}
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      )}
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-2">View Mode</h2>
        <div className="space-y-2">
          <div
            className={`p-4 border rounded-lg cursor-pointer ${
              viewMode === "tiles" ? "bg-blue-100 border-blue-500" : ""
            }`}
            onClick={() => setViewMode("tiles")}
          >
            <FaThLarge className="inline mr-2" />
            Tiles
          </div>
          <div
            className={`p-4 border rounded-lg cursor-pointer ${
              viewMode === "list" ? "bg-blue-100 border-blue-500" : ""
            }`}
            onClick={() => setViewMode("list")}
          >
            <FaList className="inline mr-2" />
            List
          </div>
          <div
            className={`p-4 border rounded-lg cursor-pointer ${
              viewMode === "carousel" ? "bg-blue-100 border-blue-500" : ""
            }`}
            onClick={() => setViewMode("carousel")}
          >
            <FaPlayCircle className="inline mr-2" />
            Carousel
          </div>
        </div>
      </div>
    </div>
  );
}
