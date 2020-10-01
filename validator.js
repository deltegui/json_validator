const {isObjectLiteral, flattenObject} = require('./utils');

function notHaveRequiedKey(struct) {
  const flattenStruct = flattenObject(struct);
  let notRequired = true;
  Object.keys(flattenStruct).forEach((key) => {
    notRequired = notRequired && !flattenStruct[key].isRequired;
  });
  return notRequired;
}

function isKeyInvalid(json, struct, key) {
  const isPropertyPresent = Object.prototype.hasOwnProperty.call(json, key);
  return !struct[key].isValid(json[key], isPropertyPresent);
}

function validateLevel(json, struct) {
  if (!json) {
    return notHaveRequiedKey(struct);
  }
  for (const key of Object.keys(struct)) {
    if (isObjectLiteral(struct[key])) {
      if (!validateLevel(json[key], struct[key])) {
        return false;
      }
    } else if (isKeyInvalid(json, struct, key)) {
      return false;
    }
  }
  return true;
}

class Validator {
  constructor(jsonStructure) {
    this.structure = jsonStructure;
    this.errors = [];
  }

  validate(json) {
    return validateLevel(json, this.structure);
  }
}

module.exports = Validator;
