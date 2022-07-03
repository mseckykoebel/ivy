import { School } from "./schools";
import { MEASSubjects } from "./subjects";
import { Instructor } from "./instructor";

// TODO: generally not known what is always guaranteed to be present: assuming everything is available unless found to be unavailable in the docs

export interface Courses {
  dateVisibleInSES: string;
  strm: string;
  termDescription: string;
  school: School;
  subject: MEASSubjects | undefined;
  description: string;
  classDescription: ClassDescription;
}

export interface ClassDescription {
  classNumber: string;
  courseId: string;
  catalogNumber: string;
  section: string;
  component: Component;
  courseTitle: string;
  topic?: string;
  enrollmentCapacity: string;
  startDate: string;
  endDate: string;
  classMeetingInformation: ClassMeetingInformation;
  associatedClass: AssociatedClass[];
  classAttributes: ClassAttributes;
  enrollmentRequirement?: EnrollmentRequirement[];
  instructor: Instructor;
}

export type Component = "LEC" | "DIS" | "NO DATA";

export interface ClassMeetingInformation {
  room: string;
  meetingTime: string;
}

// the docs have a CLASS_MEETING_INFO2 property, but it's the same as class meeting info, just in a different spot
export interface AssociatedClass {
  section: string;
  component: Component;
  classMeetingInfoTwo?: Array<ClassMeetingInformation>
}

export interface ClassAttributes {
  classAttributeValue: string;
}

export interface EnrollmentRequirement {
  enrollmentRequirementValue: string;
}
