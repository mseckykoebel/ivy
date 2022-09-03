/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { DocumentData } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { getMajorsByUserId } from "../firebase/majorsService";
import { Major } from "../types/firebase/majors";

export interface MajorsContext {
  createMajor: (major: string) => Promise<void> | void;
  updateMajor: (majorId: string) => Promise<void> | void;
  removeMajor: (majorId: string) => Promise<void> | void;
}

const majorsContext = React.createContext<MajorsContext>({
  createMajor: (major: string) => {},
  updateMajor: (majorId: string) => {},
  removeMajor: (majorId: string) => {},
});

export const useMajors = () => {
  return useContext(majorsContext);
};

export const MajorsProvider = ({ children }: any) => {
  // state
  const [majors, setMajors] = useState<DocumentData | null>(null);
  // initialization
  // get list of majors where userId === currentUser.uid
  useEffect(() => {
    const getMajors = async () => {
      const majors = await getMajorsByUserId();
      console.log("Majors from MajorsContext: ", majors);
      setMajors(majors);
    };

    getMajors();
  });
};
