"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockGlobalFetch = void 0;
/*
 ** This function will mock the global fetch object and return a mocked response.
 */
const mockGlobalFetch = (mockResponse) => {
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => Promise.resolve(mockResponse),
      ok: true,
    });
  });
};
exports.mockGlobalFetch = mockGlobalFetch;
