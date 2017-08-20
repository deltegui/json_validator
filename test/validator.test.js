/* eslint-disable no-unused-expressions */
const jsonValidator = require('../index')();
const expect = require('chai').expect;

describe('Validator', () => {
  const structure = jsonValidator.create(t => ({
    name: t.string.required,
    age: t.number.required,
    email: t.string,
  }), '');

  it('should check if have required keys', () => {
    expect(structure.haveRequiredKeys({
      name: 'demo',
    })).to.be.false;
    expect(structure.haveRequiredKeys({
      name: 'demo',
      age: 22,
    })).to.be.true;
    expect(structure.haveRequiredKeys({
      name: 'demo',
      age: 44,
      email: 'demo@example.com',
    })).to.be.true;
  });

  it('should reutrn if a specific key is required', () => {
    expect(structure.keyIsRequired('name')).to.be.true;
    expect(structure.keyIsRequired('email')).to.be.false;
  });

  it('should validate json types', () => {
    expect(structure.validateTypes({
      name: 'demo',
      age: '22',
    })).to.be.false;
    expect(structure.validateTypes({
      name: 'demo',
      age: 22,
    })).to.be.true;
  });

  it('should validate all', () => {
    expect(structure.validate({
      name: 'demo',
      age: 22,
    })).to.be.true;
  });
});
