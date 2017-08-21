/* eslint-disable */
/*
const jsonValidator = require('./index');
const validator = jsonValidator();

validator.create(t => ({
  user: t.string.required,
  age: t.number.negative.required,
  text: t.string.max(10).required,
  data: {
    token: t.string,
    type: {
      name: t.string
    }
  },
  date: t.string.min(5).max(10).required
}), 'demoValidator');

const json = {
  user: 'diego',
  age: -1,
  text: '123456789',
  data: {
    token: 'hola que tal estamos hola que tal esto tiene que llegar hasta los putos 20',
  },
  date: 'hola hola'
};

const result = validator.validate(json, 'demoValidator');
console.log(result);
*/

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

console.log(flattenObject(json));