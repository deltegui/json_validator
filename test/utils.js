import { Rhum } from '../deps.js';

export const parametrizedTest = (name, { params, test }) =>
  params.forEach(({ expected, ...rest }) =>
    Rhum.testCase(`${name} with ${JSON.stringify(rest)} expects ${expected}`, () =>
      Rhum.asserts.assertEquals(test(rest), expected)));
