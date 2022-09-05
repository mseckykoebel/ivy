import React, {
  Fragment,
  SetStateAction,
  Dispatch,
  RefObject,
  useRef,
  useState,
  useEffect,
} from "react";

import { Dialog, Transition } from "@headlessui/react";

import { useAuth } from "../../contexts/AuthContext";

import { ProfilePicture } from "../profile-picture/ProfilePicture";

import { Majors } from "./Majors";
import { Minors } from "./Minors";
import { majors as majorsList } from "../../db/majors";
import { minors as minorsList } from "../../db/minors";

import {
  createMajorFromMajorTitle,
  deleteMajor,
  getMajorsByUserId,
  updateMajor,
} from "../../firebase/majorsService";

import {
  createMinorFromMinorTitle,
  deleteMinor,
  getMinorsByUserId,
  updateMinor,
} from "../../firebase/minorsService";

interface SettingsProps {
  openSettingsModal: boolean;
  setOpenSettingsModal: Dispatch<SetStateAction<boolean>>;
}

export const Settings: React.FC<SettingsProps> = ({
  openSettingsModal,
  setOpenSettingsModal,
}): JSX.Element => {
  // contexts
  const { currentUser, updateEmail, updatePassword, updateDisplayName } =
    useAuth();
  // ref
  const displayNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const majorsRef = useRef<HTMLInputElement>(null);
  const minorsRef = useRef<HTMLInputElement>(null);
  // state
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailAddress, setEmailAddress] = useState<string>(
    currentUser?.email as string
  );
  const [displayName, setDisplayName] = useState<string>(
    currentUser?.displayName as string | ""
  );
  const [major, setMajor] = useState<{
    id: string;
    majorTitle: string;
  } | null>(null);
  const [minor, setMinor] = useState<{
    id: string;
    minorTitle: string;
  } | null>(null);

  const getMajors = async () => {
    const majors = await getMajorsByUserId();
    if (majors.length === 0) {
      setMajor(null);
    } else {
      setMajor({ id: majors[0].id, majorTitle: majors[0].data.majorTitle });
    }
  };

  const getMinors = async () => {
    const minors = await getMinorsByUserId();
    if (minors.length === 0) {
      setMinor(null);
    } else {
      setMinor({ id: minors[0].id, minorTitle: minors[0].data.minorTitle });
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      setError("Passwords do not match");
      return;
    }

    if (displayNameRef.current?.value.length === 0) {
      setError("Display name must not be blank");
      return;
    }

    if (
      majorsRef.current?.value &&
      !majorsList.includes(majorsRef.current?.value.toUpperCase() as string)
    ) {
      setError("Major not found!");
      return;
    }

    if (
      minorsRef.current?.value &&
      !minorsList.includes(minorsRef.current?.value.toUpperCase() as string)
    ) {
      setError("Minor not found!");
      return;
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current?.value !== currentUser?.email) {
      promises.push(updateEmail(emailRef.current?.value as string));
    }

    if (passwordRef.current?.value) {
      promises.push(updatePassword(passwordRef.current?.value as string));
    }

    if (displayNameRef.current?.value !== currentUser?.displayName) {
      promises.push(updateDisplayName(displayNameRef.current?.value as string));
    }

    // major has been created
    if (!major?.id) {
      promises.push(
        createMajorFromMajorTitle(majorsRef.current?.value as string)
      );
    }

    // minor has been created
    if (!minor?.id) {
      promises.push(
        createMinorFromMinorTitle(minorsRef.current?.value as string)
      );
    }

    // major has been cleared out
    if (majorsRef.current?.value.length === 0 && major?.id) {
      setMajor(null);
      promises.push(deleteMajor(major?.id as string));
    }

    // minor has been cleared out
    if (minorsRef.current?.value.length === 0 && minor?.id) {
      setMinor(null);
      promises.push(deleteMinor(major?.id as string));
    }

    // major has been updated
    if (major?.id) {
      promises.push(updateMajor(majorsRef.current?.value as string, major?.id));
    }

    // minor has been updated
    if (minor?.id) {
      promises.push(updateMinor(minorsRef.current?.value as string, minor?.id));
    }

    // update major by default if it passes the matching test

    Promise.all(promises)
      .then(() => {
        setSuccess("Updated successfully!");
      })
      .catch((err) => {
        // check if we deleted successfully. If so, skip over this error - expected
        if (String(err).includes("No document to update")) {
          setSuccess("Updated successfully!");
        } else {
          setError("Uh oh! There was an error: " + err);
        }
      })
      .finally(() => {
        setLoading(false);
        getMajors();
      });
  };

  useEffect(() => {
    getMajors();
    getMinors();
  }, []);

  return (
    <Transition.Root show={openSettingsModal} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={setOpenSettingsModal}>
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
                        ⚙️ Settings
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Your personal, major, and minor information
                      </p>
                    </div>
                    <ProfilePicture size={50} />
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Username
                        </dt>
                        <dd>
                          <input
                            ref={displayNameRef}
                            type="text"
                            name="text"
                            id="displayName"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            placeholder="Your name"
                            value={displayName}
                            onChange={() => {
                              setError("");
                              setSuccess("");
                              setDisplayName(
                                displayNameRef.current?.value as string
                              );
                            }}
                          />
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Email address
                        </dt>
                        <dd>
                          <input
                            ref={emailRef}
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            placeholder="your@email.com"
                            required
                            value={emailAddress}
                            onChange={() => {
                              setError("");
                              setSuccess("");
                              setEmailAddress(
                                emailRef.current?.value as string
                              );
                            }}
                          />
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Password
                        </dt>
                        <dd>
                          <input
                            ref={passwordRef}
                            type="password"
                            name="password"
                            id="password"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            placeholder="Leave blank to keep the same"
                            onChange={() => {
                              setError("");
                              setSuccess("");
                            }}
                          />
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Confirm password
                        </dt>
                        <dd>
                          <input
                            ref={confirmPasswordRef}
                            type="password"
                            name="password"
                            id="confirmPassword"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            placeholder="Leave blank to keep the same"
                            onChange={() => {
                              setError("");
                              setSuccess("");
                            }}
                          />
                        </dd>
                      </div>
                      {/* MAJORS */}
                      {/* MAJORS */}
                      {/* MAJORS */}
                      <Majors
                        majorRef={majorsRef}
                        major={major}
                        setMajor={setMajor}
                        setError={setError}
                        setSuccess={setSuccess}
                      />
                      {/* MINORS */}
                      {/* MINORS */}
                      {/* MINORS */}
                      <Minors
                        minorRef={minorsRef}
                        minor={minor}
                        setMinor={setMinor}
                        setError={setError}
                        setSuccess={setSuccess}
                      />
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
                    id="email-error"
                  >
                    {error}
                  </p>
                )}
                {/* SUCCESS AREA */}
                {/* SUCCESS AREA */}
                {/* SUCCESS AREA */}
                {/* SUCCESS AREA */}
                {success.length >= 1 && (
                  <p
                    className="mt-5 text-center text-sm text-green-600"
                    id="email-error"
                  >
                    {success}
                  </p>
                )}
                {/* SUBMIT/CANCEL AREA */}
                {/* SUBMIT/CANCEL AREA */}
                {/* SUBMIT/CANCEL AREA */}
                {/* SUBMIT/CANCEL AREA */}
                <div className="flex justify-center py-2 px-2 sm:px-6">
                  <button
                    type="button"
                    className={`mt-3 mr-2 px-4 py-2 w-40 inline-flex justify-center rounded-md border border-transparent text-sm font-medium text-white bg-green-500 transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                      loading ? "cursor-not-allowed" : ""
                    }`}
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 mr-2 px-4 py-2 w-40 inline-flex justify-center rounded-md border border-gray-500 text-sm font-medium text-black bg-white transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:text-white"
                    onClick={() => setOpenSettingsModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
