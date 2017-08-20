const types = require('./types');
const Validator = require('./validator');

const jsonValidator = {
  validators: {},

  /**
   * Creates and stores a new json validator with
   * a name.
   * @param {function} callback 
   * @param {string} name 
   */
  create(callback, name) {
    const jsonStructure = callback(types);
    this.validators[name] = new Validator(jsonStructure);
  },

  /**
   * Check if json is valid according to validator
   * associated with the validatorName.
   * @param {Object} json 
   * @param {string} validatorName
   * @return {boolean}
   */
  validate(json, validatorName) {
    return this.validators[validatorName].validate(json);
  },
};

module.exports = () => jsonValidator;
