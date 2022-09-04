import React from "react";

interface SearchItemProps {
  school: string;
  subject: string;
  catalogNumber: string;
  section: string;
  component: string;
  courseTitle: string;
  topic: string;
  // additional color prop
  color: string;
}

const SearchItem: React.FC<SearchItemProps> = ({
  school,
  subject,
  catalogNumber,
  section,
  component,
  courseTitle,
  topic,
  color,
}): JSX.Element => {
  return (
    <div
      className={`${color} shadow sm:rounded-lg mb-4 m-4 hover:scale-[101%] transition-all hover:cursor-pointer`}
    >
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {subject} {catalogNumber} - {courseTitle}
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>School: {school}</p>
          <p>Section: {section}</p>
          <p>Type: {component}</p>
          {topic.length > 0 && <p>Topic: {topic}</p>}
        </div>
        <div className="mt-3 text-sm">
          <button
            className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
            onClick={() =>
              console.log("View more details on this course was requested!")
            }
          >
            {" "}
            View more details <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
