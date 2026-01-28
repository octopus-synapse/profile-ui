

"use client";

import React, { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { useSwitch, SwitchProps } from "../../shared/switch";

export interface WebSwitchProps extends SwitchProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SwitchProps | 'onChange'> {}

export const Switch = forwardRef<HTMLButtonElement, WebSwitchProps>(
 (
  { className, checked, defaultChecked, onCheckedChange, disabled, readOnly, variant, testID, ...props },
  ref,
 ) => {
  const { state, styles, handlers, accessibility } = useSwitch({
    checked,
    defaultChecked,
    onCheckedChange,
    disabled,
    readOnly,
    variant
  });

  return (
   <button
    ref={ref}
    type="button"
    onClick={handlers.onCheckedChange}
    data-testid={testID}
    data-state={state.checked ? "checked" : "unchecked"}
    disabled={state.disabled}
    className={cn(
     "peer inline-flex shrink-0 items-center rounded-full border-2 transition-all",
     "focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303] focus-visible:outline-none",
     className,
    )}
    style={{
        ...styles.root,
        // Ensure border width is respected if inline style overrides it (tokens might have it)
    }}
    {...accessibility}
    {...props}
   >
    <span
     data-state={state.checked ? "checked" : "unchecked"}
     className={cn(
      "pointer-events-none block rounded-full shadow-lg ring-0 transition-transform",
     )}
     style={{
         ...styles.thumb
     }}
    />
   </button>
  );
 },
);
Switch.displayName = "Switch";
