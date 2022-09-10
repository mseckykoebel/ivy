import { ScheduleCourse } from "../types/schedule";

export interface ScheduleRecord {
  id: string;
  data: ScheduleCourseData;
}

export interface ScheduleCourseData {
  userId?: string;
  coursesData: ScheduleCourse[];
  // coursesData is the name of the next field here
}
