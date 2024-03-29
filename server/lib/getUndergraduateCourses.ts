import request from "request";

import {
  UndergraduateCourseDetail,
  UndergraduateCourseSearch,
} from "../types/course";

const getUndergraduateCourses = async (
  termId: string,
  schoolId: string,
  subjectId: string,
  coursesURL: string
): Promise<null | 404 | 500 | UndergraduateCourseSearch> => {
  const url = coursesURL + termId + "/" + schoolId + "/" + subjectId;
  const req = async (): Promise<
    UndergraduateCourseSearch | null | 404 | 500
  > => {
    return new Promise((resolve, reject) => {
      if (!schoolId || !termId || !subjectId) {
        reject(null);
        return;
      }
      request(
        {
          url: url,
          headers: {
            apikey: process.env.API_KEY as string,
          },
        },
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            reject(500);
            return;
          }
          const classDescriptions =
            JSON.parse(body).NW_CD_DTL_ALLCLS_RESP.CLASSDESCR;
          const termDescription =
            JSON.parse(body).NW_CD_DTL_ALLCLS_RESP.TermDescr;
          if (!classDescriptions) {
            reject(404);
            return;
          }
          const data: UndergraduateCourseDetail[] = [];
          // process terms
          for (let i = 0; i < classDescriptions.length; i++) {
            // no duplicate checking - assuming all courses have a unique id
            data.push({
              termDescription: termDescription,
              catalogNumber: classDescriptions[i].CATALOG_NBR,
              section: classDescriptions[i].SECTION,
              component: classDescriptions[i].COMPONENT,
              courseTitle: classDescriptions[i].COURSE_TITLE,
              topic: classDescriptions[i].TOPIC,
              courseNumber: classDescriptions[i].CLASS_NBR,
              classMeetingInfo: classDescriptions[i].CLASS_MTG_INFO
                ? classDescriptions[i].CLASS_MTG_INFO?.filter(
                    (info: Record<string, string>) =>
                      info.MEETING_TIME.includes("TBA") ||
                      info.MEETING_TIME.includes("NO DATA") ||
                      info.MEETING_TIME === "" ||
                      info.MEETING_TIME.length === 0
                        ? null
                        : info.MEETING_TIME
                  )
                : null,
              startDate: classDescriptions[i].START_DT,
            });
          }

          resolve({
            status: 200,
            results: data.length as number,
            data: data,
            school: schoolId,
            subject: subjectId,
          } as UndergraduateCourseSearch);
        }
      );
    });
  };

  return new Promise<UndergraduateCourseSearch | null | 404 | 500>(
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

export { getUndergraduateCourses };
