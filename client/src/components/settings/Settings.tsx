import {
  Fragment,
  SetStateAction,
  Dispatch,
  RefObject,
  useRef,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAuth } from "../../contexts/AuthContext";

interface SettingsProps {
  open: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  cancelButtonRef: RefObject<HTMLButtonElement>;
}

export const Settings: React.FC<SettingsProps> = ({
  open,
  setOpenModal,
  cancelButtonRef,
}): JSX.Element => {
  // auth
  const { currentUser, updateEmail, updatePassword } = useAuth();
  // ref
  const displayNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  // state
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailAddress, setEmailAddress] = useState<string>(
    currentUser?.email as string
  );

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("pushing this as a promise");

    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      setError("Passwords do not match");
      return;
    }

    if (emailRef.current?.value === currentUser?.email) {
      setSuccess("Email unchanged");
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

    Promise.all(promises)
      .then(() => {
        setSuccess("Updated successfully!");
      })
      .catch((err) => {
        setError("Uh oh! There was an error: " + err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        initialFocus={cancelButtonRef}
        onClose={setOpenModal}
      >
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
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      ⚙️ Settings
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Your personal, major, and minor information
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Name
                        </dt>
                        <dd>
                          <input
                            ref={displayNameRef}
                            type="text"
                            name="text"
                            id="displayName"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            placeholder="Your name"
                            value={currentUser?.displayName as string}
                            onChange={() => {
                              setError("");
                              setSuccess("");
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
                    ref={cancelButtonRef}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 mr-2 px-4 py-2 w-40 inline-flex justify-center rounded-md border border-gray-500 text-sm font-medium text-black bg-white transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:text-white"
                    onClick={() => setOpenModal(false)}
                    ref={cancelButtonRef}
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
