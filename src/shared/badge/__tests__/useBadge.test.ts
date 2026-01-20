/**
 * Unit Tests for useBadge Hook
 */

import { describe, it, expect } from "bun:test";
import { useBadge } from "../badge.base";
import type { BadgeProps } from "../badge.types";

describe("useBadge", () => {
  const baseProps: BadgeProps = {
    children: "Badge",
  };

  it("should return default values when no props provided", () => {
    const result = useBadge(baseProps);

    expect(result.variant).toBe("default");
    expect(result.size).toBe("sm");
    expect(result.shape).toBe("pill");
    expect(result.dot).toBe(false);
    expect(result.removable).toBe(false);
  });

  it("should handle variant prop", () => {
    const variants: Array<BadgeProps["variant"]> = [
      "default",
      "secondary",
      "primary",
      "outline",
      "success",
      "error",
      "warning",
      "info",
    ];

    variants.forEach((variant) => {
      const result = useBadge({ ...baseProps, variant });
      expect(result.variant).toBe(variant);
      expect(result.variantToken).toBeDefined();
    });
  });

  it("should handle size prop", () => {
    const sizes: Array<BadgeProps["size"]> = ["xs", "sm", "md", "lg"];

    sizes.forEach((size) => {
      const result = useBadge({ ...baseProps, size });
      expect(result.size).toBe(size);
      expect(result.sizeToken).toBeDefined();
    });
  });

  it("should handle shape prop", () => {
    const shapes: Array<BadgeProps["shape"]> = ["pill", "rounded", "square"];

    shapes.forEach((shape) => {
      const result = useBadge({ ...baseProps, shape });
      expect(result.shape).toBe(shape);
      expect(result.shapeToken).toBeDefined();
    });
  });

  it("should handle dot prop", () => {
    const result = useBadge({ ...baseProps, dot: true });
    expect(result.dot).toBe(true);
  });

  it("should handle removable prop", () => {
    const result = useBadge({ ...baseProps, removable: true });
    expect(result.removable).toBe(true);
  });
});
