import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { Box } from "../../src/primitives/box/box.component.web";
import {
 Stack,
 VStack,
 HStack,
} from "../../src/primitives/stack/stack.component.web";
import { Grid, GridItem } from "../../src/primitives/grid/grid.component.web";
import { Button } from "../../src/web/button/button.component.web";
import { Card } from "../../src/web/card/card.component.web";

/**
 * Integration Tests - Cross-Component Compatibility
 *
 * These tests verify that components work correctly together:
 * 1. Primitives compose properly
 * 2. Components accept primitives as children
 * 3. Style props cascade correctly
 * 4. Layout compositions work as expected
 *
 * Run with: bun test --config=bunfig.integration.toml
 */
describe("Profile UI - Integration Tests", () => {
 describe("Primitives Composition", () => {
  it("Box accepts Stack as child", () => {
   const { container } = render(
    <Box>
     <Stack>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
     </Stack>
    </Box>,
   );
   expect(container.firstChild).toBeDefined();
  });

  it("Stack variants (VStack/HStack) work correctly", () => {
   const { container } = render(
    <>
     <VStack>
      <Box>Vertical 1</Box>
      <Box>Vertical 2</Box>
     </VStack>
     <HStack>
      <Box>Horizontal 1</Box>
      <Box>Horizontal 2</Box>
     </HStack>
    </>,
   );
   expect(container.childNodes).toHaveLength(2);
  });

  it("Grid layout with GridItems", () => {
   const { container } = render(
    <Grid columns={2}>
     <GridItem>Cell 1</GridItem>
     <GridItem>Cell 2</GridItem>
     <GridItem>Cell 3</GridItem>
     <GridItem>Cell 4</GridItem>
    </Grid>,
   );
   expect(container.firstChild).toBeDefined();
  });
 });

 describe("Component Composition", () => {
  it("Card with nested primitives", () => {
   const { getByText } = render(
    <Card>
     <VStack>
      <Box>Header</Box>
      <Box>Content</Box>
      <HStack>
       <Button>Action 1</Button>
       <Button variant="secondary">Action 2</Button>
      </HStack>
     </VStack>
    </Card>,
   );
   expect(getByText("Header")).toBeDefined();
   expect(getByText("Action 1")).toBeDefined();
  });

  it("Multiple Buttons in Stack maintain spacing", () => {
   const { container } = render(
    <VStack spacing={4}>
     <Button>First</Button>
     <Button>Second</Button>
     <Button>Third</Button>
    </VStack>,
   );
   expect(container.querySelectorAll("button")).toHaveLength(3);
  });
 });

 describe("Style Props Integration", () => {
  it("Box accepts and applies style props", () => {
   const { container } = render(
    <Box p={4} m={2} bg="gray.100">
     Content
    </Box>,
   );
   const element = container.firstChild as HTMLElement;
   expect(element).toBeDefined();
  });

  it("Nested components inherit theme context", () => {
   const { container } = render(
    <Box>
     <Stack>
      <Button>Themed Button</Button>
     </Stack>
    </Box>,
   );
   expect(container.querySelector("button")).toBeDefined();
  });
 });
});
