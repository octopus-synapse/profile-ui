/**
 * LoadingState component tests
 * Tests behavior, not styling
 */

import { describe, it, expect } from "bun:test";
import { render, screen } from "@testing-library/react";
import { LoadingState } from "../LoadingState";

describe("LoadingState", () => {
 it("renders loading message", () => {
  render(<LoadingState message="Loading data..." />);
  expect(screen.getByText("Loading data...")).not.toBeNull();
 });

 it("uses default message when not provided", () => {
  render(<LoadingState />);
  expect(screen.getByText("Loading...")).not.toBeNull();
 });

 it("does not render message when message is empty string", () => {
  render(<LoadingState message="" />);
  expect(screen.queryByText("Loading...")).toBeNull();
 });

 it("renders spinner", () => {
  const { container } = render(<LoadingState />);
  const spinner = container.querySelector("svg");
  expect(spinner).not.toBeNull();
 });

 it("sets role and aria attributes", () => {
  const { container } = render(<LoadingState />);
  const loadingState = container.firstChild as HTMLElement;
  expect(loadingState.getAttribute("role")).toBe("status");
  expect(loadingState.getAttribute("aria-live")).toBe("polite");
  expect(loadingState.getAttribute("aria-busy")).toBe("true");
 });

 it("applies minHeight style", () => {
  const { container } = render(<LoadingState minHeight="300px" />);
  const loadingState = container.firstChild as HTMLElement;
  expect(loadingState.style.minHeight).toBe("300px");
 });

 it("uses default minHeight when not provided", () => {
  const { container } = render(<LoadingState />);
  const loadingState = container.firstChild as HTMLElement;
  expect(loadingState.style.minHeight).toBe("200px");
 });

 it("renders with different spinner sizes", () => {
  const { rerender, container } = render(<LoadingState size="sm" />);
  let spinner = container.querySelector("svg");
  expect(spinner?.className).toContain("h-4");

  rerender(<LoadingState size="md" />);
  spinner = container.querySelector("svg");
  expect(spinner?.className).toContain("h-6");

  rerender(<LoadingState size="lg" />);
  spinner = container.querySelector("svg");
  expect(spinner?.className).toContain("h-8");
 });

 it("applies centered class when centered is true", () => {
  const { container } = render(<LoadingState centered />);
  const loadingState = container.firstChild as HTMLElement;
  expect(loadingState.className).toContain("w-full");
 });

 it("applies overlay class when overlay is true", () => {
  const { container } = render(<LoadingState overlay />);
  const loadingState = container.firstChild as HTMLElement;
  expect(loadingState.className).toContain("backdrop-blur-sm");
 });

 it("applies custom className", () => {
  const { container } = render(<LoadingState className="custom-class" />);
  const loadingState = container.firstChild as HTMLElement;
  expect(loadingState.className).toContain("custom-class");
 });
});

