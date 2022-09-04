import express from "express";
import dotenv from "dotenv";
import request from "request";
import cors from "cors";

import { Term } from "./types/term";
import { UndergraduateSchools } from "./types/school";

import { getUndergraduateSchoolsFromTermId } from "./lib/getUndergraduateSchools";
import { getUndergraduateSubjectsFromSchool } from "./lib/getUndergraduateSubjects";

dotenv.config({ path: ".env.local" });

const app = express();
const port = process.env.PORT || 3001;
const apiYearUrl =
  "https://northwestern-prod.apigee.net/student-system-termget/UGRD";
const academicGroupsURL =
  "https://northwestern-prod.apigee.net/student-system-acadgroupget/";
const subjectsURL =
  "https://northwestern-prod.apigee.net/student-system-subjectsget/";

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
    const result = await getUndergraduateSchoolsFromTermId(
      req.query.termId as string,
      academicGroupsURL
    );
    return res.json(result);
  } catch (err) {
    console.log("ERROR ON SERVER: ", err);
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
    const result = (await getUndergraduateSchoolsFromTermId(
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
    // NIPPLES
    console.log("NIPPLES");

    // adding promises
    for (let i = 0; i < schools.length; i++) {
      promises.push(
        getUndergraduateSubjectsFromSchool(termId, schools.pop(), subjectsURL)
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
app.get("/api/v1/get_undergraduate_courses/", async (req, res) => {
  const termId = req.query.termId as string;
  try {
    const result = (await getUndergraduateSchoolsFromTermId(
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
    // NIPPLES
    console.log("NIPPLES");

    // adding promises
    for (let i = 0; i < schools.length; i++) {
      promises.push(
        getUndergraduateSubjectsFromSchool(termId, schools.pop(), subjectsURL)
      );
    }

    try {
      const subjectData = await Promise.all(promises);
      res.json(subjectData);
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
    console.log("Error fetching schools: ", err);
    res.status(500).send({
      error: 500,
      message: err,
    });
  }
});

app.get("/", (req, res) => {
  res.status(200).send({ ok: true });
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
