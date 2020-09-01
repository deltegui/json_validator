import StringType from './string.type.js';
import NumberType from './number.type.js';
import BooleanType from './boolean.type.js';
import ArrayType from './array.type.js';
import DateType from './date.type.js';

export default {
  get string() {
    return new StringType();
  },

  get number() {
    return new NumberType();
  },

  get boolean() {
    return new BooleanType();
  },

  get array() {
    return new ArrayType();
  },

  get date() {
    return new DateType();
  },
};
