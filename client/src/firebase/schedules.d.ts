import { ScheduleCourse } from "../types/schedule";

export interface ScheduleRecord {
  id: string;
  data: ScheduleCourseData;
}

export interface ScheduleCourseData extends ScheduleCourse {
  userId: string;
}
