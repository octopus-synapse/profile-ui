

import { describe, it, expect } from "bun:test";

describe("Smoke Tests - Imports", () => {
  it("should import from main index", async () => {
    const module = await import("../../index");
    expect(module).toBeDefined();
  });

  it("should import tokens", async () => {
    const module = await import("../../tokens");
    expect(module).toBeDefined();
  });

  it("should import utils", async () => {
    const module = await import("../../utils");
    expect(module).toBeDefined();
  });

  it("should import hooks", async () => {
    const module = await import("../../hooks");
    expect(module).toBeDefined();
  });

  it("should import web components", async () => {
    const module = await import("../../web");
    expect(module).toBeDefined();
  });

  it("should import shared components", async () => {
    const module = await import("../../shared");
    expect(module).toBeDefined();
  });
});
