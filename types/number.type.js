/* eslint-disable class-methods-use-this */
const Type = require('./type');

function positiveValidator(number) {
  return number >= 0;
}

function negativeValidator(number) {
  return number < 0;
}

class NumberType extends Type {
  isValid(p) {
    return typeof p === 'number' && super.isValid(p);
  }

  get positive() {
    this.validators.push(positiveValidator);
    return this;
  }

  get negative() {
    this.validators.push(negativeValidator);
    return this;
  }
}

module.exports = NumberType;
