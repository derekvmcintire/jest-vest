export type MockResponse<T> = T;

/*
 ** This function will mock the global fetch object and return a mocked response.
 */
export const mockGlobalFetch = <T>(mockResponse: MockResponse<T>): void => {
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => Promise.resolve(mockResponse),
      ok: true,
    });
  }) as jest.Mock;
};
