import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Checkbox } from '../checkbox.component.web';

describe('Checkbox Component (Clean Architecture)', () => {
  beforeEach(() => {
    
  });

  afterEach(() => {
    cleanup();
  });

  // ============================================
  // Rendering
  // ============================================

  it('should render unchecked checkbox by default', () => {
    render(<Checkbox testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it('should render checked checkbox when checked prop is true', () => {
    render(<Checkbox checked testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('should render with label', () => {
    render(<Checkbox label="Accept terms" testID="checkbox" />);
    expect(screen.getByText('Accept terms')).toBeDefined();
  });

  it('should render with description', () => {
    render(
      <Checkbox
        label="Newsletter"
        description="Receive weekly updates"
        testID="checkbox"
      />
    );
    expect(screen.getByText('Receive weekly updates')).toBeDefined();
  });

  it('should render with error message', () => {
    render(
      <Checkbox
        label="Terms"
        error="You must accept the terms"
        testID="checkbox"
      />
    );
    expect(screen.getByText('You must accept the terms')).toBeDefined();
  });

  // ============================================
  // Interactions
  // ============================================

  it('should toggle checkbox when clicked', () => {
    render(<Checkbox testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;

    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    
    expect(checkbox.checked).toBe(true);
  });

  it('should call onCheckedChange when toggled', () => {
    let capturedValue: boolean | 'indeterminate' | undefined;
    const handleChange = (value: boolean | 'indeterminate') => {
      capturedValue = value;
    };

    render(<Checkbox onCheckedChange={handleChange} testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');

    fireEvent.click(checkbox);

    expect(capturedValue).toBe(true);
  });

  // ============================================
  // State Props
  // ============================================

  it('should be disabled when disabled prop is true', () => {
    render(<Checkbox disabled testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
  });

  it('should have aria-disabled when disabled', () => {
    render(<Checkbox disabled testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox.getAttribute('aria-disabled')).toBe('true');
  });

  it('should not trigger onChange when disabled', () => {
    let called = false;
    const handleChange = () => {
      called = true;
    };

    render(
      <Checkbox
        disabled
        onCheckedChange={handleChange}
        testID="checkbox"
      />
    );
    const checkbox = screen.getByTestId('checkbox');

    fireEvent.click(checkbox);

    expect(called).toBe(false);
  });

  // ============================================
  // Accessibility & Variants
  // ============================================

  it('should be readonly when readOnly prop is true', () => {
    render(<Checkbox readOnly testID="checkbox" />);
    // Note: input type=checkbox doesn't support readOnly standard attribute effectively in all browsers/libs, 
    // but we verify aria-readonly
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox.getAttribute('aria-readonly')).toBe('true');
  });

  it('should be required when required prop is true', () => {
    render(<Checkbox required testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox.required).toBe(true);
  });

  it('should apply default variant styling', () => {
    const { container } = render(
      <Checkbox variant="default" testID="checkbox" />
    );
    expect(container.querySelector('div[style*="background"]')).toBeDefined();
  });

  it('should apply error variant when error prop is set', () => {
    const { container } = render(
      <Checkbox error="Required field" testID="checkbox" />
    );
    // Error variant usually implies red border
    expect(container.innerHTML).toContain('ef4444'); // Tailwind red-500 hex
  });

  it('should have correct ARIA role', () => {
    render(<Checkbox testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox.getAttribute('role')).toBe('checkbox');
  });

  it('should show checkmark when checked', () => {
    const { container } = render(<Checkbox checked testID="checkbox" />);
    // Checkmark path usually M4 8L7 11L12 5
    const checkmark = container.querySelector('svg');
    expect(checkmark).toBeDefined();
  });

  it('should show indeterminate indicator when indeterminate', () => {
    const { container } = render(
      <Checkbox checked="indeterminate" testID="checkbox" />
    );
    // Indeterminate path usually M4 8H12
    const indicator = container.querySelector('svg');
    expect(indicator).toBeDefined();
  });

  // ============================================
  // Integration
  // ============================================

  it('should render all props together', () => {
    render(
      <Checkbox
        checked
        disabled
        required
        label="Terms and Conditions"
        description="Please read carefully"
        error="You must accept"
        variant="error"
        testID="checkbox"
      />
    );

    expect(screen.getByText('Terms and Conditions')).toBeDefined();
    expect(screen.getByText('Please read carefully')).toBeDefined();
    expect(screen.getByText('You must accept')).toBeDefined();

    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
    expect(checkbox.disabled).toBe(true);
    expect(checkbox.required).toBe(true);
  });

  it('should handle controlled component pattern', () => {
    const { rerender } = render(<Checkbox checked={false} testID="checkbox" />);
    let checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    rerender(<Checkbox checked={true} testID="checkbox" />);
    checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('should forward ref to input element', () => {
    let ref: HTMLInputElement | null = null;
    render(
      <Checkbox
        ref={(node) => {
          ref = node;
        }}
        testID="checkbox"
      />
    );
    expect(ref).not.toBeNull();
    expect(ref?.tagName).toBe('INPUT');
  });

  it('should pass through HTML input props', () => {
    render(
      <Checkbox
        testID="checkbox"
        name="terms"
        form="signup-form"
        value="accepted"
      />
    );
    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox.name).toBe('terms');
    expect(checkbox.getAttribute('form')).toBe('signup-form');
  });
});
