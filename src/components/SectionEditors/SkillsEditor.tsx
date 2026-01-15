"use client";

import { forwardRef, useId, useState } from "react";
import { cn } from "../../utils/cn";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Input } from "../Input";
import { Field, type WithId } from "./types";
import { SectionEditorContainer } from "./BaseSectionEditor";

// ============================================================================
// Skill Types
// ============================================================================

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface SkillItem extends WithId {
 name: string;
 level?: SkillLevel;
 yearsOfExperience?: number;
 category?: string;
}

// ============================================================================
// Skill Level Colors
// ============================================================================

const skillLevelColors: Record<SkillLevel, string> = {
 beginner: "bg-[var(--surface-secondary)] text-[var(--text-secondary)]",
 intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
 advanced:
  "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
 expert: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

// ============================================================================
// Skill Badge
// ============================================================================

interface SkillBadgeProps {
 skill: SkillItem;
 onRemove?: () => void;
 onEdit?: () => void;
 disabled?: boolean;
}

const SkillBadge = forwardRef<HTMLDivElement, SkillBadgeProps>(
 ({ skill, onRemove, onEdit, disabled }, ref) => (
  <div
   ref={ref}
   className={cn(
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5",
    "border border-[var(--border-primary)]",
    "bg-[var(--surface-primary)]",
    "transition-colors hover:bg-[var(--surface-secondary)]",
    disabled && "opacity-50 cursor-not-allowed"
   )}
  >
   <span className="text-sm font-medium text-[var(--text-primary)]">
    {skill.name}
   </span>
   {skill.level && (
    <Badge
     variant="outline"
     className={cn("text-xs capitalize", skillLevelColors[skill.level])}
    >
     {skill.level}
    </Badge>
   )}
   {onEdit && !disabled && (
    <button
     type="button"
     onClick={onEdit}
     className="ml-1 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
     aria-label={`Edit ${skill.name}`}
    >
     <svg
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
     >
      <path
       strokeLinecap="round"
       strokeLinejoin="round"
       strokeWidth={2}
       d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
     </svg>
    </button>
   )}
   {onRemove && !disabled && (
    <button
     type="button"
     onClick={onRemove}
     className="ml-1 text-[var(--text-tertiary)] hover:text-[var(--error)]"
     aria-label={`Remove ${skill.name}`}
    >
     <svg
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
     >
      <path
       strokeLinecap="round"
       strokeLinejoin="round"
       strokeWidth={2}
       d="M6 18L18 6M6 6l12 12"
      />
     </svg>
    </button>
   )}
  </div>
 )
);
SkillBadge.displayName = "SkillBadge";

// ============================================================================
// Skill Form
// ============================================================================

interface SkillFormProps {
 skill: SkillItem | null;
 onSave: (skill: SkillItem | Omit<SkillItem, "id">) => void;
 onCancel: () => void;
 isLoading?: boolean;
}

const SkillForm = forwardRef<HTMLFormElement, SkillFormProps>(
 ({ skill, onSave, onCancel, isLoading }, ref) => {
  const formId = useId();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   const formData = new FormData(e.currentTarget);

   const data: SkillItem | Omit<SkillItem, "id"> = {
    ...(skill?.id ? { id: skill.id } : {}),
    name: formData.get("name") as string,
    level: (formData.get("level") as SkillLevel) || undefined,
    category: (formData.get("category") as string) || undefined,
    yearsOfExperience: formData.get("years")
     ? parseInt(formData.get("years") as string, 10)
     : undefined,
   };

   onSave(data as SkillItem);
  };

  return (
   <form ref={ref} id={formId} onSubmit={handleSubmit} className="space-y-4">
    <div className="grid gap-4 sm:grid-cols-2">
     <Field label="Skill Name" htmlFor={`${formId}-name`} required>
      <Input
       id={`${formId}-name`}
       name="name"
       defaultValue={skill?.name}
       placeholder="React, Python, Project Management..."
       required
       disabled={isLoading}
      />
     </Field>

     <Field label="Level" htmlFor={`${formId}-level`}>
      <select
       id={`${formId}-level`}
       name="level"
       defaultValue={skill?.level || ""}
       disabled={isLoading}
       className={cn(
        "w-full rounded-md border border-[var(--border-primary)]",
        "bg-[var(--surface-primary)] px-3 py-2",
        "text-sm text-[var(--text-primary)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]"
       )}
      >
       <option value="">Select level</option>
       <option value="beginner">Beginner</option>
       <option value="intermediate">Intermediate</option>
       <option value="advanced">Advanced</option>
       <option value="expert">Expert</option>
      </select>
     </Field>
    </div>

    <div className="grid gap-4 sm:grid-cols-2">
     <Field label="Category" htmlFor={`${formId}-category`}>
      <Input
       id={`${formId}-category`}
       name="category"
       defaultValue={skill?.category}
       placeholder="Frontend, Backend, Soft Skills..."
       disabled={isLoading}
      />
     </Field>

     <Field label="Years of Experience" htmlFor={`${formId}-years`}>
      <Input
       id={`${formId}-years`}
       name="years"
       type="number"
       min={0}
       max={50}
       defaultValue={skill?.yearsOfExperience}
       placeholder="3"
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
      {skill ? "Update" : "Add"} Skill
     </Button>
    </div>
   </form>
  );
 }
);
SkillForm.displayName = "SkillForm";

