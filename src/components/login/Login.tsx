import React from "react";
import IvyLottie from "./IvyLottie";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-grey-500">
      <div className="max-w-md w-full space-y-8">
        <div>
          <IvyLottie />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your Ivy account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true"></input>
          <div className="rounded-md shadow-sm -space-y-px">
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
                placeholder="Email address"
              ></input>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              ></input>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-sm">
              <a
                href="/"
                className="font-medium text-green-500 hover:text-green-500 hover:underline"
              >
                {" "}
                Forgot your password?{" "}
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={() => navigate("/")}
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
              Sign in
            </button>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/register")}
                className="text-sm font-medium text-green-500 hover:text-green-500 hover:underline"
              >
                {" "}
                Don't have an account? Register for one here &rarr;{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
