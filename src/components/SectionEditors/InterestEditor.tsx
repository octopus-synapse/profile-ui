"use client";

import { forwardRef, useId, useState } from "react";
import { cn } from "../../utils/cn";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Input } from "../Input";
import { Field, type WithId } from "./types";
import { SectionEditorContainer } from "./BaseSectionEditor";

// ============================================================================
// Interest Types
// ============================================================================

export interface InterestItem extends WithId {
 name: string;
 category?: string;
}

const categoryColors: Record<string, string> = {
 sports: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
 music: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
 technology: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
 art: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
 travel:
  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
 reading:
  "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
 default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
};

// ============================================================================
// Interest Form
// ============================================================================

interface InterestFormProps {
 interest: InterestItem | null;
 onSave: (interest: InterestItem | Omit<InterestItem, "id">) => void;
 onCancel: () => void;
 isLoading?: boolean;
}

const InterestForm = forwardRef<HTMLFormElement, InterestFormProps>(
 ({ interest, onSave, onCancel, isLoading }, ref) => {
  const formId = useId();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   const formData = new FormData(e.currentTarget);

   const data: InterestItem | Omit<InterestItem, "id"> = {
    ...(interest?.id ? { id: interest.id } : {}),
    name: formData.get("name") as string,
    category: (formData.get("category") as string) || undefined,
   };

   onSave(data as InterestItem);
  };

  return (
   <form ref={ref} id={formId} onSubmit={handleSubmit} className="space-y-4">
    <div className="grid gap-4 sm:grid-cols-2">
     <Field label="Interest" htmlFor={`${formId}-name`} required>
      <Input
       id={`${formId}-name`}
       name="name"
       defaultValue={interest?.name}
       placeholder="Photography, Hiking..."
       required
       disabled={isLoading}
      />
     </Field>

     <Field label="Category" htmlFor={`${formId}-category`}>
      <Input
       id={`${formId}-category`}
       name="category"
       defaultValue={interest?.category}
       placeholder="Sports, Art, Technology..."
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
      {interest ? "Update" : "Add"} Interest
     </Button>
    </div>
   </form>
  );
 }
);
InterestForm.displayName = "InterestForm";

// ============================================================================
// Interest Editor
// ============================================================================

export interface InterestEditorProps {
 items: InterestItem[];
 onAdd: (item: Omit<InterestItem, "id">) => void;
 onUpdate: (id: string, item: Partial<InterestItem>) => void;
 onDelete: (id: string) => void;
 isLoading?: boolean;
 disabled?: boolean;
 title?: string;
 className?: string;
}

export const InterestEditor = forwardRef<HTMLDivElement, InterestEditorProps>(
 (
  {
   items,
   onAdd,
   onUpdate,
   onDelete,
   isLoading,
   disabled,
   title = "Interests",
   className,
  },
  ref
 ) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSave = (interest: InterestItem | Omit<InterestItem, "id">) => {
   if ("id" in interest && interest.id) {
    onUpdate(interest.id, interest);
    setEditingId(null);
   } else {
    onAdd(interest);
    setIsAdding(false);
   }
  };

  const editingItem = editingId
   ? items.find((i) => i.id === editingId) || null
   : null;

  return (
   <SectionEditorContainer
    ref={ref}
    title={title}
    onAdd={() => setIsAdding(true)}
    addLabel="Add Interest"
    isLoading={isLoading}
    disabled={disabled}
    className={className}
   >
    {(isAdding || editingItem) && (
     <div className="mb-4 p-4 rounded-lg bg-[var(--surface-secondary)]">
      <InterestForm
       interest={editingItem}
       onSave={handleSave}
       onCancel={() => {
        setIsAdding(false);
        setEditingId(null);
       }}
       isLoading={isLoading}
      />
     </div>
    )}

    {items.length === 0 && !isAdding ? (
     <p className="text-center py-8 text-[var(--text-tertiary)]">
      No interests added yet. Share your hobbies and passions.
     </p>
    ) : (
     <div className="flex flex-wrap gap-2">
      {items.map((item) => (
       <Badge
        key={item.id}
        className={cn(
         "px-3 py-1.5 cursor-pointer hover:opacity-80",
         categoryColors[item.category?.toLowerCase() || ""] ||
          categoryColors.default
        )}
        onClick={() => !disabled && !isLoading && setEditingId(item.id)}
       >
        {item.name}
        {!disabled && !isLoading && (
         <button
          type="button"
          onClick={(e) => {
           e.stopPropagation();
           onDelete(item.id);
          }}
          className="ml-2 hover:text-[var(--error)]"
          aria-label={`Remove ${item.name}`}
         >
          ×
         </button>
        )}
       </Badge>
      ))}
     </div>
    )}
   </SectionEditorContainer>
  );
 }
);
InterestEditor.displayName = "InterestEditor";

export { InterestForm, categoryColors };
