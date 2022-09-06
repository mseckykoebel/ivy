// pluck out what is needed for searching here
export type UndergraduateCourseSearch = {
  status: number;
  results: number;
  data: UndergraduateCourseDetail[];
  school: string;
  subject: string;
};

type UndergraduateCourseDetail = {
  catalogNumber: string;
  section: string;
  component: string;
  courseTitle: string;
  topic: string;
};

// this is a sub-type of a Course just for being displayed in the calendar UI
// lots of props are not needed
export interface CalendarCourse {
  subject: string;
  catalogNumber: string;
  courseNumber: string;
  classMeetingInfo: { ROOM: string; MEETING_TIME: string }[] | [] | null;
  color: string;
}

// this is passed to the course detail modal to fetch the course details
export interface CourseDetail {
  termId: string;
  school: string;
  subject: string;
  courseNumber: string;
}

// bless
export type UndergraduateCourseDetails = Record<string, unknown>;
