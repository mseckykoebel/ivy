/* eslint-disable indent */
// ^ IDEK
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import SearchItem from "./SearchItem";
import fetch from "cross-fetch";
import { shuffleArray } from "../../lib/randomizeList";
import { getColorBySchool } from "../../lib/getColorBySchool";
import { CourseDetail } from "../../types/courses";
import { CalendarCourse } from "../../types/calendar";
import { ScheduleCourse } from "../../types/schedule";

interface SearchProps {
  year: string | undefined;
  quarter: string | undefined;
  school: any | null;
  termId: string | null;
  searchQuery: string;
  view: "Calendar" | "Schedule";
  // calendar (light prop drilling here)
  calendarCourses: CalendarCourse[] | [];
  setCalendarCourses: Dispatch<SetStateAction<CalendarCourse[] | []>>;
  // schedule (light prop drilling here)
  scheduleCourses: ScheduleCourse[] | [];
  setScheduleCourses: Dispatch<SetStateAction<ScheduleCourse[] | []>>;
  // course detail (light prop drilling here)
  courseDetail: CourseDetail | null;
  setCourseDetail: Dispatch<SetStateAction<CourseDetail | null>>;
  setOpenDetailModal: Dispatch<SetStateAction<boolean>>;
}

const Search: React.FC<SearchProps> = ({
  year,
  quarter,
  school,
  termId,
  searchQuery,
  view,
  calendarCourses,
  setCalendarCourses,
  scheduleCourses,
  setScheduleCourses,
  courseDetail,
  setCourseDetail,
  setOpenDetailModal,
}): JSX.Element => {
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // searching
  const [courses, setCourses] = useState<Record<string, any> | null>(null);

  // handling filtering of all courses
  const filteredCourses =
    searchQuery === "" || !courses
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
    setError("");
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
        setError(
          "Uh oh! No courses like that are in the system 🥸. Please try a new query."
        );
        return;
      }
      if (response.status === 500) {
        setError(
          "Uh oh! Error fetching courses on our end. Please try a new query"
        );
        return;
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
      {!courses && termId && error === "" && (
        <div className="bg-white shadow-none sm:rounded-lg mb-4 m-4">
          <div className="px-4 py-5 sm:p-6">
            <div className="mt-2 max-w-xl text-sm text-center text-black">
              <p>
                Searching for courses...hang tight! Sometimes older searches can
                take a while.
              </p>
            </div>
          </div>
        </div>
      )}

      {filteredCourses &&
        filteredCourses.length === 0 &&
        searchQuery === "" &&
        courses
          ?.filter((course: Record<string, any>) => {
            if (course.school === undefined || !school) return filteredCourses;
            return course.school.includes(school.school);
          })
          .slice(0, 100)
          .map((course: Record<string, any>) => {
            return (
              <SearchItem
                key={course.id}
                termId={termId as string}
                school={course.school}
                subject={course.subject}
                catalogNumber={course.data.catalogNumber}
                section={course.data.section}
                component={course.data.component}
                courseTitle={course.data.courseTitle}
                topic={course.data.topic}
                courseNumber={course.data.courseNumber}
                classMeetingInfo={course.data.classMeetingInfo}
                startDate={course.startDate}
                color={getColorBySchool(course.school)}
                view={view}
                // bad prop drilling
                // calendar
                calendarCourses={calendarCourses}
                setCalendarCourses={setCalendarCourses}
                // schedule
                scheduleCourses={scheduleCourses}
                setScheduleCourses={setScheduleCourses}
                courseDetail={courseDetail}
                setCourseDetail={setCourseDetail}
                setOpenDetailModal={setOpenDetailModal}
              />
            );
          })}

      {filteredCourses &&
        filteredCourses.length > 0 &&
        filteredCourses
          .filter((course: Record<string, any>) => {
            if (course.school === undefined || !school) return filteredCourses;
            return course.school.includes(school.school);
          })
          .slice(0, 100)
          .map((course: Record<string, any>) => {
            return (
              <SearchItem
                key={course.id}
                termId={termId as string}
                school={course.school}
                subject={course.subject}
                catalogNumber={course.data.catalogNumber}
                section={course.data.section}
                component={course.data.component}
                courseTitle={course.data.courseTitle}
                topic={course.data.topic}
                courseNumber={course.data.courseNumber}
                classMeetingInfo={course.data.classMeetingInfo}
                startDate={course.startDate}
                color={getColorBySchool(course.school)}
                view={view}
                // bad prop drilling
                // calendar
                calendarCourses={calendarCourses}
                setCalendarCourses={setCalendarCourses}
                // schedule
                scheduleCourses={scheduleCourses}
                setScheduleCourses={setScheduleCourses}
                courseDetail={courseDetail}
                setCourseDetail={setCourseDetail}
                setOpenDetailModal={setOpenDetailModal}
              />
            );
          })}

      {searchQuery !== "" && filteredCourses.length === 0 && error === "" && (
        <p className="p-4 text-sm text-gray-500">No courses found.</p>
      )}

      {error && <p className="p-4 text-sm text-red-500">Error: {error}</p>}
    </div>
  );
};

export default Search;
