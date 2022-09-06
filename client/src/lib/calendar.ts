/* eslint-disable indent */
// ^ eslint being stupid
// TODO : make this a list of the actual starting times
type StartingTime = string;
type ColStartClasses =
  | "col-start-1"
  | "col-start-2"
  | "col-start-3"
  | "col-start-4"
  | "col-start-5";

// // TODO: make this a list of the actual course lengths
// type CourseLength = string;

const getStartingTimeMap = (courseDays: StartingTime): string => {
  const startingTime = courseDays.split(" ")[1];
  switch (startingTime) {
    // 8AM
    case "8:00AM":
      return "4/ ";
    case "8:10AM":
      return "6/ ";
    case "8:15AM":
      return "8/ ";
    case "8:20AM":
      return "10/ ";
    case "8:25AM":
      return "12/ ";
    case "8:30AM":
      return "14/ ";
    case "8:35AM":
      return "16/ ";
    case "8:40AM":
      return "17/ ";
    case "8:45AM":
      return "18/ ";
    case "8:50AM":
      return "21/ ";
    case "8:55AM":
      return "22/ ";
    // 9AM
    case "9:00AM":
      return "24/ ";
    case "9:10AM":
      return "26/ ";
    case "9:15AM":
      return "28/ ";
    case "9:20AM":
      return "30/ ";
    case "9:25AM":
      return "32/ ";
    case "9:30AM":
      return "34/ ";
    case "9:35AM":
      return "36/ ";
    case "9:40AM":
      return "37/ ";
    case "9:45AM":
      return "38/ ";
    case "9:50AM":
      return "41/ ";
    case "9:55AM":
      return "42/ ";
    // 10 AM
    case "10:00AM":
      return "44/ ";
    case "10:10AM":
      return "46/ ";
    case "10:15AM":
      return "48/ ";
    case "10:20AM":
      return "50/ ";
    case "10:25AM":
      return "52/ ";
    case "10:30AM":
      return "54/ ";
    case "10:35AM":
      return "56/ ";
    case "10:40AM":
      return "57/ ";
    case "10:45AM":
      return "58/ ";
    case "10:50AM":
      return "61/ ";
    case "10:55AM":
      return "62/ ";
    // 11AM
    case "11:00AM":
      return "63/ ";
    case "11:10AM":
      return "65/ ";
    case "11:15AM":
      return "67/ ";
    case "11:20AM":
      return "69/ ";
    case "11:25AM":
      return "71/ ";
    case "11:30AM":
      return "73/ ";
    case "11:35AM":
      return "75/ ";
    case "11:40AM":
      return "76/ ";
    case "11:45AM":
      return "77/ ";
    case "11:50AM":
      return "80/ ";
    case "11:55AM":
      return "81/ ";
    // 12 PM
    case "12:00PM":
      return "83/ ";
    case "12:10PM":
      return "85/ ";
    case "12:15PM":
      return "87/ ";
    case "12:20PM":
      return "89/ ";
    case "12:25PM":
      return "91/ ";
    case "12:30PM":
      return "93/ ";
    case "12:35PM":
      return "95/ ";
    case "12:40PM":
      return "96/ ";
    case "12:45PM":
      return "97/ ";
    case "12:50PM":
      return "100/ ";
    case "12:55PM":
      return "101/ ";
    // 1 PM
    case "1:00PM":
      return "102/ ";
    case "1:10PM":
      return "104/ ";
    case "1:15PM":
      return "106/ ";
    case "1:20PM":
      return "108/ ";
    case "1:25PM":
      return "110/ ";
    case "1:30PM":
      return "112/ ";
    case "1:35PM":
      return "114/ ";
    case "1:40PM":
      return "115/ ";
    case "1:45PM":
      return "116/ ";
    case "1:50PM":
      return "119/ ";
    case "1:55PM":
      return "120/ ";
    // 2 PM
    case "2:00PM":
      return "122/ ";
    case "2:10PM":
      return "124/ ";
    case "2:15PM":
      return "126/ ";
    case "2:20PM":
      return "128/ ";
    case "2:25PM":
      return "130/ ";
    case "2:30PM":
      return "132/ ";
    case "2:35PM":
      return "134/ ";
    case "2:40PM":
      return "135/ ";
    case "2:45PM":
      return "136/ ";
    case "2:50PM":
      return "139/ ";
    case "2:55PM":
      return "140/ ";
    // 3 PM
    case "3:00PM":
      return "142/ ";
    case "3:10PM":
      return "144/ ";
    case "3:15PM":
      return "146/ ";
    case "3:20PM":
      return "148/ ";
    case "3:25PM":
      return "150/ ";
    case "3:30PM":
      return "152/ ";
    case "3:35PM":
      return "154/ ";
    case "3:40PM":
      return "155/ ";
    case "3:45PM":
      return "156/ ";
    case "3:50PM":
      return "159/ ";
    case "3:55PM":
      return "160/ ";
    // 4 PM
    case "4:00PM":
      return "161/ ";
    case "4:10PM":
      return "163/ ";
    case "4:15PM":
      return "165/ ";
    case "4:20PM":
      return "167/ ";
    case "4:25PM":
      return "169/ ";
    case "4:30PM":
      return "171/ ";
    case "4:35PM":
      return "173/ ";
    case "4:40PM":
      return "174/ ";
    case "4:45PM":
      return "175/ ";
    case "4:50PM":
      return "178/ ";
    case "4:55PM":
      return "179/ ";
    // 5 PM
    case "5:00PM":
      return "181/ ";
    case "5:10PM":
      return "183/ ";
    case "5:15PM":
      return "185/ ";
    case "5:20PM":
      return "187/ ";
    case "5:25PM":
      return "189/ ";
    case "5:30PM":
      return "191/ ";
    case "5:35PM":
      return "193/ ";
    case "5:40PM":
      return "194/ ";
    case "5:45PM":
      return "195/ ";
    case "5:50PM":
      return "198/ ";
    case "5:55PM":
      return "199/ ";
    // 6 PM
    case "6:00PM":
      return "200/ ";
    case "6:10PM":
      return "202/ ";
    case "6:15PM":
      return "204/ ";
    case "6:20PM":
      return "206/ ";
    case "6:25PM":
      return "208/ ";
    case "6:30PM":
      return "210/ ";
    case "6:35PM":
      return "212/ ";
    case "6:40PM":
      return "213/ ";
    case "6:45PM":
      return "214/ ";
    case "6:50PM":
      return "217/ ";
    case "6:55PM":
      return "218/ ";
    // 7 PM
    case "7:00PM":
      return "220/ ";
    case "7:10PM":
      return "222/ ";
    case "7:15PM":
      return "224/ ";
    case "7:20PM":
      return "226/ ";
    case "7:25PM":
      return "228/ ";
    case "7:30PM":
      return "230/ ";
    case "7:35PM":
      return "232/ ";
    case "7:40PM":
      return "233/ ";
    case "7:45PM":
      return "234/ ";
    case "7:50PM":
      return "237/ ";
    case "7:55PM":
      return "238/ ";
    // 8 PM
    case "8:00PM":
      return "240/ ";
    case "8:10PM":
      return "242/ ";
    case "8:15PM":
      return "244/ ";
    case "8:20PM":
      return "246/ ";
    case "8:25PM":
      return "248/ ";
    case "8:30PM":
      return "250/ ";
    case "8:35PM":
      return "252/ ";
    case "8:40PM":
      return "253/ ";
    case "8:45PM":
      return "254/ ";
    case "8:50PM":
      return "257/ ";
    case "8:55PM":
      return "258/ ";
    // 9 PM
    case "9:00PM":
      return "259/ ";
    case "9:10PM":
      return "261/ ";
    case "9:15PM":
      return "263/ ";
    case "9:20PM":
      return "265/ ";
    case "9:25PM":
      return "265/ ";
    case "9:30PM":
      return "269/ ";
    case "9:35PM":
      return "271/ ";
    case "9:40PM":
      return "272/ ";
    case "9:45PM":
      return "273/ ";
    case "9:50PM":
      return "276/ ";
    case "9:55PM":
      return "277/ ";
    default:
      console.log("Triggering the default startingTime state");
      return "1/ "; // defaults to the top of the calendar
  }
};

