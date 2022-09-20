// found a bug in the API! There are courses available for summer of 2022 that the API
// can access. But, getting a list of schools by termId does not return all of the
// available schools. For those reasons, we must bolster it with this list of all schools,
// for now

const ACADGROUPS_DB = [
  {
    ACAD_GROUP: "MUSIC",
    DESCR: "Bienen School of Music",
    USE_ACAD_GROUP: "MUSIC",
    USE_DESCR: "Bienen School of Music",
  },
  {
    ACAD_GROUP: "LAW",
    DESCR: "Law School",
    USE_ACAD_GROUP: "LAW",
    USE_DESCR: "Law School",
  },
  {
    ACAD_GROUP: "MEAS",
    DESCR: "McCmick Schl of Engg & App Sci",
    USE_ACAD_GROUP: "MEAS",
    USE_DESCR: "McCormick School of Engineering and Applied Science",
  },
  {
    ACAD_GROUP: "JOUR",
    DESCR: "Medill School of Journalism",
    USE_ACAD_GROUP: "JOUR",
    USE_DESCR: "Medill School of Journalism",
  },
  {
    ACAD_GROUP: "DOHA",
    DESCR: "Northwestern in Qatar",
    USE_ACAD_GROUP: "DOHA",
    USE_DESCR: "Northwestern in Qatar",
  },
  {
    ACAD_GROUP: "SPCH",
    DESCR: "School of Communication",
    USE_ACAD_GROUP: "SOC",
    USE_DESCR: "School of Communication",
  },
  {
    ACAD_GROUP: "SESP",
    DESCR: "School of Educ & Social Policy",
    USE_ACAD_GROUP: "SESP",
    USE_DESCR: "School of Educ & Social Policy",
  },
  {
    ACAD_GROUP: "UC",
    DESCR: "School of Professional Studies",
    USE_ACAD_GROUP: "SCS",
    USE_DESCR: "School of Professional Studies",
  },
  {
    ACAD_GROUP: "TGS",
    DESCR: "The Graduate School",
    USE_ACAD_GROUP: "TGS",
    USE_DESCR: "The Graduate School",
  },
  {
    ACAD_GROUP: "WCAS",
    DESCR: "Weinberg College of Arts & Sci",
    USE_ACAD_GROUP: "WCAS",
    USE_DESCR: "Weinberg College of Arts and Sciences",
  },
];

export { ACADGROUPS_DB };
