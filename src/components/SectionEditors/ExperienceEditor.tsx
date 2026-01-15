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
// Experience Types
// ============================================================================

export interface ExperienceItem extends WithId {
 title: string;
 company: string;
 location?: string;
 startDate: string;
 endDate?: string;
 current?: boolean;
 description?: string;
 achievements?: string[];
}

// ============================================================================
// Experience Form
// ============================================================================

interface ExperienceFormProps {
 experience: ExperienceItem | null;
 onSave: (experience: ExperienceItem | Omit<ExperienceItem, "id">) => void;
 onCancel: () => void;
 isLoading?: boolean;
}

const ExperienceForm = forwardRef<HTMLFormElement, ExperienceFormProps>(
 ({ experience, onSave, onCancel, isLoading }, ref) => {
  const formId = useId();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   const formData = new FormData(e.currentTarget);

   const data: ExperienceItem | Omit<ExperienceItem, "id"> = {
    ...(experience?.id ? { id: experience.id } : {}),
    title: formData.get("title") as string,
    company: formData.get("company") as string,
    location: (formData.get("location") as string) || undefined,
    startDate: formData.get("startDate") as string,
    endDate: (formData.get("endDate") as string) || undefined,
    current: formData.get("current") === "on",
    description: (formData.get("description") as string) || undefined,
   };

   onSave(data as ExperienceItem);
  };

  return (
   <form ref={ref} id={formId} onSubmit={handleSubmit} className="space-y-4">
    <div className="grid gap-4 sm:grid-cols-2">
     <Field label="Job Title" htmlFor={`${formId}-title`} required>
      <Input
       id={`${formId}-title`}
       name="title"
       defaultValue={experience?.title}
       placeholder="Software Engineer"
       required
       disabled={isLoading}
      />
     </Field>

     <Field label="Company" htmlFor={`${formId}-company`} required>
      <Input
       id={`${formId}-company`}
       name="company"
       defaultValue={experience?.company}
       placeholder="Acme Inc."
       required
       disabled={isLoading}
      />
     </Field>
    </div>

    <Field label="Location" htmlFor={`${formId}-location`}>
     <Input
      id={`${formId}-location`}
      name="location"
      defaultValue={experience?.location}
      placeholder="San Francisco, CA"
      disabled={isLoading}
     />
    </Field>

    <div className="grid gap-4 sm:grid-cols-2">
     <Field label="Start Date" htmlFor={`${formId}-startDate`} required>
      <Input
       id={`${formId}-startDate`}
       name="startDate"
       type="month"
       defaultValue={experience?.startDate}
       required
       disabled={isLoading}
      />
     </Field>

     <Field label="End Date" htmlFor={`${formId}-endDate`}>
      <Input
       id={`${formId}-endDate`}
       name="endDate"
       type="month"
       defaultValue={experience?.endDate}
       disabled={isLoading || experience?.current}
      />
      <div className="flex items-center gap-2 mt-2">
       <input
        type="checkbox"
        id={`${formId}-current`}
        name="current"
        defaultChecked={experience?.current}
        className="rounded border-[var(--border-primary)]"
       />
       <label
        htmlFor={`${formId}-current`}
        className="text-sm text-[var(--text-secondary)]"
       >
        I currently work here
       </label>
      </div>
     </Field>
    </div>

    <Field label="Description" htmlFor={`${formId}-description`}>
     <textarea
      id={`${formId}-description`}
      name="description"
      defaultValue={experience?.description}
      placeholder="Describe your responsibilities and achievements..."
      rows={4}
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
      {experience ? "Update" : "Add"} Experience
     </Button>
    </div>
   </form>
  );
 }
);
ExperienceForm.displayName = "ExperienceForm";

// ============================================================================
// Experience Editor
// ============================================================================

export interface ExperienceEditorProps
 extends Omit<
  BaseSectionListEditorProps<ExperienceItem>,
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

 if (current) return `${start} - Present`;
 if (endDate) {
  const end = new Date(endDate).toLocaleDateString("en-US", {
   month: "short",
   year: "numeric",
  });
  return `${start} - ${end}`;
 }
 return start;
}

export const ExperienceEditor = forwardRef<
 HTMLDivElement,
 ExperienceEditorProps
>(({ title = "Work Experience", ...props }, ref) => {
 return (
  <div ref={ref}>
   <BaseSectionListEditor<ExperienceItem>
    {...props}
    title={title}
    addLabel="Add Experience"
    emptyMessage="No work experience added yet. Add your professional history."
    renderItem={(item, handlers) => (
     <SectionItemCard
      title={item.title}
      subtitle={item.company}
      period={formatDateRange(item.startDate, item.endDate, item.current)}
      onEdit={handlers.onEdit}
      onDelete={handlers.onDelete}
      isLoading={props.isLoading}
     >
      {item.location && (
       <p className="text-sm text-[var(--text-secondary)]">{item.location}</p>
      )}
     </SectionItemCard>
    )}
    renderForm={(item, onSave, onCancel) => (
     <ExperienceForm
      experience={item}
      onSave={onSave}
      onCancel={onCancel}
      isLoading={props.isLoading}
     />
    )}
   />
  </div>
 );
});
ExperienceEditor.displayName = "ExperienceEditor";

export { ExperienceForm };
