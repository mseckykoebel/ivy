import React, { Dispatch, RefObject, SetStateAction } from "react";

interface MajorsProps {
  majorRef: RefObject<HTMLInputElement>;
  major: { id: string; majorTitle: string } | null;
  setMajor: Dispatch<SetStateAction<{ id: string; majorTitle: string } | null>>;
  setError: Dispatch<SetStateAction<string>>;
  setSuccess: Dispatch<SetStateAction<string>>;
}

export const Majors: React.FC<MajorsProps> = ({
  majorRef,
  major,
  setMajor,
  setError,
  setSuccess,
}): JSX.Element => {
  return (
    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
      <dt className="text-sm font-medium text-gray-500">Majors</dt>
      <dd>
        <input
          ref={majorRef}
          type="search"
          name="majors"
          id="majors"
          className="block w-[29.5rem] rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          placeholder="Not specified"
          value={major ? major.majorTitle : ""}
          onChange={() => {
            setError("");
            setSuccess("");
            setMajor({
              id: major?.id as string,
              majorTitle: majorRef.current?.value as string,
            });
          }}
        />
      </dd>
    </div>
  );
};
