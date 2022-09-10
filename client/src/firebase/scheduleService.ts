import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "./firebase";
import { ScheduleCourseData, ScheduleRecord } from "./schedules";

const getSchedulesByUserId = async (
  userId: string
): Promise<ScheduleRecord[]> => {
  const majorsRef = collection(db, "schedules");
  const q = query(majorsRef, where("userId", "==", userId));
  const data = await getDocs(q);
  const d = [];
  for (let i = 0; i < data.docs.length; i++) {
    const info = {
      id: data.docs[i].id,
      data: data.docs[i].data() as ScheduleCourseData,
    };
    d.push(info);
  }
  return d;
};

export { getSchedulesByUserId };
