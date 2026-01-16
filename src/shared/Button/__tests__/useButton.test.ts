/**
 * Unit Tests for useButton Hook
 */

import { describe, it, expect } from "bun:test";
import { useButton } from "../Button";
import type { ButtonProps } from "../Button.types";

describe("useButton", () => {
  const baseProps: ButtonProps = {
    children: "Click me",
  };

  it("should return default values when no props provided", () => {
    const result = useButton(baseProps);

    expect(result.variant).toBe("primary");
    expect(result.size).toBe("md");
    expect(result.fullWidth).toBe(false);
    expect(result.loading).toBe(false);
    expect(result.isDisabled).toBe(false);
  });

  it("should handle variant prop", () => {
    const variants: Array<ButtonProps["variant"]> = [
      "primary",
      "secondary",
      "accent",
      "ghost",
      "danger",
    ];

    variants.forEach((variant) => {
      const result = useButton({ ...baseProps, variant });
      expect(result.variant).toBe(variant);
      expect(result.variantToken).toBeDefined();
    });
  });

  it("should handle size prop", () => {
    const sizes: Array<ButtonProps["size"]> = ["xs", "sm", "md", "lg", "xl"];

    sizes.forEach((size) => {
      const result = useButton({ ...baseProps, size });
      expect(result.size).toBe(size);
      expect(result.sizeToken).toBeDefined();
    });
  });

  it("should handle fullWidth prop", () => {
    const result = useButton({ ...baseProps, fullWidth: true });
    expect(result.fullWidth).toBe(true);
  });

  it("should handle loading prop", () => {
    const result = useButton({ ...baseProps, loading: true });
    expect(result.loading).toBe(true);
    expect(result.isDisabled).toBe(true);
  });

  it("should handle disabled prop", () => {
    const result = useButton({ ...baseProps, disabled: true });
    expect(result.isDisabled).toBe(true);
  });

  it("should set isDisabled to true when both loading and disabled are true", () => {
    const result = useButton({
      ...baseProps,
      loading: true,
      disabled: true,
    });
    expect(result.isDisabled).toBe(true);
  });

  it("should return correct variant token for primary", () => {
    const result = useButton({ ...baseProps, variant: "primary" });
    expect(result.variantToken.background).toBe("#ffffff");
    expect(result.variantToken.text).toBe("#000000");
  });

  it("should return correct variant token for accent", () => {
    const result = useButton({ ...baseProps, variant: "accent" });
    expect(result.variantToken.background).toBe("#06b6d4");
    expect(result.variantToken.text).toBe("#000000");
  });

  it("should return correct size token for md", () => {
    const result = useButton({ ...baseProps, size: "md" });
    expect(result.sizeToken.height).toBe(40);
    expect(result.sizeToken.paddingH).toBe(16);
    expect(result.sizeToken.fontSize).toBe(14);
    expect(result.sizeToken.radius).toBe(12);
  });
});
