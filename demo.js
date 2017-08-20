const validator = require('./index')();

validator.create(t => ({
  user: t.string.required,
  age: t.number,
  text: t.string.max(10).required,
  data: {
    token: t.string,
  },
}), 'demoValidator');

const json = {
  user: 'diego',
  age: 22,
  text: '123456789',
  data: {
    //token: 'hola que tal estamos hola que tal esto tiene que llegar hasta los putos 20',
  },
};

const result = validator.validate(json, 'demoValidator');
console.log(result);
