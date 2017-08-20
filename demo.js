const validator = require('./index')();

validator.create(t => ({
  user: t.string.required,
  age: t.number,
  text: t.string.max(10).required,
}), 'demoValidator');

const json = {
  user: 'diego',
  age: 22,
  text: '123456789',
};

const result = validator.validate(json, 'demoValidator');
console.log(result);
