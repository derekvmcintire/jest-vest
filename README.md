### mockMultiGlobalFetch Example

Without `jest-vest`:

```typescript
beforeEach(() => {
  global.fetch = jest.fn((url: string): Promise<Response> => {
    if (url === "https://api.first.com/data") {
      return Promise.resolve(
        new Response(JSON.stringify({ data: "first response" }), {
          status: 200,
          statusText: "OK",
        }),
      );
    } else if (url === "https://api.second.com/data") {
      return Promise.resolve(
        new Response(JSON.stringify({ data: "second response" }), {
          status: 200,
          statusText: "OK",
        }),
      );
    } else {
      return Promise.reject(new Error("Unknown URL"));
    }
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});
```

With `jest-vest`:

```typescript
const mockSeeds: MockResponseSeed[] = [
  {
    url: "https://api.first.com/data",
    response: { data: "first response" },
  },
  {
    url: "https://api.second.com/data",
    response: { data: "second response" },
  },
];

beforeEach(() => {
  mockMultiGlobalFetch(mockSeeds);
});

afterAll(() => {
  jest.restoreAllMocks();
});
```

### mockGlobalFetch Example:

Without `jest-vest`:

```typescript
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve(mockResponse),
    ok: true,
  });
}) as jest.Mock;
```

With `jest-vest`:

```typescript
mockGlobalFetch(mockResponse);
```
