/**
 * Component Tests for Modal (Web)
 */

import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal, ModalHeader, ModalFooter } from "../Modal.web";

describe("Modal Component", () => {
  const originalOverflow = document.body.style.overflow;

  beforeEach(() => {
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.body.style.overflow = originalOverflow;
  });

  it("should not render when open is false", () => {
    render(
      <Modal open={false}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.queryByText("Modal Content")).toBeNull();
  });

  it("should render when open is true", () => {
    render(
      <Modal open={true}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText("Modal Content")).toBeDefined();
  });

  it("should call onClose when overlay is clicked and closeOnOverlayClick is true", () => {
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
      <Modal open={true} onClose={mock.fn} closeOnOverlayClick={true}>
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

  it("should not call onClose when overlay is clicked and closeOnOverlayClick is false", () => {
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
      <Modal open={true} onClose={mock.fn} closeOnOverlayClick={false}>
        <div>Modal Content</div>
      </Modal>
    );

    // Find the overlay (the outer div with fixed positioning)
    const overlay = container.querySelector("div[class*='fixed']");
    if (overlay) {
      fireEvent.click(overlay);
    }

    expect(mock.wasCalled()).toBe(false);
  });

  it("should not call onClose when modal content is clicked", () => {
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

  it("should set body overflow to hidden when open", () => {
    render(
      <Modal open={true}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("should restore body overflow when closed", () => {
    const { rerender } = render(
      <Modal open={true}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Modal open={false}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(document.body.style.overflow).toBe("");
  });

  it("should render ModalHeader", () => {
    render(
      <Modal open={true}>
        <ModalHeader>Header</ModalHeader>
      </Modal>
    );
    expect(screen.getByText("Header")).toBeDefined();
  });

  it("should render ModalFooter", () => {
    render(
      <Modal open={true}>
        <ModalFooter>Footer</ModalFooter>
      </Modal>
    );
    expect(screen.getByText("Footer")).toBeDefined();
  });

  it("should apply testID", () => {
    render(
      <Modal open={true} testID="test-modal">
        <div>Content</div>
      </Modal>
    );
    expect(screen.getByTestId("test-modal")).toBeDefined();
  });
});
