// This file is written by Daksh
import Image from "next/image";

export default function Sidebar({
  user,
  categoryList,
  setFilterCategory,
  setViewMode,
  viewMode,
}) {
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
    <div className="shadow-md w-64 p-4 sticky top-0 bg-red-200">
      <div className="flex items-center space-x-4 mb-4 justify-center">
        <div className="w-12 h-12 items-center justify-center flex bg-gray-100 rounded-full">
          {user && user.picture ? (
            <Image
              src={user.picture}
              alt="Profile Picture"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <FaUserCircle className="text-2xl text-gray-700" />
          )}
        </div>
        <div>
          <h2 className="text-lg font-medium">{user ? user.name : "Guest"}</h2>
          <p className="text-sm text-gray-500">
            {user ? user.email : "You are not logged in"}
          </p>
        </div>
      </div>

      <hr className="my-4" />

     

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
     
    </div>
  );
}
