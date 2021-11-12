export const getDate = (date) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let d = new Date(date);
  const monthName = monthNames[d.getMonth()];
  const day = d.getDay();
  const year = d.getFullYear();
  return `${monthName} ${day}, ${year}`;
};
