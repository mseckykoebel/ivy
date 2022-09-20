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
import { ScheduleCourse } from "../types/schedule";
import { db } from "./firebase";
import { ScheduleCourseData, ScheduleRecord } from "./schedules";

// get the current schedule of the logged in user by userId
const getSchedulesByUserId = async (
  userId: string
): Promise<ScheduleRecord | null> => {
  const majorsRef = collection(db, "schedules");
  const q = query(majorsRef, where("userId", "==", userId));
  const data = await getDocs(q);
  if (data.docs.length === 0) return null;
  return {
    id: data.docs[0].id,
    data: data.docs[0].data() as ScheduleCourseData,
  };
};

// add an element to the schedules array
const updateSchedulesArrayAddCourse = async (
  scheduleId: string,
  courseData: ScheduleCourse
): Promise<void> => {
  const schedulesRef = doc(db, "schedules", scheduleId);
  await updateDoc(schedulesRef, {
    coursesData: arrayUnion(courseData),
  });
};

// create the schedules array if it does not already exist
// returns the document Id for this schedule
const createSchedulesArrayAddCourse = async (
  userId: string,
  courseData: ScheduleCourse
): Promise<string> => {
  const schedulesRef = collection(db, "schedules");
  return await addDoc(schedulesRef, {
    userId: userId,
    title: "",
    coursesData: arrayUnion(courseData),
  }).then((docRef) => {
    return docRef.id;
  });
};

// remove an element from the schedules array
const updateSchedulesArrayRemoveCourse = async (
  scheduleId: string,
  courseData: ScheduleCourse
): Promise<void> => {
  const schedulesRef = doc(db, "schedules", scheduleId);
  await updateDoc(schedulesRef, {
    coursesData: arrayRemove(courseData),
  });
};

export {
  getSchedulesByUserId,
  createSchedulesArrayAddCourse,
  updateSchedulesArrayAddCourse,
  updateSchedulesArrayRemoveCourse,
};
