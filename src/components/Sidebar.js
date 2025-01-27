import { Checkbox, CheckboxGroup, Avatar } from "actify";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

export default function Sidebar({ user, categoryList, setFilterCategory }) {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (selected) => {
    setSelectedCategories(selected);
    setFilterCategory(selected);
  };

  const isLoading = !categoryList || categoryList.length === 0;

  return (
  <div className="shadow-md w-64 p-4 sticky top-0 h-screen bg-primary-container">
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
          <h2 className="text-lg font-medium text-on-primary-container">{user ? user.name : "Guest"}</h2>
          <p className="text-sm text-on-secondary-container">
            {user ? user.email : "You are not logged in"}
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <p className="text-on-surface mb-4 text-lg font-medium">
        Filter by Category
      </p>
      {isLoading ? (
        <p className="text-on-surface-variant text-sm">Loading categories...</p>
      ) : (
        <CheckboxGroup
          label="Categories"
          value={selectedCategories}
          onChange={handleCategoryChange}
          className="space-y-3"
        >
          {categoryList.map((category) => (
            <Checkbox
              key={category}
              value={category}
              className="flex items-center space-x-3"
            >
              {category}
            </Checkbox>
          ))}
        </CheckboxGroup>
      )}
    </div>
  );
}
