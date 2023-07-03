import path from 'path';
import { readFile } from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

const setTime = 1000;
const pathToFile = './index.ts';
const nonExistPath = 'nonExist.md';
const setMultiple = 3;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, setTime);
    expect(setTimeout).toHaveBeenCalledWith(callback, setTime);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, setTime);
    expect(callback).not.toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, setTime);
    expect(setInterval).toHaveBeenCalledWith(callback, setTime);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, setTime);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(setTime * setMultiple);
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(setMultiple);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpyPath = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(joinSpyPath).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const resultNotExit = await readFileAsynchronously(nonExistPath);
    expect(resultNotExit).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const data = await readFile(path.join(__dirname, pathToFile));
    const fileString = data.toString();
    const resultExists = await readFileAsynchronously(pathToFile);
    expect(resultExists).toEqual(fileString);
  });
});
