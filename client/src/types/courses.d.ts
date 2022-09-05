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
  courseNumber: string;
  school: string;
  section: string;
  classMeetingInfo: { ROOM: string; MEETING_TIME: string }[] | [] | null;
}

// this is used for the course detail modal - ignore for all other things
export interface CourseDetail {
  termId: string;
  school: string;
  subject: string;
  courseNumber: string;
}

// bless
export type UndergraduateCourseDetails = Record<string, unknown>;
