import { Rhum } from '../deps.js';
import { JsonValidator } from '../mod.js';

Rhum.testPlan('validator.ts', () => {
  Rhum.testSuite('when validate', () => {
    const jsonValidator = new JsonValidator();
    const structure = jsonValidator.create(t => ({
      name: t.string.required,
      age: t.number.required,
      email: t.string,
    }), '');

    Rhum.testCase('should return false if a json is invalid', () =>
      Rhum.asserts.assertEquals(structure.validate({
        name: 'demo',
        age: '22',
      }), false));

    Rhum.testCase('should return true if a json is valid', () =>
      Rhum.asserts.assertEquals(structure.validate({
        name: 'demo',
        age: 22,
      }), true));

    Rhum.testCase('should not validate undefined', () =>
      Rhum.asserts.assertEquals(structure.validate(undefined), false));
  });
});

Rhum.run();
