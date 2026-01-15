"use client";

import {
 forwardRef,
 useState,
 type HTMLAttributes,
 type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import { Button } from "../Button";
import { Card, CardContent, CardHeader, CardTitle } from "../Card";
import { EmptyState } from "../EmptyState";
import type { SectionListEditorProps, WithId } from "./types";

// ============================================================================
// Section Editor Container
// ============================================================================

export interface SectionEditorContainerProps
 extends HTMLAttributes<HTMLDivElement> {
 /** Section title */
 title: string;
 /** Section description */
 description?: string;
 /** Action button (e.g., "Add Experience") */
 action?: ReactNode;
 /** Add handler - creates a default add button if provided */
 onAdd?: () => void;
 /** Add button label */
 addLabel?: string;
 /** Loading state */
 isLoading?: boolean;
 /** Disabled state */
 disabled?: boolean;
 /** Error message */
 error?: string;
}

export const SectionEditorContainer = forwardRef<
 HTMLDivElement,
 SectionEditorContainerProps
>(
 (
  {
   className,
   title,
   description,
   action,
   onAdd,
   addLabel,
   isLoading,
   disabled,
   error,
   children,
   ...props
  },
  ref
 ) => {
  const addButton = onAdd ? (
   <Button
    type="button"
    variant="outline"
    size="sm"
    onClick={onAdd}
    disabled={isLoading || disabled}
   >
    {addLabel || "Add"}
   </Button>
  ) : null;

  return (
   <div ref={ref} className={cn("space-y-4", className)} {...props}>
    <div className="flex items-center justify-between">
     <div>
      <h3 className="text-lg font-semibold text-[var(--text-primary)]">
       {title}
      </h3>
      {description && (
       <p className="text-sm text-[var(--text-secondary)]">{description}</p>
      )}
     </div>
     {action || addButton}
    </div>
    {error && (
     <p className="text-sm text-[var(--error)]" role="alert">
      {error}
     </p>
    )}
    {children}
   </div>
  );
 }
);
SectionEditorContainer.displayName = "SectionEditorContainer";

// ============================================================================
// Section Item Card
// ============================================================================

export interface SectionItemCardProps extends HTMLAttributes<HTMLDivElement> {
 /** Item title */
 title: string;
 /** Item subtitle */
 subtitle?: string;
 /** Item date range or period */
 period?: string;
 /** Edit handler */
 onEdit?: () => void;
 /** Delete handler */
 onDelete?: () => void;
 /** Is this item being edited */
 isEditing?: boolean;
 /** Loading state */
 isLoading?: boolean;
}

export const SectionItemCard = forwardRef<HTMLDivElement, SectionItemCardProps>(
 (
  {
   className,
   title,
   subtitle,
   period,
   onEdit,
   onDelete,
   isEditing,
   isLoading,
   children,
   ...props
  },
  ref
 ) => {
  return (
   <Card
    ref={ref}
    className={cn(
     "transition-all",
     isEditing && "ring-2 ring-[var(--border-focus)]",
     className
    )}
    {...props}
   >
    <CardHeader className="pb-2">
     <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
       <CardTitle className="text-base truncate">{title}</CardTitle>
       {subtitle && (
        <p className="text-sm text-[var(--text-secondary)] truncate">
         {subtitle}
        </p>
       )}
       {period && (
        <p className="text-xs text-[var(--text-tertiary)] mt-1">{period}</p>
       )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
       {onEdit && (
        <Button variant="ghost" size="sm" onClick={onEdit} disabled={isLoading}>
         Edit
        </Button>
       )}
       {onDelete && (
        <Button
         variant="ghost"
         size="sm"
         onClick={onDelete}
         disabled={isLoading}
         className="text-[var(--error)] hover:text-[var(--error)] hover:bg-[var(--error)]/10"
        >
         Delete
        </Button>
       )}
      </div>
     </div>
    </CardHeader>
    {children && <CardContent className="pt-0">{children}</CardContent>}
   </Card>
  );
 }
);
SectionItemCard.displayName = "SectionItemCard";

// ============================================================================
// Section List Editor Base
// ============================================================================

export interface BaseSectionListEditorProps<T extends WithId>
 extends Omit<SectionListEditorProps<T>, "onAdd" | "onUpdate" | "onReorder"> {
 /** Render function for each item */
 renderItem: (
  item: T,
  handlers: {
   onEdit: () => void;
   onDelete: () => void;
  }
 ) => ReactNode;
 /** Render function for add/edit form */
 renderForm?: (
  item: T | null,
  onSave: (item: T | Omit<T, "id">) => void,
  onCancel: () => void
 ) => ReactNode;
 /** Add new item */
 onAdd?: (item: Omit<T, "id">) => void;
 /** Update existing item */
 onUpdate?: (id: string, item: Partial<T>) => void;
 /** Section title */
 title: string;
 /** Add button label */
 addLabel?: string;
}

export function BaseSectionListEditor<T extends WithId>({
 items,
 onAdd,
 onUpdate,
 onDelete,
 renderItem,
 renderForm,
 isLoading,
 disabled,
 error,
 className,
 maxItems,
 emptyMessage = "No items yet. Click the button above to add one.",
 title,
 addLabel = "Add Item",
}: BaseSectionListEditorProps<T>) {
 const [editingId, setEditingId] = useState<string | null>(null);
 const [isAdding, setIsAdding] = useState(false);

 const canAdd = !maxItems || items.length < maxItems;

 const handleAdd = (item: Omit<T, "id">) => {
  onAdd?.(item);
  setIsAdding(false);
 };

 const handleEdit = (id: string) => {
  setEditingId(id);
  setIsAdding(false);
 };

 const handleUpdate = (item: T) => {
  if (editingId) {
   onUpdate?.(editingId, item);
   setEditingId(null);
  }
 };

 const handleCancel = () => {
  setEditingId(null);
  setIsAdding(false);
 };

 const editingItem = editingId ? items.find((i) => i.id === editingId) : null;

 return (
  <SectionEditorContainer
   className={className}
   title={title}
   error={error}
   action={
    onAdd &&
    canAdd && (
     <Button
      variant="outline"
      size="sm"
      onClick={() => setIsAdding(true)}
      disabled={disabled || isLoading || isAdding}
     >
      {addLabel}
     </Button>
    )
   }
  >
   {/* Add Form */}
   {isAdding && renderForm && (
    <Card className="border-dashed">
     <CardContent className="pt-4">
      {renderForm(null, handleAdd, handleCancel)}
     </CardContent>
    </Card>
   )}

   {/* Items List */}
   {items.length === 0 && !isAdding ? (
    <EmptyState title="No items" description={emptyMessage} size="sm" />
   ) : (
    <div className="space-y-3">
     {items.map((item) =>
      editingId === item.id && renderForm ? (
       <Card key={item.id} className="ring-2 ring-[var(--border-focus)]">
        <CardContent className="pt-4">
         {renderForm(
          item,
          handleUpdate as (item: T | Omit<T, "id">) => void,
          handleCancel
         )}
        </CardContent>
       </Card>
      ) : (
       <div key={item.id}>
        {renderItem(item, {
         onEdit: () => handleEdit(item.id),
         onDelete: () => onDelete(item.id),
        })}
       </div>
      )
     )}
    </div>
   )}
  </SectionEditorContainer>
 );
}
