import { XIcon } from "@heroicons/react/outline";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { CalendarCourse } from "../../types/courses";

interface CalendarProps {
  calendarCourses: CalendarCourse[] | null;
  setCalendarCourses: Dispatch<SetStateAction<CalendarCourse[] | null>>;
}

const Calendar: React.FC<CalendarProps> = ({
  calendarCourses,
  setCalendarCourses, // for when you need to remove an item from the calendar
}): JSX.Element => {
  // again, shitty
  const container: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const containerNav: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const containerOffset: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  // the height of the calendar in REM
  const calHeight = 2.1;

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

  // keeping tabs on the calendar courses being changed (won't be needed soon)
  useEffect(() => {
    !calendarCourses
      ? ""
      : console.log("CURRENT CALENDAR COURSE LIST", calendarCourses);
  }, [calendarCourses]);

  return (
    <div className="flex h-full flex-col z-2">
      <div
        ref={container}
        className="flex flex-auto flex-col overflow-auto bg-white"
      >
        <div
          style={{ width: "165%" }}
          className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
        >
          <div
            ref={containerNav}
            className="sticky top-0 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
          >
            <div className="grid grid-cols-5 text-sm leading-6 text-gray-500 sm:hidden">
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

            <div className="-mr-px hidden grid-cols-5 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
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
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{
                  gridTemplateRows: `repeat(29, minmax(${calHeight}rem, 1fr))`,
                }}
              >
                <div ref={containerOffset} className="row-end-1 h-5"></div>
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
                  gridTemplateRows: ".45rem repeat(288, minmax(0, 1fr)) auto",
                }}
              >
                <li
                  className="relative mt-px flex sm:col-start-3"
                  style={{ gridRow: "259 / span 30" }}
                >
                  <div className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100">
                    <div className="absolute top-1 right-1 hidden pt-1 pr-1 sm:block">
                      <button
                        type="button"
                        className="rounded-md bg-none text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        onClick={() => console.log("Removed this course")}
                      >
                        <span className="sr-only">Close</span>
                        <XIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="order-1 font-semibold text-pink-700">
                      CS 211
                    </p>
                    <p className="text-pink-500 group-hover:text-pink-700">
                      <time dateTime="2022-01-12T07:30">12:00pm</time>
                    </p>
                  </div>
                </li>
              </ol>
              {/* END OF RENDERING EVENTS ON THE CALENDAR */}
              {/* END OF RENDERING EVENTS ON THE CALENDAR */}
              {/* END OF RENDERING EVENTS ON THE CALENDAR */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
