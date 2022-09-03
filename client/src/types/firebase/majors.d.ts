import { DocumentData } from "firebase/firestore";

export interface Major {
  userId: string;
  majorTitle: DocumentData;
}
