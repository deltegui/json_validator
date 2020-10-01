const Type = require('./type');
const error = require('./error');

const dateError = (message) => error('date', message);

function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` +
    ` ${date.getHours()}:${date.getMonth()}:${date.getSeconds()}`;
}

function beforeDateValidator(beforeDate) {
  const test = (dateJSON) => {
    const date = new Date(dateJSON);
    if (isNaN(date)) {
      return false;
    }
    return date.getTime() < beforeDate.getTime();
  };
  const beforeFormat = formatDate(beforeDate);
  return {
    error: (key) =>
      dateError(`key "${key}" must be before "${beforeFormat}"`),
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
  const afterFormat = formatDate(afterDate);
  return {
    error: (key) =>
      dateError(`key "${key}" must be after "${afterFormat}"`),
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
