import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";

describe("Button", () => {
 it("renders children correctly", () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole("button")).toHaveTextContent("Click me");
 });

 it("handles click events", () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);

  fireEvent.click(screen.getByRole("button"));
  expect(handleClick).toHaveBeenCalledTimes(1);
 });

 it("is disabled when disabled prop is true", () => {
  render(<Button disabled>Disabled</Button>);
  expect(screen.getByRole("button")).toBeDisabled();
 });

 it("is disabled when isLoading is true", () => {
  render(<Button isLoading>Loading</Button>);
  expect(screen.getByRole("button")).toBeDisabled();
 });

 it("shows spinner when isLoading", () => {
  render(<Button isLoading>Loading</Button>);
  expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();
 });

 it("applies variant data attribute", () => {
  render(<Button variant="product">Product</Button>);
  expect(screen.getByRole("button")).toHaveAttribute("data-variant", "product");
 });

 it("renders with different intents", () => {
  const { rerender } = render(<Button intent="primary">Primary</Button>);
  expect(screen.getByRole("button")).toBeInTheDocument();

  rerender(<Button intent="secondary">Secondary</Button>);
  expect(screen.getByRole("button")).toBeInTheDocument();

  rerender(<Button intent="ghost">Ghost</Button>);
  expect(screen.getByRole("button")).toBeInTheDocument();
 });

 it("renders left and right icons", () => {
  render(
   <Button
    leftIcon={<span data-testid="left-icon">←</span>}
    rightIcon={<span data-testid="right-icon">→</span>}
   >
    With Icons
   </Button>
  );

  expect(screen.getByTestId("left-icon")).toBeInTheDocument();
  expect(screen.getByTestId("right-icon")).toBeInTheDocument();
 });
});
