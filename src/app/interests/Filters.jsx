// Chin Ray wrote this

import { Checkbox } from "actify";
export function Categories({ categoryList, onCategoryChange }) {
    return (
      <>
        <h2 className="text-lg font-semibold text-on-primary-container mb-4 mt-5">Categories</h2>
        <div className="rounded-lg mb-6">
          <div className="flex flex-wrap space-x-10">
            {categoryList.map((category) => (
              <label
                key={category}
<<<<<<< HEAD
                className="flex items-center text-on-primary-container"
=======
                className="flex items-center space-x-2 text-on-primary-container"
>>>>>>> 289d11a (Theming)
              >
                <Checkbox
                  type="checkbox"
                  value={category}
                  //className="form-checkbox h-6 w-6 text-blue-600"
                  onChange={() => onCategoryChange(category)}
                />
                <span className="text-base">{category}</span>
              </label>
            ))}
          </div>
        </div>
      </>
    );
  }