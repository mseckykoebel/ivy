import firebase from "firebase/compat/app";
import {
  getDocs,
  query,
  where,
  collection,
  updateDoc,
  arrayUnion,
  doc,
  arrayRemove,
  addDoc,
} from "firebase/firestore";
import { CalendarCourse } from "../types/calendar";
import { db } from "./firebase";
import { CalendarCourseData, CalendarRecord } from "./calendars";

// get the current calendar of the logged in user by userId
const getCalendarByUserId = async (
  userId: string
): Promise<CalendarRecord | null> => {
  const calendarsRef = collection(db, "calendars");
  const q = query(calendarsRef, where("userId", "==", userId));
  const data = await getDocs(q);
  if (data.docs.length === 0) return null;
  return {
    id: data.docs[0].id,
    data: data.docs[0].data() as CalendarCourseData,
  };
};

// add an element to the calendars array
const updateCalendarArrayAddCourse = async (
  calendarId: string,
  courseData: CalendarCourse
): Promise<void> => {
  const calendarRef = doc(db, "calendars", calendarId);
  await updateDoc(calendarRef, {
    lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
    coursesData: arrayUnion(courseData),
  });
};

// create the calendar array if it does not already exist
// returns the document Id for this calendar
const createCalendarArrayAddCourse = async (
  userId: string,
  courseData: CalendarCourse
): Promise<string> => {
  const calendarRef = collection(db, "calendars");
  return await addDoc(calendarRef, {
    userId: userId,
    title: "",
    lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
    coursesData: arrayUnion(courseData),
  }).then((docRef) => {
    return docRef.id;
  });
};

// remove an element from the calendars array
const updateCalendarArrayRemoveCourse = async (
  calendarId: string,
  courseData: CalendarCourse
): Promise<void> => {
  const calendarRef = doc(db, "calendars", calendarId);
  console.log(courseData);
  await updateDoc(calendarRef, {
    lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
    coursesData: arrayRemove(courseData),
  });
};

export {
  getCalendarByUserId,
  createCalendarArrayAddCourse,
  updateCalendarArrayAddCourse,
  updateCalendarArrayRemoveCourse,
};
