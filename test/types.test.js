/* eslint-disable no-unused-expressions */
const expect = require('chai').expect;
const types = require('../types');

describe('Types', () => {
  it('when a falsy value is passed when isnt type, should return false', () => {
    expect(types.string.isValid(0)).to.be.false;
    expect(types.array.isValid('')).to.be.false;
    expect(types.boolean.isValid(null)).to.be.false;
    expect(types.array.isValid(NaN)).to.be.false;
    expect(types.array.isValid(undefined)).to.be.false;
  });

  describe('StringType', () => {
    it('should validate a string', () => {
      expect(types.string.isValid('string')).to.be.true;
      const str = types.string;
      expect(str.isValid(11)).to.be.false;
      expect(str.errors).to.be.eql([
        {
          type: 'string',
          message: 'element "11" must be string',
        },
      ]);
    });

    describe('should check if string is under max limit', () => {
      it('should return true if everything is correct', () => {
        const str = types.string;
        expect(str.max(11).isValid('hi!')).to.be.true;
        expect(str.errors).to.be.length(0);
      });

      it('should return false and have errors if string exceeds length', () => {
        const str = types.string;
        expect(str.max(2).isValid('hello')).to.be.false;
        expect(str.errors).to.be.eql([
          {
            type: 'string',
            message: 'string "hello" should be lower than 2',
          },
        ]);
      });
    });

    describe('should check if string is upper min limit', () => {
      it('should return true if string is upper than min value', () => {
        const str = types.string;
        expect(str.min(1).isValid('hi!')).to.be.true;
        expect(str.errors).to.be.length(0);
      });

      it('should return false and have errors if string is lower', () => {
        const str = types.string;
        expect(str.min(11).isValid('hello')).to.be.false;
        expect(str.errors).to.be.eql([
          {
            type: 'string',
            message: 'string "hello" should be upper than 11',
          },
        ]);
      });
    });

    describe('should test a regular expression on string', () => {
      it('if matches should return true', () => {
        const str = types.string;
        expect(str.matches(/^A/).isValid('Algete')).to.be.true;
        expect(str.errors).to.be.length(0);
      });

      it('if not matches should return false and have errors', () => {
        const str = types.string;
        expect(str.matches(/z$/).isValid('Algete')).to.be.false;
        expect(str.errors).to.be.eql([
          {
            type: 'string',
            message: 'string "Algete" should match /z$/',
          },
        ]);
      });
    });
  });

  describe('NumberType', () => {
    describe('should validate a number', () => {
      it('returns true if is number', () => {
        const num = types.number;
        expect(num.isValid(11)).to.be.true;
        expect(num.errors).to.be.length(0);
      });

      it('returns false and have errors if isnt an number', () => {
        const num = types.number;
        expect(num.isValid('hi')).to.be.false;
        expect(num.errors).to.be.eql([
          {
            type: 'number',
            message: 'element "hi" must be a number',
          },
        ]);
      });
    });

    describe('should check if a number is positive', () => {
      it('returns true if is positive or zero', () => {
        const num = types.number;
        expect(num.positive.isValid(1)).to.be.true;
        expect(num.positive.isValid(0)).to.be.true;
        expect(num.errors).to.be.length(0);
      });

      it('returns false if is negative', () => {
        const num = types.number;
        expect(num.positive.isValid(-1)).to.be.false;
        expect(num.errors).to.be.eql([
          {
            type: 'number',
            message: 'number "-1" should be positive',
          },
        ]);
      });
    });

    describe('should check if a number is negative', () => {
      it('returns true if is negative', () => {
        const num = types.number;
        expect(num.negative.isValid(-1)).to.be.true;
        expect(num.errors).to.be.length(0);
      });

      it('returns false and have errors if is positive or zero', () => {
        const num = types.number;
        expect(num.negative.isValid(1)).to.be.false;
        expect(num.negative.isValid(0)).to.be.false;
        expect(num.errors).to.be.eql([
          {
            type: 'number',
            message: 'number "1" should be negative',
          },
          {
            type: 'number',
            message: 'number "0" should be negative',
          },
        ]);
      });
    });

    it('when NaN is passed to number type, should be true', () => {
      expect(types.number.isValid(NaN)).to.be.true;
    });
  });

  describe('BooleanType', () => {
    it('should validate a boolean', () => {
      expect(types.boolean.isValid(true)).to.be.true;
      expect(types.boolean.isValid(false)).to.be.true;
    });

    it('should not validate something that is not boolean', () => {
      const bool = types.boolean;
      expect(bool.isValid('blabla')).to.be.false;
      expect(bool.errors).eql([
        {
          type: 'boolean',
          message: 'element "blabla" must be boolean',
        },
      ]);
    });
  });

  describe('ArrayType', () => {
    it('should validate an array', () => {
      const arr = types.array;
      expect(arr.isValid([])).to.be.true;
      expect(arr.isValid({})).to.be.false;
      expect(arr.errors).to.be.eql([
        {
          type: 'array',
          message: 'element "[object Object]" must be array',
        },
      ]);
    });

    it('should check if an array have exact length', () => {
      const arr = types.array;
      expect(types.array.exactLength(3).isValid([0, 1, 2])).to.be.true;
      expect(arr.exactLength(1).isValid([1, 2])).to.be.false;
      expect(arr.errors).to.be.eql([
        {
          type: 'array',
          message: 'array length "[1,2]" must have exact length of 1',
        },
      ]);
    });

    it('should check if an array have upper length', () => {
      const arr = types.array;
      expect(types.array.lengthUpperTo(1).isValid([0, 1, 2])).to.be.true;
      expect(arr.lengthUpperTo(4).isValid([1, 2])).to.be.false;
      expect(arr.errors).to.be.eql([
        {
          type: 'array',
          message: 'array length "[1,2]" must be upper of 4',
        },
      ]);
    });

    it('should check if an array have lower length', () => {
      const arr = types.array;
      expect(types.array.lengthLowerTo(3).isValid([0, 1])).to.be.true;
      expect(arr.lengthLowerTo(1).isValid([1, 2])).to.be.false;
      expect(arr.errors).to.be.eql([
        {
          type: 'array',
          message: 'array length "[1,2]" must be lower of 1',
        },
      ]);
    });

    it('should check if an array is not empty', () => {
      const arr = types.array;
      expect(arr.notEmpty.isValid([0, 1])).to.be.true;
      expect(arr.notEmpty.isValid([])).to.be.false;
      expect(arr.errors).to.be.eql([
        {
          type: 'array',
          message: 'array must not be empty',
        },
      ]);
    });
  });

  describe('DateType', () => {
    it('should validate a date', () => {
      const date = new Date();
      const dateType = types.date;
      expect(types.date.isValid(date.toJSON())).to.be.true;
      expect(dateType.isValid('')).to.be.false;
      expect(dateType.errors).to.be.eql([
        {
          type: 'date',
          message: 'element "" must be date',
        },
      ]);
    });

    const date = new Date(1997, 8);

    it('should validate a date that is after other', () => {
      const afterDate = types.date.afterDate(date);
      expect(afterDate.isValid(new Date())).to.be.true;
      expect(afterDate.isValid(new Date(1970, 0))).to.be.false;
      expect(afterDate.errors).to.be.eql([
        {
          type: 'date',
          message: 'date "Thu Jan 01 1970 00:00:00 ' +
            'GMT+0100 (Central European Standard Time)" ' +
            'must be after "Mon Sep 01 1997 00:00:00 GMT+0200 ' +
            '(Central European Summer Time)"',
        },
      ]);
    });

    it('should validate a date that is before other', () => {
      const beforeDate = types.date.beforeDate(date);
      expect(beforeDate.isValid(new Date(2020, 0))).to.be.false;
      expect(beforeDate.isValid(new Date(1970, 0))).to.be.true;
      expect(beforeDate.errors).to.be.eql([
        {
          type: 'date',
          message: 'date "Wed Jan 01 2020 00:00:00 ' +
          'GMT+0100 (Central European Standard Time)" ' +
          'must be before "Mon Sep 01 1997 00:00:00 GMT+0200 ' +
          '(Central European Summer Time)"',
        },
      ]);
    });
  });
});
