import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LinkIcon } from "@heroicons/react/outline";

const ForgotPassword: React.FC = (): JSX.Element => {
  // Navigation
  const navigate = useNavigate();
  //   Element references
  const emailRef = useRef<HTMLInputElement>(null);
  // form validation state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  //   useAuth
  const { resetPassword } = useAuth();
  //   log in function
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(emailRef.current?.value as string);
      setMessage("Email sent! Check your inbox for further instructions");
    } catch (err) {
      setError("Failed to send password reset email: " + err);
    }
  };
  //   Return
  return (
    <div className="min-h-[100vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-grey-500">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            🔐 Reset your password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={() => handleSubmit}>
          <input type="hidden" name="remember" value="true"></input>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* EMAIL ADDRESS */}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Northwestern email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-b-md rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Northwestern email address"
                ref={emailRef}
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
                <LinkIcon
                  className="-ml-1 mr-2 h-5 w-5 text-green-800 group-hover:text-green-900"
                  aria-hidden="true"
                />
              </span>
              Reset password
            </button>
          </div>
          {message.length > 5 && (
            <p
              className="mt-2 text-center text-sm text-green-500"
              id="email-error"
            >
              {message}
            </p>
          )}
          {/* LOG IN INSTEAD */}
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/login")}
                className="text-sm font-medium text-green-500 hover:text-green-500 hover:underline"
              >
                {" "}
                Go back to login screen &rarr;{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
