export type MockResponse<T> = T;
export declare const mockGlobalFetch: <T>(
  mockResponse: MockResponse<T>,
) => void;
