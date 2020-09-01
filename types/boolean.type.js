import Type from './type.js';

function booleanValidator(bool) {
  return typeof bool === 'boolean';
}

export default class BooleanType extends Type {
  constructor() {
    super();
    this.validators.push(booleanValidator);
  }
}
