/**
 * Unit Tests for useForm Hook
 */

import { describe, it, expect } from "bun:test";
import { render } from "@testing-library/react";
import { useForm, useFormField, type UseFormProps } from "../Form";

// Test component for useForm
function TestUseForm({ props, onResult }: { props: UseFormProps; onResult: (result: ReturnType<typeof useForm>) => void }) {
  const result = useForm(props);
  onResult(result);
  return null;
}

// Test component for useFormField
function TestUseFormField({ props, onResult }: { props: Parameters<typeof useFormField>[0]; onResult: (result: ReturnType<typeof useFormField>) => void }) {
  const result = useFormField(props);
  onResult(result);
  return null;
}

describe("useForm", () => {
  it("should return default values when no props provided", () => {
    let result: ReturnType<typeof useForm> | null = null;
    render(<TestUseForm props={{}} onResult={(r) => { result = r; }} />);
    
    expect(result).not.toBeNull();
    expect(result!.spacing).toBe("md");
    expect(result!.layout).toBe("vertical");
    expect(result!.spacingValue).toBe(20);
    expect(result!.handleSubmit).toBeDefined();
  });

  it("should handle spacing prop", () => {
    const spacingMap: Record<"sm" | "md" | "lg", number> = {
      sm: 12,
      md: 20,
      lg: 28,
    };

    Object.entries(spacingMap).forEach(([spacing, expectedValue]) => {
      let result: ReturnType<typeof useForm> | null = null;
      render(<TestUseForm props={{ spacing: spacing as "sm" | "md" | "lg" }} onResult={(r) => { result = r; }} />);
      expect(result!.spacingValue).toBe(expectedValue);
    });
  });

  it("should handle layout prop", () => {
    let result: ReturnType<typeof useForm> | null = null;
    render(<TestUseForm props={{ layout: "horizontal" }} onResult={(r) => { result = r; }} />);
    expect(result!.layout).toBe("horizontal");
  });

  it("should call onSubmit when handleSubmit is called", () => {
    const mockOnSubmit = () => {
      let called = false;
      return {
        fn: () => {
          called = true;
        },
        wasCalled: () => called,
      };
    };

    const mock = mockOnSubmit();
    let result: ReturnType<typeof useForm> | null = null;
    render(<TestUseForm props={{ onSubmit: mock.fn }} onResult={(r) => { result = r; }} />);

    const mockEvent = {
      preventDefault: () => {},
    } as React.FormEvent;

    result!.handleSubmit(mockEvent);
    expect(mock.wasCalled()).toBe(true);
  });

  it("should prevent default on form event", () => {
    let preventDefaultCalled = false;
    const mockEvent = {
      preventDefault: () => {
        preventDefaultCalled = true;
      },
    } as React.FormEvent;

    let result: ReturnType<typeof useForm> | null = null;
    render(<TestUseForm props={{}} onResult={(r) => { result = r; }} />);
    result!.handleSubmit(mockEvent);

    expect(preventDefaultCalled).toBe(true);
  });

  it("should handle undefined onSubmit gracefully", () => {
    let result: ReturnType<typeof useForm> | null = null;
    render(<TestUseForm props={{}} onResult={(r) => { result = r; }} />);
    const mockEvent = {
      preventDefault: () => {},
    } as React.FormEvent;

    expect(() => result!.handleSubmit(mockEvent)).not.toThrow();
  });
});

describe("useFormField", () => {
  it("should generate id when name is not provided", () => {
    let result: ReturnType<typeof useFormField> | null = null;
    render(<TestUseFormField props={{}} onResult={(r) => { result = r; }} />);
    expect(result!.id).toBeDefined();
    expect(result!.id).toMatch(/^field-/);
  });

  it("should use name as id when provided", () => {
    let result: ReturnType<typeof useFormField> | null = null;
    render(<TestUseFormField props={{ name: "email" }} onResult={(r) => { result = r; }} />);
    expect(result!.id).toBe("email");
  });

  it("should set hasError to false when no error", () => {
    let result: ReturnType<typeof useFormField> | null = null;
    render(<TestUseFormField props={{}} onResult={(r) => { result = r; }} />);
    expect(result!.hasError).toBe(false);
    expect(result!.errorMessage).toBeUndefined();
  });

  it("should set hasError to true when error is provided", () => {
    let result: ReturnType<typeof useFormField> | null = null;
    render(<TestUseFormField props={{ error: "Required field" }} onResult={(r) => { result = r; }} />);
    expect(result!.hasError).toBe(true);
    expect(result!.errorMessage).toBe("Required field");
  });

  it("should handle empty string error", () => {
    let result: ReturnType<typeof useFormField> | null = null;
    render(<TestUseFormField props={{ error: "" }} onResult={(r) => { result = r; }} />);
    // Empty string is falsy, so hasError should be false
    expect(result!.hasError).toBe(false);
    expect(result!.errorMessage).toBe("");
  });
});
