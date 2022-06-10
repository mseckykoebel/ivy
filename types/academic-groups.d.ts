// Academic groups = schools
export interface AcademicGroup {
  Subject: Subject;
  Description: Description;
}

// TODO: can go more granular than this based on the school
export type Subject = string;

export type Description = string;
