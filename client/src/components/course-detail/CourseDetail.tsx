import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import React, {
  Fragment,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface CourseDetailProps {
  termId: string;
  school: string;
  subject: string;
  courseNumber: string;
  // modal setting
  courseDetail: boolean;
  setCourseDetail: Dispatch<SetStateAction<boolean>>;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({
  termId,
  school,
  subject,
  courseNumber,
  courseDetail,
  setCourseDetail,
}): JSX.Element => {
  // state
  const [loading, setLoading] = useState<boolean>(false);
  const [courseDetails, setCourseDetails] = useState<Record<
    string,
    string
  > | null>(null);
  const [error, setError] = useState<string>("");

  // getting the course information
  useEffect(() => {
    getCourseDetail();
  }, []);

  const getCourseDetail = () => {
    setError("");
    setCourseDetails(null);
    const loadDetails = async () => {
      const detailsUrl =
        process.env.NODE_ENV !== "production"
          ? `http://localhost:3001/api/v1/get_course_detail/?termId=${termId}&schoolId=${school}&subjectId=${subject}&courseId=${courseNumber}`
          : `https://ivy-api.fly.dev/api/v1/get_course_detail/?termId=${termId}&schoolId=${school}&subjectId=${subject}&courseId=${courseNumber}`;

      setLoading(true);
      const response = await fetch(detailsUrl, {
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
      // now, we set to be this
      const data = await response.json();
      // set data
      setCourseDetails(data.body);
      setLoading(false);
    };

    return new Promise<void>((resolve) => {
      loadDetails().then(() => resolve());
    });
  };

  return (
    <Transition.Root show={courseDetail} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={setCourseDetail}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative sm:min-w-[50rem] h-[50rem] bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-auto shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div className="absolute top-6 right-6 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    onClick={() => setCourseDetail(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                  <div className="flex justify-between px-4 py-5 sm:px-6">
                    <div className="inline-block align-middle`">
                      <h3 className="font-atkinson-bold text-lg font-medium leading-6 text-gray-900">
                        🔦 Course details
                      </h3>
                      <p className="font-atkinson mt-1 max-w-2xl text-sm text-gray-500">
                        All the info we have on this course
                      </p>
                    </div>
                  </div>
                  <div className="font-atkinson border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                      {courseDetails &&
                        Object.keys(courseDetails).map((detail, id) => {
                          return (
                            <div
                              key={id}
                              className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6"
                            >
                              <dt className="text-sm font-medium text-gray-500">
                                {detail}
                              </dt>
                              <dd>
                                <p className="block w-full rounded-md border-gray-300 shadow-none focus:border-green-500 focus:ring-green-500 sm:text-sm">
                                  {courseDetails[detail]}
                                </p>
                              </dd>
                            </div>
                          );
                        })}
                    </dl>
                  </div>
                </div>
                {/* ERROR / LOADING AREA */}
                {/* ERROR / LOADING AREA */}
                {/* ERROR / LOADING AREA */}
                {/* ERROR / LOADING AREA */}
                {error.length >= 1 && (
                  <p
                    className="font-atkinson mt-5 text-center text-sm text-red-600"
                    id="loading-error"
                  >
                    {error}
                  </p>
                )}
                {loading && (
                  <p
                    className="font-atkinson mt-5 text-center text-sm text-gray-600"
                    id="loading-error"
                  >
                    Loading details...
                  </p>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
