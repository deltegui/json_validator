const StringType = require('./string.type');
const NumberType = require('./number.type');
const BooleanType = require('./boolean.type');
const ArrayType = require('./array.type');

module.exports = {
  get string() {
    return new StringType();
  },

  get number() {
    return new NumberType();
  },

  get boolean() {
    return new BooleanType();
  },

  get array() {
    return new ArrayType();
  },
};
