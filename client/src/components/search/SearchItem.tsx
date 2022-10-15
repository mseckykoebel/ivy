/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable indent */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CourseDetail } from "../../types/courses";
import { ScheduleCourse } from "../../types/schedule";
import { CalendarCourse } from "../../types/calendar";
import { Warning } from "../notifications/Warning";
import {
  getCourseDaysJustDays,
  getLengthOfTime,
  getStartingTimeInMinutesSinceTwelve,
} from "../../lib/calendar";
import { XIcon } from "@heroicons/react/outline";

interface SearchItemProps {
  termId: string;
  searchQuery: string;
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
  searchQuery,
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
  const [loading, setLoading] = useState(false);
  // associated classes
  const [associatedClasses, setAssociatedClasses] = useState<any[]>([]);
  const [areThereAssociatedClasses, setAreThereAssociatedClasses] =
    useState(false);
  // warning modal
  const [warningModal, setWarningModal] = useState<boolean>(false);
  const [courseCollision, setCourseCollision] = useState<boolean>(false);
  const [conflictingCourse, setConflictingCourse] = useState<
    CalendarCourse | ""
  >("");

  // this updates either the schedule or the calendar array!
  // refactor this in v1.1

  useEffect(() => {
    setAreThereAssociatedClasses(false);
  }, [searchQuery]);

  const handleCollisionCheck = () => {
    // first, see if there is a collision with existing courses
    getStartingTimeInMinutesSinceTwelve;
    const thisCoursesStartTime = getStartingTimeInMinutesSinceTwelve(
      classMeetingInfo[0].MEETING_TIME
    );
    const thisCoursesLength = getLengthOfTime(classMeetingInfo[0].MEETING_TIME);

    const courseLengths = [];
    const courseStartTimes = [];
    const courseDays = [];
    for (let i = 0; i < calendarCourses.length; i++) {
      courseLengths.push(
        getLengthOfTime(calendarCourses[i].classMeetingInfo![0].MEETING_TIME)
      );
      courseStartTimes.push(
        getStartingTimeInMinutesSinceTwelve(
          calendarCourses[i].classMeetingInfo![0].MEETING_TIME
        )
      );
      courseDays.push(
        getCourseDaysJustDays(
          calendarCourses[i].classMeetingInfo![0].MEETING_TIME
        )
      );
    }

    // TODO: course collision detection happens here
    for (let i = 0; i < courseLengths.length; i++) {
      if (
        thisCoursesStartTime < courseStartTimes[i] + courseLengths[i] ||
        thisCoursesStartTime + thisCoursesLength <
          courseStartTimes[i] + courseLengths[i]
      ) {
        console.log("CONFLICT!");
        // no complicated conflict handling yet
        // setConflictingCourse(calendarCourses[i]);
        // setCourseCollision(true);
        // setWarningModal(true);
        // return;
      }
    }
    handleViewClick("Calendar");
  };

  const handleViewClick = (view: "Calendar" | "Schedule") => {
    // CALENDAR
    // CALENDAR
    // CALENDAR
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
      // SCHEDULES
      // SCHEDULES
      // SCHEDULES
      // SCHEDULES
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

    checkForAssociatedCourses();
    return;
  };

  const addAssociatedClassTo = (
    view: "Calendar" | "Schedule",
    associatedCourse: {
      COMPONENT: string;
      CLASS_MTG_INFO2: { ROOM: string; MEETING_TIME: string }[];
    },
    discussion_index: number
  ) => {
    if (view === "Schedule") {
      setScheduleCourses((priorCourses: ScheduleCourse[]) => [
        ...priorCourses,
        {
          termId: termId,
          school: school,
          subject: subject,
          courseTitle:
            courseTitle + associatedCourse.COMPONENT === "DIS"
              ? "Discussion"
              : associatedCourse.COMPONENT,
          catalogNumber: catalogNumber,
          courseNumber: courseNumber + discussion_index,
          classMeetingInfo: associatedCourse.CLASS_MTG_INFO2,
          termDescription: termDescription,
          color: color,
        },
      ]);
    } else {
      console.log("CALENDAR UPDATE");
      setCalendarCourses((priorCourses: CalendarCourse[]) => [
        ...priorCourses,
        {
          termId: termId,
          school: school,
          subject: subject,
          catalogNumber: catalogNumber,
          courseNumber: courseNumber + discussion_index,
          classMeetingInfo: associatedCourse.CLASS_MTG_INFO2,
          color: color,
        },
      ]);
    }
  };

