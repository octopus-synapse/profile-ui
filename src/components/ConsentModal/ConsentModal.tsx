"use client";

import { forwardRef, useState, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import {
 ModalOverlay,
 ModalContent,
 ModalHeader,
 ModalTitle,
 ModalDescription,
 ModalFooter,
} from "../Modal";
import { Button } from "../Button";
import { CheckboxWithLabel } from "../Checkbox";

// ============================================================================
// ConsentModal Types
// ============================================================================

export interface ConsentItem {
 id: string;
 type: "TERMS_OF_SERVICE" | "PRIVACY_POLICY" | "MARKETING_CONSENT";
 label: string;
 description?: string;
 required: boolean;
 link?: {
  text: string;
  href: string;
 };
}

export interface ConsentModalProps extends HTMLAttributes<HTMLDivElement> {
 /** Whether the modal is open */
 open: boolean;
 /** Callback when modal should close (only if all required consents accepted) */
 onClose?: () => void;
 /** Callback when consent is accepted */
 onAccept: (acceptedItems: ConsentItem[]) => void | Promise<void>;
 /** Title of the modal */
 title?: string;
 /** Description of the modal */
 description?: string;
 /** List of consent items to display */
 items: ConsentItem[];
 /** Loading state during submission */
 loading?: boolean;
 /** Error message to display */
 error?: string;
 /** Text for accept button */
 acceptButtonText?: string;
 /** Whether to allow closing without accepting (only if no required items) */
 allowSkip?: boolean;
 /** Text for skip button */
 skipButtonText?: string;
 /** Callback when skip is clicked */
 onSkip?: () => void;
}

// ============================================================================
// ConsentModal Component
// ============================================================================

export const ConsentModal = forwardRef<HTMLDivElement, ConsentModalProps>(
 (
  {
   className,
   open,
   onClose,
   onAccept,
   title = "Legal Agreements",
   description = "Please review and accept our legal agreements to continue.",
   items,
   loading = false,
   error,
   acceptButtonText = "Accept & Continue",
   allowSkip = false,
   skipButtonText = "Skip for now",
   onSkip,
   ...props
  },
  ref
 ) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const hasRequiredItems = items.some((item) => item.required);
  const allRequiredChecked = items
   .filter((item) => item.required)
   .every((item) => checkedItems.has(item.id));
  const canAccept = allRequiredChecked;
  const canClose = !hasRequiredItems || allRequiredChecked;

  const handleCheckChange = (itemId: string, checked: boolean) => {
   setCheckedItems((prev) => {
    const next = new Set(prev);
    if (checked) {
     next.add(itemId);
    } else {
     next.delete(itemId);
    }
    return next;
   });
  };

  const handleAccept = async () => {
   const acceptedItems = items.filter((item) => checkedItems.has(item.id));
   await onAccept(acceptedItems);
  };

  const handleOverlayClick = () => {
   if (canClose && onClose) {
    onClose();
   }
  };

  return (
   <div ref={ref} className={className} {...props}>
    <ModalOverlay
     state={open ? "open" : "closed"}
     onClose={handleOverlayClick}
    />
    <ModalContent state={open ? "open" : "closed"} size="lg">
     <ModalHeader>
      <div>
       <ModalTitle>{title}</ModalTitle>
       <ModalDescription className="mt-2">{description}</ModalDescription>
      </div>
     </ModalHeader>

     <div className="space-y-4 py-4">
      {items.map((item) => (
       <div
        key={item.id}
        className={cn(
         "rounded-lg border border-[var(--border)] p-4 transition-colors",
         checkedItems.has(item.id) &&
          "border-[var(--primary)] bg-[var(--primary)]/5"
        )}
       >
        <CheckboxWithLabel
         checked={checkedItems.has(item.id)}
         onCheckedChange={(checked) => handleCheckChange(item.id, checked)}
         label={
          <span className="flex items-center gap-2">
           {item.label}
           {item.required && (
            <span className="text-[var(--error)] text-xs">*required</span>
           )}
          </span>
         }
         description={
          <>
           {item.description}
           {item.link && (
            <a
             href={item.link.href}
             target="_blank"
             rel="noopener noreferrer"
             className="ml-1 text-[var(--primary)] hover:underline"
             onClick={(e) => e.stopPropagation()}
            >
             {item.link.text}
            </a>
           )}
          </>
         }
        />
       </div>
      ))}
     </div>

     {error && (
      <p className="text-sm text-[var(--error)] mb-4" role="alert">
       {error}
      </p>
     )}

     <ModalFooter>
      <div className="flex items-center justify-between w-full">
       <div>
        {allowSkip && !hasRequiredItems && onSkip && (
         <Button variant="ghost" onClick={onSkip} disabled={loading}>
          {skipButtonText}
         </Button>
        )}
       </div>
       <Button onClick={handleAccept} disabled={!canAccept || loading}>
        {loading ? "Processing..." : acceptButtonText}
       </Button>
      </div>
     </ModalFooter>
    </ModalContent>
   </div>
  );
 }
);
ConsentModal.displayName = "ConsentModal";

// ============================================================================
// Default Consent Items (convenience export)
// ============================================================================

export const defaultConsentItems: ConsentItem[] = [
 {
  id: "tos",
  type: "TERMS_OF_SERVICE",
  label: "Terms of Service",
  description: "I agree to the terms governing use of this service.",
  required: true,
  link: {
   text: "Read Terms of Service",
   href: "/legal/terms",
  },
 },
 {
  id: "privacy",
  type: "PRIVACY_POLICY",
  label: "Privacy Policy",
  description: "I acknowledge how my personal data will be processed.",
  required: true,
  link: {
   text: "Read Privacy Policy",
   href: "/legal/privacy",
  },
 },
 {
  id: "marketing",
  type: "MARKETING_CONSENT",
  label: "Marketing Communications",
  description: "I agree to receive promotional emails and updates.",
  required: false,
  link: {
   text: "Learn more",
   href: "/legal/marketing",
  },
 },
];
