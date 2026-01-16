/**
 * Unit Tests for CN Utility
 * Tests class name merging functionality
 */

import { describe, it, expect } from "bun:test";
import { cn } from "../cn";

describe("cn utility", () => {
  it("should merge class names correctly", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("should handle conditional classes", () => {
    const conditionFalse = false;
    const conditionTrue = true;
    expect(cn("foo", conditionFalse && "bar", "baz")).toBe("foo baz");
    expect(cn("foo", conditionTrue && "bar")).toBe("foo bar");
  });

  it("should handle arrays of classes", () => {
    expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
  });

  it("should handle objects with boolean values", () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
  });

  it("should merge Tailwind classes correctly", () => {
    // tailwind-merge should deduplicate conflicting classes
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("should handle empty inputs", () => {
    expect(cn()).toBe("");
    expect(cn("")).toBe("");
    expect(cn(null, undefined, false)).toBe("");
  });

  it("should handle mixed inputs", () => {
    expect(cn("foo", ["bar", "baz"], { qux: true })).toBe("foo bar baz qux");
  });

  it("should handle Tailwind responsive classes", () => {
    const result = cn("px-2 md:px-4", "px-3");
    // Should deduplicate px-2 and px-3, keeping px-3 and md:px-4
    expect(result).toContain("px-3");
    expect(result).toContain("md:px-4");
    expect(result).not.toContain("px-2");
  });
});
