/* eslint-disable class-methods-use-this */
const Type = require('./type');

function exactLengthValidator(length) {
  return arr => arr.length === length;
}

function lengthUpperValidator(length) {
  return arr => arr.length > length;
}

function lengthLowerVlaidator(length) {
  return arr => arr.length < length;
}

function emptyValidator(arr) {
  return arr.length !== 0;
}

class ArrayType extends Type {
  isValid(p) {
    return p instanceof Array && super.isValid(p);
  }

  exactLength(length) {
    this.validators.push(exactLengthValidator(length));
    return this;
  }

  lengthLowerTo(length) {
    this.validators.push(lengthLowerVlaidator(length));
    return this;
  }

  lengthUpperTo(length) {
    this.validators.push(lengthUpperValidator(length));
    return this;
  }

  get notEmpty() {
    this.validators.push(emptyValidator);
    return this;
  }
}

module.exports = ArrayType;
