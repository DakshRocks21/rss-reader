// Daksh wrote this
// Used in /home
import Select from "react-select";
import { FaThLarge, FaList, FaPlayCircle } from "react-icons/fa";

export default function Sidebar({ categoryList, setFilterCategory, setViewMode, viewMode }) {
  
    const handleCategoryFilterChange = (selectedOptions) => {

    const values = selectedOptions.map((option) => option.value);
    setFilterCategory(values);
  };

  const isLoading = !categoryList || categoryList.length === 0;

  return (
    <div className="bg-white shadow-md w-64 p-4">
      <h2 className="text-lg font-medium mb-4">Filter by Category</h2>
      {isLoading ? (
        <p className="text-gray-500">Loading categories...</p>
      ) : (
        <Select
          options={categoryList.map((cat) => ({
            value: cat,
            label: cat,
          }))}
          isMulti
          onChange={handleCategoryFilterChange}
          placeholder="Select categories..."
        />
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
