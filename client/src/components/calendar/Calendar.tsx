/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable indent */
// ^ yeah
import { InformationCircleIcon, XIcon } from "@heroicons/react/outline";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { CalendarCourse } from "../../types/calendar";

// helpers
import {
  getStartingTimeMap,
  getCourseLengthMap,
  getCourseDaysMap,
  getCourseDaysJustDays,
  getStartTime,
  getEndTime,
} from "../../lib/calendar";
import { CourseDetail } from "../../types/courses";
import { useAuth } from "../../contexts/AuthContext";
import {
  createCalendarArrayAddCourse,
  getCalendarByUserId,
  updateCalendarArrayAddCourse,
  updateCalendarArrayRemoveCourse,
} from "../../firebase/calendarService";

interface CalendarProps {
  calendarCourses: CalendarCourse[] | [];
  setCalendarCourses: Dispatch<SetStateAction<CalendarCourse[] | []>>;
  setOpenDetailModal: Dispatch<SetStateAction<boolean>>;
  setCourseDetail: Dispatch<SetStateAction<CourseDetail | null>>;
}

const Calendar: React.FC<CalendarProps> = ({
  calendarCourses,
  setCalendarCourses, // for when you need to remove an item from the calendar
  setOpenDetailModal,
  setCourseDetail,
}): JSX.Element => {
  // init auth
  const { currentUser } = useAuth();
  // again, shitty
  const container: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const containerNav: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const containerOffset: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  // the height of the calendar in REM
  const calHeight = 2.1;
  // state (these are the courses that we are going to loop through)
  const [renderedCourses, setRenderedCourses] = useState<CalendarCourse[] | []>(
    []
  );
  // current calendar
  const [calendarId, setCalendarId] = useState<string>("");
  // hover css
  const [courseBeingHovered, setCourseBeingHovered] = useState<number | null>(
    null
  );
  // ref
  const loadingRef = useRef(false);

  useEffect(() => {
    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60;
    (container.current as HTMLDivElement).scrollTop =
      (((container.current as HTMLDivElement).scrollHeight -
        (container.current as HTMLDivElement).offsetHeight -
        (container.current as HTMLDivElement).offsetHeight) *
        currentMinute) /
      1440;
  }, []);

  // initial render - get the list of calendars from the DB
  useEffect(() => {
    if (currentUser?.email !== "msk@gmail.com") {
      const getCalendarFromFirebase = async () => {
        loadingRef.current = true;
        const courseDataFromDb: CalendarCourse[] = [];
        const calendarRecords = await getCalendarByUserId(
          currentUser?.uid as string
        );
        // if this is null, there are no calendar record, and we can continue
        if (!calendarRecords) return;
        // remove the id
        for (let j = 0; j < calendarRecords.data.coursesData.length; j++) {
          courseDataFromDb.push(calendarRecords.data.coursesData[j]);
        }
        // set the document ID for this schedule, and the schedules for this course
        setCalendarId(calendarRecords.id);
        setCalendarCourses(courseDataFromDb);
      };

      getCalendarFromFirebase()
        .then(() => {
          console.log("Done loading!");
          loadingRef.current = false;
          console.log(loadingRef.current);
        })
        .catch((err) => {
          console.log("There was an error fetching courses from the DB: ", err);
        });
    }
  }, []);

  // update to the DB when the current list of courses changes
  useEffect(() => {
    console.log("THIS FIRED");
    if (calendarCourses.length > 0) {
      if (currentUser?.email !== "msk@gmail.com") {
        if (calendarId === "" && loadingRef.current === false) {
          createCalendarArrayAddCourse(
            currentUser?.uid as string,
            calendarCourses[calendarCourses.length - 1]
          ).then((documentId) => {
            setCalendarId(documentId);
          });
        } else {
          if (calendarId !== "") {
            updateCalendarArrayAddCourse(
              calendarId,
              calendarCourses[calendarCourses.length - 1]
            );
          }
        }
      }
    }
  }, [calendarCourses]);

  const updateCourses = (coursesToUpdate: CalendarCourse[]) => {
    // must find when courses are offered
    const getNumberOfCourses = () => {
      const newCourses: CalendarCourse[] = [];
      console.log("CURRENT COURSES: ", coursesToUpdate);
      for (let i = 0; i < coursesToUpdate.length; i++) {
        const thisCoursesIteration = { ...coursesToUpdate[i] };
        console.log("NOW ITERATING: ", thisCoursesIteration);
        const days: string[] = [];
        const daysOfWeekThisCourseIsOffered = getCourseDaysJustDays(
          thisCoursesIteration.classMeetingInfo[0].MEETING_TIME
        );

        console.log(
          "THE WEEK THIS IS OFFERED: ",
          daysOfWeekThisCourseIsOffered
        );

        if (new RegExp("Mo").test(daysOfWeekThisCourseIsOffered) === true)
          days.push("Mo");
        if (new RegExp("Tu").test(daysOfWeekThisCourseIsOffered) === true)
          days.push("Tu");
        if (new RegExp("We").test(daysOfWeekThisCourseIsOffered) === true)
          days.push("We");
        if (new RegExp("Th").test(daysOfWeekThisCourseIsOffered) === true)
          days.push("Th");
        if (new RegExp("Fr").test(daysOfWeekThisCourseIsOffered) === true)
          days.push("Fr");

        const meetingTimeSplit =
          thisCoursesIteration.classMeetingInfo[0].MEETING_TIME.split(" ");
        // get just the meeting times
        const meetingTimes: string[] = [];
        for (let j = 0; j < days.length; j++) {
          meetingTimeSplit.shift();
          meetingTimeSplit.unshift(days[j]);
          const newMeetingTime = meetingTimeSplit.join(" ");
          meetingTimes.push(newMeetingTime);
        }
        for (let j = 0; j < days.length; j++) {
          newCourses.push({
            ...thisCoursesIteration,
            classMeetingInfo: thisCoursesIteration.classMeetingInfo.map(
              (item) => ({ ...item })
            ),
          });
          newCourses[newCourses.length - 1].classMeetingInfo[0].MEETING_TIME =
            meetingTimes[j];
        }
      }
      console.log("NEW COURSES: ", newCourses);

      return newCourses;
    };
    setRenderedCourses(getNumberOfCourses);
  };

  // updates the UI based on the courses present in the courses array
  // BIG ASSUMPTION: assume that the first element in the classMeetingInfo
  // array is accurate. Do not look at the others.
  // Meaning - take the first element as gospel - this is when the course meets
  useEffect(() => {
    const allCurrentCourses = [...calendarCourses];
    console.log("ALL CALENDAR COURSES");
    updateCourses(allCurrentCourses);
  }, [calendarCourses]);

  const handleRemoveCourse = (courseId: string) => {
    // GET THE COURSE WE ARE REMOVING
    const courseToRemove = calendarCourses.filter((course) => {
      return course.courseNumber === courseId;
    });
    // HANDLE DELETION FROM THE DB
    if (currentUser?.email !== "msk@gmail.com") {
      updateCalendarArrayRemoveCourse(calendarId, courseToRemove[0]);
    }
    // REMOVE FROM THE UI
    setCalendarCourses((currentCourses: CalendarCourse[]) =>
      currentCourses.filter((course) => {
        return course.courseNumber !== courseId;
      })
    );
  };

  // this updates the current course detail, and opens the course detail modal from the home page
  const handleDetailClick = (
    termId: string,
    school: string,
    subject: string,
    courseNumber: string
  ) => {
    setCourseDetail(() => ({
      termId: termId,
      school: school,
      subject: subject,
      courseNumber: courseNumber,
    }));
    setOpenDetailModal(() => true);
  };

  return (
    <div className="flex h-full flex-col z-2">
      {calendarId === "" && calendarCourses.length < 1 && (
        <div className="font-atkinson mx-auto h-16 max-w-7xl pb-0 -ml-8 mt-4 sm:px-6 md:px-8">
          <h1 className="text-l font-semibold text-gray-900">
            Welcome to Ivy's calendar pane! Select a year and quarter from the
            search panel to select a course and start your calendar 👉
          </h1>
        </div>
      )}

      {!loadingRef.current && calendarId !== "" && calendarCourses.length < 1 && (
        <div className="font-atkinson mx-auto max-w-7xl pb-0 -ml-8 sm:px-6 md:px-8">
          <h1 className="text-l font-semibold text-gray-900">
            Select a year and quarter from the search panel to select a course
            and start your calendar 👉
          </h1>
        </div>
      )}

      <div
        ref={container}
        className="flex flex-auto flex-col overflow-auto bg-white"
      >
        <div
          style={{ width: "165%" }}
          className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
        >
          {!loadingRef.current &&
            calendarId !== "" &&
            calendarCourses.length >= 1 && (
              <>
                <div
                  ref={containerNav}
                  className="sticky top-0 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
                >
                  <div className="font-atkinson grid grid-cols-5 text-sm leading-6 text-gray-500 sm:hidden">
                    <button
                      type="button"
                      className="flex flex-col items-center pt-2 pb-3"
                    >
                      M{" "}
                    </button>
                    <button
                      type="button"
                      className="flex flex-col items-center pt-2 pb-3"
                    >
                      T{" "}
                    </button>
                    <button
                      type="button"
                      className="flex flex-col items-center pt-2 pb-3"
                    >
                      W{" "}
                    </button>
                    <button
                      type="button"
                      className="flex flex-col items-center pt-2 pb-3"
                    >
                      T{" "}
                    </button>
                    <button
                      type="button"
                      className="flex flex-col items-center pt-2 pb-3"
                    >
                      F{" "}
                    </button>
                  </div>

                  <div className="font-atkinson -mr-px hidden grid-cols-5 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
                    <div className="col-end-1 w-14" />
                    <div className="flex items-center justify-center py-3">
                      <span>Mon </span>
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <span>Tue </span>
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <span className="flex items-baseline">Wed </span>
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <span>Thu </span>
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <span>Fri </span>
                    </div>
                    {/* WEEKENDS ARE NOT SUPPORTED YET
              <div className="flex items-center justify-center py-3">
                <span>
                  Sat{" "}
                  <span className="items-center justify-center font-semibold text-gray-900">
                    15
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-center py-3">
                <span>
                  Sun{" "}
                  <span className="items-center justify-center font-semibold text-gray-900">
                    16
                  </span>
                </span>
              </div> 
              */}
                  </div>
                </div>
                <div className="flex flex-auto">
                  <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
                  <div className="grid flex-auto grid-cols-1 grid-rows-1">
                    {/* HORIZONTAL LINES ON CALENDAR */}
                    {/* HORIZONTAL LINES ON CALENDAR */}
                    {/* HORIZONTAL LINES ON CALENDAR */}
                    <div
                      className="font-atkinson col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                      style={{
                        gridTemplateRows: `repeat(29, minmax(${calHeight}rem, 1fr))`,
                      }}
                    >
                      <div
                        ref={containerOffset}
                        className="row-end-1 h-5"
                      ></div>
                      <div>
                        <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                          8AM
                        </div>
                      </div>
                      <div />
                      <div>
                        <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                          9AM
                        </div>
                      </div>
                      <div />
                      <div>
                        <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                          10AM
                        </div>
                      </div>
                      <div />
                      <div>
                        <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                          11AM
                        </div>
                      </div>
                      <div />
                      <div>
                        <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                          12PM
                        </div>
                      </div>
                      <div />
                      <div>
                        <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                          1PM
                        </div>
                      </div>
                      <div />
                      <div>
                        <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                          2PM
                        </div>
                      </div>
                      <div />
                      <div>
                        <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                          3PM
                        </div>
                      </div>
                      <div />
                      <div>
                        <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                          4PM
                        </div>
                      </div>
                      <div />
                      <div>
                        <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                          5PM
                        </div>
                      </div>
                      <div />
                      <div>
                        <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                          6PM
                        </div>
                      </div>
                      <div />
                      <div>
                        <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                          7PM
                        </div>
                      </div>
                      <div />
                      <div>
                        <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                          8PM
                        </div>
                      </div>
                      <div />
                      <div>
                        <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                          9PM
                        </div>
                      </div>
                      <div />
                      <div>
                        <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                          10PM
                        </div>
                      </div>
                    </div>

                    {/* VERTICAL LINES ON CALENDAR */}
                    {/* VERTICAL LINES ON CALENDAR */}
                    {/* VERTICAL LINES ON CALENDAR */}

                    <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-5 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-5">
                      <div className="col-start-1 row-span-full" />
                      <div className="col-start-2 row-span-full" />
                      <div className="col-start-3 row-span-full" />
                      <div className="col-start-4 row-span-full" />
                      <div className="col-start-5 row-span-full" />
                      <div className="col-start-6 row-span-full w-8" />
                    </div>

                    {/* EVENTS BEING RENDERED ON CALENDAR */}
                    {/* EVENTS BEING RENDERED ON CALENDAR */}
                    {/* EVENTS BEING RENDERED ON CALENDAR */}

                    <ol
                      className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-5 sm:pr-8"
                      style={{
                        gridTemplateRows:
                          ".45rem repeat(288, minmax(0, 1fr)) auto",
                      }}
                    >
                      {renderedCourses &&
                        renderedCourses.map((course, id) => {
                          return (
                            <li
                              key={id}
                              className={`relative mt-px flex ${getCourseDaysMap(
                                course.classMeetingInfo![0].MEETING_TIME
                              )}`}
                              style={{
                                gridRow: `${getStartingTimeMap(
                                  course.classMeetingInfo![0].MEETING_TIME
                                )} ${getCourseLengthMap(
                                  course.classMeetingInfo![0].MEETING_TIME
                                )}`,
                              }}
                            >
                              <div
                                className={`font-atkinson group absolute inset-1 flex flex-col overflow-y-auto rounded-lg ${
                                  course.color
                                } p-2 text-xs leading-5 ${
                                  courseBeingHovered ===
                                  Number(course.courseNumber)
                                    ? "cursor-pointer scale-[101%] z-10"
                                    : ""
                                } transition-all`}
                                onMouseEnter={() =>
                                  setCourseBeingHovered(
                                    Number(course.courseNumber)
                                  )
                                }
                                onMouseLeave={() => setCourseBeingHovered(null)}
                              >
                                <div className="absolute top-1 right-1 hidden pt-1 pr-1 sm:block">
                                  <button
                                    type="button"
                                    className="rounded-md bg-none text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    onClick={() =>
                                      handleRemoveCourse(course.courseNumber)
                                    }
                                  >
                                    <span className="sr-only">Close</span>
                                    <XIcon
                                      className="h-4 w-4"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                                <div className="absolute top-6 right-1 hidden pt-1 pr-1 sm:block">
                                  <button
                                    type="button"
                                    className="rounded-md bg-none text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    onClick={() =>
                                      handleDetailClick(
                                        course.termId,
                                        course.school,
                                        course.subject,
                                        course.courseNumber
                                      )
                                    }
                                  >
                                    <span className="sr-only">Close</span>
                                    <InformationCircleIcon
                                      className="h-4 w-4"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                                {course.subject.length <= 7 && (
                                  <p className="order-1 font-semibold text-gray-700">
                                    {course.subject} {course.catalogNumber}
                                  </p>
                                )}
                                {course.subject.length > 7 && (
                                  <>
                                    <p className="order-1 font-semibold text-gray-700">
                                      {course.subject}
                                    </p>
                                    <p className="order-1 font-semibold text-gray-700">
                                      {course.catalogNumber}
                                    </p>
                                  </>
                                )}
                                <p className="text-gray-400 group-hover:text-gray-700 transition-all">
                                  <time dateTime="2022-01-12T07:30">
                                    {getStartTime(
                                      course.classMeetingInfo![0].MEETING_TIME
                                    )}{" "}
                                    -{" "}
                                    {getEndTime(
                                      course.classMeetingInfo![0].MEETING_TIME
                                    )}
                                  </time>
                                </p>
                              </div>
                            </li>
                          );
                        })}
                    </ol>
                    {/* END OF RENDERING EVENTS ON THE CALENDAR */}
                    {/* END OF RENDERING EVENTS ON THE CALENDAR */}
                    {/* END OF RENDERING EVENTS ON THE CALENDAR */}
                  </div>
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