// ASSUMING THAT EVERY COURSE IS AT LEAST 50 MINUTES! Default to 50 minutes
// TODO: make this more specific - won't work too well (eat the paint! )
const getCourseLengthMap = (courseLength: string): string => {
  const lengthOfTimeInMinutes = getLengthOfTime(courseLength);
  console.log("LENGTH: ", lengthOfTimeInMinutes);
  switch (lengthOfTimeInMinutes) {
    case 50:
      return " span 20";
    case 55:
      return " span 22";
    case 60:
      return " span 23";
    case 65:
      return " span ";
    case 120:
      return " span 42";
    case 240:
      return " span 82";
    default:
      console.log("Triggering the default courseLength state");
      return " span 30";
  }
};

const getCourseDaysMap = (courseDays: string): ColStartClasses[] => {
  return getCourseDays(courseDays);
};

const getLengthOfTime = (timeFrame: string): number => {
  const splitTime = timeFrame.split(" ");

  let startTime = splitTime[1].slice(0, -2);
  let endTime = splitTime[3].slice(0, -2);

  const startTimeSuffix = splitTime[1].slice(-2);
  const endTimeSuffix = splitTime[3].slice(-2);

  startTime = startTime.split(":") as unknown as string;
  startTime = (+startTime[0] * 60 + +startTime[1]) as unknown as string;
  endTime = endTime.split(":") as unknown as string;
  endTime = (+endTime[0] * 60 + +endTime[1]) as unknown as string;

  // convert start time to hours since 12 AM
  if (startTimeSuffix === "PM") startTime = startTime + 12 * 60;
  if (endTimeSuffix === "PM") endTime = endTime + 12 * 60;

  return Number(endTime) - Number(startTime);
};

const getStartTime = (timeFrame: string) => {
  const splitTime = timeFrame.split(" ");
  return splitTime[1].slice(0, -2);
};

// return a CSS class list corresponding to the days when this class is offered
const getCourseDays = (timeFrame: string): ColStartClasses[] => {
  const splitTime = timeFrame.split(" ");
  const daysOfWeek = splitTime[0];
  const days: ColStartClasses[] = [];

  if (new RegExp("Mo").test(daysOfWeek) === true) days.push("col-start-1");
  if (new RegExp("Tu").test(daysOfWeek) === true) days.push("col-start-2");
  if (new RegExp("We").test(daysOfWeek) === true) days.push("col-start-3");
  if (new RegExp("Th").test(daysOfWeek) === true) days.push("col-start-4");
  if (new RegExp("Fr").test(daysOfWeek) === true) days.push("col-start-5");

  return days;
};

const getCourseDaysJustDays = (timeFrame: string): string => {
  const splitTime = timeFrame.split(" ");
  return splitTime[0];
};

export {
  getStartingTimeMap,
  getCourseLengthMap,
  getCourseDaysMap,
  getCourseDaysJustDays,
  getStartTime,
};
