/* eslint-disable no-restricted-syntax */

function isObjectLiteral(type) {
  return typeof type === 'object' && type.constructor === Object;
}

// TODO refactor this class. Specially haveRequiredKeys and validateTypes methods.
class Validator {
  constructor(jsonStructure) {
    this.structure = jsonStructure;
  }

  validate(json) {
    return this.haveRequiredKeys(json) && this.validateTypes(json);
  }

  haveRequiredKeys(json, struct = this.structure) {
    for(const key of Object.keys(struct)) {
      if(isObjectLiteral(struct[key])) {
        if(!this.haveRequiredKeys(json[key], struct[key])) return false;
      } else if(!json[key] && this.keyIsRequired(key, struct)) return false;
    }
    return true;
  }

  validateTypes(json, struct = this.structure) {
    for(const key of Object.keys(struct)) {
      if(isObjectLiteral(struct[key])) {
        if(!this.validateTypes(json[key], struct[key])) return false;
      } else if(json[key]) {
        if(!struct[key].isValid(json[key])) return false;
      }
    }
    return true;
  }

  keyIsRequired(key, struct = this.structure) {
    return !!struct[key].isRequired;
  }
}

module.exports = Validator;
