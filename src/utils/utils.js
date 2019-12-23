export const arrayToObject = (array) => array.reduce((obj, item) => {
  obj[item.id] = item;
  return obj;
}, {});

export const formatDateString = (date) => (new Date(date)).toLocaleString();
