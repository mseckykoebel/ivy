import React, { useState, useEffect } from "react";
import SearchItem from "./SearchItem";
import fetch from "cross-fetch";

const Search: React.FC<{
  courseNumber: string;
  school: string;
  course: string;
}> = ({ courseNumber, school, course }): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<
    { CLASSDESCR: { COURSE_TITLE: string } }[]
  >([]);
  const [searchResult, setSearchResult] = useState("");

  useEffect(() => {
    const url = `https://northwestern-prod.apigee.net/student-system-classdescrallcls/${courseNumber}/${school}/${course}`;
    const loadPosts = async () => {
      setLoading(true);
      const response = await fetch(url, {
        mode: "cors",
        headers: {
          apiKey: process.env.REACT_APP_COURSE_API_KEY as string
        },
      });
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      const data = await response.json();
      console.log(data);
      setSearchResult(data);
      setLoading(false);
    };
    loadPosts();
  }, []);

  return (
    <div className="rounded-lg bg-white overflow-hidden shadow min-h-[4rem]">
      {/* All of the search results will be rendered here */}
      {/* All of the search results will be rendered here */}
      {/* All of the search results will be rendered here */}
      <SearchItem searchField={"Algorithms"} color={"bg-green-100"} />
      <SearchItem searchField={"Intro to Psychology"} color={"bg-pink-100"} />
      {/* LOADING STATE */}
      {loading ? (
        <div className="bg-white shadow sm:rounded-lg mb-4 m-4">
          <div className="px-4 py-5 sm:p-6">
            <div className="mt-2 max-w-xl text-sm text-center text-black">
              <p>
                No results :(, try a different search, or wait for this to load
              </p>
            </div>
          </div>
        </div>
      ) : (
        // SEARCH ITEMS NOT IN THE LOADING STATE
        courses.map((course) => (
          <SearchItem
            searchField={course.CLASSDESCR.COURSE_TITLE}
            color="bg-green-100"
          />
        ))
      )}
      {/* No results state, just a boilerplate for now */}
    </div>
  );
};

export default Search;
