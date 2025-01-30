// Made by Daksh

"use client";


import { Checkbox, CheckboxGroup, Avatar, Button } from "actify";
import Image from "next/image";
import { FaCog, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar({ user, categoryList, setFilterCategory }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const router = useRouter();

  const handleCategoryChange = (selected) => {
    setSelectedCategories(selected);
    setFilterCategory(selected);
  };

  const isLoading = !categoryList || categoryList.length === 0;

  return (
    <div className="shadow-md w-64 p-4 sticky top-0 h-screen bg-secondary-container flex flex-col">
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
          <h2 className="text-lg font-medium text-on-primary-container">
            {user ? user.name : "Guest"}
          </h2>
          <p className="text-sm text-on-secondary-container">
            {user ? user.email : "You are not logged in"}
          </p>
        </div>
      </div>

      {/* Filter Section */}
      {isLoading ? (
        <p className="text-on-surface-variant text-sm">Loading categories...</p>
      ) : (
        <CheckboxGroup
          label="Categories"
          value={selectedCategories}
          onChange={handleCategoryChange}
          className="space-y-3 text-on-primary-container text-xl"
        >
          {categoryList.map((category) => (
            <Checkbox
              key={category}
              value={category}
              className="flex items-center space-x-3 justify-center"
            >
              <p className="text-on-primary-container">{category}</p>
            </Checkbox>
          ))}
        </CheckboxGroup>
      )}

      <div className="flex-1"></div>

      <div className="flex flex-col space-y-4 p-4 rounded-lg">
        <Button
          color="secondary"
          variant="elevated"
          onClick={() =>  router.push("/settings")}
        >
          <FaCog className="inline text-on-primary-container text-2xl" />
        </Button>
        </div>
    </div>
  );
}
