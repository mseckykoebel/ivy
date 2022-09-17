// WINTER
import winter04Courses from "./winter04Courses.json";
import winter05Courses from "./winter05Courses.json";
import winter07Courses from "./winter07Courses.json";
import winter08Courses from "./winter08Courses.json";
import winter09Courses from "./winter09Courses.json";
import winter10Courses from "./winter10Courses.json";
import winter12Courses from "./winter12Courses.json";
import winter13Courses from "./winter13Courses.json";
import winter14Courses from "./winter14Courses.json";
import winter15Courses from "./winter15Courses.json";
import winter16Courses from "./winter16Courses.json";
import winter17Courses from "./winter17Courses.json";
import winter18Courses from "./winter18Courses.json";
import winter19Courses from "./winter19Courses.json";
import winter20Courses from "./winter20Courses.json";
import winter21Courses from "./winter21Courses.json";
import winter22Courses from "./winter22Courses.json";
import winter23Courses from "./winter23Courses.json";

// SPRING
import spring04Courses from "./spring04Courses.json";
import spring05Courses from "./spring05Courses.json";
import spring06Courses from "./spring06Courses.json";
import spring07Courses from "./spring07Courses.json";
import spring09Courses from "./spring09Courses.json";
import spring10Courses from "./spring10Courses.json";
import spring11Courses from "./spring11Courses.json";
import spring12Courses from "./spring12Courses.json";
import spring13Courses from "./spring13Courses.json";
import spring14Courses from "./spring14Courses.json";
import spring15Courses from "./spring15Courses.json";
import spring16Courses from "./spring16Courses.json";
import spring17Courses from "./spring17Courses.json";
import spring18Courses from "./spring18Courses.json";
import spring19Courses from "./spring19Courses.json";
import spring20Courses from "./spring20Courses.json";
import spring21Courses from "./spring21Courses.json";
import spring22Courses from "./spring22Courses.json";
import spring23Courses from "./spring23Courses.json";

// SUMMER
import summer04Courses from "./summer04Courses.json";
import summer05Courses from "./summer05Courses.json";
import summer06Courses from "./summer06Courses.json";
import summer07Courses from "./summer07Courses.json";
import summer08Courses from "./summer08Courses.json";
import summer09Courses from "./summer09Courses.json";
import summer10Courses from "./summer10Courses.json";
import summer11Courses from "./summer11Courses.json";
import summer12Courses from "./summer12Courses.json";
import summer13Courses from "./summer13Courses.json";
import summer14Courses from "./summer14Courses.json";
import summer15Courses from "./summer15Courses.json";
import summer16Courses from "./summer16Courses.json"; // 🙏
import summer17Courses from "./summer17Courses.json";
import summer18Courses from "./summer18Courses.json";
import summer19Courses from "./summer19Courses.json";
import summer20Courses from "./summer20Courses.json";
import summer21Courses from "./summer21Courses.json";
import summer22Courses from "./summer22Courses.json";
// summer 23 pending

// FALL
import fall04Courses from "./fall04Courses.json";
import fall05Courses from "./fall05Courses.json";
import fall06Courses from "./fall06Courses.json";
import fall10Courses from "./fall10Courses.json";
import fall11Courses from "./fall22Courses.json";
import fall12Courses from "./fall12Courses.json";
import fall13Courses from "./fall13Courses.json";
import fall14Courses from "./fall14Courses.json";
import fall15Courses from "./fall15Courses.json";
import fall16Courses from "./fall16Courses.json";
import fall17Courses from "./fall17Courses.json";
import fall18Courses from "./fall18Courses.json";
import fall19Courses from "./fall19Courses.json";
import fall20Courses from "./fall20Courses.json";
import fall21Courses from "./fall21Courses.json";
import fall22Courses from "./fall22Courses.json";

const db = (termId: number) => {
  switch (termId) {
    case 4130:
      return winter04Courses;
    case 4140:
      return spring04Courses;
    case 4150:
      return summer04Courses;
    case 4160:
      return fall04Courses;
    case 4170:
      return winter05Courses;
    case 4180:
      return spring05Courses;
    case 4190:
      return summer05Courses;
    case 4200:
      return fall05Courses;
    // case 4210:
    //   return winter06Courses;
    case 4220:
      return spring06Courses;
    case 4230:
      return summer06Courses;
    case 4240:
      return fall06Courses;
    case 4250:
      return winter07Courses;
    case 4260:
      return spring07Courses;
    case 4270:
      return summer07Courses;
    // case 4280:
    //   return fall07Courses;
    case 4290:
      return winter08Courses;
    // case 4300:
    //   return spring08Courses;
    case 4310:
      return summer08Courses;
    // case 4320:
    //   return fall08Courses;
    case 4330:
      return winter09Courses;
    case 4340:
      return spring09Courses;
    case 4350:
      return summer09Courses;
    // case 4360:
    //   return fall09Courses;
    case 4370:
      return winter10Courses;
    case 4380:
      return spring10Courses;
    case 4390:
      return summer10Courses;
    case 4400:
      return fall10Courses;
    // case 4410:
    //   return winter11Courses;
    case 4420:
      return spring11Courses;
    case 4430:
      return summer11Courses;
    case 4440:
      return fall11Courses;
    case 4450:
      return winter12Courses;
    case 4460:
      return spring12Courses;
    case 4470:
      return summer12Courses;
    case 4480:
      return fall12Courses;
    case 4490:
      return winter13Courses;
    case 4500:
      return spring13Courses;
    case 4510:
      return summer13Courses;
    case 4520:
      return fall13Courses;
    case 4530:
      return winter14Courses;
    case 4540:
      return spring14Courses;
    case 4550:
      return summer14Courses;
    case 4560:
      return fall14Courses;
    case 4570:
      return winter15Courses;
    case 4580:
      return spring15Courses;
    case 4590:
      return summer15Courses;
    case 4600:
      return fall15Courses;
    case 4610:
      return winter16Courses;
    case 4620:
      return spring16Courses;
    case 4630:
      return summer16Courses;
    case 4640:
      return fall16Courses;
    case 4650:
      return winter17Courses;
    case 4660:
      return spring17Courses;
    case 4670:
      return summer17Courses;
    case 4680:
      return fall17Courses;
    case 4690:
      return winter18Courses;
    case 4700:
      return spring18Courses;
    case 4710:
      return summer18Courses;
    case 4720:
      return fall18Courses;
    case 4730:
      return winter19Courses;
    case 4740:
      return spring19Courses;
    case 4750:
      return summer19Courses;
    case 4760:
      return fall19Courses;
    case 4770:
      return winter20Courses;
    case 4780:
      return spring20Courses;
    case 4790:
      return summer20Courses;
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
    case 4900:
      return spring23Courses;
    default:
      return null;
  }
};

export { db };
