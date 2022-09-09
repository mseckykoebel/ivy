// this is passed to the course detail modal to fetch the course details
export interface CourseDetail {
  termId: string;
  school: string;
  subject: string;
  courseNumber: string;
}

// bless
export type UndergraduateCourseDetails = Record<string, unknown>;
