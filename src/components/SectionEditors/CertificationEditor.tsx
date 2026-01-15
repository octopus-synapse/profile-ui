"use client";

import { forwardRef, useId } from "react";
import { cn } from "../../utils/cn";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Input } from "../Input";
import { Field, type WithId } from "./types";
import {
 BaseSectionListEditor,
 SectionItemCard,
 type BaseSectionListEditorProps,
} from "./BaseSectionEditor";

// ============================================================================
// Certification Types
// ============================================================================

export interface CertificationItem extends WithId {
 name: string;
 issuer: string;
 issueDate: string;
 expirationDate?: string;
 credentialId?: string;
 credentialUrl?: string;
}

// ============================================================================
// Certification Form
// ============================================================================

interface CertificationFormProps {
 certification: CertificationItem | null;
 onSave: (cert: CertificationItem | Omit<CertificationItem, "id">) => void;
 onCancel: () => void;
 isLoading?: boolean;
}

const CertificationForm = forwardRef<HTMLFormElement, CertificationFormProps>(
 ({ certification, onSave, onCancel, isLoading }, ref) => {
  const formId = useId();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   const formData = new FormData(e.currentTarget);

   const data: CertificationItem | Omit<CertificationItem, "id"> = {
    ...(certification?.id ? { id: certification.id } : {}),
    name: formData.get("name") as string,
    issuer: formData.get("issuer") as string,
    issueDate: formData.get("issueDate") as string,
    expirationDate: (formData.get("expirationDate") as string) || undefined,
    credentialId: (formData.get("credentialId") as string) || undefined,
    credentialUrl: (formData.get("credentialUrl") as string) || undefined,
   };

   onSave(data as CertificationItem);
  };

  return (
   <form ref={ref} id={formId} onSubmit={handleSubmit} className="space-y-4">
    <Field label="Certification Name" htmlFor={`${formId}-name`} required>
     <Input
      id={`${formId}-name`}
      name="name"
      defaultValue={certification?.name}
      placeholder="AWS Solutions Architect"
      required
      disabled={isLoading}
     />
    </Field>

    <Field label="Issuing Organization" htmlFor={`${formId}-issuer`} required>
     <Input
      id={`${formId}-issuer`}
      name="issuer"
      defaultValue={certification?.issuer}
      placeholder="Amazon Web Services"
      required
      disabled={isLoading}
     />
    </Field>

    <div className="grid gap-4 sm:grid-cols-2">
     <Field label="Issue Date" htmlFor={`${formId}-issueDate`} required>
      <Input
       id={`${formId}-issueDate`}
       name="issueDate"
       type="month"
       defaultValue={certification?.issueDate}
       required
       disabled={isLoading}
      />
     </Field>

     <Field label="Expiration Date" htmlFor={`${formId}-expirationDate`}>
      <Input
       id={`${formId}-expirationDate`}
       name="expirationDate"
       type="month"
       defaultValue={certification?.expirationDate}
       disabled={isLoading}
      />
     </Field>
    </div>

    <div className="grid gap-4 sm:grid-cols-2">
     <Field label="Credential ID" htmlFor={`${formId}-credentialId`}>
      <Input
       id={`${formId}-credentialId`}
       name="credentialId"
       defaultValue={certification?.credentialId}
       placeholder="ABC123XYZ"
       disabled={isLoading}
      />
     </Field>

     <Field label="Credential URL" htmlFor={`${formId}-credentialUrl`}>
      <Input
       id={`${formId}-credentialUrl`}
       name="credentialUrl"
       type="url"
       defaultValue={certification?.credentialUrl}
       placeholder="https://..."
       disabled={isLoading}
      />
     </Field>
    </div>

    <div className="flex justify-end gap-2">
     <Button
      type="button"
      variant="ghost"
      onClick={onCancel}
      disabled={isLoading}
     >
      Cancel
     </Button>
     <Button type="submit" disabled={isLoading}>
      {certification ? "Update" : "Add"} Certification
     </Button>
    </div>
   </form>
  );
 }
);
CertificationForm.displayName = "CertificationForm";

// ============================================================================
// Certification Editor
// ============================================================================

export interface CertificationEditorProps
 extends Omit<
  BaseSectionListEditorProps<CertificationItem>,
  "renderItem" | "renderForm" | "title" | "addLabel"
 > {
 title?: string;
}

function isExpired(expirationDate?: string): boolean {
 if (!expirationDate) return false;
 return new Date(expirationDate) < new Date();
}

function formatDate(date: string): string {
 return new Date(date).toLocaleDateString("en-US", {
  month: "short",
  year: "numeric",
 });
}

export const CertificationEditor = forwardRef<
 HTMLDivElement,
 CertificationEditorProps
>(({ title = "Certifications", ...props }, ref) => {
 return (
  <div ref={ref}>
   <BaseSectionListEditor<CertificationItem>
    {...props}
    title={title}
    addLabel="Add Certification"
    emptyMessage="No certifications added yet. Add your professional certifications."
    renderItem={(item, handlers) => (
     <SectionItemCard
      title={item.name}
      subtitle={item.issuer}
      period={`Issued ${formatDate(item.issueDate)}${
       item.expirationDate
        ? ` • Expires ${formatDate(item.expirationDate)}`
        : ""
      }`}
      onEdit={handlers.onEdit}
      onDelete={handlers.onDelete}
      isLoading={props.isLoading}
     >
      <div className="flex items-center gap-2">
       {isExpired(item.expirationDate) && (
        <Badge variant="destructive" className="text-xs">
         Expired
        </Badge>
       )}
       {item.credentialId && (
        <span className="text-xs text-[var(--text-tertiary)]">
         ID: {item.credentialId}
        </span>
       )}
      </div>
     </SectionItemCard>
    )}
    renderForm={(item, onSave, onCancel) => (
     <CertificationForm
      certification={item}
      onSave={onSave}
      onCancel={onCancel}
      isLoading={props.isLoading}
     />
    )}
   />
  </div>
 );
});
CertificationEditor.displayName = "CertificationEditor";

export { CertificationForm };
