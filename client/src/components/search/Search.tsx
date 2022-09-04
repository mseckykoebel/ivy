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
  // searching
  const [courses, setCourses] = useState<Record<string, any> | null>(null);
  const [query, setQuery] = useState("");

  // initiate a new query when query changes
  useEffect(() => {
    // exit this if searching is not prohibited
    if (year && quarter && termId) {
      setAllCourses();
    }
  }, [year, quarter, termId]);

  const setAllCourses = () => {
    console.log("GETTING ALL COURSES WITH TERM ID: ", termId);
    const loadCourses = async () => {
      setCourses(null);
      const coursesUrl =
        process.env.NODE_ENV !== "production"
          ? `http://localhost:3001/api/v1/get_all_undergraduate_courses/?termId=${termId}`
          : `https://ivy-api.fly.dev/api/v1/get_all_undergraduate_courses/?termId=${termId}`;
      setLoading(true);
      const response = await fetch(coursesUrl, {
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.status >= 400) {
        setError("Uh oh! Error fetching school years");
        setTimeout(() => {
          setError("");
        }, 3000);
        throw new Error("Bad response from server");
      }
      const data = await response.json();
      console.log(data);
      setCourses(data[0].data);
      setLoading(false);
    };

    return new Promise<void>((resolve) => {
      loadCourses().then(() => resolve());
    });
  };

  return (
    <div className="rounded-lg bg-white overflow-hidden shadow min-h-[4rem]">
      {/* All of the search results will be rendered here */}
      {/* All of the search results will be rendered here */}
      {/* All of the search results will be rendered here */}
      {/* <SearchItem searchField={"Algorithms"} color={"bg-green-100"} />
      <SearchItem searchField={"Intro to Psychology"} color={"bg-pink-100"} /> */}
      {/* LOADING STATE */}
      {loading && (
        <div className="bg-white shadow sm:rounded-lg mb-4 m-4">
          <div className="px-4 py-5 sm:p-6">
            <div className="mt-2 max-w-xl text-sm text-center text-black">
              <p>Courses will appear here</p>
            </div>
          </div>
        </div>
      )}
      {courses && (
        <div className="bg-white shadow sm:rounded-lg mb-4 m-4">
          <div className="px-4 py-5 sm:p-6">
            <div className="mt-2 max-w-xl text-sm text-center text-black">
              {courses.map((course: Record<string, any>) => (
                <p>{course.courseTitle}</p>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* No results state, just a boilerplate for now */}
    </div>
  );
};

export default Search;
