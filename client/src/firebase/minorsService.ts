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
import { Minor, MinorRecord } from "../types/firebase/minors";
import { db, auth } from "./firebase";

const getMinorsByUserId = async (): Promise<MinorRecord[]> => {
  const minorsRef = collection(db, "minors");
  const q = query(minorsRef, where("userId", "==", auth.currentUser?.uid));
  const data = await getDocs(q);
  const d = [];
  for (let i = 0; i < data.docs.length; i++) {
    const info = { id: data.docs[i].id, data: data.docs[i].data() as Minor };
    d.push(info);
  }
  return d;
};

const createMinorFromMinorTitle = async (
  minorTitle: string
): Promise<DocumentReference<DocumentData>> => {
  return await addDoc(collection(db, "minors"), {
    userId: auth.currentUser?.uid,
    minorTitle: minorTitle,
  });
};

const updateMinor = async (minorTitle: string, documentId: string) => {
  const minorsRef = doc(db, "minors", documentId);

  return await updateDoc(minorsRef, {
    minorTitle: minorTitle,
  });
};

const deleteMinor = async (documentId: string) => {
  return await deleteDoc(doc(db, "minors", documentId));
};

export {
  getMinorsByUserId,
  createMinorFromMinorTitle,
  updateMinor,
  deleteMinor,
};
