"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockMultiGlobalFetch = void 0;
/*
 ** This function will mock the global fetch object to return specific responses for given URLs.
 ** It throws an error if a response is not defined for a given URL.
 */
const mockMultiGlobalFetch = (mockSeeds) => {
  if (!mockSeeds || mockSeeds.length === 0) {
    throw new Error("No mock responses were provided to mockMultiGlobalFetch.");
  }
  global.fetch = jest.fn((input) => {
    var _a;
    const mockResponse =
      (_a = mockSeeds.find((mockSeed) => mockSeed.url === input)) === null ||
      _a === void 0
        ? void 0
        : _a.response;
    if (!mockResponse) {
      throw new Error(
        `No mock response found for URL: ${input}. Ensure that a mockResponseSeed exists for this URL.`,
      );
    }
    return Promise.resolve({
      json: () => Promise.resolve(mockResponse),
      ok: true,
    });
  });
};
exports.mockMultiGlobalFetch = mockMultiGlobalFetch;
