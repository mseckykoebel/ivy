/* eslint-disable indent */
import { XIcon } from "@heroicons/react/outline";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ScheduleCourse } from "../../types/schedule";

interface ScheduleProps {
  scheduleCourses: ScheduleCourse[] | [];
  setScheduleCourses: Dispatch<SetStateAction<ScheduleCourse[] | []>>;
}

const Schedule: React.FC<ScheduleProps> = ({
  scheduleCourses,
  setScheduleCourses,
}): JSX.Element => {
  // UI state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  // keep track of the different termIds for rendering the number of columns
  const [quarterYearSets, setQuarterYearSets] = useState<string[] | []>([]);

  useEffect(() => {
    console.log("SCHEDULE COURSES HAVE BEEN MODIFIED: ");

    const initQuarterYearSets = () => {
      const listOfQuarterYears: string[] = [];
      for (let i = 0; i < scheduleCourses.length; i++) {
        if (!listOfQuarterYears.includes(scheduleCourses[i].termDescription)) {
          listOfQuarterYears.push(scheduleCourses[i].termDescription);
        }
      }
      console.log("THIS IS THE ARRAY OF QUARTER YEARS: ", listOfQuarterYears);
      return listOfQuarterYears;
    };

    setQuarterYearSets(initQuarterYearSets());

    console.log("QUARTER YEAR SETS: ", quarterYearSets);
  }, [scheduleCourses]);

  // remove a course based on the courseNumber
  const handleRemoveCourse = (courseId: string) => {
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
            <div className={`mx-auto max-w-7xl pb-5 ${id !== 0 ? "pt-5" : ""} -ml-8 sm:px-6 md:px-8`}>
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
                  className="col-span-1 rounded-lg shadow divide-y divide-gray-200"
                >
                  <div
                    className={`w-full flex items-center justify-between p-6 space-x-6 ${course.color}`}
                  >
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-gray-900 text-sm font-medium truncate">
                          {course.subject} {course.catalogNumber}
                        </h3>
                      </div>
                      <p className="mt-1 text-gray-500 text-sm truncate">
                        {course.subject}
                      </p>
                      {/* Requirement badge
              <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                {person.role}
              </span>
               */}
                    </div>
                    <span className="sr-only">Close</span>
                    <XIcon
                      className="relative bottom-5 left-2 text-gray-400 h-4 w-4 hover:cursor-pointer"
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
