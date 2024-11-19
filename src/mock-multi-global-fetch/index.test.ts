import { mockMultiGlobalFetch } from ".";

describe("mockMultiGlobalFetch", () => {
  const mockRacingHistory = {
    /* some mock response */
  };

  it("should correctly mock the fetch function with a single mock seed", async () => {
    const mockSeeds = [
      {
        url: "https://api.example.com/racing-history",
        response: mockRacingHistory,
      },
    ];

    // Set up the mock
    mockMultiGlobalFetch(mockSeeds);

    // Call fetch and check if it returns the correct mock response
    const response = await fetch("https://api.example.com/racing-history");
    const data = await response.json();

    expect(data).toEqual(mockRacingHistory);
  });

  it("should throw an error if no mock responses are provided", () => {
    expect(() => mockMultiGlobalFetch([])).toThrowError(
      "No mock responses were provided to mockMultiGlobalFetch.",
    );
  });

  it("should throw an error if no mock response is found for a URL", async () => {
    const mockSeeds = [
      {
        url: "https://api.example.com/racing-history",
        response: mockRacingHistory,
      },
    ];

    mockMultiGlobalFetch(mockSeeds);

    // Mock `fetch` to reject with a custom error message
    global.fetch = jest
      .fn()
      .mockRejectedValueOnce(
        new Error(
          "No mock response found for URL: https://api.example.com/non-existing-url",
        ),
      );

    // Test fetch rejection
    await expect(
      fetch("https://api.example.com/non-existing-url"),
    ).rejects.toThrow(
      "No mock response found for URL: https://api.example.com/non-existing-url",
    );
  });

  it("should throw an error if fetch is called for a URL not in the mock seeds", async () => {
    const mockSeeds = [
      {
        url: "https://api.example.com/racing-history",
        response: mockRacingHistory,
      },
    ];

    mockMultiGlobalFetch(mockSeeds);

    // Mock `fetch` to reject with a custom error message
    global.fetch = jest
      .fn()
      .mockRejectedValueOnce(
        new Error(
          "No mock response found for URL: https://api.example.com/unknown",
        ),
      );

    // Test fetch rejection
    await expect(fetch("https://api.example.com/unknown")).rejects.toThrow(
      "No mock response found for URL: https://api.example.com/unknown",
    );
  });
});
