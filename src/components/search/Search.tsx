import React from "react";

const Search: React.FC<{ searchField: string, color: string }> = ({
  searchField,
  color
}): JSX.Element => {
  return (
    <div className={`${color} shadow sm:rounded-lg mb-4 m-4 hover:scale-[101%] transition-all hover:cursor-pointer`}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">CS 336</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>{searchField}</p>
        </div>
        <div className="mt-3 text-sm">
          <button
            className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
            onClick={() =>
              console.log("View more details on this course was requested!")
            }
          >
            {" "}
            View more details <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
