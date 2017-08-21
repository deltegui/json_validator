/* eslint-disable no-restricted-syntax */
class Type {
  constructor() {
    this.validators = [];
  }

  get required() {
    this.isRequired = true;
    return this;
  }

  isValid(p) {
    if(!p && !this.isRequired) return true;
    for(const validator of this.validators) {
      if(!validator(p)) return false;
    }
    return true;
  }
}

module.exports = Type;
