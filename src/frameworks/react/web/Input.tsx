

'use client';

import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { useInput } from '../../../adapters/hooks/useInput';
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
    
    const { state: hookState, styles, handlers, accessibility } = useInput({
      type,
      size,
      state,
      value,
      error,
      disabled,
      readOnly,
      required,
      onChange: onChangeText,
      onBlur,
    });

    
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      handlers.handleChange(newValue);
    };

    
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSubmit?.();
      }
    };

    
    const displayMessage = hookState.error || helperText;
    const messageColor = hookState.hasError ? styles.borderColor : '#a3a3a3';

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
            type={hookState.type || 'text'}
            disabled={hookState.disabled}
            readOnly={hookState.readOnly}
            required={hookState.required}
            data-testid={testID}
            value={hookState.value}
            onChange={onChangeHandler}
            onBlur={handlers.handleBlur}
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
              height: styles.height,
              paddingLeft: leftAddon ? '40px' : styles.paddingH,
              paddingRight: rightAddon ? '40px' : styles.paddingH,
              fontSize: styles.fontSize,
              borderRadius: styles.borderRadius,
              backgroundColor: styles.backgroundColor,
              color: styles.textColor,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: styles.borderColor,
            }}
            {...accessibility}
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