// ============================================================================
// Skills Editor
// ============================================================================

export interface SkillsEditorProps {
 items: SkillItem[];
 onAdd: (item: Omit<SkillItem, "id">) => void;
 onUpdate: (id: string, item: Partial<SkillItem>) => void;
 onDelete: (id: string) => void;
 isLoading?: boolean;
 disabled?: boolean;
 title?: string;
 className?: string;
 maxItems?: number;
 groupByCategory?: boolean;
}

export const SkillsEditor = forwardRef<HTMLDivElement, SkillsEditorProps>(
 (
  {
   items,
   onAdd,
   onUpdate,
   onDelete,
   isLoading,
   disabled,
   title = "Skills",
   className,
   groupByCategory = true,
  },
  ref
 ) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSave = (skill: SkillItem | Omit<SkillItem, "id">) => {
   if ("id" in skill && skill.id) {
    onUpdate(skill.id, skill);
    setEditingId(null);
   } else {
    onAdd(skill);
    setIsAdding(false);
   }
  };

  const groupedSkills = groupByCategory
   ? items.reduce<Record<string, SkillItem[]>>((acc, skill) => {
      const category = skill.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
     }, {})
   : { All: items };

  const editingSkill = editingId
   ? items.find((s) => s.id === editingId) || null
   : null;

  return (
   <SectionEditorContainer
    ref={ref}
    title={title}
    onAdd={() => setIsAdding(true)}
    addLabel="Add Skill"
    isLoading={isLoading}
    disabled={disabled}
    className={className}
   >
    {isAdding && (
     <div className="mb-4 p-4 rounded-lg bg-[var(--surface-secondary)]">
      <SkillForm
       skill={null}
       onSave={handleSave}
       onCancel={() => setIsAdding(false)}
       isLoading={isLoading}
      />
     </div>
    )}

    {editingSkill && (
     <div className="mb-4 p-4 rounded-lg bg-[var(--surface-secondary)]">
      <SkillForm
       skill={editingSkill}
       onSave={handleSave}
       onCancel={() => setEditingId(null)}
       isLoading={isLoading}
      />
     </div>
    )}

    {items.length === 0 && !isAdding ? (
     <p className="text-center py-8 text-[var(--text-tertiary)]">
      No skills added yet. Add your technical and soft skills.
     </p>
    ) : (
     <div className="space-y-4">
      {Object.entries(groupedSkills).map(([category, skills]) => (
       <div key={category}>
        {groupByCategory && (
         <h4 className="text-sm font-medium text-[var(--text-secondary)] mb-2">
          {category}
         </h4>
        )}
        <div className="flex flex-wrap gap-2">
         {skills.map((skill) => (
          <SkillBadge
           key={skill.id}
           skill={skill}
           onEdit={() => setEditingId(skill.id)}
           onRemove={() => onDelete(skill.id)}
           disabled={disabled || isLoading}
          />
         ))}
        </div>
       </div>
      ))}
     </div>
    )}
   </SectionEditorContainer>
  );
 }
);
SkillsEditor.displayName = "SkillsEditor";

export { SkillBadge, SkillForm };
