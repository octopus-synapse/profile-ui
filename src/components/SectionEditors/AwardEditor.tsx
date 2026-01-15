"use client";

import { forwardRef, useId } from "react";
import { cn } from "../../utils/cn";
import { Button } from "../Button";
import { Input } from "../Input";
import { Field, type WithId } from "./types";
import {
 BaseSectionListEditor,
 SectionItemCard,
 type BaseSectionListEditorProps,
} from "./BaseSectionEditor";

// ============================================================================
// Award Types
// ============================================================================

export interface AwardItem extends WithId {
 title: string;
 issuer: string;
 date: string;
 description?: string;
 url?: string;
}

// ============================================================================
// Award Form
// ============================================================================

interface AwardFormProps {
 award: AwardItem | null;
 onSave: (award: AwardItem | Omit<AwardItem, "id">) => void;
 onCancel: () => void;
 isLoading?: boolean;
}

const AwardForm = forwardRef<HTMLFormElement, AwardFormProps>(
 ({ award, onSave, onCancel, isLoading }, ref) => {
  const formId = useId();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   const formData = new FormData(e.currentTarget);

   const data: AwardItem | Omit<AwardItem, "id"> = {
    ...(award?.id ? { id: award.id } : {}),
    title: formData.get("title") as string,
    issuer: formData.get("issuer") as string,
    date: formData.get("date") as string,
    description: (formData.get("description") as string) || undefined,
    url: (formData.get("url") as string) || undefined,
   };

   onSave(data as AwardItem);
  };

  return (
   <form ref={ref} id={formId} onSubmit={handleSubmit} className="space-y-4">
    <Field label="Award Title" htmlFor={`${formId}-title`} required>
     <Input
      id={`${formId}-title`}
      name="title"
      defaultValue={award?.title}
      placeholder="Employee of the Year"
      required
      disabled={isLoading}
     />
    </Field>

    <div className="grid gap-4 sm:grid-cols-2">
     <Field label="Issuing Organization" htmlFor={`${formId}-issuer`} required>
      <Input
       id={`${formId}-issuer`}
       name="issuer"
       defaultValue={award?.issuer}
       placeholder="Company Name"
       required
       disabled={isLoading}
      />
     </Field>

     <Field label="Date" htmlFor={`${formId}-date`} required>
      <Input
       id={`${formId}-date`}
       name="date"
       type="month"
       defaultValue={award?.date}
       required
       disabled={isLoading}
      />
     </Field>
    </div>

    <Field label="Description" htmlFor={`${formId}-description`}>
     <textarea
      id={`${formId}-description`}
      name="description"
      defaultValue={award?.description}
      placeholder="What was this award for?"
      rows={2}
      disabled={isLoading}
      className={cn(
       "w-full rounded-md border border-[var(--border-primary)]",
       "bg-[var(--surface-primary)] px-3 py-2",
       "text-sm text-[var(--text-primary)]",
       "placeholder:text-[var(--text-tertiary)]",
       "focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]"
      )}
     />
    </Field>

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
      {award ? "Update" : "Add"} Award
     </Button>
    </div>
   </form>
  );
 }
);
AwardForm.displayName = "AwardForm";

// ============================================================================
// Award Editor
// ============================================================================

export interface AwardEditorProps
 extends Omit<
  BaseSectionListEditorProps<AwardItem>,
  "renderItem" | "renderForm" | "title" | "addLabel"
 > {
 title?: string;
}

function formatDate(date: string): string {
 return new Date(date).toLocaleDateString("en-US", {
  month: "short",
  year: "numeric",
 });
}

export const AwardEditor = forwardRef<HTMLDivElement, AwardEditorProps>(
 ({ title = "Awards & Honors", ...props }, ref) => {
  return (
   <div ref={ref}>
    <BaseSectionListEditor<AwardItem>
     {...props}
     title={title}
     addLabel="Add Award"
     emptyMessage="No awards added yet. Highlight your achievements."
     renderItem={(item, handlers) => (
      <SectionItemCard
       title={item.title}
       subtitle={item.issuer}
       period={formatDate(item.date)}
       onEdit={handlers.onEdit}
       onDelete={handlers.onDelete}
       isLoading={props.isLoading}
      />
     )}
     renderForm={(item, onSave, onCancel) => (
      <AwardForm
       award={item}
       onSave={onSave}
       onCancel={onCancel}
       isLoading={props.isLoading}
      />
     )}
    />
   </div>
  );
 }
);
AwardEditor.displayName = "AwardEditor";

export { AwardForm };
