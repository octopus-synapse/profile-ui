/**
 * Modal - Web Implementation
 * @layer Infrastructure (Web)
 */

"use client";

import { forwardRef, useEffect, type HTMLAttributes } from "react";
import {
 useModal,
 type ModalProps,
 type ModalHeaderProps,
 type ModalFooterProps,
 modalTokens,
} from "../../shared/Modal";
import { cn } from "../../utils/cn";

// ─── Modal Root ──────────────────────────────────────────────────────────────

export interface WebModalProps
 extends ModalProps,
  Omit<HTMLAttributes<HTMLDivElement>, keyof ModalProps> {}

export const Modal = forwardRef<HTMLDivElement, WebModalProps>(
 ({ className, children, testID, onClose, ...props }, ref) => {
  const { open, sizeToken, closeOnOverlayClick } = useModal({
   ...props,
   onClose,
   children,
  });

  useEffect(() => {
   if (open) {
    document.body.style.overflow = "hidden";
    return () => {
     document.body.style.overflow = "";
    };
   }
  }, [open]);

  if (!open) return null;

  return (
   <div
    ref={ref}
    data-testid={testID}
    className="fixed inset-0 z-50 flex items-center justify-center"
    style={{ backgroundColor: modalTokens.overlay.background }}
    onClick={closeOnOverlayClick ? onClose : undefined}
   >
    <div
     className={cn(
      "relative w-full animate-in fade-in-0 zoom-in-95",
      className
     )}
     style={{
      maxWidth: sizeToken.maxWidth,
      padding: sizeToken.padding,
      margin: 16,
      backgroundColor: modalTokens.content.background,
      borderRadius: modalTokens.content.radius,
      border: `1px solid ${modalTokens.content.border}`,
     }}
     onClick={(e) => e.stopPropagation()}
    >
     {children}
    </div>
   </div>
  );
 }
);

Modal.displayName = "Modal";

// ─── Modal Header ────────────────────────────────────────────────────────────

export function ModalHeader({ children }: ModalHeaderProps) {
 return (
  <div className="mb-4">
   <h2
    style={{
     fontSize: modalTokens.title.fontSize,
     color: modalTokens.title.color,
     fontWeight: 600,
    }}
   >
    {children}
   </h2>
  </div>
 );
}

// ─── Modal Footer ────────────────────────────────────────────────────────────

export function ModalFooter({ children }: ModalFooterProps) {
 return <div className="mt-6 flex justify-end gap-3">{children}</div>;
}
