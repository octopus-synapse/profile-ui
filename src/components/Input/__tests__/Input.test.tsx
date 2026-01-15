/**
 * Input component tests
 * Tests behavior, not validation logic (that's in contracts)
 */

import { describe, it, expect, mock } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../Input";

describe("Input", () => {
 it("renders correctly", () => {
  render(<Input placeholder="Enter text" />);
  expect(screen.getByPlaceholderText("Enter text")).not.toBeNull();
 });

 it("handles value changes", () => {
  const handleChange = mock(() => {});
  render(<Input placeholder="test-input" onChange={handleChange} />);

  const input = screen.getByPlaceholderText("test-input");
  fireEvent.change(input, { target: { value: "test" } });
  expect(handleChange).toHaveBeenCalled();
 });

 it("displays error message when error is string", () => {
  render(<Input error="This field is required" />);
  expect(screen.getByText("This field is required")).not.toBeNull();
  expect(screen.getByRole("alert")).not.toBeNull();
 });

 it("shows error styling when error is boolean", () => {
  const { container } = render(<Input error={true} />);
  const input = container.querySelector("input");
  expect(input?.getAttribute("aria-invalid")).toBe("true");
 });

 it("displays helper text", () => {
  render(<Input helperText="Enter your email" />);
  expect(screen.getByText("Enter your email")).not.toBeNull();
 });

 it("prioritizes error message over helper text", () => {
  render(<Input error="Error message" helperText="Helper text" />);
  expect(screen.getByText("Error message")).not.toBeNull();
  expect(screen.queryByText("Helper text")).toBeNull();
 });

 it("renders with left addon", () => {
  render(<Input leftAddon={<span data-testid="left-addon">@</span>} />);
  expect(screen.getByTestId("left-addon")).not.toBeNull();
 });

 it("renders with right addon", () => {
  render(<Input rightAddon={<span data-testid="right-addon">✓</span>} />);
  expect(screen.getByTestId("right-addon")).not.toBeNull();
 });

 it("is disabled when disabled prop is true", () => {
  render(<Input placeholder="disabled-input" disabled />);
  const input = screen.getByPlaceholderText(
   "disabled-input"
  ) as HTMLInputElement;
  expect(input.disabled).toBe(true);
 });

 it("applies error state styling when error exists", () => {
  const { container } = render(<Input error="Error" />);
  const input = container.querySelector("input");
  expect(input?.className).toContain("border-[var(--error)]");
 });

 it("applies success state styling", () => {
  const { container } = render(<Input state="success" />);
  const input = container.querySelector("input");
  expect(input?.className).toContain("border-[var(--success)]");
 });

 it("renders with different sizes", () => {
  const { rerender, container } = render(<Input inputSize="sm" />);
  let input = container.querySelector("input");
  expect(input?.className).toContain("h-8");

  rerender(<Input inputSize="md" />);
  input = container.querySelector("input");
  expect(input?.className).toContain("h-10");

  rerender(<Input inputSize="lg" />);
  input = container.querySelector("input");
  expect(input?.className).toContain("h-12");
 });

 it("sets aria-describedby when error or helper text exists", () => {
  const { container, rerender } = render(<Input id="test-input" error="Error" />);
  let input = container.querySelector("input");
  expect(input?.getAttribute("aria-describedby")).toBe("test-input-helper");

  rerender(<Input id="test-input" helperText="Helper" />);
  input = container.querySelector("input");
  expect(input?.getAttribute("aria-describedby")).toBe("test-input-helper");
 });

 it("handles different input types", () => {
  const { rerender, container } = render(<Input type="text" />);
  let input = container.querySelector("input");
  expect(input?.getAttribute("type")).toBe("text");

  rerender(<Input type="email" />);
  input = container.querySelector("input");
  expect(input?.getAttribute("type")).toBe("email");

  rerender(<Input type="password" />);
  input = container.querySelector("input");
  expect(input?.getAttribute("type")).toBe("password");
 });
});
