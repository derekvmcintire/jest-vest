"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe("mockGlobalFetch", () => {
  it("should return the mock response for any fetch request", async () => {
    // Arrange
    const mockData = { message: "This is a mock response" };
    (0, _1.mockGlobalFetch)(mockData);
    // Act
    const response = await fetch("https://api.example.com/success"); // It doesn't matter what URL we use here
    // Assert
    const data = await response.json();
    expect(data).toEqual(mockData);
  });
});
