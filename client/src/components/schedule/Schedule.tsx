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

  useEffect(() => {
    console.log("SCHEDULE COURSES HAVE BEEN MODIFIED: ");

    const allCurrentScheduleCourses = [...scheduleCourses];

    console.log(allCurrentScheduleCourses);
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
    <ul
      className={`grid grid-cols-1 gap-6 sm:grid-cols-3 lg:${
        scheduleCourses.length === 4
          ? "grid-cols-4"
          : scheduleCourses.length === 5
          ? "grid-cols-5"
          : "grid-cols-3"
      }`}
    >
      {scheduleCourses.map((course, id) => (
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
          {/* 
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="w-0 flex-1 flex">
                <a
                  href={`mailto:${person.email}`}
                  className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                >
                  <MailIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-3">Email</span>
                </a>
              </div>
              <div className="-ml-px w-0 flex-1 flex">
                <a
                  href={`tel:${person.telephone}`}
                  className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                >
                  <PhoneIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="ml-3">Call</span>
                </a>
              </div>
            </div>
          </div>
           */}
        </li>
      ))}
    </ul>
  );
};

export default Schedule;
