export const arrayToObject = (array) => array.reduce(
  (obj, item) => ({ ...obj, [item.id]: item }),
  {},
);

export const formatDateString = (date) => (new Date(date)).toLocaleString();

export const values = (obj) => Object.values(obj);

export const isEmpty = (value) => value === undefined
          || value === null
          || value === 0
          || (typeof value === 'object' && Object.keys(value).length === 0)
          || (typeof value === 'string' && value.trim().length === 0)

export const mapValues = (obj, modifier) => {
  const res = {};
  Object.entries(obj).forEach(([key, value]) => {
    res[key] = modifier(value);
  });
  return res;
}

export const range = (b, e) => {
  if (e) {
    return [...Array(e - b)].map((e, i) => b + i);
  }
  return [...Array(b)].map((e, i) => i);
}
