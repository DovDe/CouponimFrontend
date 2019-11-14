// converts array of object with an id to object of objects with id as key
export const mapArrToObj = arr => {
  let obj = {};
  arr.forEach(item => (obj[item.id] = item));
  return obj;
};
