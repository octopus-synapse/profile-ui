

'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { useSwitchController } from '../../frameworks/react/hooks/useSwitchController';
import { cn } from '../../utils/cn';
import type { SwitchValue } from '../../domain/entities/switch/SwitchState';





export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  
  checked?: boolean;
  defaultChecked?: boolean;

  
  onCheckedChange?: (checked: SwitchValue) => void | Promise<void>;

  
  variant?: 'default' | 'error';

  
  disabled?: boolean;
  readOnly?: boolean;

  
  testID?: string;
  accessibilityLabel?: string;
}





export const SwitchClean = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked,
      onCheckedChange,
      variant = 'default',
      disabled = false,
      readOnly = false,
      testID,
      'aria-label': ariaLabel,
      accessibilityLabel,
      ...htmlProps
    },
    ref
  ) => {
    
    const { viewModel, handleToggle } = useSwitchController({
      value: (controlledChecked ?? defaultChecked ?? false) as SwitchValue,
      variant,
      disabled,
      readonly: readOnly,
    });

    
    const handleClick = async () => {
      try {
        await handleToggle(onCheckedChange);
      } catch (err) {
        
        
        console.error('Switch toggle failed:', err);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role={viewModel.role}
        aria-checked={viewModel.ariaChecked}
        aria-disabled={viewModel.ariaDisabled}
        aria-readonly={viewModel.ariaReadonly}
        aria-label={accessibilityLabel || ariaLabel}
        disabled={viewModel.disabled}
        data-testid={testID}
        data-state={viewModel.on ? 'checked' : 'unchecked'}
        onClick={handleClick}
        className={cn(
          'inline-flex items-center shrink-0 cursor-pointer rounded-full border-2 transition-all duration-150',
          'focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303] focus-visible:outline-none',
          !viewModel.interactive && 'cursor-not-allowed opacity-50',
          className
        )}
        style={{
          width: viewModel.styles.width,
          height: viewModel.styles.height,
          backgroundColor: viewModel.styles.backgroundColor,
          borderColor: viewModel.styles.borderColor,
        }}
        {...htmlProps}
      >
        <span
          className="block rounded-full shadow-lg transition-transform duration-150"
          style={{
            width: viewModel.styles.thumbSize,
            height: viewModel.styles.thumbSize,
            backgroundColor: viewModel.styles.thumbColor,
            transform: `translateX(${viewModel.styles.thumbTranslate})`,
          }}
        />
      </button>
    );
  }
);

SwitchClean.displayName = 'SwitchClean';
