/**
 * Design System Tokens Tests
 * TDD: Test-first approach for platform-agnostic tokens
 *
 * @module tokens/__tests__/design-system.test
 */

import { describe, it, expect } from "bun:test";
import {
 designSystem,
 palette,
 space,
 radii,
 fontSizes,
 shadows,
 button,
 input,
 badge,
 toCSS,
 toRem,
 generateCSSVariables,
} from "../design-system";

describe("Design System Tokens", () => {
 describe("palette", () => {
  it("should have B&W background colors", () => {
   expect(palette.background.primary).toBe("#020202");
   expect(palette.background.secondary).toBe("#0a0a0a");
   expect(palette.background.tertiary).toBe("#171717");
  });

  it("should have cyan accent colors", () => {
   expect(palette.accent.default).toBe("#06b6d4");
   expect(palette.accent.light).toBe("#22d3ee");
   expect(palette.accent.dark).toBe("#0891b2");
  });

  it("should have proper text hierarchy", () => {
   expect(palette.text.primary).toBe("#ffffff");
   expect(palette.text.secondary).toBe("#a3a3a3");
   expect(palette.text.muted).toBe("#525252");
  });

  it("should have semantic colors", () => {
   expect(palette.semantic.success).toBe("#22c55e");
   expect(palette.semantic.error).toBe("#ef4444");
   expect(palette.semantic.warning).toBe("#eab308");
  });
 });

 describe("space", () => {
  it("should follow 4px grid system", () => {
   expect(space[1]).toBe(4);
   expect(space[2]).toBe(8);
   expect(space[4]).toBe(16);
   expect(space[8]).toBe(32);
  });

  it("should have fractional values", () => {
   expect(space[0.5]).toBe(2);
   expect(space[1.5]).toBe(6);
   expect(space[2.5]).toBe(10);
  });
 });

 describe("radii", () => {
  it("should have standard border radius values", () => {
   expect(radii.none).toBe(0);
   expect(radii.sm).toBe(4);
   expect(radii.md).toBe(8);
   expect(radii.lg).toBe(12);
   expect(radii.xl).toBe(16);
   expect(radii.full).toBe(9999);
  });
 });

 describe("fontSizes", () => {
  it("should have typography scale", () => {
   expect(fontSizes.xs).toBe(12);
   expect(fontSizes.sm).toBe(14);
   expect(fontSizes.base).toBe(16);
   expect(fontSizes.lg).toBe(18);
   expect(fontSizes.xl).toBe(20);
  });
 });

 describe("shadows", () => {
  it("should have native shadow properties", () => {
   expect(shadows.sm).toHaveProperty("shadowColor");
   expect(shadows.sm).toHaveProperty("shadowOffset");
   expect(shadows.sm).toHaveProperty("shadowOpacity");
   expect(shadows.sm).toHaveProperty("shadowRadius");
   expect(shadows.sm).toHaveProperty("elevation");
  });

  it("should have accent glow shadow", () => {
   expect(shadows.glow.shadowColor).toBe(palette.accent.default);
  });
 });

 describe("button tokens", () => {
  it("should have primary button with white background", () => {
   expect(button.primary.background).toBe("#ffffff");
   expect(button.primary.text).toBe("#000000");
  });

  it("should have accent button with cyan", () => {
   expect(button.accent.background).toBe(palette.accent.default);
  });

  it("should have ghost button with transparent background", () => {
   expect(button.ghost.background).toBe("transparent");
  });
 });

 describe("input tokens", () => {
  it("should have proper input styling", () => {
   expect(input.background).toBe(palette.surface.default);
   expect(input.borderFocus).toBe(palette.accent.default);
   expect(input.borderError).toBe(palette.semantic.error);
  });
 });

 describe("badge tokens", () => {
  it("should have variant badges", () => {
   expect(badge.default).toHaveProperty("background");
   expect(badge.accent.text).toBe(palette.accent.light);
   expect(badge.success.text).toBe(palette.semantic.success);
   expect(badge.error.text).toBe(palette.semantic.error);
  });
 });

 describe("toCSS", () => {
  it("should convert number to CSS pixel string", () => {
   expect(toCSS(16)).toBe("16px");
   expect(toCSS(0)).toBe("0px");
   expect(toCSS(9999)).toBe("9999px");
  });
 });

 describe("toRem", () => {
  it("should convert pixels to rem", () => {
   expect(toRem(16)).toBe("1rem");
   expect(toRem(24)).toBe("1.5rem");
   expect(toRem(12)).toBe("0.75rem");
  });

  it("should accept custom base", () => {
   expect(toRem(20, 20)).toBe("1rem");
  });
 });

 describe("generateCSSVariables", () => {
  it("should generate CSS custom properties", () => {
   const vars = generateCSSVariables();

   expect(vars["--pf-bg-primary"]).toBe(palette.background.primary);
   expect(vars["--pf-accent"]).toBe(palette.accent.default);
   expect(vars["--pf-text-primary"]).toBe(palette.text.primary);
  });

  it("should include spacing variables", () => {
   const vars = generateCSSVariables();

   expect(vars["--pf-space-4"]).toBe("16px");
   expect(vars["--pf-space-8"]).toBe("32px");
  });

  it("should include radius variables", () => {
   const vars = generateCSSVariables();

   expect(vars["--pf-radius-md"]).toBe("8px");
   expect(vars["--pf-radius-xl"]).toBe("16px");
  });
 });

 describe("designSystem composite", () => {
  it("should export complete design system", () => {
   expect(designSystem).toHaveProperty("palette");
   expect(designSystem).toHaveProperty("space");
   expect(designSystem).toHaveProperty("radii");
   expect(designSystem).toHaveProperty("fontSizes");
   expect(designSystem).toHaveProperty("shadows");
   expect(designSystem).toHaveProperty("button");
   expect(designSystem).toHaveProperty("input");
   expect(designSystem).toHaveProperty("card");
   expect(designSystem).toHaveProperty("badge");
  });
 });
});
