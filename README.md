# **jest-vest**

A lightweight JavaScript library for mocking multiple `fetch` responses in Jest tests. Designed to simplify and modularize the process of returning different mock responses based on the requested URL.

## **Features**

- Mock multiple `fetch` responses based on URLs.
- Modularize and simplify conditional checks for mock responses.
- Type-safe and developer-friendly, with clear error handling for missing or unexpected URLs.
- Flexible enough to handle a single response or multiple responses.

---

## **Installation**

Install via npm:

```bash
npm install jest-vest
```

or with yarn:

```bash
yarn add jest-vest
```

---

## **Usage**

### **Mocking Multiple Fetch Responses**

Use `mockMultiGlobalFetch` to mock multiple `fetch` calls, each returning a predefined response for a specific URL.

```typescript
import { mockMultiGlobalFetch } from "jest-vest";

describe("mockMultiGlobalFetch example", () => {
  it("mocks multiple fetch responses", async () => {
    // Arrange: Define mock responses
    const mockResponses = [
      {
        url: "https://api.example.com/user",
        response: { id: 1, name: "John Doe" },
      },
      {
        url: "https://api.example.com/posts",
        response: [{ id: 101, title: "Mocking with Jest" }],
      },
    ];

    mockMultiGlobalFetch(mockResponses);

    // Act: Fetch from mocked URLs
    const userResponse = await fetch("https://api.example.com/user");
    const userData = await userResponse.json();

    const postsResponse = await fetch("https://api.example.com/posts");
    const postsData = await postsResponse.json();

    // Assert: Verify the mocked responses
    expect(userData).toEqual({ id: 1, name: "John Doe" });
    expect(postsData).toEqual([{ id: 101, title: "Mocking with Jest" }]);
  });
});
```

### **Mocking a Single Fetch Response**

If your test only needs one consistent response for all `fetch` calls, use `mockGlobalFetch`.

```typescript
import { mockGlobalFetch } from "jest-vest";

describe("mockGlobalFetch example", () => {
  it("mocks a single response for all fetch requests", async () => {
    // Arrange: Define a single mock response
    const mockResponse = { success: true, message: "Mocked response" };

    mockGlobalFetch(mockResponse);

    // Act: Fetch from any URL
    const response = await fetch("https://api.example.com/test");
    const data = await response.json();

    // Assert: Verify the mocked response
    expect(data).toEqual({ success: true, message: "Mocked response" });
  });
});
```

---

## **API Reference**

### **`mockMultiGlobalFetch(mockSeeds: MockResponseSeed[]): void`**

Mocks the global `fetch` function with predefined responses for specific URLs.

#### **Parameters**

- `mockSeeds` (`MockResponseSeed[]`): An array of objects containing:
  - `url` (`string`): The URL to mock.
  - `response` (`unknown`): The mock response returned when the URL is requested.

#### **Example**

```typescript
mockMultiGlobalFetch([
  { url: "https://api.example.com/data", response: { data: "mocked" } },
]);
```

#### **Throws**

- An error if `mockSeeds` is empty or `fetch` is called for a URL not in `mockSeeds`.

---

### **`mockGlobalFetch<T>(mockResponse: MockResponse<T>): void`**

Mocks the global `fetch` function to return a consistent response for all requests.

#### **Parameters**

- `mockResponse` (`T`): The mock response object to return for any `fetch` call.

#### **Example**

```typescript
mockGlobalFetch({ status: "ok", message: "All requests are mocked." });
```

---

## **Error Handling**

1. **No Mock Responses Provided**  
   If no responses are passed to `mockMultiGlobalFetch`, an error will be thrown:

   ```plaintext
   No mock responses were provided to mockMultiGlobalFetch.
   ```

2. **URL Not Mocked**  
   If `fetch` is called with a URL that isn't in `mockSeeds`, an error will be thrown:
   ```plaintext
   No mock response found for URL: https://api.example.com/unexpected.
   ```

---

## **Test Coverage**

### **`mockMultiGlobalFetch` Tests**

- Handles multiple URL-specific responses.
- Throws an error for unmocked URLs.
- Validates the presence of at least one mock response.

### **`mockGlobalFetch` Tests**

- Returns a consistent response for all requests.
- Handles asynchronous fetch behavior correctly.

---

## **Why Jest-Vest?**

Testing React components that make multiple network requests can get messy with lots of conditional checks, especially if you don't know the exact order of the requests. **jest-vest** makes your tests cleaner, modular, and easier to maintain by centralizing your fetch mocking logic.

---

## Mocking Multiple Requests Without Jest-Vest Vs. With Jest-Vest

#### Without Jest-Vest:

```typescript
global.fetch = jest.fn((input) => {
  let response = null;
  if (input === "https://api.example.com/user") {
    response = { id: 1, name: "John Doe" };
  } else if ( input === "https://api.example.com/posts") {
    response = [{ id: 101, title: "Mocking with Jest" }]
  }

  if (!response) {
    throw new Error(
      `No mock response found for URL: ${input}.`,
    );
  }

  return Promise.resolve({
    json: () => Promise.resolve(response),
    ok: true,
  });
}) as jest.Mock;
```

#### With Jest-Vest:

```typescript
  const mockResponses = [
    {
      url: "https://api.example.com/user",
      response: { id: 1, name: "John Doe" },
    },
    {
      url: "https://api.example.com/posts",
      response: [{ id: 101, title: "Mocking with Jest" }],
    },
  ];

  mockMultiGlobalFetch(mockResponses);
```

---

## **Contributing**

Contributions are welcome! If you have ideas or improvements, please open an issue or submit a pull request on GitHub.

---

This should give you a clear, professional set of documentation that will help developers understand and use your library effectively!
