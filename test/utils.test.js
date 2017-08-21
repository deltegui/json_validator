/* eslint-disable no-unused-expressions */
const utils = require('../utils');
const expect = require('chai').expect;

describe('utils', () => {
  describe('isObjectLiteral', () => {
    it('should return true if object is literal', () => {
      expect(utils.isObjectLiteral({})).to.be.true;
    });

    it('should return false is object is created with new', () => {
      function MyObject() {}
      expect(utils.isObjectLiteral(new MyObject())).to.be.false;
    });
  });

  describe('flattenObject', () => {
    it('should create a one-level object from multi-level object', () => {
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
      expect(utils.flattenObject(originalObject)).to.deep.equal(expectedObject);
    });
  });
});
