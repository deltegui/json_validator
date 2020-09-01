import { Rhum, expect } from '../deps.js';
import types from '../types/index.js';
import { parametrizedTest } from './utils.js';

Rhum.testPlan('types.ts', () => {
  Rhum.testSuite('General', () => {
    Rhum.testCase('when a falsy value is passed when is not the type, should return false', () => {
      expect(types.string.isValid(0)).toBeFalsy();
      expect(types.array.isValid('')).toBeFalsy();
      expect(types.boolean.isValid(null)).toBeFalsy();
      expect(types.array.isValid(NaN)).toBeFalsy();
      expect(types.array.isValid(undefined)).toBeFalsy();
    });
  });

  Rhum.testSuite('StringType', () => {
    parametrizedTest('should validate a string', {
      params: [
        { value: 'string', expected: true },
        { value: 11, expected: false},
        { value: false, expected: false },
        { value: undefined, expected: false },
      ],
      test: ({ value }) => types.string.isValid(value),
    });

    parametrizedTest('should check if string is under max limit', {
      params: [
        { str: 'hi!', max: 11, expected: true },
        { str: 'hello', max: 2, expected: false },
      ],
      test: ({ str, max }) => types.string.max(max).isValid(str),
    });

    parametrizedTest('should check if string is upper min limit', {
      params: [
        { str: 'hi!', min: 1, expected: true },
        { str: 'hello', min: 11, expected: false },
      ],
      test: ({ str, min }) => types.string.min(min).isValid(str),
    })

    parametrizedTest('should test a regular expression on string', {
      params: [
        { str: 'Algete', regex: /^A/, expected: true },
        { str: 'Algete', regex: /z$/, expected: false },
      ],
      test: ({ str, regex }) => types.string.matches(regex).isValid(str),
    })
  });

  Rhum.testSuite('NumberType', () => {
    parametrizedTest('should validate a number', {
      params: [
        { number: 11, expected: true },
        { number: 'hi', expected: false },
      ],
      test: ({ number }) => types.number.isValid(number),
    })

    parametrizedTest('should check if a number is positive', {
      params: [
        { number: 1, expected: true },
        { number: -1, expected: false },
      ],
      test: ({ number }) => types.number.positive.isValid(number),
    });

    parametrizedTest('should check if a number is negative', {
      params: [
        { number: -1, expected: true },
        { number: 1, expected: false },
      ],
      test: ({ number }) => types.number.negative.isValid(number),
    });

    Rhum.testCase('when NaN is passed to number type, should be true', () => {
      expect(types.number.isValid(NaN)).toBeTruthy(); // TODO Should this be false???
    });
  });

  Rhum.testSuite('BooleanType', () => {
    parametrizedTest('should validate a boolean', {
      params: [
        { bool: true, expected: true },
        { bool: false, expected: true },
        { bool: null, expected: false },
        { bool: undefined, expected: false },
        { bool: 1, expected: false },
        { bool: 'blabla', expected: false },
      ],
      test: ({ bool }) => types.boolean.isValid(bool),
    });
  });

  Rhum.testSuite('ArrayType', () => {
    parametrizedTest('should validate an array', {
      params: [
        { array: [], expected: true },
        { array: [1, 3, 4, 'h', false, {}], expected: true },
        { array: {}, expected: false },
        { array: 'hola', expected: false },
      ],
      test: ({ array }) => types.array.isValid(array),
    });

    parametrizedTest('should check if an array have exact length', {
      params: [
        { array: [0, 1, 2], length: 3, expected: true },
        { array: [1, 2], length: 1, expected: false },
      ],
      test: ({ array, length }) => types.array.exactLength(length).isValid(array),
    });

    parametrizedTest('should check if an array have upper length', {
      params: [
        { array: [0, 1, 2], lenghtUpperTo: 1, expected: true },
        { array: [1, 2], lenghtUpperTo: 4, expected: false },
      ],
      test: ({ array, lenghtUpperTo }) => types.array.lengthUpperTo(lenghtUpperTo).isValid(array),
    });

    parametrizedTest('should check if an array have lower length', {
      params: [
        { array: [0, 1], lengthLowerTo: 3, expected: true },
        { array: [1, 2], lengthLowerTo: 1, expected: false },
      ],
      test: ({ array, lengthLowerTo }) => types.array.lengthLowerTo(lengthLowerTo).isValid(array),
    });

    parametrizedTest('should check if an array is not empty', {
      params: [
        { array: [0, 1], expected: true },
        { array: [], expected: false },
      ],
      test: ({ array }) => types.array.notEmpty.isValid(array),
    });
  });

  Rhum.testSuite('DateType', () => {
    const date = new Date();

    parametrizedTest('should validate a date', {
      params: [
        { date: date.toJSON(), expected: true },
        { date: '', expected: false },
      ],
      test: ({ date }) => types.date.isValid(date),
    });

    parametrizedTest('should validate a date that is after other', {
      params: [
        { before: new Date(1997, 8), after: date, expected: true },
        { before: new Date(1997, 8), after: new Date(1970, 0), expected: false },
      ],
      test: ({ before, after }) => types.date.afterDate(before).isValid(after),
    });

    parametrizedTest('should validate a date that is before other', {
      params: [
        { after: new Date(1997, 8), before: date, expected: false },
        { after: new Date(1997, 8), before: new Date(1970, 0), expected: true },
      ],
      test: ({ before, after }) => types.date.beforeDate(after).isValid(before),
    });
  });
});

Rhum.run();
