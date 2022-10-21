import React, { Dispatch, RefObject, SetStateAction } from "react";

interface MinorsProps {
  minorRef: RefObject<HTMLInputElement>;
  minor: { id: string; minorTitle: string } | null;
  setMinor: Dispatch<SetStateAction<{ id: string; minorTitle: string } | null>>;
  setError: Dispatch<SetStateAction<string>>;
  setSuccess: Dispatch<SetStateAction<string>>;
}

export const Minors: React.FC<MinorsProps> = ({
  minorRef,
  minor,
  setMinor,
  setError,
  setSuccess,
}): JSX.Element => {
  return (
    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
      <dt className="text-sm font-medium text-gray-500">
        Minor
      </dt>
      <dd>
        <input
          ref={minorRef}
          type="search"
          name="minors"
          id="minors"
          className="block w-[29.5rem] rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          placeholder="Not specified"
          value={minor ? minor.minorTitle : ""}
          onChange={() => {
            setError("");
            setSuccess("");
            setMinor({
              id: minor?.id as string,
              minorTitle: minorRef.current?.value as string,
            });
          }}
        />
      </dd>
    </div>
  );
};
