/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable indent */
// The above is stupid but it's getting messed up with prettier
import { Fragment, useEffect, useRef, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { SearchIcon, CheckIcon } from "@heroicons/react/solid";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";
import { Settings } from "../settings/Settings";
import ivyLogo from "../../static/ivy_logo_full.png";
import Calendar from "../calendar/Calendar";
// routing
import { Link, useNavigate } from "react-router-dom";
import Schedule from "../schedule/Schedule";
// auth
import { useAuth } from "../../contexts/AuthContext";
import Search from "../search/Search";
// avatars
import { ProfilePicture } from "../profile-picture/ProfilePicture";
// API
import fetch from "cross-fetch";
import { CourseDetail } from "../../types/courses";
import { CalendarCourse } from "../../types/calendar";
import { CourseDetail as CourseDetailModal } from "../course-detail/CourseDetail";
import { auth } from "../../firebase/firebase";
// utils
import { classNames } from "../../lib/utils";
import { ScheduleCourse } from "../../types/schedule";

const navigation = [{ name: "Calendar view" }, { name: "Schedule view" }];

const Home: React.FC = (): JSX.Element => {
  // navigate
  const navigate = useNavigate();
  // state
  const [calView, setCalView] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  // UI state
  const [openSettingsModal, setOpenSettingsModal] = useState<boolean>(false);
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // TODO: this is bad prop drilling. Find a way to fire the modal from home without doing this!
  const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(null);
  // filtering (arrays)
  const [years, setYears] = useState<{ year: string }[] | null>(null);
  const [quarters, setQuarters] = useState<{ quarter: string }[] | null>(null);
  const [schools, setSchools] = useState<
    { school: string; schoolDescription: string }[] | null
  >(null);
  // filtering state (not arrays - individually selected items)
  const [selectedYear, setSelectedYear] = useState<{ year: string } | null>(
    null
  );
  const [selectedQuarter, setSelectedQuarter] = useState<{
    quarter: string;
  } | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  // context
  const { currentUser, logout } = useAuth();
  const term = useRef(null); // handles termId globally
  // searching
  const [searchQuery, setSearchQuery] = useState<string>("");
  // calendar (array of courses that the UI figures out how to deal with)
  const [calendarCourses, setCalendarCourses] = useState<CalendarCourse[] | []>(
    []
  );
  // schedule (array of courses that the UI figures out how to deal with)
  const [scheduleCourses, setScheduleCourses] = useState<ScheduleCourse[] | []>(
    []
  );

  // for years and quarters
  useEffect(() => {
    const quartersUrl =
      process.env.NODE_ENV !== "production"
        ? "http://localhost:3001/api/v1/get_undergraduate_quarters"
        : "https://ivy-api.fly.dev/api/v1/get_undergraduate_quarters";
    const yearsUrl =
      process.env.NODE_ENV !== "production"
        ? "http://localhost:3001/api/v1/get_undergraduate_school_years"
        : "https://ivy-api.fly.dev/api/v1/get_undergraduate_school_years";
    // loading years
    const loadYears = async () => {
      setLoading(true);
      const response = await fetch(yearsUrl, {
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.status >= 400) {
        setError("Uh oh! Error fetching school years");
        setTimeout(() => {
          setError("");
        }, 3000);
        throw new Error("Bad response from server");
      }
      const data = await response.json();
      console.log(data.school_years);
      setYears(data.school_years);
      setLoading(false);
    };
    // loading quarters
    const loadQuarters = async () => {
      setLoading(true);
      const response = await fetch(quartersUrl, {
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.status >= 400) {
        setError("Uh oh! Error fetching quarters");
        setTimeout(() => {
          setError("");
        }, 3000);
        throw new Error("Bad response from server");
      }
      const data = await response.json();
      console.log(data.quarters);
      setQuarters(data.quarters);
      setLoading(false);
    };
    // 🐎🐎🐎
    loadYears();
    loadQuarters();
  }, []);

  useEffect(() => {
    console.log("Firing!");
    if (selectedYear?.year && selectedQuarter?.quarter) {
      setTermId().then(() => setSchoolsFromTermId());
    }
  }, [selectedYear?.year, selectedQuarter?.quarter]);

  // for schools (dependent on terms)
  const setTermId = async () => {
    console.log("Setting the term ID");
    if (!selectedYear || !selectedQuarter) {
      console.log("Year and quarter not selected");
      setError("Please select a year and quarter before selecting a school");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    const termsUrl =
      process.env.NODE_ENV !== "production"
        ? `http://localhost:3001/api/v1/get_undergraduate_term_id/?year=${selectedYear.year}&quarter=${selectedQuarter.quarter}`
        : `https://ivy-api.fly.dev/api/v1/get_undergraduate_term_id/?year=${selectedYear.year}&quarter=${selectedQuarter.quarter}`;

    const loadTermID = async () => {
      setLoading(true);
      const termResponse = await fetch(termsUrl, {
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (termResponse.status >= 400) {
        setError("Uh oh! Error fetching term ID");
        setTimeout(() => {
          setError("");
        }, 3000);
        throw new Error("Bad response from server");
      }
      const termData = await termResponse.json();
      console.log(termData.term);
      if (term !== termData.term) {
        term.current = termData.term;
      }
      setLoading(false);
    };

    return new Promise<void>((resolve) => {
      loadTermID().then(() => resolve());
    });
  };

  const setSchoolsFromTermId = () => {
    console.log("CURRENT VALUE OF TERM ID:", term);

    const loadSchools = async () => {
      const schoolsUrl =
        process.env.NODE_ENV !== "production"
          ? `http://localhost:3001/api/v1/get_undergraduate_schools/?termId=${term.current}`
          : `https://ivy-api.fly.dev/api/v1/get_undergraduate_schools/?termId=${term.current}`;

      const schoolsResponse = await fetch(schoolsUrl, {
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (schoolsResponse.status >= 400) {
        setError("Uh oh! There aren't any schools for this term 🥸");
        setSelectedSchool(null);
        setSchools(null);
        setTimeout(() => {
          setError("");
        }, 3000);
        throw new Error("Bad response from server");
      }
      const schoolsData = await schoolsResponse.json();
      console.log("SCHOOLS: ", schoolsData.data);
      setLoading(false);
      setSchools(schoolsData.data);
    };

    return new Promise<void>((resolve) => {
      loadSchools().then(() => resolve());
    });
  };

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.log("There was an error logging out: " + err);
    }
  };

  // filtered years
  const filteredYears =
    query === ""
      ? years
      : years?.filter((year) => {
          return year.year.toLowerCase().includes(query.toLowerCase());
        });

  // filtered quarters
  const filteredQuarters =
    query === ""
      ? quarters
      : quarters?.filter((quarter) => {
          return quarter.quarter.toLowerCase().includes(query.toLowerCase());
        });

  // filtered schools
  const filteredSchools =
    query === ""
      ? schools
      : schools?.filter((school) => {
          return school.school.toLowerCase().includes(query.toLowerCase());
        });

  // user navigation structure
  const userNavigation = [
    {
      name:
        currentUser?.email === "msk@gmail.com"
          ? "SUPER USER"
          : currentUser?.displayName ||
            currentUser?.email?.slice(0, 16) + "...",
      href: "",
      onClick: () => {},
    },
    {
      name:
        currentUser?.email === "msk@gmail.com" ? "👇 Leave Ivy" : "⚙️ Settings",
      href: "",
      onClick: () => {
        auth.currentUser?.email !== "msk@gmail.com"
          ? setOpenSettingsModal(true)
          : console.log("super user settings are not available");
      },
    },
    {
      name: "🏃 Sign out",
      href: "/login",
      onClick: handleLogout,
    },
  ];
  // test to see if the modal closing works
  const fromSettingsModalClose = (open: boolean) => {
    setOpenSettingsModal(open);
  };

  const fromDetailModalClose = (open: boolean) => {
    setOpenDetailModal(open);
  };

  useEffect(() => {
    setOpenDetailModal(true);
  }, [courseDetail]);

  return (
    <>
      <div className="min-h-full">
        {/* MODALS */}
        {openSettingsModal && (
          <Settings
            openSettingsModal={openSettingsModal}
            setOpenSettingsModal={() => fromSettingsModalClose(false)}
          />
        )}
        {openDetailModal && courseDetail && (
          <CourseDetailModal
            termId={courseDetail.termId}
            school={courseDetail.school}
            subject={courseDetail.subject}
            courseNumber={courseDetail.courseNumber}
            courseDetail={openDetailModal}
            setCourseDetail={() => fromDetailModalClose(false)}
          />
        )}
        {/* REST OF THE COMPONENT */}
        <Popover as="header" className="pb-24 bg-green-600">
          {({ open }) => (
            <>
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative py-5 flex items-center justify-center lg:justify-between">
                  {/* Logo */}
                  <div className="relative left-0 flex-shrink 0 lg:static backdrop-blur-sm p-2.5 pr-4 pl-4 rounded-md">
                    <Link to="/">
                      <span className="sr-only">Ivy</span>
                      <h1
                        className=" text-white text-[2rem] font-bold font-cooper-bold"
                        style={{ lineHeight: "1.75rem" }}
                      >
                        Ivy{" "}
                        <span className="inline-flex font-atkinson items-center align-middle px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-700 text-white">
                          v0.1.3 (pre-release)
                        </span>
                      </h1>
                    </Link>
                  </div>

                  {/* Right section on desktop */}
                  <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-4 relative flex-shrink-0">
                      <div>
                        <Menu.Button className="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                          <span className="sr-only">Open user menu</span>
                          <div className="h-8 w-8 rounded-full">
                            <ProfilePicture size={32} />
                          </div>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <button
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "font-atkinson block px-4 w-full text-left py-2 text-sm text-gray-700"
                                  )}
                                  onClick={item.onClick}
                                >
                                  {item.name}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>

                  {/* SEARCH ON MOBILE */}
                  <div className="flex-1 min-w-0 px-12 lg:hidden">
                    <div className="max-w-xs w-full mx-auto">
                      <label htmlFor="mobile-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative text-white focus-within:text-gray-600">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                          <SearchIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <input
                          onChange={(event) =>
                            setSearchQuery(event.target.value)
                          }
                          id="mobile-search"
                          className="block w-full bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                          placeholder="Search"
                          type="search"
                          name="search"
                        />
                      </div>
                    </div>
                  </div>

                  {/* MENU ON MOBILE  */}
                  <div className="absolute right-0 flex-shrink-0 lg:hidden">
                    {/* Mobile menu button */}
                    <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-green-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Popover.Button>
                  </div>
                </div>
                <div className="hidden lg:block border-t border-white border-opacity-20 py-5">
                  <div className="grid grid-cols-3 gap-8 items-center">
                    <div className="col-span-2">
                      <nav className="flex space-x-4 justify-center">
                        {navigation.map((item) => (
                          <button
                            key={item.name}
                            className={classNames(
                              calView === true && item.name === "Calendar view"
                                ? "bg-white/10 border-white border-[1px] select-none pointer-events-none"
                                : calView === false &&
                                  item.name === "Schedule view"
                                ? "bg-white/10 border-white border-[1px]"
                                : "",
                              "font-atkinson text-sm text-white font-medium rounded-md  bg-opacity-0 px-3 py-2 hover:bg-opacity-10"
                            )}
                            aria-current={item.name ? "page" : undefined}
                            onClick={() =>
                              item.name === "Calendar view"
                                ? setCalView(true)
                                : setCalView(false)
                            }
                          >
                            {item.name}
                          </button>
                        ))}
                      </nav>
                    </div>
                    {/* SEARCH WRAP */}
                    <div className="flex flex-col justify-evenly">
                      {/* SEARCH AREA */}
                      {/* SEARCH AREA */}
                      {/* SEARCH AREA */}
                      <div className="max-w-md w-full mx-auto pr-2 pl-2">
                        <label htmlFor="desktop-search" className="sr-only">
                          Search
                        </label>
                        <div className="relative text-white focus-within:text-gray-600">
                          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <SearchIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            onChange={(event) => {
                              setSearchQuery(event.target.value);
                            }}
                            id="desktop-search"
                            className={`font-atkinson block w-full bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm ${
                              !selectedYear?.year || !selectedQuarter?.quarter
                                ? "select-none pointer-events-none"
                                : ""
                            }`}
                            placeholder={
                              !selectedYear || !selectedQuarter
                                ? "Please select a year and quarter below"
                                : "Search"
                            }
                            type="search"
                            name="search"
                          />
                        </div>
                      </div>
                      {/* FILTERING AREA */}
                      <div className="flex flex-row justify-evenly max-w-md w-full mx-auto pr-2 pl-2 pt-2">
                        {/* SELECT YEAR */}
                        {/* SELECT YEAR */}
                        {/* SELECT YEAR */}
                        <Combobox
                          className={"pr-1"}
                          as="div"
                          value={selectedYear}
                          onChange={setSelectedYear}
                        >
                          <Combobox.Label className="sr-only">
                            Year
                          </Combobox.Label>
                          <div className="relative mt-1">
                            <Combobox.Input
                              className="font-atkinson w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
                              onChange={(event) => setQuery(event.target.value)}
                              placeholder={loading ? "..." : "Years"}
                              displayValue={(year: { year: string }) =>
                                year?.year
                              }
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                              <ChevronDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </Combobox.Button>

                            {!loading &&
                              filteredYears &&
                              filteredYears.length > 0 && (
                                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-[9rem] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  {filteredYears?.map((year) => (
                                    <Combobox.Option
                                      key={year.year}
                                      value={year}
                                      className={({ active }) =>
                                        classNames(
                                          "font-atkinson relative cursor-default select-none py-2 pl-3 pr-9",
                                          active
                                            ? "bg-green-600 text-white"
                                            : "text-gray-900"
                                        )
                                      }
                                    >
                                      {({ active, selected }) => (
                                        <>
                                          <div className="flex">
                                            <span
                                              className={classNames(
                                                "truncate",
                                                selected && "font-semibold"
                                              )}
                                            >
                                              {year.year}
                                            </span>
                                          </div>

                                          {selected && (
                                            <span
                                              className={classNames(
                                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                                active
                                                  ? "text-white"
                                                  : "text-green-600"
                                              )}
                                            >
                                              <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            </span>
                                          )}
                                        </>
                                      )}
                                    </Combobox.Option>
                                  ))}
                                </Combobox.Options>
                              )}
                          </div>
                        </Combobox>
                        {/* SELECT QUARTER */}
                        {/* SELECT QUARTER */}
                        {/* SELECT QUARTER */}
                        <Combobox
                          className={"pr-1"}
                          as="div"
                          value={selectedQuarter}
                          onChange={setSelectedQuarter}
                        >
                          <Combobox.Label className="sr-only">
                            Quarter
                          </Combobox.Label>
                          <div className="relative mt-1">
                            <Combobox.Input
                              className="font-atkinson w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
                              onChange={(event) => setQuery(event.target.value)}
                              placeholder={loading ? "..." : "Quarters"}
                              displayValue={(quarter: { quarter: string }) =>
                                quarter?.quarter
                              }
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                              <ChevronDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </Combobox.Button>

                            {!loading &&
                              filteredQuarters &&
                              filteredQuarters.length > 0 && (
                                <Combobox.Options className="absolute z-10 mt-1 max-h-60 -right-4 w-[10rem] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  {filteredQuarters.map((quarter) => (
                                    <Combobox.Option
                                      key={quarter.quarter}
                                      value={quarter}
                                      className={({ active }) =>
                                        classNames(
                                          "font-atkinson relative cursor-default select-none py-2 pl-3 pr-9",
                                          active
                                            ? "bg-green-600 text-white"
                                            : "text-gray-900"
                                        )
                                      }
                                    >
                                      {({ active, selected }) => (
                                        <>
                                          <div className="flex">
                                            <span
                                              className={classNames(
                                                "truncate",
                                                selected && "font-semibold"
                                              )}
                                            >
                                              {quarter.quarter}
                                            </span>
                                          </div>

                                          {selected && (
                                            <span
                                              className={classNames(
                                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                                active
                                                  ? "text-white"
                                                  : "text-green-600"
                                              )}
                                            >
                                              <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            </span>
                                          )}
                                        </>
                                      )}
                                    </Combobox.Option>
                                  ))}
                                </Combobox.Options>
                              )}
                          </div>
                        </Combobox>
                        {/* SELECT SCHOOL */}
                        {/* SELECT SCHOOL */}
                        {/* SELECT SCHOOL */}
                        <Combobox
                          as="div"
                          value={selectedSchool}
                          onChange={setSelectedSchool}
                          // onMouseEnter={setTermId}
                        >
                          <Combobox.Label className="sr-only">
                            School
                          </Combobox.Label>
                          <div className="relative mt-1">
                            <Combobox.Input
                              disabled={!schools}
                              className={`font-atkinson w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm ${
                                !schools ? "cursor-not-allowed disabled" : ""
                              }`}
                              onChange={(event) => setQuery(event.target.value)}
                              placeholder={"School"}
                              displayValue={(school: {
                                school: string;
                                schoolDescription: string;
                              }) => school?.school}
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                              <ChevronDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </Combobox.Button>

                            {!loading &&
                              filteredSchools &&
                              filteredSchools.length > 0 && (
                                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-[25rem] -right-1 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  {filteredSchools.map((school) => (
                                    <Combobox.Option
                                      key={school.school}
                                      value={school}
                                      className={({ active }) =>
                                        classNames(
                                          "font-atkinson relative cursor-default select-none py-2 pl-3 pr-9",
                                          active
                                            ? "bg-green-600 text-white"
                                            : "text-gray-900"
                                        )
                                      }
                                    >
                                      {({ active, selected }) => (
                                        <>
                                          <div className="flex">
                                            <span
                                              className={classNames(
                                                "truncate",
                                                selected && "font-semibold"
                                              )}
                                            >
                                              {school.school}
                                            </span>
                                            {/* LATER */}
                                            <span
                                              className={classNames(
                                                "ml-2 truncate text-gray-500",
                                                active
                                                  ? "text-green-200"
                                                  : "text-gray-500"
                                              )}
                                            >
                                              {school.schoolDescription}
                                            </span>
                                          </div>

                                          {selected && (
                                            <span
                                              className={classNames(
                                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                                active
                                                  ? "text-white"
                                                  : "text-green-600"
                                              )}
                                            >
                                              <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            </span>
                                          )}
                                        </>
                                      )}
                                    </Combobox.Option>
                                  ))}
                                </Combobox.Options>
                              )}
                          </div>
                        </Combobox>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Transition.Root as={Fragment}>
                <div className="lg:hidden">
                  <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Overlay className="z-20 fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Popover.Panel
                      focus
                      className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
                    >
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                        <div className="pt-3 pb-2">
                          <div className="flex items-center justify-between px-4">
                            <div>
                              <img
                                className="h-8 w-auto"
                                src={ivyLogo}
                                alt="Workflow"
                              />
                            </div>
                            <div className="-mr-2">
                              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-800">
                                <span className="sr-only">Close menu</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                              </Popover.Button>
                            </div>
                          </div>
                          <div className="mt-3 px-2 space-y-1">
                            <button
                              className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                              onClick={() => {
                                setCalView(true);
                              }}
                            >
                              Calendar view
                            </button>
                            <button
                              className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                              onClick={() => setCalView(false)}
                            >
                              Schedule view
                            </button>
                          </div>
                        </div>
                        <div className="pt-4 pb-2">
                          <div className="flex items-center px-5">
                            <div className="h-8 w-8 flex-shrink-0 rounded-full">
                              <ProfilePicture size={32} />
                            </div>
                            <div className="ml-3 min-w-0 flex-1">
                              <div className="text-base font-medium text-gray-800 truncate">
                                {userNavigation[0].name}
                              </div>
                              <div className="text-sm font-medium text-gray-500 truncate">
                                {currentUser?.email}
                              </div>
                            </div>
                            <button
                              type="button"
                              className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                            >
                              <span className="sr-only">
                                View notifications
                              </span>
                              <BellIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                          <div className="mt-3 px-2 space-y-1">
                            {userNavigation.map((item) => (
                              <Link
                                key={item.name}
                                to={item.href}
                                className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition.Root>
            </>
          )}
        </Popover>
        <main className="-mt-24 pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Page title</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-1-title">
                  <h2 className="sr-only" id="section-1-title">
                    Section title
                  </h2>
                  <div className="rounded-lg bg-white overflow-hidden shadow">
                    {/* CALENDAR VIEW/SCHEDULE VIEW TOGGLE TOGGLE */}
                    {/* CALENDAR VIEW/SCHEDULE VIEW TOGGLE TOGGLE */}
                    {/* CALENDAR VIEW/SCHEDULE VIEW TOGGLE TOGGLE */}
                    {calView && (
                      <div className="p-6">
                        <Calendar
                          calendarCourses={calendarCourses}
                          setCalendarCourses={setCalendarCourses}
                          setOpenDetailModal={setOpenDetailModal}
                          setCourseDetail={setCourseDetail}
                        />
                      </div>
                    )}
                    {!calView && (
                      <div className={!calView ? "p-6" : ""}>
                        <Schedule
                          courseDetail={courseDetail}
                          setCourseDetail={setCourseDetail}
                          scheduleCourses={scheduleCourses}
                          setScheduleCourses={setScheduleCourses}
                          setOpenDetailModal={setOpenDetailModal}
                        />
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">
                <section aria-labelledby="section-2-title">
                  <h2 className="sr-only" id="section-2-title">
                    Search section
                  </h2>
                  {/* THIS IS WHERE ALL OF THE SEARCHING IS HAPPENING */}
                  {/* IT WILL SOON GET ARGUMENTS PASSED TO IT THAT WERE SELECTED BY THE USER */}
                  <Search
                    year={selectedYear?.year}
                    quarter={selectedQuarter?.quarter}
                    school={selectedSchool}
                    termId={term.current}
                    searchQuery={searchQuery}
                    // bad prop drilling - fetch currently selected course from course details
                    // calendar
                    calendarCourses={calendarCourses}
                    setCalendarCourses={setCalendarCourses}
                    // schedule
                    scheduleCourses={scheduleCourses}
                    setScheduleCourses={setScheduleCourses}
                    view={calView ? "Calendar" : "Schedule"}
                    courseDetail={courseDetail}
                    setCourseDetail={setCourseDetail}
                    setOpenDetailModal={setOpenDetailModal}
                  />
                </section>
                {/* SUPER BASIC ERROR LOCATION */}
                {error && (
                  <section className="font-atkinson text-center text-red-500 text-sm">
                    <p>{error}</p>
                  </section>
                )}
                {loading && (
                  <section className="font-atkinson text-center text-red-500 text-sm">
                    <p>Fetching the latest data 🐎</p>
                  </section>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
