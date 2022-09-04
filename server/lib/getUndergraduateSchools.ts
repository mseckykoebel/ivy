import request from "request";

interface UndergraduateSchools {
  status: number;
  results: number;
  data: Record<string, any>;
  termId: string;
}

const getUndergraduateSchoolsFromTermId = async (
  termId: string,
  academicGroupsURL: string
): Promise<null | 404 | 500 | UndergraduateSchools> => {
  console.log("RUNNING WITH TERM ID: ", termId);

  const req = async (): Promise<UndergraduateSchools | null | 404 | 500> => {
    return new Promise((resolve, reject) => {
      if (!termId) {
        reject(null);
      }
      request(
        {
          url: academicGroupsURL + termId,
          headers: {
            apikey: process.env.API_KEY as string,
          },
        },
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            console.log("SHOULD REJECT");
            reject(500);
            return;
          }
          const academic_groups =
            JSON.parse(body).NW_CD_ACADGROUP_RESP.ACADGROUPS;
          if (!academic_groups) {
            reject(404);
            return;
          }
          const data: { school: string; schoolDescription: string }[] = [];
          // keeping track of duplicate quarters that come up
          const schools: string[] = [];
          // process terms
          for (let i = 0; i < academic_groups.length; i++) {
            if (!schools.includes(academic_groups[i].ACAD_GROUP)) {
              data.push({
                school: academic_groups[i].ACAD_GROUP,
                schoolDescription: academic_groups[i].USE_DESCR,
              });
              schools.push(academic_groups[i].ACAD_GROUP);
            }
          }

          resolve({
            status: 200,
            results: data.length as number,
            data: data,
            termId: termId,
          } as UndergraduateSchools);
        }
      );
    });
  };

  return new Promise<UndergraduateSchools | null | 404 | 500>(
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

export { getUndergraduateSchoolsFromTermId };
