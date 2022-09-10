import {
  getDocs,
  query,
  where,
  collection,
  updateDoc,
  arrayUnion,
  doc,
  arrayRemove,
} from "firebase/firestore";
import { ScheduleCourse } from "../types/schedule";
import { db } from "./firebase";
import { ScheduleCourseData, ScheduleRecord } from "./schedules";

// get the current schedule of the logged in user by userId
const getSchedulesByUserId = async (
  userId: string
): Promise<ScheduleRecord> => {
  const majorsRef = collection(db, "schedules");
  const q = query(majorsRef, where("userId", "==", userId));
  const data = await getDocs(q);
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
  updateSchedulesArrayAddCourse,
  updateSchedulesArrayRemoveCourse,
};
