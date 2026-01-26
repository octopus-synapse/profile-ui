

'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { useCheckboxController } from '../../frameworks/react/hooks/useCheckboxController';
import { cn } from '../../utils/cn';
import type { CheckboxValue } from '../../domain/entities/checkbox/CheckboxState';





export interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'checked' | 'onChange' | 'size' | 'value' | 'defaultChecked'
  > {
  
  checked?: boolean | 'indeterminate';
  defaultChecked?: boolean | 'indeterminate';

  
  onCheckedChange?: (checked: CheckboxValue) => void | Promise<void>;

  
  variant?: 'default' | 'error';

  
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;

  
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;

  
  testID?: string;
  accessibilityLabel?: string;
}





export const CheckboxClean = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked,
      onCheckedChange,
      variant = 'default',
      disabled = false,
      readOnly = false,
      required = false,
      label,
      description,
      error,
      testID,
      id,
      ...htmlProps
    },
    ref
  ) => {
    
    const {
      viewModel,
      handleToggle,
    } = useCheckboxController({
      value: (controlledChecked ?? defaultChecked ?? false) as CheckboxValue,
      variant: error ? 'error' : variant,
      disabled,
      readonly: readOnly,
      required,
    });

    
    const handleChange = async () => {
      try {
        await handleToggle(onCheckedChange);
      } catch (err) {
        
        
        console.error('Checkbox toggle failed:', err);
      }
    };

    return (
      <label
        htmlFor={id}
        className={cn(
          'inline-flex items-start gap-2',
          viewModel.interactive ? 'cursor-pointer' : 'cursor-not-allowed',
          (viewModel.disabled || viewModel.readonly) && 'opacity-50',
          className
        )}
      >
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            checked={viewModel.checked}
            disabled={viewModel.disabled}
            readOnly={viewModel.readonly}
            required={viewModel.required}
            data-testid={testID}
            onChange={handleChange}
            aria-checked={viewModel.ariaChecked}
            aria-disabled={viewModel.ariaDisabled}
            aria-readonly={viewModel.ariaReadonly}
            aria-required={viewModel.ariaRequired}
            className="sr-only"
            {...htmlProps}
          />
          <div
            className={cn(
              'flex items-center justify-center transition-all duration-150',
              'border-2 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-[#020202]'
            )}
            style={{
              width: viewModel.styles.size,
              height: viewModel.styles.size,
              borderRadius: viewModel.styles.radius,
              backgroundColor: viewModel.styles.backgroundColor,
              borderColor: viewModel.styles.borderColor,
            }}
          >
            {viewModel.checked && viewModel.styles.checkmarkColor && (
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke={viewModel.styles.checkmarkColor}
                strokeWidth={2}
                style={{
                  width: viewModel.styles.checkmarkSize,
                  height: viewModel.styles.checkmarkSize,
                }}
              >
                <path
                  d="M4 8L7 11L12 5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {viewModel.indeterminate && viewModel.styles.indicatorColor && (
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke={viewModel.styles.indicatorColor}
                strokeWidth={2}
                style={{
                  width: viewModel.styles.checkmarkSize,
                  height: viewModel.styles.checkmarkSize,
                }}
              >
                <path d="M4 8L12 8" strokeLinecap="round" />
              </svg>
            )}
          </div>
        </div>
        {(label || description || error) && (
          <div className="flex flex-col">
            {label && (
              <span
                style={{
                  fontSize: 14,
                  color: '#ffffff',
                }}
              >
                {label}
              </span>
            )}
            {description && (
              <span
                className="mt-0.5"
                style={{
                  fontSize: 12,
                  color: '#a3a3a3',
                }}
              >
                {description}
              </span>
            )}
            {error && (
              <span
                className="mt-0.5"
                style={{
                  fontSize: 12,
                  color: '#ef4444',
                }}
              >
                {error}
              </span>
            )}
          </div>
        )}
      </label>
    );
  }
);

CheckboxClean.displayName = 'CheckboxClean';
