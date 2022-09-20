/* eslint-disable indent */
import React, { Dispatch, SetStateAction, useState } from "react";
import { CourseDetail } from "../../types/courses";
import { ScheduleCourse } from "../../types/schedule";
import { CalendarCourse } from "../../types/calendar";

interface SearchItemProps {
  termId: string;
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
  classMeetingInfo: { ROOM: string; MEETING_TIME: string }[] | [];
  termDescription: string;
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
const SearchItem: React.FC<SearchItemProps> = ({
  termId,
  school,
  subject,
  catalogNumber,
  section,
  component,
  courseTitle,
  topic,
  courseNumber,
  classMeetingInfo,
  termDescription,
  color,
  view,
  calendarCourses,
  setCalendarCourses,
  scheduleCourses,
  setScheduleCourses,
  courseDetail,
  setCourseDetail,
  setOpenDetailModal,
}): JSX.Element => {
  // error state - just works with
  const [error, setError] = useState("");

  // this updates either the schedule or the calendar array!
  // refactor this in v1.1
  const handleViewClick = (view: "Calendar" | "Schedule") => {
    if (view === "Calendar") {
      if (!calendarCourses) {
        setCalendarCourses([
          {
            termId: termId,
            school: school,
            subject: subject,
            catalogNumber: catalogNumber,
            courseNumber: courseNumber,
            classMeetingInfo: classMeetingInfo,
            color: color,
          },
        ]);
        return;
      }

      // see if this course is in the calendarCourses already. If not, add it
      for (let i = 0; i < calendarCourses.length; i++) {
        if (calendarCourses[i].courseNumber === courseNumber) {
          setError(`Course already present in ${view.toLowerCase()}!`);
          setTimeout(() => {
            setError("");
          }, 3000);
          return;
        }
      }

      setCalendarCourses((priorCourses: CalendarCourse[]) => [
        ...priorCourses,
        {
          termId: termId,
          school: school,
          subject: subject,
          catalogNumber: catalogNumber,
          courseNumber: courseNumber,
          classMeetingInfo: classMeetingInfo,
          color: color,
        },
      ]);
    } else {
      if (!scheduleCourses) {
        setScheduleCourses([
          {
            termId: termId,
            school: school,
            subject: subject,
            courseTitle: courseTitle,
            catalogNumber: catalogNumber,
            courseNumber: courseNumber,
            classMeetingInfo: classMeetingInfo,
            termDescription: termDescription,
            color: color,
          },
        ]);
        return;
      }

      // see if this course is in the calendarCourses already. If not, add it
      for (let i = 0; i < scheduleCourses.length; i++) {
        if (scheduleCourses[i].courseNumber === courseNumber) {
          setError(`Course already present in ${view.toLowerCase()}!`);
          setTimeout(() => {
            setError("");
          }, 3000);
          return;
        }
      }

      setScheduleCourses((priorCourses: ScheduleCourse[]) => [
        ...priorCourses,
        {
          termId: termId,
          school: school,
          subject: subject,
          courseTitle: courseTitle,
          catalogNumber: catalogNumber,
          courseNumber: courseNumber,
          classMeetingInfo: classMeetingInfo,
          termDescription: termDescription,
          color: color,
        },
      ]);
    }

    return;
  };

  // this updates the current course detail, and opens the course detail modal from the home page
  const handleDetailClick = () => {
    setCourseDetail(() => ({
      termId: termId,
      school: school,
      subject: subject,
      courseNumber: courseNumber,
    }));
    setOpenDetailModal(() => true);
  };

  return (
    <div
      className={`${color} shadow sm:rounded-lg mb-4 m-4 hover:scale-[101%] transition-all hover:cursor-pointer`}
    >
      <div className="px-4 py-5 sm:p-6">
        <h3 className="font-atkinson text-xl font-semibold leading-6 text-gray-900">
          {subject} {catalogNumber} - {courseTitle}
        </h3>
        <div className="font-atkinson mt-2 max-w-xl text-sm text-gray-500">
          <p>Section: {section}</p>
          <p>Type: {component}</p>
          <p>
            Meeting time:{" "}
            {!classMeetingInfo || !classMeetingInfo.length
              ? "N/A"
              : classMeetingInfo[0].MEETING_TIME}
          </p>
        </div>
        <div className="font-atkinson mt-3 text-sm">
          <button
            className="text-[.75rem] text-indigo-600 hover:text-indigo-500 hover:underline"
            onClick={() => {
              handleDetailClick();
            }}
          >
            {" "}
            View more details <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
        <div className="font-atkinson text-sm">
          {classMeetingInfo && classMeetingInfo.length > 0 && (
            <button
              // disable
              className="text-[.75rem] text-indigo-600 hover:text-indigo-500 hover:underline"
              onClick={() => handleViewClick(view)}
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
