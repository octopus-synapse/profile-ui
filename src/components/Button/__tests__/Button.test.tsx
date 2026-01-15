/**
 * Button component tests
 * Tests behavior, not implementation
 */

import { describe, it, expect, mock } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";

describe("Button", () => {
 it("renders children correctly", () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole("button").textContent).toBe("Click me");
 });

 it("handles click events", () => {
  const handleClick = mock(() => {});
  render(<Button onClick={handleClick}>Click</Button>);

  fireEvent.click(screen.getByRole("button"));
  expect(handleClick).toHaveBeenCalledTimes(1);
 });

 it("is disabled when disabled prop is true", () => {
  render(<Button disabled>Disabled</Button>);
  expect((screen.getByRole("button") as HTMLButtonElement).disabled).toBe(true);
 });

 it("is disabled when isLoading is true", () => {
  render(<Button isLoading>Loading</Button>);
  expect((screen.getByRole("button") as HTMLButtonElement).disabled).toBe(true);
 });

 it("is disabled when loading prop is true", () => {
  render(<Button loading>Loading</Button>);
  expect((screen.getByRole("button") as HTMLButtonElement).disabled).toBe(true);
 });

 it("shows spinner when isLoading", () => {
  render(<Button isLoading>Loading</Button>);
  expect(screen.getByRole("button").querySelector("svg")).not.toBeNull();
 });

 it("hides children text when loading", () => {
  const { container } = render(<Button isLoading>Loading</Button>);
  const textSpan = container.querySelector("span.opacity-0");
  expect(textSpan).not.toBeNull();
  expect(textSpan?.textContent).toBe("Loading");
 });

 it("applies variant data attribute", () => {
  render(<Button variant="primary">Primary</Button>);
  expect(screen.getByRole("button").getAttribute("data-variant")).toBe("primary");
 });

 it("renders with different variants", () => {
  const { rerender } = render(<Button variant="primary">Primary</Button>);
  expect(screen.getByRole("button")).not.toBeNull();

  rerender(<Button variant="secondary">Secondary</Button>);
  expect(screen.getByRole("button")).not.toBeNull();

  rerender(<Button variant="ghost">Ghost</Button>);
  expect(screen.getByRole("button")).not.toBeNull();

  rerender(<Button variant="outline">Outline</Button>);
  expect(screen.getByRole("button")).not.toBeNull();
 });

 it("renders with different sizes", () => {
  const { rerender } = render(<Button size="sm">Small</Button>);
  expect(screen.getByRole("button")).not.toBeNull();

  rerender(<Button size="md">Medium</Button>);
  expect(screen.getByRole("button")).not.toBeNull();

  rerender(<Button size="lg">Large</Button>);
  expect(screen.getByRole("button")).not.toBeNull();
 });

 it("renders left icon when provided", () => {
  render(
   <Button leftIcon={<span data-testid="left-icon">←</span>}>
    With Left Icon
   </Button>
  );
  expect(screen.getByTestId("left-icon")).not.toBeNull();
 });

 it("renders right icon when provided and not loading", () => {
  render(
   <Button rightIcon={<span data-testid="right-icon">→</span>}>
    With Right Icon
   </Button>
  );
  expect(screen.getByTestId("right-icon")).not.toBeNull();
 });

 it("hides right icon when loading", () => {
  render(
   <Button isLoading rightIcon={<span data-testid="right-icon">→</span>}>
    Loading
   </Button>
  );
  expect(screen.queryByTestId("right-icon")).toBeNull();
 });

 it("applies fullWidth class when fullWidth is true", () => {
  const { container } = render(<Button fullWidth>Full Width</Button>);
  const button = container.querySelector("button");
  expect(button?.className).toContain("w-full");
 });

 it("sets aria-busy when loading", () => {
  render(<Button isLoading>Loading</Button>);
  expect(screen.getByRole("button").getAttribute("aria-busy")).toBe("true");
 });

 it("does not call onClick when disabled", () => {
  const handleClick = mock(() => {});
  render(
   <Button disabled onClick={handleClick}>
    Disabled
   </Button>
  );

  fireEvent.click(screen.getByRole("button"));
  expect(handleClick).not.toHaveBeenCalled();
 });

 it("does not call onClick when loading", () => {
  const handleClick = mock(() => {});
  render(
   <Button isLoading onClick={handleClick}>
    Loading
   </Button>
  );

  fireEvent.click(screen.getByRole("button"));
  expect(handleClick).not.toHaveBeenCalled();
 });
});
