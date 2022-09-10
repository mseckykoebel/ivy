/* eslint-disable indent */
import { XIcon } from "@heroicons/react/outline";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CourseDetail } from "../../types/courses";
import { ScheduleCourse } from "../../types/schedule";
// auth CRUD
import { useAuth } from "../../contexts/AuthContext";
import { getSchedulesByUserId } from "../../firebase/scheduleService";
import { ScheduleCourseData, ScheduleRecord } from "../../firebase/schedules";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  // state
  // these are the schedule courses after the cal has been added
  const [getSchedules, setGetSchedules] = useState<ScheduleCourse[] | []>([]);
  // keep track of the different termIds for rendering the number of columns
  const [quarterYearSets, setQuarterYearSets] = useState<string[] | []>([]);

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

  // initial render - run this to
  useEffect(() => {
    const getSchedules = async () => {
      const dataWithoutDocumentId: ScheduleCourseData[] = [];
      const dataWithoutUserId: ScheduleCourse[] = [];
      // begin
      const data = await getSchedulesByUserId(currentUser?.uid as string);
      // remove the id
      for (let i = 0; i < data.length; i++) {
        dataWithoutDocumentId.push(data[i].data);
      }
      for (let i = 0; i < dataWithoutDocumentId.length; i++) {
        const withNoUserId = dataWithoutDocumentId[i];
        delete withNoUserId.userId;
        dataWithoutUserId.push(withNoUserId);
      }
      console.log(
        "ALL THE SCHEDULES FROM THE DB IN THEIR NEW RETURNED FORM: ",
        dataWithoutUserId
      );
      // set
      setScheduleCourses(dataWithoutUserId);
    };

    getSchedules().catch((err) => {
      console.log("There was an error fetching courses from the DB: ", err);
    });
  }, []);

  // determines how to render the UI based on the current list of schedules
  useEffect(() => {
    if (scheduleCourses.length > 0) {
      const initQuarterYearSets = () => {
        const listOfQuarterYears: string[] = [];
        for (let i = 0; i < scheduleCourses.length; i++) {
          if (
            !listOfQuarterYears.includes(scheduleCourses[i].termDescription)
          ) {
            listOfQuarterYears.push(scheduleCourses[i].termDescription);
          }
        }
        console.log("THIS IS THE ARRAY OF QUARTER YEARS: ", listOfQuarterYears);
        return listOfQuarterYears;
      };

      // set the quarter/year pairs
      setQuarterYearSets(initQuarterYearSets());
    }
  }, [scheduleCourses]);

  // remove a course based on the courseNumber
  const handleRemoveCourse = (courseId: string) => {
    // HANDLE DELETION FROM THE DB

    // REMOVE FROM THE UI
    setScheduleCourses((currentCourses: ScheduleCourse[]) =>
      currentCourses.filter((course) => {
        return course.courseNumber !== courseId;
      })
    );
  };

  return (
    <>
      {scheduleCourses.length === 0 && (
        <div className="mx-auto max-w-7xl pb-0 -ml-8 sm:px-6 md:px-8">
          <h1 className="text-l font-semibold text-gray-900">
            Select a course from the search panel to start your schedule 🚀
          </h1>
        </div>
      )}

      {quarterYearSets.map((quarterYear, id) => (
        <div key={id}>
          {/* WILL BE THE TITLE OF THE RELEVANT COLUMN */}
          {scheduleCourses.length !== 0 && (
            <div
              className={`mx-auto max-w-7xl pb-5 ${
                id !== 0 ? "pt-5" : ""
              } -ml-8 sm:px-6 md:px-8`}
            >
              <h1 className="text-l font-semibold text-gray-900">
                {quarterYear}
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
                        <h3 className="text-gray-900 text-sm font-medium truncate">
                          {course.subject} {course.catalogNumber}
                        </h3>
                      </div>
                      <p className="mt-1 text-gray-500 text-sm truncate">
                        {course.courseTitle}
                      </p>
                      {/* Requirement badge
              <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                {person.role}
              </span>
               */}
                      <div className="mt-3 text-[.75rem]">
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
                      className="relative bottom-7 left-2 text-gray-400 h-4 w-4 hover:cursor-pointer"
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
