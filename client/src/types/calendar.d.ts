// this is a sub-type of a Course just for being displayed in the calendar UI
// lots of props are not needed
export interface CalendarCourse {
  termId: string;
  school: string;
  subject: string;
  catalogNumber: string;
  courseNumber: string;
  classMeetingInfo: { ROOM: string; MEETING_TIME: string }[] | [];
  color: string;
  // for discussion sections
  section?: string;
}
