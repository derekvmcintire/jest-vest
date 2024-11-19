export type MockResponseSeed<T> = {
  url: string;
  response: T;
};

/*
 ** This function will mock the global fetch object to return specific responses for given URLs.
 ** It throws an error if a response is not defined for a given URL.
 */
export const mockMultiGlobalFetch = <T>(
  mockSeeds: MockResponseSeed<T>[],
): void => {
  if (!mockSeeds || mockSeeds.length === 0) {
    throw new Error("No mock responses were provided to mockMultiGlobalFetch.");
  }

  global.fetch = jest.fn((input) => {
    const mockResponse = mockSeeds.find(
      (mockSeed) => mockSeed.url === input,
    )?.response;

    if (!mockResponse) {
      throw new Error(
        `No mock response found for URL: ${input}. Ensure that a mockResponseSeed exists for this URL.`,
      );
    }

    return Promise.resolve({
      json: () => Promise.resolve(mockResponse),
      ok: true,
    });
  }) as jest.Mock;
};
