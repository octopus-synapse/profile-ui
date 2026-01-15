/**
 * Badge component tests
 * Tests behavior, not styling
 */

import { describe, it, expect, mock } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { Badge } from "../Badge";

describe("Badge", () => {
 it("renders children correctly", () => {
  render(<Badge>Status</Badge>);
  expect(screen.getByText("Status")).not.toBeNull();
 });

 it("renders with dot indicator", () => {
  const { container } = render(<Badge dot>Online</Badge>);
  const dot = container.querySelector("span.rounded-full");
  expect(dot).not.toBeNull();
 });

 it("does not render dot when dot is false", () => {
  const { container } = render(<Badge>No Dot</Badge>);
  const dot = container.querySelector("span.rounded-full");
  expect(dot).toBeNull();
 });

 it("renders removable badge with X button", () => {
  const handleRemove = mock(() => {});
  render(
   <Badge removable onRemove={handleRemove}>
    Removable
   </Badge>
  );

  const removeButton = screen.getByRole("button", { name: /remove/i });
  expect(removeButton).not.toBeNull();

  fireEvent.click(removeButton);
  expect(handleRemove).toHaveBeenCalledTimes(1);
 });

 it("does not render remove button when removable is false", () => {
  render(<Badge>Not Removable</Badge>);
  expect(screen.queryByRole("button", { name: /remove/i })).toBeNull();
 });

 it("applies variant data attribute", () => {
  const { container } = render(<Badge variant="default">Default</Badge>);
  expect(
   (container.firstChild as HTMLElement).getAttribute("data-variant")
  ).toBe("default");
 });

 it("applies different variants", () => {
  const { rerender, container } = render(
   <Badge variant="success">Success</Badge>
  );
  expect(
   (container.firstChild as HTMLElement).getAttribute("data-variant")
  ).toBe("success");

  rerender(<Badge variant="error">Error</Badge>);
  expect(
   (container.firstChild as HTMLElement).getAttribute("data-variant")
  ).toBe("error");

  rerender(<Badge variant="primary">Primary</Badge>);
  expect(
   (container.firstChild as HTMLElement).getAttribute("data-variant")
  ).toBe("primary");
 });

 it("renders with different sizes", () => {
  const { rerender, container } = render(<Badge size="xs">XS</Badge>);
  let badge = container.firstChild as HTMLElement;
  expect(badge.className).toContain("text-[10px]");

  rerender(<Badge size="sm">SM</Badge>);
  badge = container.firstChild as HTMLElement;
  expect(badge.className).toContain("text-xs");

  rerender(<Badge size="md">MD</Badge>);
  badge = container.firstChild as HTMLElement;
  expect(badge.className).toContain("text-xs");

  rerender(<Badge size="lg">LG</Badge>);
  badge = container.firstChild as HTMLElement;
  expect(badge.className).toContain("text-sm");
 });

 it("renders with different shapes", () => {
  const { rerender, container } = render(<Badge shape="rounded">Rounded</Badge>);
  let badge = container.firstChild as HTMLElement;
  expect(badge.className).toContain("rounded-md");

  rerender(<Badge shape="pill">Pill</Badge>);
  badge = container.firstChild as HTMLElement;
  expect(badge.className).toContain("rounded-full");

  rerender(<Badge shape="square">Square</Badge>);
  badge = container.firstChild as HTMLElement;
  expect(badge.className).toContain("rounded-none");
 });

 it("stops event propagation when remove button is clicked", () => {
  const handleRemove = mock(() => {});
  const handleParentClick = mock(() => {});
  
  render(
   <div onClick={handleParentClick}>
    <Badge removable onRemove={handleRemove}>Badge</Badge>
   </div>
  );

  const removeButton = screen.getByRole("button", { name: /remove/i });
  fireEvent.click(removeButton);
  
  expect(handleRemove).toHaveBeenCalledTimes(1);
  expect(handleParentClick).not.toHaveBeenCalled();
 });
});
