import {
  DocumentData,
  getDocs,
  addDoc,
  query,
  where,
  collection,
  DocumentReference,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Major, MajorRecord } from "../types/firebase/majors";
import { db, auth } from "./firebase";

const getMajorsByUserId = async (): Promise<MajorRecord[]> => {
  const majorsRef = collection(db, "majors");
  const q = query(majorsRef, where("userId", "==", auth.currentUser?.uid));
  const data = await getDocs(q);
  const d = [];
  for (let i = 0; i < data.docs.length; i++) {
    const info = { id: data.docs[i].id, data: data.docs[i].data() as Major };
    d.push(info);
  }
  return d;
};

const createMajorFromMajorTitle = async (
  majorTitle: string
): Promise<DocumentReference<DocumentData>> => {
  return await addDoc(collection(db, "majors"), {
    userId: auth.currentUser?.uid,
    majorTitle: majorTitle,
  });
};

const updateMajor = async (majorTitle: string, documentId: string) => {
  const majorsRef = doc(db, "majors", documentId);

  return await updateDoc(majorsRef, {
    majorTitle: majorTitle,
  });
};

const deleteMajor = async (documentId: string) => {
  return await deleteDoc(doc(db, "majors", documentId));
};

export {
  getMajorsByUserId,
  createMajorFromMajorTitle,
  updateMajor,
  deleteMajor,
};
