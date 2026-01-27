

"use client";

import { forwardRef, useEffect, type HTMLAttributes } from "react";
import {
 useModal,
 type ModalProps,
 type ModalHeaderProps,
 type ModalFooterProps,
 modalTokens,
} from "../../shared/modal";
import { cn } from "../../utils/cn";



export interface WebModalProps
 extends ModalProps,
  Omit<HTMLAttributes<HTMLDivElement>, keyof ModalProps> {}

export const Modal = forwardRef<HTMLDivElement, WebModalProps>(
 ({ className, children, testID, onClose, closeOnOverlayClick = true, ...props }, ref) => {
  const { viewModel, handleClose } = useModal({
   ...props,
   onClose,
   closeOnBackdropClick: closeOnOverlayClick,
  });

  useEffect(() => {
   document.body.style.overflow = viewModel.open ? "hidden" : "";
   return () => {
    document.body.style.overflow = "";
   };
  }, [viewModel.open]);

  if (!viewModel.open) return null;

  return (
   <div
    ref={ref}
    data-testid={testID}
    className="fixed inset-0 z-50 flex items-center justify-center"
    style={{ backgroundColor: viewModel.styles.overlayBackground }}
    onClick={viewModel.canDismissViaBackdrop ? handleClose : undefined}
   >
    <div
     className={cn(
      "relative w-full animate-in fade-in-0 zoom-in-95",
      className
     )}
     style={{
      maxWidth: viewModel.styles.maxWidth,
      padding: viewModel.styles.padding,
      margin: 16,
      backgroundColor: viewModel.styles.backgroundColor,
      borderRadius: viewModel.styles.borderRadius,
      border: `1px solid ${viewModel.styles.borderColor}`,
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



export function ModalFooter({ children }: ModalFooterProps) {
 return <div className="mt-6 flex justify-end gap-3">{children}</div>;
}
