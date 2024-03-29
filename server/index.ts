import express from "express";
import dotenv from "dotenv";
import request from "request";
import cors from "cors";

import { Term } from "./types/term";

import { getUndergraduateSchools } from "./lib/getUndergraduateSchools";
import { getUndergraduateSubjects } from "./lib/getUndergraduateSubjects";
import { getUndergraduateCourses } from "./lib/getUndergraduateCourses";
import type { UndergraduateSubject } from "./types/subject";
import type { UndergraduateSchools } from "./types/school";

import { db } from "./db/db";

dotenv.config({ path: ".env.local" });

const app = express();
const port = process.env.PORT || 3001;
const apiYearUrl =
  "https://northwestern-prod.apigee.net/student-system-termget/UGRD";
const academicGroupsURL =
  "https://northwestern-prod.apigee.net/student-system-acadgroupget/";
const subjectsURL =
  "https://northwestern-prod.apigee.net/student-system-subjectsget/";
const allCoursesURL =
  "https://northwestern-prod.apigee.net/student-system-classdescrallcls/";
const coursesURL =
  "https://northwestern-prod.apigee.net/student-system-classdescroneclass/";

app.use(express.json());

/**
 * Adding authorization access control header
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
} else {
  app.use(
    cors({
      origin: "https://ivy.raiso.org",
    })
  );
}

/**
 * Info GET endpoint
 */
app.get("/info", (req, res, next) => {
  res.send(
    "This is a proxy service which proxies to the northwestern course API."
  );
});

/**
 * method: GET
 * function: returns a list of school years
 */
app.get("/api/v1/get_undergraduate_school_years", async (req, res) => {
  request(
    {
      url: apiYearUrl,
      headers: {
        apikey: process.env.API_KEY as string,
      },
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: response.body });
      }
      const terms = JSON.parse(body).NW_CD_TERM_RESP.TERM;
      const data: { year: string }[] = [];
      // keeping track of duplicate years that come up
      const years: string[] = [];
      // process terms
      for (let i = 0; i < terms.length; i++) {
        if (!years.includes(terms[i].TermDescr.substring(0, 4))) {
          data.push({ year: terms[i].TermDescr.substring(0, 4) });
          years.push(terms[i].TermDescr.substring(0, 4));
        }
      }
      res.json({
        status: 200,
        results: terms.length as number,
        school_years: data,
      });
    }
  );
});

/**
 * method: GET
 * function: returns a list of quarters
 */
app.get("/api/v1/get_undergraduate_quarters", async (req, res) => {
  request(
    {
      url: apiYearUrl,
      headers: {
        apikey: process.env.API_KEY as string,
      },
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: response.body });
      }
      const terms = JSON.parse(body).NW_CD_TERM_RESP.TERM;
      const data: { quarter: string }[] = [];
      // keeping track of duplicate quarters that come up
      const quarters: string[] = [];
      // process terms
      for (let i = 0; i < terms.length; i++) {
        if (!quarters.includes(terms[i].TermDescr.split(" ").pop())) {
          data.push({ quarter: terms[i].TermDescr.split(" ").pop() });
          quarters.push(terms[i].TermDescr.split(" ").pop());
        }
      }
      res.json({
        status: 200,
        results: terms.length as number,
        quarters: data,
      });
    }
  );
});

/**
 * method: GET
 * function: returns a TermID given a term description (school year and quarter)
 */
app.get("/api/v1/get_undergraduate_term_id/", async (req, res) => {
  const checkTerm = (terms: Term) => {
    return terms.TermDescr === req.query.year + " " + req.query.quarter;
  };
  request(
    {
      url: apiYearUrl,
      headers: {
        apikey: process.env.API_KEY as string,
      },
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: response.body });
      }

      const terms = JSON.parse(body).NW_CD_TERM_RESP.TERM;
      const term = terms.filter(checkTerm);

      res.json({
        status: 200,
        results: term.length as number,
        term: !term[0] ? null : term[0].TermID,
      });
    }
  );
});

/**
 * method: GET
 * function: returns a list of undergraduate schools given a termId
 */
app.get("/api/v1/get_undergraduate_schools/", async (req, res) => {
  try {
    const result = await getUndergraduateSchools(
      req.query.termId as string,
      academicGroupsURL
    );
    return res.json(result);
  } catch (err) {
    if (err === undefined) {
      res
        .status(500)
        .json({ type: "error", message: "response rejected: null termId" });
      return;
    }
    if (err === 404) {
      res.status(404).json({ type: "error", message: "No courses found!" });
      return;
    }
  }
});

/**
 * method: GET
 * function: returns a list of all academic subjects given a termId
 */
