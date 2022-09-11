import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import IvyLottie from "../login/IvyLottie";

const Register: React.FC = (): JSX.Element => {
  // Navigation
  const navigate = useNavigate();
  //   Element references
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  // form validation state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //   useAuth
  const { signup } = useAuth();
  //   sign up function
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // check if the passwords are the same
    console.log(passwordRef.current?.value);
    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      // set
      console.log("passwords do not match");
      return setError("Passwords entered do not match!");
    }
    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current?.value as string,
        passwordRef.current?.value as string
      );
      navigate("/"); // when registered, navigate to the home page!
    } catch (err) {
      setError(`Uh oh! There was an error: ${err}`);
    }
    setLoading(false);
  };
  //   Return
  return (
    <div className="min-h-[100vh] bg-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-grey-500">
      <div className="max-w-md w-full space-y-8">
        <div>
          <IvyLottie />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-cooper-bold">
            Create an Ivy account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={() => handleSubmit}>
          <input type="hidden" name="remember" value="true"></input>
          {/* FULL NAME */}
          <div className="rounded-md shadow-sm -space-y-px">
            {/* EMAIL ADDRESS */}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address (NU preferred)"
                ref={emailRef}
              ></input>
            </div>
            {/* PASSWORD */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                ref={passwordRef}
              ></input>
            </div>
            {/* PASSWORD CONFIRMATION */}
            <div>
              <label htmlFor="password-confirmation" className="sr-only">
                Password confirmation
              </label>
              <input
                id="password-confirmation"
                name="password-confirmation"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Confirm password"
                ref={confirmPasswordRef}
              ></input>
            </div>
          </div>
          {/* ERROR AREA */}
          {/* ERROR AREA */}
          {/* ERROR AREA */}
          {/* ERROR AREA */}
          {error.length === 1 && (
            <p
              className="mt-2 text-center text-sm text-red-600"
              id="email-error"
            >
              {error}
            </p>
          )}
          <p className="mt-2 text-center text-sm text-red-600">{error}</p>
          {/* SUBMIT BUTTON */}
          {/* SUBMIT BUTTON */}
          {/* SUBMIT BUTTON */}
          {/* SUBMIT BUTTON */}
          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                loading ? "cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Heroicon name: solid/lock-closed */}
                <svg
                  className="h-5 w-5 text-green-800 group-hover:text-green-900"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Create account
            </button>
          </div>
          {/* LOG IN INSTEAD */}
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/login")}
                className="text-sm font-medium text-green-500 hover:text-green-500 hover:underline"
              >
                {" "}
                Already have an account? Click here to log in &rarr;{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
