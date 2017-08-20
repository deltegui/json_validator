/* eslint-disable no-restricted-syntax */

class Validator {
  constructor(jsonStructure) {
    this.structure = jsonStructure;
  }

  validate(json) {
    return this.haveRequiredKeys(json) && this.validateTypes(json);
  }

  haveRequiredKeys(json) {
    for(const key of Object.keys(this.structure)) {
      if(!json[key] && this.keyIsRequired(key)) return false;
    }
    return true;
  }

  validateTypes(json) {
    for(const key of Object.keys(this.structure)) {
      if(json[key]) {
        if(!this.structure[key].isValid(json[key])) return false;
      }
    }
    return true;
  }

  keyIsRequired(key) {
    return !!this.structure[key].isRequired;
  }
}

module.exports = Validator;