app.get("/api/v1/get_undergraduate_subjects/", async (req, res) => {
  const termId = req.query.termId as string;
  try {
    const result = (await getUndergraduateSchools(
      termId,
      academicGroupsURL
    )) as UndergraduateSchools;
    // initiate promises
    const promises = [];
    const schools: string[] = [];
    // pluck the schools
    for (let i = 0; i < result.data.length; i++) {
      schools.push(result.data[i].school);
    }
    // now we have the list of schools...

    // adding promises
    for (let i = 0; i < schools.length; i++) {
      promises.push(
        getUndergraduateSubjects(termId, schools.pop(), subjectsURL)
      );
    }

    // executing mass subject search
    Promise.all(promises)
      .then((d) => {
        res.json(d);
      })
      .catch((err) => {
        res.status(500).send({
          error: 500,
          message: err,
        });
      });
  } catch (err) {
    console.log(err);
  }
});

/**
 * method: GET
 * function: returns a list of all undergraduate courses given a termId
 */
app.get("/api/v1/get_all_undergraduate_courses/", async (req, res) => {
  const brokenTermIds = [4210, 4280, 4300, 4320, 4360, 4410];
  const termId = req.query.termId as string;
  if (brokenTermIds.includes(Number(req.query.termId))) {
    return res.status(404).send({
      error: 404,
      message: "Courses not stable yet for this year and quarter",
    });
  }
  const cache = db(Number(termId));
  // see if we can cache the results
  // if (termId && cache !== null) {
  //   return res.json(cache);
  // }
  // go into the depths of hell
  try {
    const result = (await getUndergraduateSchools(
      termId,
      academicGroupsURL
    )) as UndergraduateSchools;
    // initiate promises
    const promises = [];
    const schools: string[] = [];
    // pluck the schools
    for (let i = 0; i < result.data.length; i++) {
      schools.push(result.data[i].school);
    }

    // we now have the list of schools

    // adding promises
    for (let i = 0; i < schools.length; i++) {
      promises.push(getUndergraduateSubjects(termId, schools[i], subjectsURL));
    }

    try {
      const subjectData = await Promise.all(promises);
      const cleanedSubjectData: UndergraduateSubject[] = [];
      // first, remove 404's and 500's (promises that did not resolve)
      for (let i = 0; i < subjectData.length; i++) {
        if ((subjectData[i] as unknown as UndergraduateSubject).data) {
          cleanedSubjectData.push(subjectData[i] as UndergraduateSubject);
        }
      }
      const mergedSubjectData: { school: string; subject: string }[] = [];
      // pluck the subject from subjectData
      for (let i = 0; i < cleanedSubjectData.length; i++) {
        for (let j = 0; j < cleanedSubjectData[i].data.length; j++) {
          mergedSubjectData.push({
            school: cleanedSubjectData[i].school,
            subject: cleanedSubjectData[i].data[j].subject,
          });
        }
      }
      // now, execute operation gigaPromise
      const coursePromises = [];
      // Ready...aim... 🔫
      for (let i = 0; i < mergedSubjectData.length; i++) {
        coursePromises.push(
          getUndergraduateCourses(
            termId,
            mergedSubjectData[i].school,
            mergedSubjectData[i].subject,
            allCoursesURL
          )
        );
      }
      // FIRE 🐎
      try {
        const courseData = await Promise.allSettled(coursePromises);
        const cleanedCourseData = [];
        // shit any casting for now
        for (let i = 0; i < courseData.length; i++) {
          if ((courseData[i] as any).value?.status) {
            cleanedCourseData.push((courseData[i] as any).value);
          }
        }
        res.json(cleanedCourseData);
      } catch (err) {
        console.log(
          "There was some kind of error with fetching courses: ",
          err
        );
        res.status(404).send({
          error: 404,
          message: err,
        });
      }
      // res.json(coursePromises);
    } catch (err) {
      console.log(
        "There was some kind of error with fetching subjects for course searching: ",
        err
      );
      res.status(500).send({
        error: 500,
        message: err,
      });
    }
  } catch (err) {
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
});

/**
 * method: GET
 * function: returns a detailed list of course attributes given a term, school, subject, and course number
 */
app.get("/api/v1/get_course_detail/", async (req, res) => {
  const termId = req.query.termId;
  const schoolId = req.query.schoolId;
  const subjectId = req.query.subjectId;
  const courseId = req.query.courseId;

  if (!termId || !schoolId || !subjectId || !courseId)
    res.status(500).json({ type: "error", message: "Missing parameters!" });

  const url = `${coursesURL}${termId}/${schoolId}/${subjectId}/${courseId}`;

  request(
    {
      url: url,
      headers: {
        apikey: process.env.API_KEY as string,
      },
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: response.body });
      }

      const oneClassData = JSON.parse(body).NW_CD_ONECLASS_RESP;
      const classDescription = oneClassData.CLASSDESCR[0];
      // granular course description information
      const classMeetingInfo =
        classDescription.CLASS_MTG_INFO === undefined
          ? null
          : classDescription.CLASS_MTG_INFO[0];
      const associatedClass =
        classDescription.ASSOCIATED_CLASS === undefined
          ? null
          : classDescription.ASSOCIATED_CLASS[0];
      const classAttributes =
        classDescription.CLASS_ATTRIBUTES === undefined
          ? null
          : classDescription.CLASS_ATTRIBUTES[0];
      const enrollmentRequirement =
        classDescription.ENRL_REQUIREMENT === undefined
          ? null
          : classDescription.ENRL_REQUIREMENT[0];
      const instructorInformation =
        classDescription.INSTRUCTOR === undefined
          ? null
          : classDescription.INSTRUCTOR[0];

      // if there is an array of information, we take the first component (core assumption here)
      const oneCourseData: Record<string, string> = {
        "📖 Course title": classDescription.COURSE_TITLE,
        "📚 Subject description": oneClassData.DESCR,
        "🔍 Subject Id": oneClassData.SUBJECT,
        "🐈 Catalogue number": classDescription.CATALOG_NBR,
        "☝️ Section": classDescription.SECTION,
        "👾 Component": classDescription.COMPONENT,

        "📓 Description": oneClassData.TermDescr,
        "🚌 School": oneClassData.ACAD_GROUP,

        // now, the granular shit
        "💯 Class number": classDescription.CLASS_NBR,

        "🎙 Topic (if any)": classDescription.TITLE,
        "🪑 Enrollment capacity": classDescription.ENRL_CAP,
        "🐎 Start date": classDescription.START_DT,
        "🏁 End date": classDescription.END_DT,
        // array data from above
        "🚪 Class meeting room": classMeetingInfo
          ? classMeetingInfo.ROOM
          : "N/A",
        "⏰ Class meeting time": classMeetingInfo
          ? classMeetingInfo.MEETING_TIME
          : "N/A",
        "😴 Associated classes": associatedClass
          ? associatedClass.SECTION
          : "N/A",
        "☄️ Associated classes": associatedClass
          ? associatedClass.COMPONENT
          : "N/A",
        "👔 Class attributes": classAttributes
          ? classAttributes.CRSE_ATTR_VALUE
          : "N/A",
        "🤔 Enrollment requirements": enrollmentRequirement
          ? enrollmentRequirement.ENRL_REQ_VALUE
          : "N/A",
        "🧑‍🏫 Instructor name": instructorInformation
          ? instructorInformation.DISPLAY_NAME
          : "N/A",
        "☎️ Instructor phone": instructorInformation
          ? instructorInformation.PHONE
          : "N/A",
        "🏡 Instructor campus address": instructorInformation
          ? instructorInformation.CAMPUS_ADDR
          : "N/A",
        "📌 Office hours": instructorInformation
          ? instructorInformation.OFFICE_HOURS
          : "N/A",
        "🤓 Bio": instructorInformation
          ? instructorInformation.INST_BIO
          : "N/A",
        "👨‍💻 Website": instructorInformation ? instructorInformation.URL : "N/A",
        "🧋 Term Id": oneClassData.STRM,
        "🎢 Course Id": classDescription.CRSE_ID,
        "🔮 Date visible in system": oneClassData.DATE_VISIBLE_IN_SES,
      };

      res.json({
        status: 200,
        results: Object.keys(oneCourseData).length as number,
        body: oneCourseData,
      });
    }
  );
});

/**
 * method: GET
 * function: returns a detailed list of course attributes given a term, school, subject, and course number
 */
app.get("/api/v1/get_course_associated_classes/", async (req, res) => {
  const termId = req.query.termId;
  const schoolId = req.query.schoolId;
  const subjectId = req.query.subjectId;
  const courseId = req.query.courseId;

  if (!termId || !schoolId || !subjectId || !courseId)
    res.status(500).json({ type: "error", message: "Missing parameters!" });

  const url = `${coursesURL}${termId}/${schoolId}/${subjectId}/${courseId}`;

  request(
    {
      url: url,
      headers: {
        apikey: process.env.API_KEY as string,
      },
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: response.body });
      }

      const oneClassData = JSON.parse(body).NW_CD_ONECLASS_RESP;
      const classDescription = oneClassData.CLASSDESCR[0];
      const associatedClasses =
        classDescription.ASSOCIATED_CLASS === undefined
          ? null
          : classDescription.ASSOCIATED_CLASS;

      res.json({
        status: 200,
        results: associatedClasses.length,
        body: associatedClasses,
      });
    }
  );
});

app.get("/", (req, res) => {
  res.status(200).send({ ok: true });
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
