/* eslint-disable no-unused-expressions */
const jsonValidator = require('../index');
const expect = require('chai').expect;

let validator;

describe('JsonValidator', () => {
  beforeEach(() => {
    validator = jsonValidator();
  });

  describe('create function', () => {
    it('should store a new validator', () => {
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
    it('should validate a json according to a validator', () => {
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
      expect(result).to.be.true;
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
      expect(result).to.be.false;
    });

    it('should check if a param is one of the wanted values', () => {
      const json = {
        user: 'demo',
        age: 123,
        type: 'bad type',
      };
      validator.create(t => ({
        user: t.string,
        age: t.number,
        type: t.string.shouldBe('reader', 'editor', 'admin').required,
      }), 'demoValidator');
      const result = validator.validate(json, 'demoValidator');
      expect(result).to.be.false;
    });

    it('should validate nested jsons if bad', () => {
      const json = {
        data: {
          name: 222,
          age: 123,
        },
      };
      validator.create(t => ({
        data: {
          user: t.string,
          age: t.number,
          text: t.string.required,
        },
      }), 'demoValidator');
      const result = validator.validate(json, 'demoValidator');
      expect(result).to.be.false;
    });

    it('should validate nested jsons if good', () => {
      const json = {
        data: {
          name: 'demo',
          age: 123,
          text: 'hi!',
        },
      };
      validator.create(t => ({
        data: {
          user: t.string,
          age: t.number,
          text: t.string.required,
        },
      }), 'demoValidator');
      const result = validator.validate(json, 'demoValidator');
      expect(result).to.be.true;
    });

    it('should validate more nested jsons', () => {
      const json = {
        data: {
          name: 'demo',
          age: 123,
          text: 'hi!',
          type: {
            name: 'bearer',
          },
        },
      };
      validator.create(t => ({
        data: {
          user: t.string,
          age: t.number,
          text: t.string.required,
          type: {
            name: t.string,
          },
        },
      }), 'demoValidator');
      const result = validator.validate(json, 'demoValidator');
      expect(result).to.be.true;
    });

    it('should validate more nested jsons if not present and its not required', () => {
      const json = {
        data: {
          name: 'demo',
          age: 123,
          text: 'hi!',
        },
      };
      validator.create(t => ({
        data: {
          user: t.string,
          age: t.number,
          text: t.string.required,
          type: {
            name: t.string,
          },
        },
      }), 'demoValidator');
      const result = validator.validate(json, 'demoValidator');
      expect(result).to.be.true;
    });
  });
});
