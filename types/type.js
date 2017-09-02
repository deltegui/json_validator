/* eslint-disable no-restricted-syntax */

function shouldBeValidator(admitValues) {
  return value => admitValues.find(element => element === value);
}

class Type {
  constructor() {
    this.validators = [];
  }

  shouldBe(...values) {
    this.validators.push(shouldBeValidator(values));
    return this;
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
