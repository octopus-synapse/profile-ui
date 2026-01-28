

"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { useSelect, type SelectProps } from "../../shared/select";
import { cn } from "../../utils/cn";

export interface WebSelectProps<T = string>
  extends SelectProps<T>,
    Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, keyof SelectProps<T> | 'onValueChange'> {
  className?: string;
}

export function Select<T = string>(props: WebSelectProps<T>) {
  const {
    className,
    testID,
    id,
    name,
    accessibilityLabel,
    helperText,
    placeholder: customPlaceholder,
    options: customOptions,
    onBlur,
    ...restProps
  } = props;

  const { state, styles, handlers, accessibility } = useSelect(props);

  const stringValue = state.value !== null ? String(state.value) : undefined;

  const handleValueChange = (value: string) => {
    // Find the original option to get the real value type T
    const option = customOptions?.find(opt => String(opt.value) === value);
    if (option) {
       handlers.onValueChange(option.value);
    }
  };

  const handleValidate = () => {
    onBlur?.();
  };

  return (
    <div className="w-full">
      <SelectPrimitive.Root
        value={stringValue ?? undefined}
        onValueChange={handleValueChange}
        disabled={state.disabled}
        name={name}
        open={state.open}
        onOpenChange={handlers.onOpenChange}
        {...restProps}
      >
        <SelectPrimitive.Trigger
          id={id}
          data-testid={testID}
          aria-label={accessibilityLabel}
          onBlur={handleValidate}
          className={cn(
            "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm",
            "border bg-[#030303]",
            "text-white placeholder:text-zinc-600",
            "ring-offset-[#030303]",
            "focus:ring-2 focus:ring-offset-2 focus:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "[&>span]:line-clamp-1",
            className
          )}
          style={{
             ...styles.container,
             borderRadius: styles.tokens.size.radius ?? 8, // fallback
          }}
          {...accessibility}
        >
          <SelectPrimitive.Value placeholder={customPlaceholder} />
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={cn(
              "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg",
              "border border-white/10 bg-[#0A0A0A]/95 shadow-lg",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "data-[side=bottom]:slide-in-from-top-2",
              "data-[side=left]:slide-in-from-right-2",
              "data-[side=right]:slide-in-from-left-2",
              "data-[side=top]:slide-in-from-bottom-2"
            )}
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.Viewport className="p-1">
              {customOptions?.map((option) => (
                <SelectPrimitive.Item
                  key={String(option.value)}
                  value={String(option.value)}
                  disabled={option.disabled}
                  className={cn(
                    "relative flex w-full cursor-pointer items-center rounded-md py-1.5 pr-2 pl-8 text-sm outline-none select-none",
                    "text-white",
                    "focus:bg-white/5 focus:text-white",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  )}
                >
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <SelectPrimitive.ItemIndicator>
                      <Check className="h-4 w-4 text-cyan-400" />
                    </SelectPrimitive.ItemIndicator>
                  </span>
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {(helperText || state.error) && (
        <p
          className={cn(
            "mt-1.5 text-xs",
            state.error ? "text-red-400" : "text-zinc-500"
          )}
        >
          {typeof props.error === 'string' ? props.error : helperText}
        </p>
      )}
    </div>
  );
}

Select.displayName = "Select";
