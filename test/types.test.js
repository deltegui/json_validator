/* eslint-disable no-unused-expressions */
const expect = require('chai').expect;
const types = require('../types');

describe('Types', () => {
  describe('StringType', () => {
    it('should validate a string', () => {
      expect(types.string.isValid('string')).to.be.true;
      expect(types.string.isValid(11)).to.be.false;
    });

    it('should check if string is under max limit', () => {
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

    it('should check if a number is positive', () => {
      expect(types.number.positive.isValid(1)).to.be.true;
      expect(types.number.positive.isValid(-1)).to.be.false;
    });

    it('should check if a number is negative', () => {
      expect(types.number.negative.isValid(-1)).to.be.true;
      expect(types.number.negative.isValid(1)).to.be.false;
    });
  });

  describe('BooleanType', () => {
    it('should validate a boolean', () => {
      expect(types.boolean.required.isValid(true)).to.be.true;
      expect(types.boolean.required.isValid('')).to.be.false;
    });
  });

  describe('ArrayLength', () => {
    it('should validate an array', () => {
      expect(types.array.isValid([])).to.be.true;
      expect(types.array.isValid({})).to.be.false;
    });

    it('should check if an array have exact length', () => {
      expect(types.array.exactLength(3).isValid([0, 1, 2])).to.be.true;
      expect(types.array.exactLength(1).isValid([1, 2])).to.be.false;
    });

    it('should check if an array have upper length', () => {
      expect(types.array.lengthUpperTo(1).isValid([0, 1, 2])).to.be.true;
      expect(types.array.lengthUpperTo(4).isValid([1, 2])).to.be.false;
    });

    it('should check if an array have lower length', () => {
      expect(types.array.lengthLowerTo(3).isValid([0, 1])).to.be.true;
      expect(types.array.lengthLowerTo(1).isValid([1, 2])).to.be.false;
    });

    it('should check if an array is not empty', () => {
      expect(types.array.notEmpty.isValid([0, 1])).to.be.true;
      expect(types.array.notEmpty.isValid([])).to.be.false;
    });
  });
});
