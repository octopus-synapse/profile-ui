/**
 * Component Tests for Button (Web)
 */

import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Button } from "../button.component.web";

describe("Button Component", () => {
  beforeEach(() => {
    // Reset any mocks or state
  });

  afterEach(() => {
    cleanup();
  });

  it("should render button with children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeDefined();
  });

  it("should handle onClick event", () => {
    const handleClick = () => {
      let called = false;
      return {
        fn: () => {
          called = true;
        },
        wasCalled: () => called,
      };
    };

    const mock = handleClick();
    render(<Button onPress={mock.fn}>Click me</Button>);

    const button = screen.getByText("Click me");
    fireEvent.click(button);

    expect(mock.wasCalled()).toBe(true);
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByText("Disabled Button") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it("should be disabled when loading prop is true", () => {
    render(<Button loading testID="loading-button">Loading Button</Button>);
    const button = screen.getByTestId("loading-button") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it("should show loading spinner when loading", () => {
    render(<Button loading testID="loading-button">Loading</Button>);
    const button = screen.getByTestId("loading-button");
    // Check if spinner is present (svg element)
    const spinner = button.querySelector("svg");
    expect(spinner).toBeDefined();
  });

  it("should render left icon", () => {
    render(
      <Button leftIcon={<span data-testid="left-icon">←</span>}>
        With Icon
      </Button>
    );
    expect(screen.getByTestId("left-icon")).toBeDefined();
  });

  it("should render right icon", () => {
    render(
      <Button rightIcon={<span data-testid="right-icon">→</span>}>
        With Icon
      </Button>
    );
    expect(screen.getByTestId("right-icon")).toBeDefined();
  });

  it("should apply testID", () => {
    render(<Button testID="test-button">Test</Button>);
    expect(screen.getByTestId("test-button")).toBeDefined();
  });

  it("should apply fullWidth class when fullWidth is true", () => {
    render(<Button fullWidth>Full Width</Button>);
    const button = screen.getByText("Full Width");
    expect(button.className).toContain("w-full");
  });

  it("should apply correct variant styles", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    let button = screen.getByText("Primary") as HTMLButtonElement;
    expect(button.style.backgroundColor).toBe("#ffffff");

    rerender(<Button variant="accent">Accent</Button>);
    button = screen.getByText("Accent") as HTMLButtonElement;
    expect(button.style.backgroundColor).toBe("#06b6d4");
  });

  it("should apply correct size styles", () => {
    render(<Button size="md">Medium</Button>);
    const button = screen.getByText("Medium") as HTMLButtonElement;
    expect(button.style.height).toBe("40px");
  });
});
