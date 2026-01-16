/**
 * Smoke Tests for Component Rendering
 * Tests that all components can render without errors
 */

import { describe, it, expect, afterEach } from "bun:test";
import { render, cleanup } from "@testing-library/react";
import { Button } from "../../web/Button/Button.web";
import { Input } from "../../web/Input/Input.web";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../web/Card/Card.web";
import { Badge } from "../../web/Badge/Badge.web";
import { Modal, ModalHeader, ModalFooter } from "../../web/Modal/Modal.web";
import { Checkbox } from "../../web/Checkbox/Checkbox.web";
import { Form, FormField, FormLabel, FormActions } from "../../web/Form/Form.web";

describe("Smoke Tests - Component Rendering", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render Button without errors", () => {
    expect(() => render(<Button>Test</Button>)).not.toThrow();
  });

  it("should render Input without errors", () => {
    expect(() => render(<Input />)).not.toThrow();
  });

  it("should render Card without errors", () => {
    expect(() => render(<Card>Test</Card>)).not.toThrow();
  });

  it("should render Card with all subcomponents", () => {
    expect(() =>
      render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent>Content</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      )
    ).not.toThrow();
  });

  it("should render Badge without errors", () => {
    expect(() => render(<Badge>Test</Badge>)).not.toThrow();
  });

  it("should render Modal without errors", () => {
    expect(() =>
      render(
        <Modal open={true}>
          <ModalHeader>Header</ModalHeader>
          <div>Content</div>
          <ModalFooter>Footer</ModalFooter>
        </Modal>
      )
    ).not.toThrow();
  });

  it("should render Checkbox without errors", () => {
    expect(() => render(<Checkbox label="Test" />)).not.toThrow();
  });

  it("should render Form without errors", () => {
    expect(() =>
      render(
        <Form onSubmit={() => {}}>
          <FormField name="test">
            <FormLabel htmlFor="test">Test</FormLabel>
            <Input id="test" />
          </FormField>
          <FormActions>
            <Button>Submit</Button>
          </FormActions>
        </Form>
      )
    ).not.toThrow();
  });

  it("should render Button with all variants", () => {
    const variants = ["primary", "secondary", "accent", "ghost", "danger"] as const;
    variants.forEach((variant) => {
      expect(() => render(<Button variant={variant}>Test</Button>)).not.toThrow();
    });
  });

  it("should render Button with all sizes", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    sizes.forEach((size) => {
      expect(() => render(<Button size={size}>Test</Button>)).not.toThrow();
    });
  });

  it("should render Input with all states", () => {
    const states = ["default", "error", "success"] as const;
    states.forEach((state) => {
      expect(() => render(<Input state={state} />)).not.toThrow();
    });
  });

  it("should render Input with all sizes", () => {
    const sizes = ["sm", "md", "lg"] as const;
    sizes.forEach((size) => {
      expect(() => render(<Input inputSize={size} />)).not.toThrow();
    });
  });

  it("should render Badge with all variants", () => {
    const variants = ["default", "secondary", "primary", "outline", "success", "error", "warning", "info"] as const;
    variants.forEach((variant) => {
      expect(() => render(<Badge variant={variant}>Test</Badge>)).not.toThrow();
    });
  });

  it("should render Modal with all sizes", () => {
    const sizes = ["sm", "md", "lg", "xl", "full"] as const;
    sizes.forEach((size) => {
      expect(() =>
        render(
          <Modal open={true} size={size}>
            <div>Content</div>
          </Modal>
        )
      ).not.toThrow();
    });
  });
});
