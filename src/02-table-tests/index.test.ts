// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 7, b: 10, action: Action.Add, expected: 17 },
  { a: 3, b: -6, action: Action.Subtract, expected: 9 },
  { a: 3, b: 8, action: Action.Multiply, expected: 24 },
  { a: 9, b: 2, action: Action.Divide, expected: 4.5 },
  { a: 2, b: 7, action: Action.Exponentiate, expected: 128 },
  { a: 5, b: 7, action: 'Invalid', expected: null },
  { a: '4', b: '9', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '%i and %i with action %s expect %i',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
