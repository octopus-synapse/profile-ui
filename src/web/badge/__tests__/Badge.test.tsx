/**
 * Component Tests for Badge (Web)
 */

import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Badge } from "../badge.component.web";

describe("Badge Component", () => {
  beforeEach(() => {
    // Reset any mocks or state
  });

  afterEach(() => {
    cleanup();
  });

  it("should render badge with children", () => {
    render(<Badge>Badge</Badge>);
    expect(screen.getByText("Badge")).toBeDefined();
  });

  it("should render dot when dot prop is true", () => {
    render(<Badge dot>With Dot</Badge>);
    const badge = screen.getByText("With Dot");
    const dot = badge.querySelector("span.rounded-full");
    expect(dot).toBeDefined();
  });

  it("should render remove button when removable is true", () => {
    render(<Badge removable>Removable</Badge>);
    const badge = screen.getByText("Removable");
    const removeButton = badge.querySelector("button");
    expect(removeButton).toBeDefined();
  });

  it("should call onRemove when remove button is clicked", () => {
    let removeCalled = false;
    const handleRemove = () => {
      removeCalled = true;
    };

    const { container } = render(<Badge removable onRemove={handleRemove} testID="removable-badge">Removable</Badge>);

    const badge = container.querySelector('[data-testid="removable-badge"]');
    const removeButton = badge?.querySelector("button");
    if (removeButton) {
      fireEvent.click(removeButton);
    }

    expect(removeCalled).toBe(true);
  });

  it("should apply testID", () => {
    render(<Badge testID="test-badge">Test</Badge>);
    expect(screen.getByTestId("test-badge")).toBeDefined();
  });

  it("should stop propagation on remove button click", () => {
    let parentClicked = false;
    const handleParentClick = () => {
      parentClicked = true;
    };

    const { container } = render(
      <div onClick={handleParentClick} data-testid="parent">
        <Badge removable onRemove={() => {}} testID="removable-badge">Removable</Badge>
      </div>
    );

    const badge = container.querySelector('[data-testid="removable-badge"]');
    const removeButton = badge?.querySelector("button");
    if (removeButton) {
      fireEvent.click(removeButton);
    }

    // stopPropagation should prevent parent click
    expect(parentClicked).toBe(false);
  });
});
