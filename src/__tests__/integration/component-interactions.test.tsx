/**
 * Integration Tests for Component Interactions
 * Tests interactions between different components
 */

import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Button } from "../../web/button";
import { Input } from "../../web/input";
import { Card } from "../../web/card";
import { Badge } from "../../web/badge";

describe("Component Interactions", () => {
  beforeEach(() => {
    // Reset any mocks or state
  });

  afterEach(() => {
    cleanup();
  });

  it("should handle button click inside card", () => {
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

    render(
      <Card>
        <Button onPress={mock.fn}>Click Me</Button>
      </Card>
    );

    const button = screen.getByText("Click Me");
    fireEvent.click(button);

    expect(mock.wasCalled()).toBe(true);
  });

  it("should handle input change and button submit", () => {
    let capturedValue = "";

    const { container } = render(
      <Card>
        <Input placeholder="Enter text" testID="test-input" />
        <Button
          testID="submit-btn"
          onPress={() => {
            const input = container.querySelector('[data-testid="test-input"]') as HTMLInputElement;
            if (input) {
              capturedValue = input.value;
            }
          }}
        >
          Submit
        </Button>
      </Card>
    );

    const input = screen.getByTestId("test-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test value" } });

    const button = screen.getByTestId("submit-btn");
    fireEvent.click(button);

    expect(capturedValue).toBe("test value");
  });

  it("should handle badge removal in card", () => {
    const handleRemove = () => {
      let called = false;
      return {
        fn: () => {
          called = true;
        },
        wasCalled: () => called,
      };
    };

    const mock = handleRemove();

    render(
      <Card>
        <Badge removable onRemove={mock.fn}>
          Removable Badge
        </Badge>
      </Card>
    );

    const badge = screen.getByText("Removable Badge");
    const removeButton = badge.querySelector("button");
    if (removeButton) {
      fireEvent.click(removeButton);
    }

    expect(mock.wasCalled()).toBe(true);
  });

  it("should handle multiple buttons in card footer", () => {
    const handlePrimary = () => {
      let called = false;
      return {
        fn: () => {
          called = true;
        },
        wasCalled: () => called,
      };
    };

    const handleSecondary = () => {
      let called = false;
      return {
        fn: () => {
          called = true;
        },
        wasCalled: () => called,
      };
    };

    const mockPrimary = handlePrimary();
    const mockSecondary = handleSecondary();

    render(
      <Card>
        <div style={{ display: "flex", gap: "8px" }}>
          <Button onPress={mockPrimary.fn}>Primary</Button>
          <Button onPress={mockSecondary.fn} variant="secondary">
            Secondary
          </Button>
        </div>
      </Card>
    );

    fireEvent.click(screen.getByText("Primary"));
    expect(mockPrimary.wasCalled()).toBe(true);

    fireEvent.click(screen.getByText("Secondary"));
    expect(mockSecondary.wasCalled()).toBe(true);
  });

  it("should handle input with button in form-like structure", () => {
    let inputValue = "";

    render(
      <Card>
        <Input
          placeholder="Search"
          onChangeText={(value) => {
            inputValue = value;
          }}
        />
        <Button onPress={() => {}}>Search</Button>
      </Card>
    );

    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "query" } });

    expect(inputValue).toBe("query");
  });
});
