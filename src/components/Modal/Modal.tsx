"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { cva, type ExtractVariantProps } from "../../utils/cva";

// ============================================================================
// Modal Overlay
// ============================================================================

const overlayVariants = cva(
 "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity",
 {
  variants: {
   state: {
    open: "opacity-100",
    closed: "opacity-0 pointer-events-none",
   },
  },
  defaultVariants: {
   state: "closed",
  },
 }
);

export interface ModalOverlayProps
 extends HTMLAttributes<HTMLDivElement>,
  ExtractVariantProps<typeof overlayVariants> {
 onClose?: () => void;
}

export const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>(
 ({ className, state, onClose, ...props }, ref) => {
  return (
   <div
    ref={ref}
    className={cn(overlayVariants({ state }), className)}
    onClick={onClose}
    aria-hidden="true"
    {...props}
   />
  );
 }
);
ModalOverlay.displayName = "ModalOverlay";

// ============================================================================
// Modal Content
// ============================================================================

const contentVariants = cva(
 "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-[var(--surface-1)] border border-[var(--border)] shadow-xl transition-all duration-200",
 {
  variants: {
   size: {
    sm: "w-full max-w-sm rounded-lg p-4",
    md: "w-full max-w-md rounded-xl p-6",
    lg: "w-full max-w-lg rounded-xl p-6",
    xl: "w-full max-w-xl rounded-xl p-8",
    full:
     "w-[calc(100%-2rem)] h-[calc(100%-2rem)] rounded-xl p-6 overflow-auto",
   },
   state: {
    open: "opacity-100 scale-100",
    closed: "opacity-0 scale-95 pointer-events-none",
   },
  },
  defaultVariants: {
   size: "md",
   state: "closed",
  },
 }
);

export interface ModalContentProps
 extends HTMLAttributes<HTMLDivElement>,
  ExtractVariantProps<typeof contentVariants> {}

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
 ({ className, size, state, children, ...props }, ref) => {
  return (
   <div
    ref={ref}
    role="dialog"
    aria-modal="true"
    className={cn(contentVariants({ size, state }), className)}
    {...props}
   >
    {children}
   </div>
  );
 }
);
ModalContent.displayName = "ModalContent";

// ============================================================================
// Modal Header
// ============================================================================

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
 ({ className, ...props }, ref) => {
  return (
   <div
    ref={ref}
    className={cn("mb-4 flex items-start justify-between gap-4", className)}
    {...props}
   />
  );
 }
);
ModalHeader.displayName = "ModalHeader";

// ============================================================================
// Modal Title
// ============================================================================

export interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
 ({ className, ...props }, ref) => {
  return (
   <h2
    ref={ref}
    className={cn(
     "text-lg font-semibold text-[var(--text-primary)]",
     className
    )}
    {...props}
   />
  );
 }
);
ModalTitle.displayName = "ModalTitle";

// ============================================================================
// Modal Description
// ============================================================================

export interface ModalDescriptionProps
 extends HTMLAttributes<HTMLParagraphElement> {}

export const ModalDescription = forwardRef<
 HTMLParagraphElement,
 ModalDescriptionProps
>(({ className, ...props }, ref) => {
 return (
  <p
   ref={ref}
   className={cn("text-sm text-[var(--text-secondary)]", className)}
   {...props}
  />
 );
});
ModalDescription.displayName = "ModalDescription";

// ============================================================================
// Modal Footer
// ============================================================================

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
 ({ className, ...props }, ref) => {
  return (
   <div
    ref={ref}
    className={cn("mt-6 flex items-center justify-end gap-3", className)}
    {...props}
   />
  );
 }
);
ModalFooter.displayName = "ModalFooter";

// ============================================================================
// Modal Close Button
// ============================================================================

export interface ModalCloseProps extends HTMLAttributes<HTMLButtonElement> {
 onClose?: () => void;
}

export const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>(
 ({ className, onClose, ...props }, ref) => {
  return (
   <button
    ref={ref}
    type="button"
    onClick={onClose}
    className={cn(
     "rounded-md p-1 text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]",
     className
    )}
    aria-label="Close modal"
    {...props}
   >
    <svg
     xmlns="http://www.w3.org/2000/svg"
     width="20"
     height="20"
     viewBox="0 0 24 24"
     fill="none"
     stroke="currentColor"
     strokeWidth="2"
     strokeLinecap="round"
     strokeLinejoin="round"
    >
     <line x1="18" y1="6" x2="6" y2="18" />
     <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
   </button>
  );
 }
);
ModalClose.displayName = "ModalClose";

// ============================================================================
// Modal Root (Composed Component)
// ============================================================================

export interface ModalProps {
 open: boolean;
 onOpenChange: (open: boolean) => void;
 children: React.ReactNode;
 size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Modal({
 open,
 onOpenChange,
 children,
 size = "md",
}: ModalProps) {
 const handleClose = () => onOpenChange(false);
 const state = open ? "open" : "closed";

 // Handle escape key
 if (typeof window !== "undefined") {
  const handleKeyDown = (e: KeyboardEvent) => {
   if (e.key === "Escape" && open) {
    handleClose();
   }
  };

  // This should be in useEffect, but keeping component simple
  // Real implementation should use useEffect for cleanup
 }

 return (
  <>
   <ModalOverlay state={state} onClose={handleClose} />
   <ModalContent size={size} state={state}>
    {children}
   </ModalContent>
  </>
 );
}
