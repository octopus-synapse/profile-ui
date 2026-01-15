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
// Education Types
// ============================================================================

export interface EducationItem extends WithId {
 institution: string;
 degree: string;
 field?: string;
 startDate: string;
 endDate?: string;
 current?: boolean;
 grade?: string;
 description?: string;
}

// ============================================================================
// Education Form
// ============================================================================

interface EducationFormProps {
 education: EducationItem | null;
 onSave: (education: EducationItem | Omit<EducationItem, "id">) => void;
 onCancel: () => void;
 isLoading?: boolean;
}

const EducationForm = forwardRef<HTMLFormElement, EducationFormProps>(
 ({ education, onSave, onCancel, isLoading }, ref) => {
  const formId = useId();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   const formData = new FormData(e.currentTarget);

   const data: EducationItem | Omit<EducationItem, "id"> = {
    ...(education?.id ? { id: education.id } : {}),
    institution: formData.get("institution") as string,
    degree: formData.get("degree") as string,
    field: (formData.get("field") as string) || undefined,
    startDate: formData.get("startDate") as string,
    endDate: (formData.get("endDate") as string) || undefined,
    current: formData.get("current") === "on",
    grade: (formData.get("grade") as string) || undefined,
    description: (formData.get("description") as string) || undefined,
   };

   onSave(data as EducationItem);
  };

  return (
   <form ref={ref} id={formId} onSubmit={handleSubmit} className="space-y-4">
    <Field label="Institution" htmlFor={`${formId}-institution`} required>
     <Input
      id={`${formId}-institution`}
      name="institution"
      defaultValue={education?.institution}
      placeholder="University of Example"
      required
      disabled={isLoading}
     />
    </Field>

    <div className="grid gap-4 sm:grid-cols-2">
     <Field label="Degree" htmlFor={`${formId}-degree`} required>
      <Input
       id={`${formId}-degree`}
       name="degree"
       defaultValue={education?.degree}
       placeholder="Bachelor of Science"
       required
       disabled={isLoading}
      />
     </Field>

     <Field label="Field of Study" htmlFor={`${formId}-field`}>
      <Input
       id={`${formId}-field`}
       name="field"
       defaultValue={education?.field}
       placeholder="Computer Science"
       disabled={isLoading}
      />
     </Field>
    </div>

    <div className="grid gap-4 sm:grid-cols-2">
     <Field label="Start Date" htmlFor={`${formId}-startDate`} required>
      <Input
       id={`${formId}-startDate`}
       name="startDate"
       type="month"
       defaultValue={education?.startDate}
       required
       disabled={isLoading}
      />
     </Field>

     <Field label="End Date" htmlFor={`${formId}-endDate`}>
      <Input
       id={`${formId}-endDate`}
       name="endDate"
       type="month"
       defaultValue={education?.endDate}
       disabled={isLoading || education?.current}
      />
      <div className="flex items-center gap-2 mt-2">
       <input
        type="checkbox"
        id={`${formId}-current`}
        name="current"
        defaultChecked={education?.current}
        className="rounded border-[var(--border-primary)]"
       />
       <label
        htmlFor={`${formId}-current`}
        className="text-sm text-[var(--text-secondary)]"
       >
        Currently studying here
       </label>
      </div>
     </Field>
    </div>

    <Field label="Grade / GPA" htmlFor={`${formId}-grade`}>
     <Input
      id={`${formId}-grade`}
      name="grade"
      defaultValue={education?.grade}
      placeholder="3.8 GPA"
      disabled={isLoading}
     />
    </Field>

    <Field label="Description" htmlFor={`${formId}-description`}>
     <textarea
      id={`${formId}-description`}
      name="description"
      defaultValue={education?.description}
      placeholder="Relevant coursework, activities, honors..."
      rows={3}
      disabled={isLoading}
      className={cn(
       "w-full rounded-md border border-[var(--border-primary)]",
       "bg-[var(--surface-primary)] px-3 py-2",
       "text-sm text-[var(--text-primary)]",
       "placeholder:text-[var(--text-tertiary)]",
       "focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]",
       "disabled:cursor-not-allowed disabled:opacity-50"
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
      {education ? "Update" : "Add"} Education
     </Button>
    </div>
   </form>
  );
 }
);
EducationForm.displayName = "EducationForm";

// ============================================================================
// Education Editor
// ============================================================================

export interface EducationEditorProps
 extends Omit<
  BaseSectionListEditorProps<EducationItem>,
  "renderItem" | "renderForm" | "title" | "addLabel"
 > {
 title?: string;
}

function formatDateRange(
 startDate: string,
 endDate?: string,
 current?: boolean
): string {
 const start = new Date(startDate).toLocaleDateString("en-US", {
  month: "short",
  year: "numeric",
 });

 if (current) {
  return `${start} - Present`;
 }

 if (endDate) {
  const end = new Date(endDate).toLocaleDateString("en-US", {
   month: "short",
   year: "numeric",
  });
  return `${start} - ${end}`;
 }

 return start;
}

export const EducationEditor = forwardRef<HTMLDivElement, EducationEditorProps>(
 ({ title = "Education", ...props }, ref) => {
  return (
   <div ref={ref}>
    <BaseSectionListEditor<EducationItem>
     {...props}
     title={title}
     addLabel="Add Education"
     emptyMessage="No education added yet. Add your academic background to complete your profile."
     renderItem={(item, handlers) => (
      <SectionItemCard
       title={item.degree}
       subtitle={item.institution}
       period={formatDateRange(item.startDate, item.endDate, item.current)}
       onEdit={handlers.onEdit}
       onDelete={handlers.onDelete}
       isLoading={props.isLoading}
      >
       {item.field && (
        <p className="text-sm text-[var(--text-secondary)]">
         {item.field}
         {item.grade && ` • ${item.grade}`}
        </p>
       )}
      </SectionItemCard>
     )}
     renderForm={(item, onSave, onCancel) => (
      <EducationForm
       education={item}
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
EducationEditor.displayName = "EducationEditor";

export { EducationForm };
