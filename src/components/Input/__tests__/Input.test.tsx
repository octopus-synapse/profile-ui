import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../Input";

describe("Input", () => {
 it("renders correctly", () => {
  render(<Input placeholder="Enter text" />);
  expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
 });

 it("handles value changes", () => {
  const handleChange = jest.fn();
  render(<Input onChange={handleChange} />);

  fireEvent.change(screen.getByRole("textbox"), { target: { value: "test" } });
  expect(handleChange).toHaveBeenCalled();
 });

 it("displays error message", () => {
  render(<Input error="This field is required" />);
  expect(screen.getByText("This field is required")).toBeInTheDocument();
 });

 it("displays helper text", () => {
  render(<Input helperText="Enter your email" />);
  expect(screen.getByText("Enter your email")).toBeInTheDocument();
 });

 it("renders with left addon", () => {
  render(<Input leftAddon={<span data-testid="left-addon">@</span>} />);
  expect(screen.getByTestId("left-addon")).toBeInTheDocument();
 });

 it("renders with right addon", () => {
  render(<Input rightAddon={<span data-testid="right-addon">✓</span>} />);
  expect(screen.getByTestId("right-addon")).toBeInTheDocument();
 });

 it("is disabled when disabled prop is true", () => {
  render(<Input disabled />);
  expect(screen.getByRole("textbox")).toBeDisabled();
 });
});
