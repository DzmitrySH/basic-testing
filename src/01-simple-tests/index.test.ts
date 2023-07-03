// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({
      a: 7,
      b: 10,
      action: Action.Add,
    });
    expect(result).toBe(17);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({
      a: 3,
      b: -6,
      action: Action.Subtract,
    });
    expect(result).toBe(9);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({
      a: 3,
      b: 8,
      action: Action.Multiply,
    });
    expect(result).toBe(24);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({
      a: 9,
      b: 2,
      action: Action.Divide,
    });
    expect(result).toBe(4.5);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 7,
      action: Action.Exponentiate,
    });
    expect(result).toBe(128);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 5,
      b: 7,
      action: 'Invalid',
    });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: '4',
      b: '9',
      action: Action.Add,
    });
    expect(result).toBeNull();
  });
});
