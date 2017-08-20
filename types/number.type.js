/* eslint-disable class-methods-use-this */
const Type = require('./type');

class NumberType extends Type {
  isValid(p) {
    return typeof p === 'number';
  }
}

module.exports = NumberType;
