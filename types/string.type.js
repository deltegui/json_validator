
const Type = require('./type');

function maxStringValidator(maxLength) {
  return str => str.length < maxLength;
}

function minStringValidator(minLength) {
  return str => str.length > minLength;
}

class StringType extends Type {
  isValid(p) {
    return typeof p === 'string' && super.isValid(p);
  }

  min(minLength) {
    this.validators.push(minStringValidator(minLength));
    return this;
  }

  max(maxLength) {
    this.validators.push(maxStringValidator(maxLength));
    return this;
  }
}

module.exports = StringType;
