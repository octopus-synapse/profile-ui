

import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../card.component.web";

describe("Card Component", () => {
  beforeEach(() => {
    
  });

  afterEach(() => {
    cleanup();
  });

  it("should render card with children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeDefined();
  });

  it("should handle onPress when provided", () => {
    const handlePress = () => {
      let called = false;
      return {
        fn: () => {
          called = true;
        },
        wasCalled: () => called,
      };
    };

    const mock = handlePress();
    render(<Card onPress={mock.fn}>Clickable Card</Card>);

    const card = screen.getByText("Clickable Card");
    fireEvent.click(card);

    expect(mock.wasCalled()).toBe(true);
  });

  it("should have button role when interactive", () => {
    render(<Card interactive>Interactive Card</Card>);
    const card = screen.getByText("Interactive Card");
    expect(card.getAttribute("role")).toBe("button");
  });

  it("should have button role when onPress is provided", () => {
    const { container } = render(<Card onPress={() => {}} testID="clickable-card">Clickable Card</Card>);
    const card = container.querySelector('[data-testid="clickable-card"]');
    expect(card?.getAttribute("role")).toBe("button");
  });

  it("should apply testID", () => {
    render(<Card testID="test-card">Test Card</Card>);
    expect(screen.getByTestId("test-card")).toBeDefined();
  });

  it("should render CardHeader", () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
      </Card>
    );
    expect(screen.getByText("Header")).toBeDefined();
  });

  it("should render CardTitle", () => {
    render(
      <Card>
        <CardTitle>Title</CardTitle>
      </Card>
    );
    expect(screen.getByText("Title")).toBeDefined();
  });

  it("should render CardDescription", () => {
    render(
      <Card>
        <CardDescription>Description</CardDescription>
      </Card>
    );
    expect(screen.getByText("Description")).toBeDefined();
  });

  it("should render CardContent", () => {
    render(
      <Card>
        <CardContent>Content</CardContent>
      </Card>
    );
    expect(screen.getByText("Content")).toBeDefined();
  });

  it("should render CardFooter", () => {
    render(
      <Card>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    expect(screen.getByText("Footer")).toBeDefined();
  });

  it("should render complete card structure", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText("Card Title")).toBeDefined();
    expect(screen.getByText("Card Description")).toBeDefined();
    expect(screen.getByText("Card Content")).toBeDefined();
    expect(screen.getByText("Card Footer")).toBeDefined();
  });
});
