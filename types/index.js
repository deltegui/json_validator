const StringType = require('./string.type');
const NumberType = require('./number.type');

module.exports = {
  get string() {
    return new StringType();
  },

  get number() {
    return new NumberType();
  },
};
