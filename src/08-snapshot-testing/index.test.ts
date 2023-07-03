import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const values1 = ['L', 'i', 's', 't'];
  const expectedList = {
    value: 'L',
    next: {
      value: 'i',
      next: {
        value: 's',
        next: {
          value: 't',
          next: {
            value: null,
            next: null,
          },
        },
      },
    },
  };
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList(values1);
    expect(result).toStrictEqual(expectedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values2 = ['L', 'i', 'n', 'k', 'e', 'd'];
    const result = generateLinkedList(values2);
    expect(result).toMatchSnapshot();
  });
});
