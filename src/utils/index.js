export const arrayToObject = (array) => array.reduce(
  (obj, item) => ({ ...obj, [item.id]: item }),
  {},
);

export const formatDateString = (date) => (new Date(date)).toLocaleString();
