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
  courseNumber: string;
  // pretty sure on this
  classMeetingInfo: Record<string, string>[] | null;
  startDate: string;
};

// bless
export type UndergraduateCourseDetails = Record<string, unknown>;
