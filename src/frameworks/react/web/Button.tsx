

'use client';

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import { useButtonController } from '../hooks/useButtonController';
import type {
  ButtonVariant,
  ButtonSize,
} from '../../../domain/entities/button/ButtonState';





export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'onClick'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void | Promise<void>;
  testID?: string;
}





export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant,
      size,
      fullWidth,
      loading,
      disabled,
      leftIcon,
      rightIcon,
      onClick,
      testID,
      className = '',
      ...htmlProps
    },
    ref
  ) => {
    
    const { viewModel, handleClick } = useButtonController({
      variant,
      size,
      fullWidth,
      loading,
      disabled,
    });

    
    const onClickHandler = onClick
      ? async () => {
          try {
            await handleClick(onClick);
          } catch (error) {
            
            
            console.error('Button click error:', error);
          }
        }
      : undefined;

    return (
      <button
        ref={ref}
        type="button"
        disabled={viewModel.ariaDisabled}
        onClick={onClickHandler}
        data-testid={testID}
        aria-disabled={viewModel.ariaDisabled}
        aria-label={viewModel.ariaLabel}
        role={viewModel.role}
        className={cn(
          
          'inline-flex items-center justify-center gap-2',
          'font-semibold whitespace-nowrap transition-all duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020202]',
          'disabled:opacity-50 disabled:pointer-events-none',
          'active:scale-[0.98] select-none',
          
          viewModel.fullWidth && 'w-full',
          
          className
        )}
        style={{
          height: viewModel.styles.height,
          paddingLeft: viewModel.styles.paddingH,
          paddingRight: viewModel.styles.paddingH,
          fontSize: viewModel.styles.fontSize,
          borderRadius: viewModel.styles.borderRadius,
          backgroundColor: viewModel.styles.backgroundColor,
          color: viewModel.styles.textColor,
          borderWidth: 1,
          borderColor: viewModel.styles.borderColor,
        }}
        {...htmlProps}
      >
        {viewModel.loading ? (
          <LoadingSpinner color={viewModel.styles.textColor} />
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';





function LoadingSpinner({ color }: { color: string }) {
  return (
    <svg
      className="animate-spin h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      style={{ color }}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}





function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
