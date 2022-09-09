// this is a course that exists in the schedule
// very important - this is what is going to be stored in firebase
// and be used as the source of truth
export interface ScheduleCourse {
  termId: string;
  school: string;
  subject: string;
  catalogNumber: string;
  courseNumber: string;
  classMeetingInfo: { ROOM: string; MEETING_TIME: string }[] | [] | null;
  color: string;
}
