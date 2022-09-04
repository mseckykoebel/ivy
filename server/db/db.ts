import fall20Courses from "./fall20Courses.json";
import winter21Courses from "./winter21Courses.json";
import spring21Courses from "./spring21Courses.json";
import summer21Courses from "./summer21Courses.json";
import fall21Courses from "./fall21Courses.json";
import winter22Courses from "./winter22Courses.json";
import spring22Courses from "./spring22Courses.json";
import summer22Courses from "./summer22Courses.json";
import fall22Courses from "./fall22Courses.json";
import winter23Courses from "./winter23Courses.json";

const db = (termId: number) => {
  switch (termId) {
    case 4800:
      return fall20Courses;
    case 4810:
      return winter21Courses;
    case 4820:
      return spring21Courses;
    case 4830:
      return summer21Courses;
    case 4840:
      return fall21Courses;
    case 4850:
      return winter22Courses;
    case 4860:
      return spring22Courses;
    case 4870:
      return summer22Courses;
    case 4880:
      return fall22Courses;
    case 4890:
      return winter23Courses;
  }
};

export { db };
