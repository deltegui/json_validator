const jsonValidator = require('../index');
const expect = require('chai').expect;

let validator;

describe('JsonValidator', () => {
  beforeEach(() => {
    validator = jsonValidator();
  });

  describe('create function', () => {
    it('create function should store a new validator', () => {
      validator.create(t => ({
        user: t.string,
        age: t.number,
        text: t.string,
      }), 'demoValidator');
      const keys = Object.keys(validator.validators.demoValidator.structure);
      expect(keys).to.deep.equal(['user', 'age', 'text']);
    });
  });

  describe('validate function', () => {
    it('validate should valiate a json according to a validator', () => {
      const json = {
        user: 'demo',
        age: 123,
        text: '123456789',
      };
      validator.create(t => ({
        user: t.string,
        age: t.number,
        text: t.string,
      }), 'demoValidator');
      const result = validator.validate(json, 'demoValidator');
      expect(result).to.equal(true);
    });

    it('if a param is required, should appear in json', () => {
      const json = {
        user: 'demo',
        age: 123,
      };
      validator.create(t => ({
        user: t.string,
        age: t.number,
        text: t.string.required,
      }), 'demoValidator');
      const result = validator.validate(json, 'demoValidator');
      expect(result).to.equal(false);
    });
  });
});
