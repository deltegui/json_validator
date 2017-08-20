/* eslint-disable class-methods-use-this */
const Type = require('./type');

class BooleanType extends Type {
  isValid(p) {
    return typeof p === 'boolean' && super.isValid(p);
  }
}

module.exports = BooleanType;
