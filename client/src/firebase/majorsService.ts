import {
  DocumentData,
  getDocs,
  addDoc,
  query,
  where,
  collection,
  DocumentReference,
} from "firebase/firestore";
import { db, auth } from "./firebase";

const getMajorsByUserId = async (): Promise<DocumentData[]> => {
  const majorsRef = collection(db, "majors");
  const q = query(majorsRef, where("userId", "==", auth.currentUser?.uid));

  const data = await getDocs(q);

  return data.docs.map((doc) => doc.data());
};

const createMajorFromMajorTitle = async (
  majorTitle: string
): Promise<DocumentReference<DocumentData>> => {
  // auto-generates a new ID if this major is new
  return await addDoc(collection(db, "majors"), {
    userId: auth.currentUser?.uid,
    majorTitle: majorTitle,
  });
};

export { getMajorsByUserId, createMajorFromMajorTitle };
