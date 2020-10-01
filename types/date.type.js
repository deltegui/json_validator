const Type = require('./type');
const error = require('./error');

const dateError = (message) => error('date', message);

function beforeDateValidator(beforeDate) {
  const test = (dateJSON) => {
    const date = new Date(dateJSON);
    if (isNaN(date)) {
      return false;
    }
    return date.getTime() < beforeDate.getTime();
  };
  return {
    error: (value) =>
      dateError(`date "${value}" must be before "${beforeDate}"`),
    test,
  };
}

function afterDateValidator(afterDate) {
  const test = (dateJSON) => {
    const date = new Date(dateJSON);
    if (isNaN(date)) {
      return false;
    }
    return date.getTime() > afterDate.getTime();
  };
  return {
    error: (value) => dateError(`date "${value}" must be after "${afterDate}"`),
    test,
  };
}

function dateValidator() {
  return {
    error: (value) => dateError(`element "${value}" must be date`),
    test: (dateJSON) => !isNaN(new Date(dateJSON)),
  };
}

class DateType extends Type {
  constructor() {
    super();
    this.validators.push(dateValidator());
  }

  beforeDate(date) {
    this.validators.push(beforeDateValidator(date));
    return this;
  }

  afterDate(date) {
    this.validators.push(afterDateValidator(date));
    return this;
  }
}

module.exports = DateType;
