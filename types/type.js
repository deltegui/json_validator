/* eslint-disable no-restricted-syntax */
class Type {
  constructor() {
    this.validators = [];
  }

  get required() {
    this.isRequired = true;
    return this;
  }

  isValid(value, present = true) {
    if(!present && !this.isRequired) return true;
    for(const validator of this.validators) {
      if(!validator(value)) return false;
    }
    return true;
  }
}

module.exports = Type;
