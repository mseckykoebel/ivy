import {
  collection,
  DocumentData,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { Major } from "../types/firebase/majors";
import { db, auth } from "./firebase";

// can also use getDocs for this

const getMajorsByUserId = async (): Promise<QuerySnapshot<DocumentData>> => {
  const majorsRef = collection(db, "majors");
  const q = query(majorsRef, where("userId", "==", auth.currentUser?.uid));

  return await getDocs(q);
};

export { getMajorsByUserId };
