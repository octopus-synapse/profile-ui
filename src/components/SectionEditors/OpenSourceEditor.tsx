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
// Open Source Types
// ============================================================================

export type ContributionRole = "maintainer" | "contributor" | "creator";

export interface OpenSourceItem extends WithId {
 projectName: string;
 role: ContributionRole;
 description?: string;
 url?: string;
 technologies?: string[];
 contributions?: number;
 startDate?: string;
}

const roleLabels: Record<ContributionRole, string> = {
 maintainer: "Maintainer",
 contributor: "Contributor",
 creator: "Creator",
};

const roleColors: Record<ContributionRole, string> = {
 creator:
  "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
 maintainer: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
 contributor:
  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

// ============================================================================
// Open Source Form
// ============================================================================

interface OpenSourceFormProps {
 contribution: OpenSourceItem | null;
 onSave: (item: OpenSourceItem | Omit<OpenSourceItem, "id">) => void;
 onCancel: () => void;
 isLoading?: boolean;
}

const OpenSourceForm = forwardRef<HTMLFormElement, OpenSourceFormProps>(
 ({ contribution, onSave, onCancel, isLoading }, ref) => {
  const formId = useId();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   const formData = new FormData(e.currentTarget);

   const techStr = formData.get("technologies") as string;
   const technologies = techStr
    ? techStr
       .split(",")
       .map((t) => t.trim())
       .filter(Boolean)
    : undefined;

   const data: OpenSourceItem | Omit<OpenSourceItem, "id"> = {
    ...(contribution?.id ? { id: contribution.id } : {}),
    projectName: formData.get("projectName") as string,
    role: formData.get("role") as ContributionRole,
    description: (formData.get("description") as string) || undefined,
    url: (formData.get("url") as string) || undefined,
    technologies,
    contributions: formData.get("contributions")
     ? parseInt(formData.get("contributions") as string, 10)
     : undefined,
    startDate: (formData.get("startDate") as string) || undefined,
   };

   onSave(data as OpenSourceItem);
  };

  return (
   <form ref={ref} id={formId} onSubmit={handleSubmit} className="space-y-4">
    <Field label="Project Name" htmlFor={`${formId}-projectName`} required>
     <Input
      id={`${formId}-projectName`}
      name="projectName"
      defaultValue={contribution?.projectName}
      placeholder="react, tensorflow..."
      required
      disabled={isLoading}
     />
    </Field>

    <div className="grid gap-4 sm:grid-cols-2">
     <Field label="Role" htmlFor={`${formId}-role`} required>
      <select
       id={`${formId}-role`}
       name="role"
       defaultValue={contribution?.role || ""}
       required
       disabled={isLoading}
       className={cn(
        "w-full rounded-md border border-[var(--border-primary)]",
        "bg-[var(--surface-primary)] px-3 py-2",
        "text-sm text-[var(--text-primary)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]"
       )}
      >
       <option value="">Select role</option>
       {Object.entries(roleLabels).map(([value, label]) => (
        <option key={value} value={value}>
         {label}
        </option>
       ))}
      </select>
     </Field>

     <Field label="Contributions" htmlFor={`${formId}-contributions`}>
      <Input
       id={`${formId}-contributions`}
       name="contributions"
       type="number"
       min={0}
       defaultValue={contribution?.contributions}
       placeholder="Number of PRs/commits"
       disabled={isLoading}
      />
     </Field>
    </div>

    <Field label="Description" htmlFor={`${formId}-description`}>
     <textarea
      id={`${formId}-description`}
      name="description"
      defaultValue={contribution?.description}
      placeholder="What did you contribute?"
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

    <Field label="Technologies" htmlFor={`${formId}-technologies`}>
     <Input
      id={`${formId}-technologies`}
      name="technologies"
      defaultValue={contribution?.technologies?.join(", ")}
      placeholder="TypeScript, Python..."
      disabled={isLoading}
     />
    </Field>

    <Field label="Repository URL" htmlFor={`${formId}-url`}>
     <Input
      id={`${formId}-url`}
      name="url"
      type="url"
      defaultValue={contribution?.url}
      placeholder="https://github.com/..."
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
      {contribution ? "Update" : "Add"} Contribution
     </Button>
    </div>
   </form>
  );
 }
);
OpenSourceForm.displayName = "OpenSourceForm";

// ============================================================================
// Open Source Editor
// ============================================================================

export interface OpenSourceEditorProps
 extends Omit<
  BaseSectionListEditorProps<OpenSourceItem>,
  "renderItem" | "renderForm" | "title" | "addLabel"
 > {
 title?: string;
}

export const OpenSourceEditor = forwardRef<
 HTMLDivElement,
 OpenSourceEditorProps
>(({ title = "Open Source", ...props }, ref) => {
 return (
  <div ref={ref}>
   <BaseSectionListEditor<OpenSourceItem>
    {...props}
    title={title}
    addLabel="Add Contribution"
    emptyMessage="No open source contributions yet. Share your OSS work."
    renderItem={(item, handlers) => (
     <SectionItemCard
      title={item.projectName}
      onEdit={handlers.onEdit}
      onDelete={handlers.onDelete}
      isLoading={props.isLoading}
     >
      <div className="flex items-center gap-2 mb-2">
       <Badge className={cn("text-xs", roleColors[item.role])}>
        {roleLabels[item.role]}
       </Badge>
       {item.contributions && (
        <span className="text-xs text-[var(--text-tertiary)]">
         {item.contributions} contributions
        </span>
       )}
      </div>
      {item.technologies && item.technologies.length > 0 && (
       <div className="flex flex-wrap gap-1">
        {item.technologies.slice(0, 4).map((tech) => (
         <Badge key={tech} variant="outline" className="text-xs">
          {tech}
         </Badge>
        ))}
       </div>
      )}
     </SectionItemCard>
    )}
    renderForm={(item, onSave, onCancel) => (
     <OpenSourceForm
      contribution={item}
      onSave={onSave}
      onCancel={onCancel}
      isLoading={props.isLoading}
     />
    )}
   />
  </div>
 );
});
OpenSourceEditor.displayName = "OpenSourceEditor";

export { OpenSourceForm, roleLabels, roleColors };
