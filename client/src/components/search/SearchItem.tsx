import React, { Dispatch, SetStateAction, useState } from "react";
import { CalendarCourse } from "../../types/courses";

interface SearchItemProps {
  school: string;
  subject: string;
  catalogNumber: string;
  section: string;
  component: string;
  courseTitle: string;
  topic: string;
  courseNumber: string;
  // additional color prop
  color: string;
  classMeetingInfo: Record<string, string>[] | null;
  view: "Calendar" | "Schedule";
  // calendar (light prop drilling here)
  // calendar
  calendarCourses: CalendarCourse[] | null;
  setCalendarCourses: any;
}
const SearchItem: React.FC<SearchItemProps> = ({
  school,
  subject,
  catalogNumber,
  section,
  component,
  courseTitle,
  topic,
  courseNumber,
  classMeetingInfo,
  color,
  view,
  calendarCourses,
  setCalendarCourses,
}): JSX.Element => {
  // error state - just works with
  const [error, setError] = useState("");

  // this updates the calendar array!
  const handleViewClick = () => {
    if (!calendarCourses) {
      setCalendarCourses([
        {
          courseNumber: courseNumber,
          school: school,
          section: section,
        },
      ]);
      return;
    }

    // see if this course is in the calendarCourses already. If not, add it
    for (let i = 0; i < calendarCourses.length; i++) {
      if (calendarCourses[i].courseNumber === courseNumber) {
        setError("Course already present!");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }
    }

    setCalendarCourses((priorCourses: CalendarCourse[]) => [
      ...priorCourses,
      {
        courseNumber: courseNumber,
        school: school,
        section: section,
      },
    ]);

    return;
  };

  return (
    <div
      className={`${color} shadow sm:rounded-lg mb-4 m-4 hover:scale-[101%] transition-all hover:cursor-pointer`}
    >
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {subject} {catalogNumber} - {courseTitle}
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>School: {school}</p>
          <p>Section: {section}</p>
          <p>Type: {component}</p>
          <p>Meeting info #: {courseNumber}</p>
          {topic.length > 0 && <p>Topic: {topic}</p>}
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
        <div className="mt-3 text-sm">
          {classMeetingInfo && classMeetingInfo?.length > 0 && (
            <button
              // disable
              className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
              onClick={() => handleViewClick()}
            >
              {" "}
              Add to {view} <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
        {/* If there were any errors */}
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          {error && <p>Error: {error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
