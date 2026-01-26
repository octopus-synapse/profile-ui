

'use client';

import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { useTextareaController } from '../../frameworks/react/hooks/useTextareaController';
import type { TextareaState } from '../../domain/entities/textarea/TextareaState';
import { cn } from '../../utils/cn';

export interface CleanTextareaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'onBlur' | 'disabled' | 'readOnly' | 'required' | 'rows'
  > {
  initialState?: Partial<TextareaState>;
  onValueChange?: (value: string) => void;
  onBlurCallback?: () => void;
  showCharacterCount?: boolean;
  showWordCount?: boolean;
  validateOnChange?: boolean;
}

export const CleanTextarea = forwardRef<HTMLTextAreaElement, CleanTextareaProps>(
  (
    {
      className,
      initialState = {},
      onValueChange,
      onBlurCallback,
      showCharacterCount = false,
      showWordCount = false,
      validateOnChange = false,
      ...props
    },
    ref
  ) => {
    const controller = useTextareaController(initialState);
    const { viewModel, handleChange, handleBlur } = controller;

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleChange(e.target.value, validateOnChange);
      onValueChange?.(e.target.value);
    };

    const onBlur = () => {
      handleBlur();
      onBlurCallback?.();
    };

    const characterCount = viewModel.characterCount;
    const maxLength = viewModel.remainingCharacters !== null
      ? characterCount + viewModel.remainingCharacters
      : null;

    return (
      <div className="w-full">
        <textarea
          ref={ref}
          value={controller.getValue()}
          onChange={onChange}
          onBlur={onBlur}
          disabled={viewModel.disabled}
          readOnly={viewModel.readOnly}
          required={viewModel.required}
          rows={viewModel.rows}
          aria-invalid={viewModel.ariaInvalid}
          aria-required={viewModel.ariaRequired}
          aria-readonly={viewModel.ariaReadOnly}
          className={cn(
            'flex w-full rounded-md text-sm',
            'border bg-[#030303]',
            'text-white placeholder:text-zinc-600',
            'ring-offset-[#030303]',
            'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'resize-y',
            viewModel.hasError
              ? 'border-red-500 focus-visible:ring-red-500'
              : 'border-white/10 focus-visible:ring-cyan-500',
            className
          )}
          style={{
            minHeight: viewModel.styles.minHeight,
            paddingLeft: viewModel.styles.paddingH,
            paddingRight: viewModel.styles.paddingH,
            paddingTop: viewModel.styles.paddingV,
            paddingBottom: viewModel.styles.paddingV,
            fontSize: viewModel.styles.fontSize,
          }}
          {...props}
        />

        {(showCharacterCount || showWordCount || viewModel.hasError) && (
          <div className="mt-1 flex items-center justify-between text-xs">
            <div>
              {viewModel.hasError && (
                <span className="text-red-500">{viewModel.errorMessage}</span>
              )}
            </div>
            <div className="flex gap-3 text-zinc-500">
              {showWordCount && <span>{viewModel.wordCount} words</span>}
              {showCharacterCount && (
                <span>
                  {characterCount}
                  {maxLength !== null && ` / ${maxLength}`}
                  {viewModel.exceedsMaxLength && (
                    <span className="text-red-500"> (too long)</span>
                  )}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

CleanTextarea.displayName = 'CleanTextarea';
