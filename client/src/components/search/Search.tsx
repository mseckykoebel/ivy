import React, { useState, useEffect } from "react";
import SearchItem from "./SearchItem";
import fetch from "cross-fetch";

import { UndergraduateCourseDetail } from "../../types/courses";
import { shuffleArray } from "../../lib/randomizeList";
import { getColorBySchool } from "../../lib/getColorBySchool";

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
      let courseData = [];
      // process the courses in a way that's useful
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].data.length; j++) {
          const courseDataShape = {
            data: data[i].data[j],
            school: data[i].school,
          };
          courseData.push(courseDataShape);
        }
      }
      courseData = shuffleArray(courseData);

      setCourses(courseData);
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
      {/* LOADING STATE */}
      {!courses && (
        <div className="bg-white shadow sm:rounded-lg mb-4 m-4">
          <div className="px-4 py-5 sm:p-6">
            <div className="mt-2 max-w-xl text-sm text-center text-black">
              <p>Searching for courses...</p>
            </div>
          </div>
        </div>
      )}
      {courses &&
        courses.map((course: Record<string, any>) => {
          return (
            <SearchItem
              school={course.school}
              catalogNumber={course.data.catalogNumber}
              section={course.data.section}
              component={course.data.component}
              courseTitle={course.data.courseTitle}
              topic={course.data.topic}
              color={getColorBySchool(course.school)}
            />
          );
        })}
    </div>
  );
};

export default Search;
