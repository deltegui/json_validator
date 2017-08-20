/* eslint-disable no-unused-expressions */
const expect = require('chai').expect;
const types = require('../types');

describe('Types', () => {
  describe('StringType', () => {
    it('should validate a string', () => {
      expect(types.string.isValid('string')).to.be.true;
      expect(types.string.isValid(11)).to.be.false;
    });

    it('shuld check if string is under max limit', () => {
      expect(types.string.max(11).isValid('hi!')).to.be.true;
      expect(types.string.max(2).isValid('hello')).to.be.false;
    });

    it('should check if string is upper min limit', () => {
      expect(types.string.min(1).isValid('hi!')).to.be.true;
      expect(types.string.min(11).isValid('hello')).to.be.false;
    });
  });

  describe('NumberType', () => {
    it('should validate a number', () => {
      expect(types.number.isValid(11)).to.be.true;
      expect(types.number.isValid('hi')).to.be.false;
    });
  });
});
