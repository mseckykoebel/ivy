/* eslint-disable indent */
// ^ IDEK
import React, { useState, useEffect } from "react";
import SearchItem from "./SearchItem";
import fetch from "cross-fetch";

import { shuffleArray } from "../../lib/randomizeList";
import { getColorBySchool } from "../../lib/getColorBySchool";

interface SearchProps {
  year: string | undefined;
  quarter: string | undefined;
  school: string | null;
  termId: string | null;
  searchQuery: string;
}

const Search: React.FC<SearchProps> = ({
  year,
  quarter,
  school,
  termId,
  searchQuery,
}): JSX.Element => {
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // searching
  const [courses, setCourses] = useState<Record<string, any> | null>(null);

  // handling filtering of the searchQuery
  const filteredCourses =
    searchQuery === ""
      ? []
      : courses?.filter((course: Record<string, any>) => {
          return course.data.courseTitle
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        });

  // initiate a new query when query changes
  useEffect(() => {
    // exit this if searching is not prohibited
    if (year && quarter && termId) {
      setAllCourses();
    }
  }, [termId]);

  const setAllCourses = () => {
    setCourses(null);
    console.log("GETTING ALL COURSES WITH TERM ID: ", termId);
    const loadCourses = async () => {
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
      let courseData = [];
      // process the courses in a way that's useful
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].data.length; j++) {
          const courseDataShape = {
            data: data[i].data[j],
            school: data[i].school,
            subject: data[i].subject,
          };
          courseData.push(courseDataShape);
        }
      }
      courseData = shuffleArray(courseData);

      console.log("COURSE DATA: ", courseData[0].data);

      setCourses(courseData);
      setLoading(false);
    };

    return new Promise<void>((resolve) => {
      loadCourses().then(() => resolve());
    });
  };

  return (
    <div className="rounded-lg bg-white overflow-auto shadow h-[46rem]">
      {/* All of the search results will be rendered here */}
      {/* All of the search results will be rendered here */}
      {/* All of the search results will be rendered here */}
      {/* LOADING STATE */}
      {!courses && termId && (
        <div className="bg-white shadow-none sm:rounded-lg mb-4 m-4">
          <div className="px-4 py-5 sm:p-6">
            <div className="mt-2 max-w-xl text-sm text-center text-black">
              <p>Searching for courses...</p>
            </div>
          </div>
        </div>
      )}

      {filteredCourses.length > 0 &&
        filteredCourses.map((course: Record<string, any>) => {
          return (
            <SearchItem
              key={
                course.school +
                course.subject +
                course.data.catalogNumber +
                course.data.section +
                course.data.component +
                course.data.courseTitle +
                course.data.topic
              }
              school={course.school}
              subject={course.subject}
              catalogNumber={course.data.catalogNumber}
              section={course.data.section}
              component={course.data.component}
              courseTitle={course.data.courseTitle}
              topic={course.data.topic}
              color={getColorBySchool(course.school)}
            />
          );
        })}

      {searchQuery !== "" && filteredCourses.length === 0 && (
        <p className="p-4 text-sm text-gray-500">No courses found.</p>
      )}
    </div>
  );
};

export default Search;
