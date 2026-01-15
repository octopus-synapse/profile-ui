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
// Language Types
// ============================================================================

export type LanguageProficiency =
 | "elementary"
 | "limited_working"
 | "professional_working"
 | "full_professional"
 | "native";

export interface LanguageItem extends WithId {
 name: string;
 proficiency: LanguageProficiency;
 certification?: string;
}

const proficiencyLabels: Record<LanguageProficiency, string> = {
 elementary: "Elementary",
 limited_working: "Limited Working",
 professional_working: "Professional Working",
 full_professional: "Full Professional",
 native: "Native / Bilingual",
};

const proficiencyColors: Record<LanguageProficiency, string> = {
 elementary: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
 limited_working:
  "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
 professional_working:
  "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
 full_professional:
  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
 native:
  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
};

// ============================================================================
// Language Form
// ============================================================================

interface LanguageFormProps {
 language: LanguageItem | null;
 onSave: (language: LanguageItem | Omit<LanguageItem, "id">) => void;
 onCancel: () => void;
 isLoading?: boolean;
}

const LanguageForm = forwardRef<HTMLFormElement, LanguageFormProps>(
 ({ language, onSave, onCancel, isLoading }, ref) => {
  const formId = useId();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   const formData = new FormData(e.currentTarget);

   const data: LanguageItem | Omit<LanguageItem, "id"> = {
    ...(language?.id ? { id: language.id } : {}),
    name: formData.get("name") as string,
    proficiency: formData.get("proficiency") as LanguageProficiency,
    certification: (formData.get("certification") as string) || undefined,
   };

   onSave(data as LanguageItem);
  };

  return (
   <form ref={ref} id={formId} onSubmit={handleSubmit} className="space-y-4">
    <div className="grid gap-4 sm:grid-cols-2">
     <Field label="Language" htmlFor={`${formId}-name`} required>
      <Input
       id={`${formId}-name`}
       name="name"
       defaultValue={language?.name}
       placeholder="English, Spanish, Mandarin..."
       required
       disabled={isLoading}
      />
     </Field>

     <Field label="Proficiency" htmlFor={`${formId}-proficiency`} required>
      <select
       id={`${formId}-proficiency`}
       name="proficiency"
       defaultValue={language?.proficiency || ""}
       required
       disabled={isLoading}
       className={cn(
        "w-full rounded-md border border-[var(--border-primary)]",
        "bg-[var(--surface-primary)] px-3 py-2",
        "text-sm text-[var(--text-primary)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]"
       )}
      >
       <option value="">Select proficiency</option>
       {Object.entries(proficiencyLabels).map(([value, label]) => (
        <option key={value} value={value}>
         {label}
        </option>
       ))}
      </select>
     </Field>
    </div>

    <Field label="Certification" htmlFor={`${formId}-certification`}>
     <Input
      id={`${formId}-certification`}
      name="certification"
      defaultValue={language?.certification}
      placeholder="TOEFL, IELTS, DELE..."
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
      {language ? "Update" : "Add"} Language
     </Button>
    </div>
   </form>
  );
 }
);
LanguageForm.displayName = "LanguageForm";

// ============================================================================
// Language Editor
// ============================================================================

export interface LanguageEditorProps
 extends Omit<
  BaseSectionListEditorProps<LanguageItem>,
  "renderItem" | "renderForm" | "title" | "addLabel"
 > {
 title?: string;
}

export const LanguageEditor = forwardRef<HTMLDivElement, LanguageEditorProps>(
 ({ title = "Languages", ...props }, ref) => {
  return (
   <div ref={ref}>
    <BaseSectionListEditor<LanguageItem>
     {...props}
     title={title}
     addLabel="Add Language"
     emptyMessage="No languages added yet. Add your language skills."
     renderItem={(item, handlers) => (
      <SectionItemCard
       title={item.name}
       onEdit={handlers.onEdit}
       onDelete={handlers.onDelete}
       isLoading={props.isLoading}
      >
       <div className="flex items-center gap-2">
        <Badge className={cn("text-xs", proficiencyColors[item.proficiency])}>
         {proficiencyLabels[item.proficiency]}
        </Badge>
        {item.certification && (
         <span className="text-xs text-[var(--text-tertiary)]">
          {item.certification}
         </span>
        )}
       </div>
      </SectionItemCard>
     )}
     renderForm={(item, onSave, onCancel) => (
      <LanguageForm
       language={item}
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
LanguageEditor.displayName = "LanguageEditor";

export { LanguageForm, proficiencyLabels, proficiencyColors };
