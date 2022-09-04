import request from "request";

import { UndergraduateSubject } from "../types/subject";

const getUndergraduateSubjectsFromSchool = async (
  termId: string,
  schoolId: string,
  subjectsURL: string
): Promise<null | 404 | 500 | UndergraduateSubject> => {
  console.log("RUNNING WITH SCHOOL: ", schoolId);

  const req = async (): Promise<UndergraduateSubject | null | 404 | 500> => {
    return new Promise((resolve, reject) => {
      if (!schoolId || !termId) {
        reject(null);
        return;
      }
      request(
        {
          url: subjectsURL + termId + "/" + schoolId,
          headers: {
            apikey: process.env.API_KEY as string,
          },
        },
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            console.log("SHOULD REJECT");
            console.log("CODE: ", response.statusCode);
            reject(500);
            return;
          }
          const academic_groups =
            JSON.parse(body).NW_CD_SUBJECT_RESP.ACAD_GROUP;
          if (!academic_groups) {
            reject(404);
            return;
          }
          const data: { subject: string; subjectDescription: string }[] = [];
          // keeping track of duplicate quarters that come up
          const subjects: string[] = [];
          // process terms
          for (let i = 0; i < academic_groups.length; i++) {
            if (!subjects.includes(academic_groups[i].SUBJECT)) {
              data.push({
                subject: academic_groups[i].SUBJECT,
                subjectDescription: academic_groups[i].DESCR,
              });
              subjects.push(academic_groups[i].SUBJECT);
            }
          }

          resolve({
            status: 200,
            results: data.length as number,
            data: data,
            school: schoolId,
          } as UndergraduateSubject);
        }
      );
    });
  };

  return new Promise<UndergraduateSubject | null | 404 | 500>(
    (resolve, reject) => {
      req()
        .then((d) => {
          console.log("DATA: ", d);
          resolve(d);
        })
        .catch((err) => {
          reject(err);
          return;
        });
    }
  );
};

export { getUndergraduateSubjectsFromSchool };
