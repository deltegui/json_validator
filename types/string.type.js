/* eslint-disable no-restricted-syntax */
const Type = require('./type');

class MaxStringValidator {
  constructor(maxLength) {
    this.maxLength = maxLength;
  }

  test(str) {
    return str.length < this.maxLength;
  }
}

class MinStringValidator {
  constructor(minLength) {
    this.minLength = minLength;
  }

  test(str) {
    return str.length > this.minLength;
  }
}

class StringType extends Type {
  constructor() {
    super();
    this.validators = [];
  }

  isValid(p) {
    for(const validator of this.validators) {
      if(!validator.test(p)) return false;
    }
    return typeof p === 'string';
  }

  min(minLength) {
    this.validators.push(new MinStringValidator(minLength));
    return this;
  }

  max(maxLength) {
    this.validators.push(new MaxStringValidator(maxLength));
    return this;
  }
}

module.exports = StringType;
