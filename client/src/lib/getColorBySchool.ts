/* eslint-disable indent */
// ^ fuck knows honestly
// not dynamic - checks for all ten schools no matter what is being viewed by the user
const getColorBySchool = (school: string): string => {
  switch (school) {
    case "MUSIC":
      return "bg-red-100";
    case "LAW":
      return "bg-indigo-100";
    case "MEAS":
      return "bg-lime-100";
    case "JOUR":
      return "bg-red-100";
    case "DHOA":
      return "bg-emerald-100";
    case "SPCH":
      return "bg-pink-100";
    case "SESP":
      return "bg-orange-100";
    case "VC":
      return "bg-amber-100";
    case "TGS":
      return "bg-stone-100";
    case "WCAS":
      return "bg-purple-100";
    default:
      // don't know how this got in there 👀
      return "bg-gray-100";
  }
};

export { getColorBySchool };
