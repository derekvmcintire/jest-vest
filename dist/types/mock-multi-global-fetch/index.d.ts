export type MockResponseSeed<T> = {
  url: string;
  response: T;
};
export declare const mockMultiGlobalFetch: <T>(
  mockSeeds: MockResponseSeed<T>[],
) => void;
