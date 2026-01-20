/**
 * Unit Tests for useModal Hook
 */

import { describe, it, expect } from "bun:test";
import { useModal } from "../modal.base";
import type { ModalProps } from "../modal.types";

describe("useModal", () => {
  const baseProps: ModalProps = {
    open: false,
    children: "Modal content",
  };

  it("should return default values when minimal props provided", () => {
    const result = useModal(baseProps);

    expect(result.open).toBe(false);
    expect(result.size).toBe("md");
    expect(result.closeOnOverlayClick).toBe(true);
  });

  it("should handle open prop", () => {
    const result = useModal({ ...baseProps, open: true });
    expect(result.open).toBe(true);
  });

  it("should handle size prop", () => {
    const sizes: Array<ModalProps["size"]> = ["sm", "md", "lg", "xl", "full"];

    sizes.forEach((size) => {
      const result = useModal({ ...baseProps, size });
      expect(result.size).toBe(size);
      expect(result.sizeToken).toBeDefined();
    });
  });

  it("should handle closeOnOverlayClick prop", () => {
    const result = useModal({ ...baseProps, closeOnOverlayClick: false });
    expect(result.closeOnOverlayClick).toBe(false);
  });
});
