/**
 * Spinner component tests
 * Tests behavior, not styling
 */

import { describe, it, expect } from "bun:test";
import { render, screen } from "@testing-library/react";
import { Spinner } from "../Spinner";

describe("Spinner", () => {
 it("renders spinner", () => {
  const { container } = render(<Spinner />);
  const svg = container.querySelector("svg");
  expect(svg).not.toBeNull();
 });

 it("sets role and aria-label", () => {
  render(<Spinner label="Loading content" />);
  const spinner = screen.getByRole("status");
  expect(spinner.getAttribute("aria-label")).toBe("Loading content");
 });

 it("uses default label when not provided", () => {
  render(<Spinner />);
  const spinner = screen.getByRole("status");
  expect(spinner.getAttribute("aria-label")).toBe("Loading...");
 });

 it("renders with different sizes", () => {
  const { rerender, container } = render(<Spinner size="xs" />);
  let svg = container.querySelector("svg");
  expect(svg?.className).toContain("h-3");

  rerender(<Spinner size="sm" />);
  svg = container.querySelector("svg");
  expect(svg?.className).toContain("h-4");

  rerender(<Spinner size="md" />);
  svg = container.querySelector("svg");
  expect(svg?.className).toContain("h-6");

  rerender(<Spinner size="lg" />);
  svg = container.querySelector("svg");
  expect(svg?.className).toContain("h-8");

  rerender(<Spinner size="xl" />);
  svg = container.querySelector("svg");
  expect(svg?.className).toContain("h-12");
 });

 it("renders with different color schemes", () => {
  const { rerender, container } = render(<Spinner colorScheme="default" />);
  let svg = container.querySelector("svg");
  expect(svg?.className).toContain("text-[var(--foreground)]");

  rerender(<Spinner colorScheme="accent" />);
  svg = container.querySelector("svg");
  expect(svg?.className).toContain("text-[var(--accent)]");

  rerender(<Spinner colorScheme="muted" />);
  svg = container.querySelector("svg");
  expect(svg?.className).toContain("text-[var(--muted-foreground)]");
 });

 it("applies custom className", () => {
  const { container } = render(<Spinner className="custom-class" />);
  const svg = container.querySelector("svg");
  expect(svg?.className).toContain("custom-class");
 });

 it("has animate-spin class", () => {
  const { container } = render(<Spinner />);
  const svg = container.querySelector("svg");
  expect(svg?.className).toContain("animate-spin");
 });
});

