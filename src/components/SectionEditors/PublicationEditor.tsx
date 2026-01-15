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
// Publication Types
// ============================================================================

export type PublicationType = "article" | "book" | "paper" | "blog" | "other";

export interface PublicationItem extends WithId {
 title: string;
 publisher?: string;
 date: string;
 type?: PublicationType;
 url?: string;
 doi?: string;
 authors?: string[];
 description?: string;
}

const publicationTypeLabels: Record<PublicationType, string> = {
 article: "Article",
 book: "Book",
 paper: "Paper",
 blog: "Blog Post",
 other: "Other",
};

// ============================================================================
// Publication Form
// ============================================================================

interface PublicationFormProps {
 publication: PublicationItem | null;
 onSave: (pub: PublicationItem | Omit<PublicationItem, "id">) => void;
 onCancel: () => void;
 isLoading?: boolean;
}

const PublicationForm = forwardRef<HTMLFormElement, PublicationFormProps>(
 ({ publication, onSave, onCancel, isLoading }, ref) => {
  const formId = useId();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   const formData = new FormData(e.currentTarget);

   const authorsStr = formData.get("authors") as string;
   const authors = authorsStr
    ? authorsStr
       .split(",")
       .map((a) => a.trim())
       .filter(Boolean)
    : undefined;

   const data: PublicationItem | Omit<PublicationItem, "id"> = {
    ...(publication?.id ? { id: publication.id } : {}),
    title: formData.get("title") as string,
    publisher: (formData.get("publisher") as string) || undefined,
    date: formData.get("date") as string,
    type: (formData.get("type") as PublicationType) || undefined,
    url: (formData.get("url") as string) || undefined,
    doi: (formData.get("doi") as string) || undefined,
    authors,
    description: (formData.get("description") as string) || undefined,
   };

   onSave(data as PublicationItem);
  };

  return (
   <form ref={ref} id={formId} onSubmit={handleSubmit} className="space-y-4">
    <Field label="Title" htmlFor={`${formId}-title`} required>
     <Input
      id={`${formId}-title`}
      name="title"
      defaultValue={publication?.title}
      placeholder="Publication title"
      required
      disabled={isLoading}
     />
    </Field>

    <div className="grid gap-4 sm:grid-cols-2">
     <Field label="Publisher" htmlFor={`${formId}-publisher`}>
      <Input
       id={`${formId}-publisher`}
       name="publisher"
       defaultValue={publication?.publisher}
       placeholder="Journal / Publisher name"
       disabled={isLoading}
      />
     </Field>

     <Field label="Type" htmlFor={`${formId}-type`}>
      <select
       id={`${formId}-type`}
       name="type"
       defaultValue={publication?.type || ""}
       disabled={isLoading}
       className={cn(
        "w-full rounded-md border border-[var(--border-primary)]",
        "bg-[var(--surface-primary)] px-3 py-2",
        "text-sm text-[var(--text-primary)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]"
       )}
      >
       <option value="">Select type</option>
       {Object.entries(publicationTypeLabels).map(([value, label]) => (
        <option key={value} value={value}>
         {label}
        </option>
       ))}
      </select>
     </Field>
    </div>

    <div className="grid gap-4 sm:grid-cols-2">
     <Field label="Date" htmlFor={`${formId}-date`} required>
      <Input
       id={`${formId}-date`}
       name="date"
       type="month"
       defaultValue={publication?.date}
       required
       disabled={isLoading}
      />
     </Field>

     <Field label="DOI" htmlFor={`${formId}-doi`}>
      <Input
       id={`${formId}-doi`}
       name="doi"
       defaultValue={publication?.doi}
       placeholder="10.1000/xyz123"
       disabled={isLoading}
      />
     </Field>
    </div>

    <Field label="Authors" htmlFor={`${formId}-authors`}>
     <Input
      id={`${formId}-authors`}
      name="authors"
      defaultValue={publication?.authors?.join(", ")}
      placeholder="John Doe, Jane Smith..."
      disabled={isLoading}
     />
    </Field>

    <Field label="URL" htmlFor={`${formId}-url`}>
     <Input
      id={`${formId}-url`}
      name="url"
      type="url"
      defaultValue={publication?.url}
      placeholder="https://..."
      disabled={isLoading}
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
      {publication ? "Update" : "Add"} Publication
     </Button>
    </div>
   </form>
  );
 }
);
PublicationForm.displayName = "PublicationForm";

// ============================================================================
// Publication Editor
// ============================================================================

export interface PublicationEditorProps
 extends Omit<
  BaseSectionListEditorProps<PublicationItem>,
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

export const PublicationEditor = forwardRef<
 HTMLDivElement,
 PublicationEditorProps
>(({ title = "Publications", ...props }, ref) => {
 return (
  <div ref={ref}>
   <BaseSectionListEditor<PublicationItem>
    {...props}
    title={title}
    addLabel="Add Publication"
    emptyMessage="No publications added yet. Share your published work."
    renderItem={(item, handlers) => (
     <SectionItemCard
      title={item.title}
      subtitle={item.publisher}
      period={formatDate(item.date)}
      onEdit={handlers.onEdit}
      onDelete={handlers.onDelete}
      isLoading={props.isLoading}
     >
      {item.type && (
       <Badge variant="outline" className="text-xs">
        {publicationTypeLabels[item.type]}
       </Badge>
      )}
     </SectionItemCard>
    )}
    renderForm={(item, onSave, onCancel) => (
     <PublicationForm
      publication={item}
      onSave={onSave}
      onCancel={onCancel}
      isLoading={props.isLoading}
     />
    )}
   />
  </div>
 );
});
PublicationEditor.displayName = "PublicationEditor";

export { PublicationForm, publicationTypeLabels };
