import { Rhum, expect } from '../deps.js';
import {
  isObjectLiteral,
  flattenObject,
  arrayEquals,
} from '../utils.js';

Rhum.testPlan('utils.ts', () => {
  Rhum.testSuite('isObjectLiteral', () => {
    Rhum.testCase('should return true if object is literal', () =>
      expect(isObjectLiteral({})).toBeTruthy());

    Rhum.testCase('should return false is object is created with new', () => {
      class MyObject {}
      expect(isObjectLiteral(new MyObject())).toBeFalsy();
    });
  });

  Rhum.testSuite('flattenObject', () => {
    Rhum.testCase('should create a one-level object from multi-level object', () => {
      const originalObject = {
        param1: 'param1',
        obj: {
          param2: 'param2',
          obj: {
            param3: 'param3',
          },
        },
      };
      const expectedObject = {
        param1: 'param1',
        param2: 'param2',
        param3: 'param3',
      };
      expect(flattenObject(originalObject)).toEqual(expectedObject);
    });
  });

  Rhum.testSuite('arrayEquals', () => {
    Rhum.testCase('should check if two arrays are equals', () => {
      const arr1 = [1, 2, 3, 4];
      const arr2 = [1, 2, 3, 4];
      expect(arrayEquals(arr1, arr2)).toBeTruthy();
    });

    Rhum.testCase('should check if two arrays are deep equals', () => {
      const arr1 = [1, 2, ['apple', 'linux'], 4];
      const arr2 = [1, 2, ['apple', 'linux'], 4];
      expect(arrayEquals(arr1, arr2)).toBeTruthy();
    });

    Rhum.testCase('should check if two arrays are not deep equals', () => {
      const arr1 = [1, 2, ['apple', 'linux'], 4];
      const arr2 = [1, 2, ['apple', 'windows'], 4];
      expect(arrayEquals(arr1, arr2)).toBeFalsy();
    })
  });
});

Rhum.run();
