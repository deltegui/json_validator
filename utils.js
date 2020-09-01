export function isObjectLiteral(type) {
  return typeof type === 'object' && type.constructor === Object;
}

export function flattenObject(obj) {
  return Object.keys(obj).reduce((result, key) => {
    if(isObjectLiteral(obj[key])) {
      return Object.assign(result, flattenObject(obj[key]));
    }
    return Object.assign(result, { [key]: obj[key] });
  }, {});
}

export function arrayEquals(arr, arrToCompare) {
  if(arr.length !== arrToCompare.length) return false;
  for(let pos = 0; pos < arr.length; pos++) {
    if(arr[pos] instanceof Array && arrToCompare[pos] instanceof Array) {
      if(!arrayEquals(arr[pos], arrToCompare[pos])) return false;
    } else if(arr[pos] !== arrToCompare[pos]) return false;
  }
  return true;
}
