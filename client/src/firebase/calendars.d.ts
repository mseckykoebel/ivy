import { CalendarCourse } from "../types/calendar";

export interface CalendarRecord {
  id: string;
  data: CalendarCourseData;
}

export interface CalendarCourseData {
  userId?: string;
  title?: string;
  lastUpdated?: string;
  coursesData: CalendarCourse[];
  // coursesData is the name of the next field here
}
