import React, { useState, useEffect } from "react";
import SearchItem from "./SearchItem";
import fetch from "cross-fetch";

interface SearchProps {
  year: string | undefined;
  quarter: string | undefined;
  school: string | null;
  termId: string | null;
}

const Search: React.FC<SearchProps> = ({
  year,
  quarter,
  school,
  termId,
}): JSX.Element => {
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  // initiate a new query when query changes
  useEffect(() => {}, [query]);

  return (
    <div className="rounded-lg bg-white overflow-hidden shadow min-h-[4rem]">
      {/* All of the search results will be rendered here */}
      {/* All of the search results will be rendered here */}
      {/* All of the search results will be rendered here */}
      <SearchItem searchField={"Algorithms"} color={"bg-green-100"} />
      <SearchItem searchField={"Intro to Psychology"} color={"bg-pink-100"} />
      {/* LOADING STATE */}
      {!termId && (
        <div className="bg-white shadow sm:rounded-lg mb-4 m-4">
          <div className="px-4 py-5 sm:p-6">
            <div className="mt-2 max-w-xl text-sm text-center text-black">
              <p>Please select a year and quarter before searching!</p>
            </div>
          </div>
        </div>
      )}
      {/* No results state, just a boilerplate for now */}
    </div>
  );
};

export default Search;
