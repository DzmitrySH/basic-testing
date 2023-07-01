import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => {
  const originalModule = jest.requireActual('axios');
  return {
    ...originalModule,
    create: () => ({
      get: () => jest.fn((fn) => fn),
    }),
  };
});

const basePost = '/users/1';
const base = 'https://jsonplaceholder.typicode.com';
const isData = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
};

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosCreate = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(basePost);
    expect(axiosCreate).toHaveBeenCalledWith({ baseURL: base });
  });

  test('should perform request to correct provided url', async () => {
    const instanceOn = axios.create();
    const axiosCreate = jest.spyOn(instanceOn, 'get');
    jest.spyOn(axios, 'create').mockReturnValue(instanceOn);
    await throttledGetDataFromApi(basePost);
    jest.runOnlyPendingTimers();
    expect(axiosCreate).toHaveBeenCalledWith(basePost);
  });

  test('should return response data', async () => {
    const axiosCreate = axios.create();
    jest.spyOn(axiosCreate, 'get').mockResolvedValue({ data: [isData] });
    jest.spyOn(axios, 'create').mockReturnValue(axiosCreate);
    const resultData = await throttledGetDataFromApi(basePost);
    expect(resultData).toBeTruthy();
    expect(resultData).toEqual([isData]);
  });
});
