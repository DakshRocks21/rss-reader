// Chin Ray wrote this

export function Categories({ categoryList, onCategoryChange }) {
    return (
      <>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 mt-5">Categories</h2>
        <div className="rounded-lg mb-6 border border-gray-200">
          <div className="flex flex-wrap space-x-4">
            {categoryList.map((category) => (
              <label
                key={category}
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  value={category}
                  className="form-checkbox h-6 w-6 text-blue-600"
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