/**
 * Integration Tests for Modal Interactions
 * Tests modal opening, closing, and user interactions
 */

import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { useState } from "react";
import { Modal, ModalHeader, ModalFooter } from "../../web/modal";
import { Button } from "../../web/button";

// Helper component for testing controlled modal
function TestModal({ initialOpen = false }: { initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen);

  return (
    <>
      <Button onPress={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader>Test Modal</ModalHeader>
        <div>Modal Content</div>
        <ModalFooter>
          <Button onPress={() => setOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

describe("Modal Integration Tests", () => {
  const originalOverflow = document.body.style.overflow;

  beforeEach(() => {
    // Reset any mocks or state
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.body.style.overflow = originalOverflow;
    cleanup();
  });

  it("should open modal when button is clicked", async () => {
    render(<TestModal />);

    expect(screen.queryByText("Modal Content")).toBeNull();

    const openButton = screen.getByText("Open Modal");
    fireEvent.click(openButton);

    await waitFor(() => {
      expect(screen.getByText("Modal Content")).toBeDefined();
    });
  });

  it("should close modal when close button is clicked", async () => {
    render(<TestModal initialOpen={true} />);

    expect(screen.getByText("Modal Content")).toBeDefined();

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    await waitFor(() => {
      // Modal should be closed (not rendered)
      expect(screen.queryByText("Modal Content")).toBeNull();
    }, { timeout: 1000 });
  });

  it("should close modal when overlay is clicked", () => {
    const handleClose = () => {
      let called = false;
      return {
        fn: () => {
          called = true;
        },
        wasCalled: () => called,
      };
    };

    const mock = handleClose();

    const { container } = render(
      <Modal open={true} onClose={mock.fn}>
        <div>Modal Content</div>
      </Modal>
    );

    // Find the overlay (the outer div with fixed positioning)
    const overlay = container.querySelector("div[class*='fixed']");
    if (overlay) {
      fireEvent.click(overlay);
    }

    expect(mock.wasCalled()).toBe(true);
  });

  it("should not close modal when content is clicked", () => {
    let closeCalled = false;
    const handleClose = () => {
      closeCalled = true;
    };

    const { container } = render(
      <Modal open={true} onClose={handleClose}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );

    // Find the modal content div (inside the modal dialog, not the overlay)
    const content = container.querySelector('[data-testid="modal-content"]');
    if (content) {
      fireEvent.click(content);
    }

    // Content click should not trigger onClose (stopPropagation is called)
    expect(closeCalled).toBe(false);
  });

  it("should handle multiple modals", () => {
    render(
      <>
        <Modal open={true} testID="modal1">
          <div>Modal 1</div>
        </Modal>
        <Modal open={true} testID="modal2">
          <div>Modal 2</div>
        </Modal>
      </>
    );

    expect(screen.getByText("Modal 1")).toBeDefined();
    expect(screen.getByText("Modal 2")).toBeDefined();
  });
});
