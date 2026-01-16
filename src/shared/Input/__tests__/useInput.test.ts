/**
 * Unit Tests for useInput Hook
 */

import { describe, it, expect } from "bun:test";
import { useInput } from "../Input";
import type { InputProps } from "../Input.types";

describe("useInput", () => {
  const baseProps: InputProps = {};

  it("should return default values when no props provided", () => {
    const result = useInput(baseProps);

    expect(result.inputSize).toBe("md");
    expect(result.state).toBe("default");
    expect(result.disabled).toBe(false);
    expect(result.hasError).toBe(false);
    expect(result.errorMessage).toBeUndefined();
  });

  it("should handle inputSize prop", () => {
    const sizes: Array<InputProps["inputSize"]> = ["sm", "md", "lg"];

    sizes.forEach((size) => {
      const result = useInput({ ...baseProps, inputSize: size });
      expect(result.inputSize).toBe(size);
      expect(result.sizeToken).toBeDefined();
    });
  });

  it("should handle state prop", () => {
    const states: Array<InputProps["state"]> = ["default", "error", "success"];

    states.forEach((state) => {
      const result = useInput({ ...baseProps, state });
      expect(result.state).toBe(state);
      expect(result.stateToken).toBeDefined();
    });
  });

  it("should set hasError to true when error is a string", () => {
    const result = useInput({ ...baseProps, error: "Invalid input" });
    expect(result.hasError).toBe(true);
    expect(result.errorMessage).toBe("Invalid input");
  });

  it("should set hasError to true when error is boolean true", () => {
    const result = useInput({ ...baseProps, error: true });
    expect(result.hasError).toBe(true);
    expect(result.errorMessage).toBeUndefined();
  });

  it("should set hasError to true when state is error", () => {
    const result = useInput({ ...baseProps, state: "error" });
    expect(result.hasError).toBe(true);
  });

  it("should prioritize error string over state", () => {
    const result = useInput({
      ...baseProps,
      state: "default",
      error: "Custom error",
    });
    expect(result.hasError).toBe(true);
    expect(result.errorMessage).toBe("Custom error");
  });

  it("should handle disabled prop", () => {
    const result = useInput({ ...baseProps, disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("should return correct size token for md", () => {
    const result = useInput({ ...baseProps, inputSize: "md" });
    expect(result.sizeToken.height).toBe(40);
    expect(result.sizeToken.paddingH).toBe(14);
    expect(result.sizeToken.fontSize).toBe(14);
  });

  it("should return error state token when hasError is true", () => {
    const result = useInput({ ...baseProps, error: "Error message" });
    expect(result.stateToken.border).toBe("#ef4444");
    expect(result.stateToken.focus).toBe("#ef4444");
  });
});
