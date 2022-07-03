// TODO: everything including MEAS
// TODO: can we make a generic interface that takes a school and gives us the subjects in return?
export interface MEAS {
    subject: MEASSubjects;
    description: MEASDescriptions;
}

export type MEASSubjects =
  | "BMD_ENG"
  | "CHEM_ENG"
  | "CIV_ENV"
  | "COMP_ENG"
  | "COMP_SCI"
  | "CRDV"
  | "DSGN"
  | "ELEC_ENG"
  | "ENTREP"
  | "ES_APPM"
  | "GEN_ENG"
  | "IEMS"
  | "INF_TECH"
  | "ISEN"
  | "LDRSHP"
  | "MAT_SCI"
  | "MBAI"
  | "MBIOTECH"
  | "MECH_ENG"
  | "MEM"
  | "MPD"
  | "MSAI"
  | "NICO"
  | "PRDV"
  | "PROJ_MGT"
  | "PSED";

export type MEASDescriptions =
  | "Biomedical Engineering"
  | "Chemical Engineering"
  | "Civil and Environmental Engineering"
  | "Computer Engineering"
  | "Computer Science"
  | "Career Development"
  | "Segal Design Institute"
  | "Electrical Engineering"
  | "Entrepreneurship & Innovation"
  | "Engineering Science & Applied Math"
  | "General Engineering"
  | "Industrial Engineering & Management Sciences"
  | "Information Technology"
  | "Institute for Sustainability & Energy at NU"
  | "Center for Leadership"
  | "Materials Science & Engineering"
  | "Bus/Artificial Intelligence"
  | "Masters in Biotechnology Program"
  | "Mechanical Engineering"
  | "Master of Engineering Management"
  | "Master of Product Development"
  | "Artificial Intelligence"
  | "Master of Science in Analytics"
  | "Northwestern Institute for Complex Systems"
  | "Personal Development"
  | "Project Management"
  | "Predictive Science and Engineering";
