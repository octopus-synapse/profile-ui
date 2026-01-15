import { describe, it, expect } from "bun:test";
import { cn } from "../cn";

describe("cn", () => {
 it("merges class names", () => {
  expect(cn("foo", "bar")).toBe("foo bar");
 });

 it("handles conditional classes", () => {
  const conditionFalse = false;
  const conditionTrue = true;
  expect(cn("foo", conditionFalse && "bar", "baz")).toBe("foo baz");
  expect(cn("foo", conditionTrue && "bar", "baz")).toBe("foo bar baz");
 });

 it("handles undefined and null", () => {
  expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
 });

 it("merges Tailwind conflicts correctly", () => {
  // Later class wins
  expect(cn("px-2", "px-4")).toBe("px-4");
  expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
 });

 it("handles arrays", () => {
  expect(cn(["foo", "bar"])).toBe("foo bar");
 });

 it("handles objects", () => {
  expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
 });

 it("handles complex combinations", () => {
  const condition = true;
  expect(
   cn(
    "base-class",
    condition && "conditional",
    { "object-true": true, "object-false": false },
    ["array-1", "array-2"]
   )
  ).toBe("base-class conditional object-true array-1 array-2");
 });
});
