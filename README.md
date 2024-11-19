### mockMultiGlobalFetch Example

Without `jest-vest`:

```typescript
beforeEach(() => {
  global.fetch = jest.fn((input) => {
    let mockResponse: any = null;
    if (input === getRiderHistoryRequestUrl(mockId)) {
      mockResponse = mockRacingHistory;
    } else if (input === getSingleRiderRequestUrl(mockId)) {
      mockResponse = mockRider;
    } else if (input === getRiderRequestUrl({ team: TEAM_B2C2_CONTES })) {
      mockResponse = mockTeamMembers;
    }
    return Promise.resolve({
      json: () => Promise.resolve(mockResponse),
      ok: true,
    });
  }) as jest.Mock;
});
```

With `jest-vest`:

```typescript
beforeEach(() => {
  const mockResultSeeds = [
    {
      url: getRiderHistoryRequestUrl(mockId),
      response: mockRacingHistory,
    },
    {
      url: getSingleRiderRequestUrl(mockId),
      response: mockRider,
    },
    {
      url: getRiderRequestUrl({ team: TEAM_B2C2_CONTES }),
      response: mockTeamMembers,
    },
  ];
  mockMultiGlobalFetch(mockResultSeeds);
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
