// request(
//   {
//     url: academicGroupsURL + req.query.termId,
//     headers: {
//       apikey: process.env.API_KEY as string,
//     },
//   },
//   (error, response, body) => {
//     if (error || response.statusCode !== 200) {
//       return res.status(404).json({ type: "error", message: response.body });
//     }
//     const academic_groups = JSON.parse(body).NW_CD_ACADGROUP_RESP.ACADGROUPS;
//     if (!academic_groups) {
//       return res
//         .status(500)
//         .json({ type: "error", message: "No terms schools for this term" });
//     }
//     const data: { school: string; schoolDescription: string }[] = [];
//     // keeping track of duplicate quarters that come up
//     const schools: string[] = [];
//     // process terms
//     for (let i = 0; i < academic_groups.length; i++) {
//       if (!schools.includes(academic_groups[i].ACAD_GROUP)) {
//         data.push({
//           school: academic_groups[i].ACAD_GROUP,
//           schoolDescription: academic_groups[i].USE_DESCR,
//         });
//         schools.push(academic_groups[i].ACAD_GROUP);
//       }
//     }
//     res.json({
//       status: 200,
//       results: data.length as number,
//       data: data,
//       termId: req.query.termId,
//     });
//   }
// );
