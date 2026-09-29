import test from "node:test";
import assert from "node:assert/strict";

test("Hello World milestone", () => {
  const message = "Hello World from Developer Task Tracker!";
  assert.match(message, /Hello World/);
});

test("task title validation", () => {
  assert.equal("Learn Git".length >= 2, true);
  assert.equal("A".length >= 2, false);
});