  const checkForAssociatedCourses = () => {
    const fetchAssociatedCourses = async () => {
      const associatedCoursesUrl =
        process.env.NODE_ENV !== "production"
          ? `http://localhost:3001/api/v1/get_course_associated_classes/?termId=${termId}&schoolId=${school}&subjectId=${subject}&courseId=${courseNumber}`
          : `https://ivy-api.fly.dev/api/v1/get_course_associated_classes/?termId=${termId}&schoolId=${school}&subjectId=${subject}&courseId=${courseNumber}`;

      setLoading(true);
      const response = await fetch(associatedCoursesUrl, {
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.status >= 400) {
        setError(
          "Uh oh! There was an error fetching lab and discussion sections for this course. If this course has known lab and/or discussion sections, remove and re-add this course to try again"
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
      setLoading(false);
      return data;
    };

    return new Promise<void>((resolve) => {
      fetchAssociatedCourses().then((data) => {
        if (data.body.length > 1) {
          console.log(data.body);
          setAssociatedClasses(data.body);
          setAreThereAssociatedClasses(true);
        }
        resolve();
      });
    });
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
      className={`${color} shadow sm:rounded-lg mb-4 m-4 hover:scale-[101%] transition-all`}
    >
      {/* MODALS */}
      {courseCollision && (
        <Warning
          warningDetail={`Selecting this course conflicts with another course you added to the calendar. Do you want to add it anyway?`}
          warningMessage="Warning: collision with "
          openWarningModal={warningModal}
          setOpenWarningModal={setWarningModal}
          handleViewClick={handleViewClick}
          conflictingCourse={conflictingCourse}
        />
      )}

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
              onClick={() =>
                view !== "Calendar"
                  ? handleViewClick(view)
                  : handleCollisionCheck()
              }
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
        {areThereAssociatedClasses && (
          <div
            className={`bg-white/40 overflow-hidden shadow sm:rounded-md mt-5`}
          >
            <div className="px-4 pt-4 pb-0.5 sm:px-6">
              <p className="font-atkinson text-xs font-semibold text-gray-900 pr-5 ">
                Choose a discussion section for {subject} {catalogNumber}{" "}
                (optional):
              </p>
              <XIcon
                className="relative bottom-6 left-60 text-gray-400 h-4 w-4 hover:cursor-pointer"
                onClick={() => setAreThereAssociatedClasses(false)}
                aria-hidden="true"
              />
            </div>
            <ul role="list" className="divide-y divide-gray-200">
              {associatedClasses.map(
                (
                  course: {
                    COMPONENT: string;
                    CLASS_MTG_INFO2: { ROOM: string; MEETING_TIME: string }[];
                  },
                  id: number
                ) => (
                  <li
                    key={id}
                    className="hover:scale-[101%] transition-all hover:cursor-pointer hover:bg-white/30"
                  >
                    <a
                      onClick={() => addAssociatedClassTo(view, course, id)}
                      className="block hover:bg-gray-50"
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="truncate text-sm font-medium text-gray-900">
                            {course.COMPONENT === "DIS"
                              ? "Discussion"
                              : course.COMPONENT}
                          </p>
                          <div className="ml-2 flex flex-shrink-0">
                            <p
                              className={`inline-flex rounded-full bg-green-500 px-2 text-xs font-semibold leading-5 text-white`}
                            >
                              {course.CLASS_MTG_INFO2[0].MEETING_TIME}
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          {loading && <p>Searching for associated courses...</p>}
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
