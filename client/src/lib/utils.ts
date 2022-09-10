/* eslint-disable indent */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const classNames = (...classes: any[]) => {
  return classes.filter(Boolean).join(" ");
};

// const getQuarterAndYearFromStartTime = (startTime: string): string => {
//   const startTimeSplit = startTime.split("-");
//   const year = startTimeSplit[0];
//   switch(startTimeSplit[1]) {
//     case "01"
//   }
// };

export { classNames };
