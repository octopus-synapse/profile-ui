/**
 * Card component tests
 * Tests behavior, not styling
 */

import { describe, it, expect } from "bun:test";
import { render, screen } from "@testing-library/react";
import {
 Card,
 CardHeader,
 CardTitle,
 CardDescription,
 CardContent,
 CardFooter,
} from "../Card";

describe("Card", () => {
 it("renders children correctly", () => {
  render(<Card>Card content</Card>);
  expect(screen.getByText("Card content")).not.toBeNull();
 });

 it("applies variant data attribute", () => {
  const { container } = render(<Card variant="default">Default Card</Card>);
  expect(
   (container.firstChild as HTMLElement).getAttribute("data-variant")
  ).toBe("default");
 });

 it("renders with different variants", () => {
  const { rerender, container } = render(<Card variant="outlined">Outlined</Card>);
  expect(
   (container.firstChild as HTMLElement).getAttribute("data-variant")
  ).toBe("outlined");

  rerender(<Card variant="filled">Filled</Card>);
  expect(
   (container.firstChild as HTMLElement).getAttribute("data-variant")
  ).toBe("filled");

  rerender(<Card variant="elevated">Elevated</Card>);
  expect(
   (container.firstChild as HTMLElement).getAttribute("data-variant")
  ).toBe("elevated");
 });

 it("renders with different padding sizes", () => {
  const { rerender, container } = render(<Card padding="none">No Padding</Card>);
  let card = container.firstChild as HTMLElement;
  expect(card.className).not.toContain("p-");

  rerender(<Card padding="sm">Small Padding</Card>);
  card = container.firstChild as HTMLElement;
  expect(card.className).toContain("p-4");

  rerender(<Card padding="md">Medium Padding</Card>);
  card = container.firstChild as HTMLElement;
  expect(card.className).toContain("p-6");

  rerender(<Card padding="lg">Large Padding</Card>);
  card = container.firstChild as HTMLElement;
  expect(card.className).toContain("p-8");
 });

 it("renders full card structure", () => {
  render(
   <Card>
    <CardHeader>
     <CardTitle>Title</CardTitle>
     <CardDescription>Description</CardDescription>
    </CardHeader>
    <CardContent>Content</CardContent>
    <CardFooter>Footer</CardFooter>
   </Card>
  );

  expect(screen.getByText("Title")).not.toBeNull();
  expect(screen.getByText("Description")).not.toBeNull();
  expect(screen.getByText("Content")).not.toBeNull();
  expect(screen.getByText("Footer")).not.toBeNull();
 });

 it("applies custom className", () => {
  const { container } = render(<Card className="custom-class">Custom</Card>);
  const card = container.firstChild as HTMLElement;
  expect(card.className).toContain("custom-class");
 });

 it("renders with hover effect when hover is true", () => {
  const { container } = render(<Card hover>Hover Card</Card>);
  const card = container.firstChild as HTMLElement;
  expect(card.className).toContain("hover:");
 });

 it("renders as interactive when interactive is true", () => {
  const { container } = render(<Card interactive>Interactive</Card>);
  const card = container.firstChild as HTMLElement;
  expect(card.className).toContain("cursor-pointer");
 });
});

describe("CardHeader", () => {
 it("renders children", () => {
  render(
   <Card>
    <CardHeader>Header Content</CardHeader>
   </Card>
  );
  expect(screen.getByText("Header Content")).not.toBeNull();
 });
});

describe("CardTitle", () => {
 it("renders as h3 element", () => {
  const { container } = render(
   <Card>
    <CardTitle>Title</CardTitle>
   </Card>
  );
  const title = container.querySelector("h3");
  expect(title).not.toBeNull();
  expect(title?.textContent).toBe("Title");
 });
});

describe("CardDescription", () => {
 it("renders as p element", () => {
  const { container } = render(
   <Card>
    <CardDescription>Description</CardDescription>
   </Card>
  );
  const desc = container.querySelector("p");
  expect(desc).not.toBeNull();
  expect(desc?.textContent).toBe("Description");
 });
});

describe("CardContent", () => {
 it("renders children", () => {
  render(
   <Card>
    <CardContent>Content</CardContent>
   </Card>
  );
  expect(screen.getByText("Content")).not.toBeNull();
 });
});

describe("CardFooter", () => {
 it("renders children", () => {
  render(
   <Card>
    <CardFooter>Footer</CardFooter>
   </Card>
  );
  expect(screen.getByText("Footer")).not.toBeNull();
 });
});
