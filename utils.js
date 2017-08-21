function isObjectLiteral(type) {
  return typeof type === 'object' && type.constructor === Object;
}

function flattenObject(obj) {
  return Object.keys(obj).reduce((result, key) => {
    if(isObjectLiteral(obj[key])) {
      return Object.assign(result, flattenObject(obj[key]));
    }
    return Object.assign(result, { [key]: obj[key] });
  }, {});
}

module.exports = {
  isObjectLiteral,
  flattenObject,
};
