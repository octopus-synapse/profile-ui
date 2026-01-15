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
// Talk Types
// ============================================================================

export type TalkType =
 | "conference"
 | "meetup"
 | "webinar"
 | "podcast"
 | "workshop"
 | "other";

export interface TalkItem extends WithId {
 title: string;
 event: string;
 date: string;
 type?: TalkType;
 location?: string;
 description?: string;
 slidesUrl?: string;
 videoUrl?: string;
}

const talkTypeLabels: Record<TalkType, string> = {
 conference: "Conference",
 meetup: "Meetup",
 webinar: "Webinar",
 podcast: "Podcast",
 workshop: "Workshop",
 other: "Other",
};

// ============================================================================
// Talk Form
// ============================================================================

interface TalkFormProps {
 talk: TalkItem | null;
 onSave: (talk: TalkItem | Omit<TalkItem, "id">) => void;
 onCancel: () => void;
 isLoading?: boolean;
}

const TalkForm = forwardRef<HTMLFormElement, TalkFormProps>(
 ({ talk, onSave, onCancel, isLoading }, ref) => {
  const formId = useId();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   const formData = new FormData(e.currentTarget);

   const data: TalkItem | Omit<TalkItem, "id"> = {
    ...(talk?.id ? { id: talk.id } : {}),
    title: formData.get("title") as string,
    event: formData.get("event") as string,
    date: formData.get("date") as string,
    type: (formData.get("type") as TalkType) || undefined,
    location: (formData.get("location") as string) || undefined,
    description: (formData.get("description") as string) || undefined,
    slidesUrl: (formData.get("slidesUrl") as string) || undefined,
    videoUrl: (formData.get("videoUrl") as string) || undefined,
   };

   onSave(data as TalkItem);
  };

  return (
   <form ref={ref} id={formId} onSubmit={handleSubmit} className="space-y-4">
    <Field label="Talk Title" htmlFor={`${formId}-title`} required>
     <Input
      id={`${formId}-title`}
      name="title"
      defaultValue={talk?.title}
      placeholder="Introduction to React Hooks"
      required
      disabled={isLoading}
     />
    </Field>

    <div className="grid gap-4 sm:grid-cols-2">
     <Field label="Event" htmlFor={`${formId}-event`} required>
      <Input
       id={`${formId}-event`}
       name="event"
       defaultValue={talk?.event}
       placeholder="React Summit 2024"
       required
       disabled={isLoading}
      />
     </Field>

     <Field label="Type" htmlFor={`${formId}-type`}>
      <select
       id={`${formId}-type`}
       name="type"
       defaultValue={talk?.type || ""}
       disabled={isLoading}
       className={cn(
        "w-full rounded-md border border-[var(--border-primary)]",
        "bg-[var(--surface-primary)] px-3 py-2",
        "text-sm text-[var(--text-primary)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]"
       )}
      >
       <option value="">Select type</option>
       {Object.entries(talkTypeLabels).map(([value, label]) => (
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
       type="date"
       defaultValue={talk?.date}
       required
       disabled={isLoading}
      />
     </Field>

     <Field label="Location" htmlFor={`${formId}-location`}>
      <Input
       id={`${formId}-location`}
       name="location"
       defaultValue={talk?.location}
       placeholder="Amsterdam, Netherlands"
       disabled={isLoading}
      />
     </Field>
    </div>

    <Field label="Description" htmlFor={`${formId}-description`}>
     <textarea
      id={`${formId}-description`}
      name="description"
      defaultValue={talk?.description}
      placeholder="Brief description of your talk..."
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

    <div className="grid gap-4 sm:grid-cols-2">
     <Field label="Slides URL" htmlFor={`${formId}-slidesUrl`}>
      <Input
       id={`${formId}-slidesUrl`}
       name="slidesUrl"
       type="url"
       defaultValue={talk?.slidesUrl}
       placeholder="https://slides.com/..."
       disabled={isLoading}
      />
     </Field>

     <Field label="Video URL" htmlFor={`${formId}-videoUrl`}>
      <Input
       id={`${formId}-videoUrl`}
       name="videoUrl"
       type="url"
       defaultValue={talk?.videoUrl}
       placeholder="https://youtube.com/..."
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
      {talk ? "Update" : "Add"} Talk
     </Button>
    </div>
   </form>
  );
 }
);
TalkForm.displayName = "TalkForm";

// ============================================================================
// Talk Editor
// ============================================================================

export interface TalkEditorProps
 extends Omit<
  BaseSectionListEditorProps<TalkItem>,
  "renderItem" | "renderForm" | "title" | "addLabel"
 > {
 title?: string;
}

function formatDate(date: string): string {
 return new Date(date).toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
 });
}

export const TalkEditor = forwardRef<HTMLDivElement, TalkEditorProps>(
 ({ title = "Talks & Presentations", ...props }, ref) => {
  return (
   <div ref={ref}>
    <BaseSectionListEditor<TalkItem>
     {...props}
     title={title}
     addLabel="Add Talk"
     emptyMessage="No talks added yet. Share your speaking engagements."
     renderItem={(item, handlers) => (
      <SectionItemCard
       title={item.title}
       subtitle={item.event}
       period={formatDate(item.date)}
       onEdit={handlers.onEdit}
       onDelete={handlers.onDelete}
       isLoading={props.isLoading}
      >
       <div className="flex items-center gap-2">
        {item.type && (
         <Badge variant="outline" className="text-xs">
          {talkTypeLabels[item.type]}
         </Badge>
        )}
        {item.location && (
         <span className="text-xs text-[var(--text-tertiary)]">
          {item.location}
         </span>
        )}
       </div>
      </SectionItemCard>
     )}
     renderForm={(item, onSave, onCancel) => (
      <TalkForm
       talk={item}
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
TalkEditor.displayName = "TalkEditor";

export { TalkForm, talkTypeLabels };
