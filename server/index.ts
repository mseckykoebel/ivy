import express from "express";
import dotenv from "dotenv";
import request from "request";
import cors from "cors";

dotenv.config({ path: ".env.local" });

const app = express();
const port = process.env.PORT || 3001;
const apiServiceURL =
  "https://northwestern-prod.apigee.net/student-system-classdescrallcls/4880/MEAS/COMP_SCI";

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
 * returns: A complete list of the academic groups - initially hard coded
 */
app.get("/api/v1/get_academic_groups", async (req, res, next) => {
  request(
    {
      url: apiServiceURL,
      headers: {
        apikey: process.env.API_KEY as string,
      },
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: response.body });
      }
      res.json(JSON.parse(body));
    }
  );
});

app.get("/", (req, res) => {
  res.status(200).send({ ok: true });
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
