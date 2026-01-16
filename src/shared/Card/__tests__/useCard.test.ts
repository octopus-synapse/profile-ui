/**
 * Unit Tests for useCard Hook
 */

import { describe, it, expect } from "bun:test";
import { useCard } from "../Card";
import type { CardProps } from "../Card.types";

describe("useCard", () => {
  const baseProps: CardProps = {
    children: "Card content",
  };

  it("should return default values when no props provided", () => {
    const result = useCard(baseProps);

    expect(result.padding).toBe("md");
    expect(result.variant).toBe("default");
    expect(result.hover).toBe("none");
    expect(result.interactive).toBe(false);
  });

  it("should handle padding prop", () => {
    const paddings: Array<CardProps["padding"]> = ["none", "sm", "md", "lg"];

    paddings.forEach((padding) => {
      const result = useCard({ ...baseProps, padding });
      expect(result.padding).toBe(padding);
      expect(result.paddingValue).toBeDefined();
    });
  });

  it("should handle variant prop", () => {
    const variants: Array<CardProps["variant"]> = ["default", "outlined", "filled", "elevated", "ghost"];

    variants.forEach((variant) => {
      const result = useCard({ ...baseProps, variant });
      expect(result.variant).toBe(variant);
      expect(result.variantToken).toBeDefined();
    });
  });

  it("should handle hover prop", () => {
    const hoverOptions: Array<CardProps["hover"]> = ["none", "lift", "glow"];

    hoverOptions.forEach((hover) => {
      const result = useCard({ ...baseProps, hover });
      expect(result.hover).toBe(hover);
    });
  });

  it("should handle interactive prop", () => {
    const result = useCard({ ...baseProps, interactive: true });
    expect(result.interactive).toBe(true);
  });
});
