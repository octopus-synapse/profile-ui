import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { Button } from "../../src/web/button/button.component.web";
import { Box } from "../../src/primitives/box/box.component.web";
import { Text } from "../../src/primitives/text/text.component.web";

/**
 * Smoke Tests - Critical Path Verification
 *
 * These tests verify that the most critical components can:
 * 1. Import without errors
 * 2. Render without crashing
 * 3. Accept basic props
 *
 * Run with: bun test --config=bunfig.smoke.toml
 */
describe("Profile UI - Smoke Tests", () => {
 describe("Primitives", () => {
  it("Box renders without crashing", () => {
   const { container } = render(<Box>Content</Box>);
   expect(container.firstChild).toBeDefined();
  });

  it("Text renders without crashing", () => {
   const { container } = render(<Text>Content</Text>);
   expect(container.firstChild).toBeDefined();
  });
 });

 describe("Components", () => {
  it("Button renders without crashing", () => {
   const { container } = render(<Button>Click me</Button>);
   expect(container.firstChild).toBeDefined();
  });

  it("Button accepts variant prop", () => {
   const { getByText } = render(<Button variant="primary">Click</Button>);
   expect(getByText("Click")).toBeDefined();
  });
 });

 describe("Build Artifacts", () => {
  it("Components are importable", () => {
   expect(Button).toBeDefined();
   expect(Box).toBeDefined();
   expect(Text).toBeDefined();
  });
 });
});
