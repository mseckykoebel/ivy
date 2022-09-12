/* eslint-disable indent */
import { XIcon } from "@heroicons/react/outline";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { CourseDetail } from "../../types/courses";
import { ScheduleCourse } from "../../types/schedule";
// auth CRUD
import { useAuth } from "../../contexts/AuthContext";
import {
  createSchedulesArrayAddCourse,
  getSchedulesByUserId,
  updateSchedulesArrayAddCourse,
  updateSchedulesArrayRemoveCourse,
} from "../../firebase/scheduleService";
import {
  bubbleSortByQuarter,
  bubbleSortByYear,
  quarterMap,
} from "../../lib/utils";

interface ScheduleProps {
  // clicking on detail modal
  courseDetail: CourseDetail | null;
  setCourseDetail: Dispatch<SetStateAction<CourseDetail | null>>;
  scheduleCourses: ScheduleCourse[] | [];
  setScheduleCourses: Dispatch<SetStateAction<ScheduleCourse[] | []>>;
  setOpenDetailModal: Dispatch<SetStateAction<boolean>>;
}

const Schedule: React.FC<ScheduleProps> = ({
  courseDetail,
  setCourseDetail,
  scheduleCourses,
  setScheduleCourses,
  setOpenDetailModal,
}): JSX.Element => {
  // init auth
  const { currentUser } = useAuth();
  // UI state
  const loadingRef = useRef(false);
  const [error, setError] = useState<boolean>(false);
  // state
  // these are the schedule courses after the cal has been added
  const [getSchedules, setGetSchedules] = useState<ScheduleCourse[] | []>([]);
  // keep track of the different termIds for rendering the number of columns
  const [quarterYearSets, setQuarterYearSets] = useState<string[] | []>([]);
  const [scheduleId, setScheduleId] = useState<string>("");

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

  // this determines the array of "YEAR SEASON" combinations we have in the UI
  const initQuarterYearSets = () => {
    const listOfQuarterYears: string[] = [];
    for (let i = 0; i < scheduleCourses.length; i++) {
      if (!listOfQuarterYears.includes(scheduleCourses[i].termDescription)) {
        listOfQuarterYears.push(scheduleCourses[i].termDescription);
      }
    }
    // sort the list of quarters
    const sortedByQuarter = bubbleSortByQuarter(listOfQuarterYears);
    return bubbleSortByYear(sortedByQuarter);
  };

  // initial render - run this to get the list of courses from the DB, and then
  // render them in the correct "YEAR SEASON" buckets
  useEffect(() => {
    if (currentUser?.email !== "msk@gmail.com") {
      const getScheduleFromFirebase = async () => {
        loadingRef.current = true;
        const courseDataFromDb: ScheduleCourse[] = [];
        // begin
        const scheduleRecords = await getSchedulesByUserId(
          currentUser?.uid as string
        );
        // if this is null, there are no schedule records, and we can continue
        if (!scheduleRecords) return;
        // remove the id
        for (let j = 0; j < scheduleRecords.data.coursesData.length; j++) {
          courseDataFromDb.push(scheduleRecords.data.coursesData[j]);
        }
        // set the document ID for this schedule, and the schedules for this course
        setScheduleId(scheduleRecords.id);
        setScheduleCourses(courseDataFromDb);
      };

      getScheduleFromFirebase()
        .then(() => {
          setQuarterYearSets(initQuarterYearSets());
          loadingRef.current = false;
        })
        .catch((err) => {
          console.log("There was an error fetching courses from the DB: ", err);
        });
    }
  }, []);

  // big 🎣
  // determines how to write to the DB with changes
  useEffect(() => {
    console.log("LOADING: ", loadingRef.current);
    if (scheduleCourses.length > 0) {
      // set the quarter/year pairs
      setQuarterYearSets(initQuarterYearSets());
      // update the array of courses if something was added
      // handleRemoveCourse handles removal, so we know this is an addition!
      // and, we know the last added course is the newest. So, send that one to firebase
      if (currentUser?.email !== "msk@gmail.com") {
        if (scheduleId === "" && loadingRef.current === false) {
          createSchedulesArrayAddCourse(
            currentUser?.uid as string,
            scheduleCourses[scheduleCourses.length - 1]
          ).then((documentId) => {
            setScheduleId(documentId);
          });
        } else {
          updateSchedulesArrayAddCourse(
            scheduleId,
            scheduleCourses[scheduleCourses.length - 1]
          );
        }
      }
    }
  }, [scheduleCourses]);

  // remove a course based on the courseNumber
  const handleRemoveCourse = (courseId: string) => {
    const courseToRemove = scheduleCourses.filter((course) => {
      return course.courseNumber === courseId;
    });
    // HANDLE DELETION FROM THE DB
    if (currentUser?.email !== "msk@gmail.com") {
      updateSchedulesArrayRemoveCourse(scheduleId, courseToRemove[0]);
    }

    // REMOVE FROM THE UI
    setScheduleCourses((currentCourses: ScheduleCourse[]) =>
      currentCourses.filter((course) => {
        return course.courseNumber !== courseId;
      })
    );
  };

  return (
    <>
      {loadingRef.current && scheduleCourses.length < 1 && (
        <div className="font-atkinson mx-auto max-w-7xl pb-0 -ml-8 sm:px-6 md:px-8">
          <h1 className="text-xs font-semibold text-gray-900">Loading...</h1>
        </div>
      )}

      {!loadingRef.current && scheduleId === "" && scheduleCourses.length < 1 && (
        <div className="font-atkinson mx-auto max-w-7xl pb-0 -ml-8 sm:px-6 md:px-8">
          <h1 className="text-l font-semibold text-gray-900">
            Welcome to Ivy's schedule pane! Select a course from the search
            panel to start your schedule 👉
          </h1>
        </div>
      )}

      {!loadingRef.current && scheduleId !== "" && scheduleCourses.length < 1 && (
        <div className="font-atkinson mx-auto max-w-7xl pb-0 -ml-8 sm:px-6 md:px-8">
          <h1 className="text-l font-semibold text-gray-900">
            Select a course from the search panel to start your schedule 👉
          </h1>
        </div>
      )}

      {quarterYearSets.map((quarterYear, id) => (
        <div
          key={id}
          className="rounded-lg bg-white px-4 py-5 border-[1px] border-gray-200 mb-5"
        >
          {/* WILL BE THE TITLE OF THE RELEVANT COLUMN */}
          {scheduleCourses.length !== 0 && (
            <div className="mx-auto max-w-7xl pb-5 -ml-8 sm:px-6 md:px-8">
              <h1 className="text-2xl font-atkinson text-gray-900">
                {quarterMap(quarterYear)}
              </h1>
            </div>
          )}
          <ul
            className={`grid grid-cols-1 gap-6 sm:${
              scheduleCourses.length === 5 ? "grid-cols-3" : "grid-cols-3"
            } lg:${
              scheduleCourses.length === 5 ? "grid-cols-3" : "grid-cols-3"
            }`}
          >
            {scheduleCourses
              .filter((course) => course.termDescription === quarterYear)
              .map((course, id) => (
                <li
                  key={id}
                  className="col-span-1 shadow sm:rounded-lg hover:scale-[101%] transition-all hover:cursor-pointer divide-y divide-gray-200"
                >
                  <div
                    className={`w-full flex items-center sm:rounded-lg justify-between p-6 space-x-6 ${course.color}`}
                  >
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-gray-900 text-md font-bold font-atkinson truncate">
                          {course.subject} {course.catalogNumber}
                        </h3>
                      </div>
                      <p className="font-atkinson mt-1 text-gray-500 text-sm truncate">
                        {course.courseTitle}
                      </p>
                      <p className="font-atkinson mt-1 text-gray-500 text-sm truncate">
                        {course.school}
                      </p>
                      {/* Requirement badge
              <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                {person.role}
              </span>
               */}
                      <div className="font-atkinson mt-3 text-[.75rem]">
                        <button
                          className="font-small text-indigo-600 hover:text-indigo-500 hover:underline"
                          onClick={() => {
                            console.log(
                              "View more details on this course was requested!"
                            );
                            handleDetailClick(
                              course.termId,
                              course.school,
                              course.subject,
                              course.courseNumber
                            );
                          }}
                        >
                          {" "}
                          View more details{" "}
                          <span aria-hidden="true">&rarr;</span>
                        </button>
                      </div>
                    </div>
                    <span className="sr-only">Close</span>
                    <XIcon
                      className="relative bottom-10 left-2 text-gray-400 h-4 w-4 hover:cursor-pointer"
                      onClick={() => handleRemoveCourse(course.courseNumber)}
                      aria-hidden="true"
                    />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default Schedule;
