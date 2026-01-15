import { describe, it, expect } from "bun:test";
import {
 colors,
 accentColors,
 getAccentColor,
 baseColors,
 semanticColors,
} from "../colors";

describe("colors", () => {
 describe("baseColors", () => {
  it("has black and white", () => {
   expect(baseColors.black).toBe("#000000");
   expect(baseColors.white).toBe("#FFFFFF");
  });

  it("has full gray scale", () => {
   expect(baseColors.gray[50]).toBeDefined();
   expect(baseColors.gray[950]).toBeDefined();
  });
 });

 describe("accentColors", () => {
  it("has all 5 variants", () => {
   expect(accentColors.dev).toBeDefined();
   expect(accentColors.product).toBeDefined();
   expect(accentColors.design).toBeDefined();
   expect(accentColors.data).toBeDefined();
   expect(accentColors.devops).toBeDefined();
  });

  it("dev variant is white", () => {
   expect(accentColors.dev.main).toBe("#FFFFFF");
  });

  it("product variant is blue", () => {
   expect(accentColors.product.main).toBe("#3B82F6");
  });

  it("design variant is purple", () => {
   expect(accentColors.design.main).toBe("#A855F7");
  });

  it("data variant is green", () => {
   expect(accentColors.data.main).toBe("#22C55E");
  });

  it("devops variant is orange", () => {
   expect(accentColors.devops.main).toBe("#F97316");
  });
 });

 describe("getAccentColor", () => {
  it("returns correct accent for variant", () => {
   expect(getAccentColor("dev")).toEqual(accentColors.dev);
   expect(getAccentColor("product")).toEqual(accentColors.product);
  });
 });

 describe("semanticColors", () => {
  it("has all semantic colors", () => {
   expect(semanticColors.success).toBeDefined();
   expect(semanticColors.warning).toBeDefined();
   expect(semanticColors.error).toBeDefined();
   expect(semanticColors.info).toBeDefined();
  });
 });

 describe("colors export", () => {
  it("combines all color types", () => {
   expect(colors.black).toBe("#000000");
   expect(colors.accent).toBe(accentColors);
   expect(colors.semantic).toBe(semanticColors);
  });
 });
});
