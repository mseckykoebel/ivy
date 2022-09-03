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
import { Major } from "../types/firebase/majors";
import { db, auth } from "./firebase";

const getMajorsByUserId = async (): Promise<{ id: string; data: Major }[]> => {
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
  console.log("Creating a new major record");
  // auto-generates a new ID if this major is new
  return await addDoc(collection(db, "majors"), {
    userId: auth.currentUser?.uid,
    majorTitle: majorTitle,
  });
};

const updateMajor = async (majorTitle: string, documentId: string) => {
  console.log("DOCUMENT ID: ", documentId);
  const majorsRef = doc(db, "majors", documentId);

  await updateDoc(majorsRef, {
    majorTitle: majorTitle,
  });
};

const deleteMajor = async (documentId: string) => {
  console.log("DOCUMENT ID TO BE DELETED: ", documentId);
  await deleteDoc(doc(db, "majors", documentId));
};

export {
  getMajorsByUserId,
  createMajorFromMajorTitle,
  updateMajor,
  deleteMajor,
};
