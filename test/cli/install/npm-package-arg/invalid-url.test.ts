import { npa } from "bun:internal-for-testing";
import { test, expect } from "bun:test";

test('invalid url', () => {
  expect(() => npa('foo@gopher://goodluckwiththat')).toThrow();
});