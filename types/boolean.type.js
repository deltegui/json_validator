const Type = require('./type');
const error = require('./error');

const boolError = (message) => error('boolean', message);

function booleanValidator() {
  return {
    error: (value) =>
      boolError(`element "${value}" must be boolean`),
    test: (bool) => typeof bool === 'boolean',
  };
}

class BooleanType extends Type {
  constructor() {
    super();
    this.validators.push(booleanValidator());
  }
}

module.exports = BooleanType;
