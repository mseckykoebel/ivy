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

// bless
export type UndergraduateCourseDetails = Record<string, unknown>;
