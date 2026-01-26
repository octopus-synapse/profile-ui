

'use client';

import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { useInputController } from '../hooks/useInputController';
import type {
  InputType,
  InputSize,
  InputStateType,
} from '../../../domain/entities/input/InputState';





export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'disabled' | 'onChange' | 'onBlur' | 'onFocus' | 'size' | 'type'
  > {
  type?: InputType;
  size?: InputSize;
  state?: InputStateType;
  value?: string;
  error?: string | null;
  helperText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  validateOnChange?: boolean;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onSubmit?: () => void;
  testID?: string;
}





export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      size,
      state,
      value,
      error,
      helperText,
      disabled,
      readOnly,
      required,
      leftAddon,
      rightAddon,
      validateOnChange = false,
      onChangeText,
      onBlur,
      onFocus,
      onSubmit,
      testID,
      className = '',
      ...htmlProps
    },
    ref
  ) => {
    
    const { viewModel, handleChange, handleBlur } = useInputController({
      type,
      size,
      state,
      value,
      error,
      disabled,
      readOnly,
      required,
    });

    
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      handleChange(newValue, validateOnChange);
      onChangeText?.(newValue);
    };

    
    const onBlurHandler = () => {
      handleBlur();
      onBlur?.();
    };

    
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSubmit?.();
      }
    };

    
    const displayMessage = viewModel.errorMessage || helperText;
    const messageColor = viewModel.hasError ? viewModel.styles.borderColor : '#a3a3a3';

    return (
      <div className="w-full">
        <div className="relative flex items-center">
          {leftAddon && (
            <div
              className="absolute left-3 flex items-center pointer-events-none"
              style={{ color: '#a3a3a3' }}
            >
              {leftAddon}
            </div>
          )}
          <input
            ref={ref}
            type={type || 'text'}
            disabled={viewModel.disabled}
            readOnly={viewModel.readOnly}
            required={viewModel.required}
            data-testid={testID}
            aria-invalid={viewModel.ariaInvalid}
            aria-required={viewModel.ariaRequired}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onFocus={onFocus}
            onKeyDown={onKeyDownHandler}
            className={cn(
              'w-full transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020202]',
              'disabled:cursor-not-allowed disabled:opacity-50',
              leftAddon ? 'pl-10' : '',
              rightAddon ? 'pr-10' : '',
              className
            )}
            style={{
              height: viewModel.styles.height,
              paddingLeft: leftAddon ? '40px' : viewModel.styles.paddingH,
              paddingRight: rightAddon ? '40px' : viewModel.styles.paddingH,
              fontSize: viewModel.styles.fontSize,
              borderRadius: viewModel.styles.borderRadius,
              backgroundColor: viewModel.styles.backgroundColor,
              color: viewModel.styles.textColor,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: viewModel.styles.borderColor,
            }}
            {...htmlProps}
          />
          {rightAddon && (
            <div
              className="absolute right-3 flex items-center"
              style={{ color: '#a3a3a3' }}
            >
              {rightAddon}
            </div>
          )}
        </div>
        {displayMessage && (
          <p
            className="mt-1.5 text-xs"
            style={{ color: messageColor }}
          >
            {displayMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';





function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
