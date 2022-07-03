// Academic groups = schools
export interface Schools {
  school: School;
  description: Description;
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
  | "Weinberg College of Arts & Sci"

// for undergraduates, right now, both of these are the same
export type UseAcademicGroup = SchoolTitle; 

export type UseDescription = Description; 
