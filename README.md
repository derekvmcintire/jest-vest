## Jest-Vest
Helper functions for mocking fetch in Jest

### install

`npm i jest-vest --save-dev`

### Mocking multiple fetch Responses using mockMultiGlobalFetch:

```typescript
const mockSeeds: MockResponseSeed[] = [
  {
    url: "https://api.com/first",
    response: { data: "first response" },
  },
  {
    url: "https://api.com/second",
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

### Mock all fetch responses with a single response using mockGlobalFetch:

```typescript
mockGlobalFetch(mockResponse);
```

### Mocking multiple fetch Responses without Jest-Vest:

```typescript
beforeEach(() => {
  global.fetch = jest.fn((url: string): Promise<Response> => {
    if (url === "https://api.com/first") {
      return Promise.resolve(
        new Response(JSON.stringify({ data: "first response" }), {
          status: 200,
          statusText: "OK",
        }),
      );
    } else if (url === "https://api.com/second") {
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

### Mocking multiple fetch Responses without Jest-Vest:

```typescript
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve(mockResponse),
    ok: true,
  });
}) as jest.Mock;
```
