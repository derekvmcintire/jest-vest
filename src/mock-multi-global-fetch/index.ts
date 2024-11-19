export type MockResponseSeed = {
  url: string;
  response: unknown; // Allows any shape but enforces explicit typing
};

/**
 * Mocks the global fetch object with predefined responses for given URLs.
 * Throws an error if a response is not defined for a requested URL.
 */
export const mockMultiGlobalFetch = (mockSeeds: MockResponseSeed[]): void => {
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
