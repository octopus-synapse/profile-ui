import { render, screen, fireEvent } from "@testing-library/react";
import { Badge } from "../Badge";

describe("Badge", () => {
 it("renders children correctly", () => {
  render(<Badge>Status</Badge>);
  expect(screen.getByText("Status")).toBeInTheDocument();
 });

 it("renders with dot indicator", () => {
  const { container } = render(<Badge dot>Online</Badge>);
  const dot = container.querySelector("span.rounded-full");
  expect(dot).toBeInTheDocument();
 });

 it("renders removable badge with X button", () => {
  const handleRemove = jest.fn();
  render(
   <Badge removable onRemove={handleRemove}>
    Removable
   </Badge>
  );

  const removeButton = screen.getByRole("button", { name: /remove/i });
  expect(removeButton).toBeInTheDocument();

  fireEvent.click(removeButton);
  expect(handleRemove).toHaveBeenCalledTimes(1);
 });

 it("applies variant data attribute", () => {
  const { container } = render(<Badge variant="design">Design</Badge>);
  expect(container.firstChild).toHaveAttribute("data-variant", "design");
 });

 it("applies different intents", () => {
  const { rerender, container } = render(
   <Badge intent="success">Success</Badge>
  );
  expect(container.firstChild).toHaveAttribute("data-intent", "success");

  rerender(<Badge intent="error">Error</Badge>);
  expect(container.firstChild).toHaveAttribute("data-intent", "error");
 });
});
