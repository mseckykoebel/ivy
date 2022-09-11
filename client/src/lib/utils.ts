/* eslint-disable indent */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const classNames = (...classes: any[]) => {
  return classes.filter(Boolean).join(" ");
};

const quarterMap = (quarter: string): string => {
  switch (quarter.split(" ")[1]) {
    case "Fall":
      return "🍃 Fall " + quarter.split(" ")[0];
    case "Summer":
      return "☀️ Summer " + quarter.split(" ")[0];
    case "Spring":
      return "🌺 Spring " + quarter.split(" ")[0];
    case "Winter":
      return "❄️ Winter " + quarter.split(" ")[0];
    default:
      return quarter;
  }
};

const quarterDisplayMap = (season: string): number => {
  switch (season) {
    case "Fall":
      return 3;
    case "Summer":
      return 2;
    case "Spring":
      return 1;
    case "Winter":
      return 0;
    default:
      return 0;
  }
};

// WIP
const bubbleSortByYear = (arr: string[]) => {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      const arrTemp = arr;
      // compare the years, and put them in the right order
      if (
        parseInt(arrTemp[j].split(" ")[0]) <
        parseInt(arrTemp[j + 1].split(" ")[0])
      ) {
        // now, compare and see if we should swap these items if they are
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
  return arr;
};

const bubbleSortByQuarter = (arr: string[]) => {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      const arrTemp = arr;
      // compare the years, and put them in the right order
      if (
        quarterDisplayMap(arrTemp[j].split(" ")[1]) <
        quarterDisplayMap(arrTemp[j + 1].split(" ")[1])
      ) {
        // now, compare and see if we should swap these items if they are
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
  return arr;
};

export { classNames, bubbleSortByYear, bubbleSortByQuarter, quarterMap };
