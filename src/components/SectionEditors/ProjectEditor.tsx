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
// Project Types
// ============================================================================

export type ProjectStatus =
 | "in_progress"
 | "completed"
 | "on_hold"
 | "archived";

export interface ProjectItem extends WithId {
 name: string;
 description?: string;
 role?: string;
 url?: string;
 repositoryUrl?: string;
 startDate?: string;
 endDate?: string;
 status?: ProjectStatus;
 technologies?: string[];
}

const statusLabels: Record<ProjectStatus, string> = {
 in_progress: "In Progress",
 completed: "Completed",
 on_hold: "On Hold",
 archived: "Archived",
};

const statusColors: Record<ProjectStatus, string> = {
 in_progress: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
 completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
 on_hold:
  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
 archived: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
};

// ============================================================================
// Project Form
// ============================================================================

interface ProjectFormProps {
 project: ProjectItem | null;
 onSave: (project: ProjectItem | Omit<ProjectItem, "id">) => void;
 onCancel: () => void;
 isLoading?: boolean;
}

const ProjectForm = forwardRef<HTMLFormElement, ProjectFormProps>(
 ({ project, onSave, onCancel, isLoading }, ref) => {
  const formId = useId();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   const formData = new FormData(e.currentTarget);

   const techString = formData.get("technologies") as string;
   const technologies = techString
    ? techString
       .split(",")
       .map((t) => t.trim())
       .filter(Boolean)
    : undefined;

   const data: ProjectItem | Omit<ProjectItem, "id"> = {
    ...(project?.id ? { id: project.id } : {}),
    name: formData.get("name") as string,
    description: (formData.get("description") as string) || undefined,
    role: (formData.get("role") as string) || undefined,
    url: (formData.get("url") as string) || undefined,
    repositoryUrl: (formData.get("repositoryUrl") as string) || undefined,
    startDate: (formData.get("startDate") as string) || undefined,
    endDate: (formData.get("endDate") as string) || undefined,
    status: (formData.get("status") as ProjectStatus) || undefined,
    technologies,
   };

   onSave(data as ProjectItem);
  };

  return (
   <form ref={ref} id={formId} onSubmit={handleSubmit} className="space-y-4">
    <Field label="Project Name" htmlFor={`${formId}-name`} required>
     <Input
      id={`${formId}-name`}
      name="name"
      defaultValue={project?.name}
      placeholder="E-commerce Platform"
      required
      disabled={isLoading}
     />
    </Field>

    <div className="grid gap-4 sm:grid-cols-2">
     <Field label="Your Role" htmlFor={`${formId}-role`}>
      <Input
       id={`${formId}-role`}
       name="role"
       defaultValue={project?.role}
       placeholder="Lead Developer"
       disabled={isLoading}
      />
     </Field>

     <Field label="Status" htmlFor={`${formId}-status`}>
      <select
       id={`${formId}-status`}
       name="status"
       defaultValue={project?.status || ""}
       disabled={isLoading}
       className={cn(
        "w-full rounded-md border border-[var(--border-primary)]",
        "bg-[var(--surface-primary)] px-3 py-2",
        "text-sm text-[var(--text-primary)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]"
       )}
      >
       <option value="">Select status</option>
       {Object.entries(statusLabels).map(([value, label]) => (
        <option key={value} value={value}>
         {label}
        </option>
       ))}
      </select>
     </Field>
    </div>

    <Field label="Description" htmlFor={`${formId}-description`}>
     <textarea
      id={`${formId}-description`}
      name="description"
      defaultValue={project?.description}
      placeholder="Brief description of the project..."
      rows={3}
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
      defaultValue={project?.technologies?.join(", ")}
      placeholder="React, Node.js, PostgreSQL..."
      disabled={isLoading}
     />
    </Field>

    <div className="grid gap-4 sm:grid-cols-2">
     <Field label="Project URL" htmlFor={`${formId}-url`}>
      <Input
       id={`${formId}-url`}
       name="url"
       type="url"
       defaultValue={project?.url}
       placeholder="https://myproject.com"
       disabled={isLoading}
      />
     </Field>

     <Field label="Repository URL" htmlFor={`${formId}-repositoryUrl`}>
      <Input
       id={`${formId}-repositoryUrl`}
       name="repositoryUrl"
       type="url"
       defaultValue={project?.repositoryUrl}
       placeholder="https://github.com/..."
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
      {project ? "Update" : "Add"} Project
     </Button>
    </div>
   </form>
  );
 }
);
ProjectForm.displayName = "ProjectForm";

// ============================================================================
// Project Editor
// ============================================================================

export interface ProjectEditorProps
 extends Omit<
  BaseSectionListEditorProps<ProjectItem>,
  "renderItem" | "renderForm" | "title" | "addLabel"
 > {
 title?: string;
}

export const ProjectEditor = forwardRef<HTMLDivElement, ProjectEditorProps>(
 ({ title = "Projects", ...props }, ref) => {
  return (
   <div ref={ref}>
    <BaseSectionListEditor<ProjectItem>
     {...props}
     title={title}
     addLabel="Add Project"
     emptyMessage="No projects added yet. Showcase your work."
     renderItem={(item, handlers) => (
      <SectionItemCard
       title={item.name}
       subtitle={item.role}
       onEdit={handlers.onEdit}
       onDelete={handlers.onDelete}
       isLoading={props.isLoading}
      >
       {item.status && (
        <Badge className={cn("text-xs mb-2", statusColors[item.status])}>
         {statusLabels[item.status]}
        </Badge>
       )}
       {item.technologies && item.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
         {item.technologies.slice(0, 5).map((tech) => (
          <Badge key={tech} variant="outline" className="text-xs">
           {tech}
          </Badge>
         ))}
         {item.technologies.length > 5 && (
          <Badge variant="outline" className="text-xs">
           +{item.technologies.length - 5}
          </Badge>
         )}
        </div>
       )}
      </SectionItemCard>
     )}
     renderForm={(item, onSave, onCancel) => (
      <ProjectForm
       project={item}
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
ProjectEditor.displayName = "ProjectEditor";

export { ProjectForm, statusLabels, statusColors };
