import { JsonValidator } from '../mod.js';
import { Rhum, expect } from '../deps.js';

Rhum.testPlan('JsonValidator', () => {
  let validator;

  Rhum.beforeEach(() => {
    validator = new JsonValidator();
  });

  Rhum.testSuite('General', () => {
    Rhum.testCase('for each call, should create differents objects', () => {
      const one = new JsonValidator();
      const second = new JsonValidator();
      expect(one === second).toBeFalsy();
    });
  });

  Rhum.testSuite('create function', () => {
    Rhum.testCase('should store a new validator', () => {
      validator.create(t => ({
        user: t.string,
        age: t.number,
        text: t.string,
      }), 'demoValidator');
      const keys = Object.keys(validator.validators.demoValidator.structure);
      Rhum.asserts.assertArrayContains(keys, ['user', 'age', 'text']);
    });
  });

  Rhum.testSuite('validate function', () => {
    Rhum.testCase('should validate a json according to a validator', () => {
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
      expect(result).toBeTruthy();
    });

    Rhum.testCase('if a param is required, should appear in json', () => {
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
      expect(result).toBeFalsy();
    });

    Rhum.testCase('should check if a param is one of the wanted values (bad)', () => {
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
      expect(result).toBeFalsy();
    });

    Rhum.testCase('should check if a param is one of the wanted values', () => {
      const json = {
        user: 'demo',
        age: 123,
        type: 'reader',
      };
      validator.create(t => ({
        user: t.string,
        age: t.number,
        type: t.string.shouldBe('reader', 'editor', 'admin').required,
      }), 'demoValidator');
      const result = validator.validate(json, 'demoValidator');
      expect(result).toBeTruthy();
    });

    Rhum.testCase('should check if a array deep is one of the wanted values', () => {
      const json = {
        user: 'demo',
        age: 123,
        type: [1, 'hola'],
      };
      validator.create(t => ({
        user: t.string,
        age: t.number,
        type: t.array.shouldBe([1, 'hola'], ['hi']).required,
      }), 'demoValidator');
      const result = validator.validate(json, 'demoValidator');
      expect(result).toBeTruthy();
    });

    Rhum.testCase('should check if a array deep is one of the wanted values', () => {
      const json = {
        user: 'demo',
        age: 123,
        type: [1, 'hola'],
      };
      validator.create(t => ({
        user: t.string,
        age: t.number,
        type: t.array.shouldBe([1, 'hola'], ['hi']).required,
      }), 'demoValidator');
      const result = validator.validate(json, 'demoValidator');
      expect(result).toBeTruthy();
    });

    Rhum.testCase('should check if a boolean is one of the wanted values', () => {
      const json = {
        user: 'demo',
        age: 123,
        type: false,
      };
      validator.create(t => ({
        user: t.string,
        age: t.number,
        type: t.boolean.shouldBe(true).required,
      }), 'demoValidator');
      const result = validator.validate(json, 'demoValidator');
      expect(result).toBeFalsy();
    });

    Rhum.testCase('should validate nested jsons if bad', () => {
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
      expect(result).toBeFalsy();
    });

    Rhum.testCase('should validate nested jsons if good', () => {
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
      expect(result).toBeTruthy();
    });

    Rhum.testCase('should validate more nested jsons', () => {
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
      expect(result).toBeTruthy();
    });

    Rhum.testCase('should validate more nested jsons if not present and its not required', () => {
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
      expect(result).toBeTruthy();
    });
  });
});

Rhum.run();
