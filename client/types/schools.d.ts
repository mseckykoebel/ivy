// Academic groups = schools
export interface Schools {
  school: School;
  description: Description;
  color: Colors;
}

// TODO: these can get a lot more granular, but it'll take a long time.
// this is good enough to get colors and things
export interface School {
  subject: string;
  description: string;
}

export type SchoolTitle =
  | "MUSIC"
  | "LAW"
  | "MEAS"
  | "JOUR"
  | "DOHA"
  | "SPCH"
  | "SESP"
  | "TGS"
  | "WCAS";

export type Description =
  | "Bienen School of Music"
  | "Law School"
  | "McCmick Schl of Engg & App Sci"
  | "Medill School of Journalism"
  | "Northwestern in Qatar"
  | "School of Communication"
  | "School of Educ & Social Policy"
  | "The Graduate School"
  | "Weinberg College of Arts & Sci";

export type Colors =
  | "red100"
  | "pink100"
  | "purple100"
  | "deepPurple100"
  | "indigo100"
  | "blue100"
  | "lightBlue100"
  | "cyan100"
  | "teal100"
  | "green100"
  | "lightGreen100"
  | "lime100"
  | "yellow100"
  | "amber100"
  | "orange100"
  | "deepOrange100"
  | "brown100"
  | "grey100"
  | "blueGrey100";

// for undergraduates, right now, both of these are the same
export type UseAcademicGroup = SchoolTitle;

export type UseDescription = Description;
