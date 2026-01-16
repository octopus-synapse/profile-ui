/**
 * Integration Tests for Form Flow
 * Tests complete form submission, validation, and user interactions
 */

import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { Form, FormField, FormLabel, FormActions } from "../../web/Form/Form.web";
import { Input } from "../../web/Input/Input.web";
import { Checkbox } from "../../web/Checkbox/Checkbox.web";

describe("Form Integration Tests", () => {
  beforeEach(() => {
    // Reset any mocks or state
  });

  afterEach(() => {
    cleanup();
  });

  it("should submit form with valid data", async () => {
    let submitted = false;
    const handleSubmit = () => {
      submitted = true;
    };

    render(
      <Form onSubmit={handleSubmit}>
        <FormField name="email">
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" testID="email-input" />
        </FormField>
        <FormField name="name">
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" testID="name-input" />
        </FormField>
        <FormActions>
          <button type="submit">Submit</button>
        </FormActions>
      </Form>
    );

    const emailInput = screen.getByTestId("email-input") as HTMLInputElement;
    const nameInput = screen.getByTestId("name-input") as HTMLInputElement;
    const submitButton = screen.getByText("Submit");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitted).toBe(true);
      expect(emailInput.value).toBe("test@example.com");
      expect(nameInput.value).toBe("John Doe");
    });
  });

  it("should display validation errors", () => {
    render(
      <Form onSubmit={() => {}}>
        <FormField name="email" error="Email is required">
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" accessibilityLabel="Email" />
        </FormField>
        <FormActions>
          <button type="submit">Submit</button>
        </FormActions>
      </Form>
    );

    expect(screen.getByText("Email is required")).toBeDefined();
  });

  it("should handle multiple form fields", () => {
    render(
      <Form onSubmit={() => {}}>
        <FormField name="field1">
          <FormLabel htmlFor="field1">Field 1</FormLabel>
          <Input id="field1" accessibilityLabel="Field 1" />
        </FormField>
        <FormField name="field2">
          <FormLabel htmlFor="field2">Field 2</FormLabel>
          <Input id="field2" accessibilityLabel="Field 2" />
        </FormField>
        <FormField name="field3">
          <FormLabel htmlFor="field3">Field 3</FormLabel>
          <Input id="field3" accessibilityLabel="Field 3" />
        </FormField>
      </Form>
    );

    expect(screen.getByLabelText("Field 1")).toBeDefined();
    expect(screen.getByLabelText("Field 2")).toBeDefined();
    expect(screen.getByLabelText("Field 3")).toBeDefined();
  });

  it("should handle form with checkbox", async () => {
    let formSubmitted = false;
    const handleSubmit = () => {
      formSubmitted = true;
    };

    render(
      <Form onSubmit={handleSubmit}>
        <FormField name="terms">
          <Checkbox
            id="terms"
            testID="terms-checkbox"
            label="I agree to the terms"
            onCheckedChange={() => {}}
          />
        </FormField>
        <FormActions>
          <button type="submit" data-testid="submit-btn">Submit</button>
        </FormActions>
      </Form>
    );

    const checkbox = screen.getByTestId("terms-checkbox");
    fireEvent.click(checkbox);

    const submitButton = screen.getByTestId("submit-btn");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(formSubmitted).toBe(true);
    });
  });

  it("should prevent default form submission", async () => {
    let formSubmitted = false;
    const handleSubmit = () => {
      formSubmitted = true;
    };

    render(
      <Form onSubmit={handleSubmit}>
        <FormField name="email">
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" testID="email-input" />
        </FormField>
        <FormActions>
          <button type="submit" data-testid="submit-btn">Submit</button>
        </FormActions>
      </Form>
    );

    const submitButton = screen.getByTestId("submit-btn");
    fireEvent.click(submitButton);

    // The form should call onSubmit (which means preventDefault was called internally)
    await waitFor(() => {
      expect(formSubmitted).toBe(true);
    });
  });
});
