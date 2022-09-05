import { Dialog, Transition } from "@headlessui/react";
import React, {
  Fragment,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
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
  const [error, setError] = useState<string>("");

  // getting the course information
  useEffect(() => {
    const getCourseDetail = () => {
      console.log("Getting course detail for course: ", courseNumber);
    };

    getCourseDetail();
  }, []);

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
              <Dialog.Panel className="relative sm:min-w-[50rem] bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                  <div className="flex justify-between px-4 py-5 sm:px-6">
                    <div className="inline-block align-middle`">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        🔦 Course details for {courseNumber}
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        All the info we have on this course
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Paragraph
                        </dt>
                        <dd>
                          <p className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm">
                            This is a paragraph
                          </p>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                {/* ERROR AREA */}
                {/* ERROR AREA */}
                {/* ERROR AREA */}
                {/* ERROR AREA */}
                {error.length >= 1 && (
                  <p
                    className="mt-5 text-center text-sm text-red-600"
                    id="loading-error"
                  >
                    {error}
                  </p>
                )}
                {/* SUBMIT/CANCEL AREA */}
                {/* SUBMIT/CANCEL AREA */}
                {/* SUBMIT/CANCEL AREA */}
                {/* SUBMIT/CANCEL AREA */}
                <div className="flex justify-center py-2 px-2 sm:px-6">
                  <div>This is where the buttons were</div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
