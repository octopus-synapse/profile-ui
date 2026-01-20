/**
 * Component Tests for Input (Web)
 */

import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Input } from "../input.component.web";

describe("Input Component", () => {
  beforeEach(() => {
    // Reset any mocks or state
  });

  afterEach(() => {
    cleanup();
  });

  it("should render input element", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDefined();
  });

  it("should render with placeholder", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeDefined();
  });

  it("should handle onChangeText", () => {
    const handleChange = () => {
      let value = "";
      return {
        fn: (text: string) => {
          value = text;
        },
        getValue: () => value,
      };
    };

    const mock = handleChange();
    render(<Input onChangeText={mock.fn} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    expect(mock.getValue()).toBe("test");
  });

  it("should handle value prop", () => {
    render(<Input value="controlled value" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("controlled value");
  });

  it("should handle defaultValue prop", () => {
    render(<Input defaultValue="default value" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("default value");
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it("should be readonly when readOnly prop is true", () => {
    render(<Input readOnly />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  it("should render left addon", () => {
    render(<Input leftAddon={<span data-testid="left-addon">@</span>} />);
    expect(screen.getByTestId("left-addon")).toBeDefined();
  });

  it("should render right addon", () => {
    render(<Input rightAddon={<span data-testid="right-addon">✓</span>} />);
    expect(screen.getByTestId("right-addon")).toBeDefined();
  });

  it("should display error message", () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeDefined();
  });

  it("should display helper text", () => {
    render(<Input helperText="Enter your email address" />);
    expect(screen.getByText("Enter your email address")).toBeDefined();
  });

  it("should prioritize error message over helper text", () => {
    render(
      <Input
        error="Error message"
        helperText="Helper text"
      />
    );
    expect(screen.getByText("Error message")).toBeDefined();
    expect(screen.queryByText("Helper text")).toBeNull();
  });

  it("should handle onFocus", () => {
    const handleFocus = () => {
      let called = false;
      return {
        fn: () => {
          called = true;
        },
        wasCalled: () => called,
      };
    };

    const mock = handleFocus();
    render(<Input onFocus={mock.fn} />);

    const input = screen.getByRole("textbox");
    fireEvent.focus(input);

    expect(mock.wasCalled()).toBe(true);
  });

  it("should handle onBlur", () => {
    const handleBlur = () => {
      let called = false;
      return {
        fn: () => {
          called = true;
        },
        wasCalled: () => called,
      };
    };

    const mock = handleBlur();
    render(<Input onBlur={mock.fn} />);

    const input = screen.getByRole("textbox");
    fireEvent.blur(input);

    expect(mock.wasCalled()).toBe(true);
  });

  it("should handle onSubmit on Enter key", () => {
    const handleSubmit = () => {
      let called = false;
      return {
        fn: () => {
          called = true;
        },
        wasCalled: () => called,
      };
    };

    const mock = handleSubmit();
    render(<Input onSubmit={mock.fn} />);

    const input = screen.getByRole("textbox");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mock.wasCalled()).toBe(true);
  });

  it("should apply testID", () => {
    render(<Input testID="test-input" />);
    expect(screen.getByTestId("test-input")).toBeDefined();
  });

  it("should apply accessibility label", () => {
    render(<Input accessibilityLabel="Email input" />);
    const input = screen.getByLabelText("Email input");
    expect(input).toBeDefined();
  });

  it("should set aria-invalid when error is present", () => {
    render(<Input error="Error" />);
    const input = screen.getByRole("textbox");
    expect(input.getAttribute("aria-invalid")).toBe("true");
  });

  it("should handle different input types", () => {
    const { rerender } = render(<Input type="email" testID="email-input" />);
    let input = screen.getByTestId("email-input") as HTMLInputElement;
    expect(input.type).toBe("email");

    rerender(<Input type="password" testID="password-input" />);
    input = screen.getByTestId("password-input") as HTMLInputElement;
    expect(input.type).toBe("password");
  });
});
