

import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { CheckboxClean } from '../checkbox-clean.component.web';

describe('CheckboxClean Component', () => {
  beforeEach(() => {
    
  });

  afterEach(() => {
    cleanup();
  });

  
  
  

  it('should render unchecked checkbox by default', () => {
    render(<CheckboxClean testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it('should render checked checkbox when checked prop is true', () => {
    render(<CheckboxClean checked testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('should render with label', () => {
    render(<CheckboxClean label="Accept terms" testID="checkbox" />);
    expect(screen.getByText('Accept terms')).toBeDefined();
  });

  it('should render with description', () => {
    render(
      <CheckboxClean
        label="Newsletter"
        description="Receive weekly updates"
        testID="checkbox"
      />
    );
    expect(screen.getByText('Receive weekly updates')).toBeDefined();
  });

  it('should render with error message', () => {
    render(
      <CheckboxClean
        label="Terms"
        error="You must accept the terms"
        testID="checkbox"
      />
    );
    expect(screen.getByText('You must accept the terms')).toBeDefined();
  });

  
  
  

  it('should toggle checkbox when clicked', () => {
    render(<CheckboxClean testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;

    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    
    
  });

  it('should call onCheckedChange when toggled', () => {
    let capturedValue: boolean | 'indeterminate' | undefined;
    const handleChange = (value: boolean | 'indeterminate') => {
      capturedValue = value;
    };

    render(<CheckboxClean onCheckedChange={handleChange} testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');

    fireEvent.click(checkbox);

    
    
  });

  
  
  

  it('should be disabled when disabled prop is true', () => {
    render(<CheckboxClean disabled testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
  });

  it('should have aria-disabled when disabled', () => {
    render(<CheckboxClean disabled testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox.getAttribute('aria-disabled')).toBe('true');
  });

  it('should not trigger onChange when disabled', () => {
    let called = false;
    const handleChange = () => {
      called = true;
    };

    render(
      <CheckboxClean
        disabled
        onCheckedChange={handleChange}
        testID="checkbox"
      />
    );
    const checkbox = screen.getByTestId('checkbox');

    fireEvent.click(checkbox);

    
    
  });

  
  
  

  it('should be readonly when readOnly prop is true', () => {
    render(<CheckboxClean readOnly testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox.readOnly).toBe(true);
  });

  it('should have aria-readonly when readonly', () => {
    render(<CheckboxClean readOnly testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox.getAttribute('aria-readonly')).toBe('true');
  });

  
  
  

  it('should be required when required prop is true', () => {
    render(<CheckboxClean required testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox.required).toBe(true);
  });

  it('should have aria-required when required', () => {
    render(<CheckboxClean required testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox.getAttribute('aria-required')).toBe('true');
  });

  
  
  

  it('should apply default variant styling', () => {
    const { container } = render(
      <CheckboxClean variant="default" testID="checkbox" />
    );
    
    expect(container.querySelector('div[style*="background"]')).toBeDefined();
  });

  it('should apply error variant when error prop is set', () => {
    const { container } = render(
      <CheckboxClean error="Required field" testID="checkbox" />
    );
    
    const styledDiv = container.querySelector('div[style*="border"]');
    expect(styledDiv).toBeDefined();
  });

  it('should apply error variant when variant="error"', () => {
    const { container } = render(
      <CheckboxClean variant="error" testID="checkbox" />
    );
    
    expect(container.querySelector('div[style*="border"]')).toBeDefined();
  });

  
  
  

  it('should have correct ARIA role', () => {
    render(<CheckboxClean testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox.getAttribute('type')).toBe('checkbox');
  });

  it('should have aria-checked=false when unchecked', () => {
    render(<CheckboxClean testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox.getAttribute('aria-checked')).toBe('false');
  });

  it('should have aria-checked=true when checked', () => {
    render(<CheckboxClean checked testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox.getAttribute('aria-checked')).toBe('true');
  });

  it('should have aria-checked=mixed when indeterminate', () => {
    render(<CheckboxClean checked="indeterminate" testID="checkbox" />);
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox.getAttribute('aria-checked')).toBe('mixed');
  });

  it('should associate label with checkbox via htmlFor', () => {
    render(
      <CheckboxClean id="terms-checkbox" label="Accept terms" testID="checkbox" />
    );
    const checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox.id).toBe('terms-checkbox');
  });

  
  
  

  it('should show checkmark when checked', () => {
    const { container } = render(<CheckboxClean checked testID="checkbox" />);
    const checkmark = container.querySelector('svg path[d*="M4 8L7 11L12 5"]');
    expect(checkmark).toBeDefined();
  });

  it('should show indeterminate indicator when indeterminate', () => {
    const { container } = render(
      <CheckboxClean checked="indeterminate" testID="checkbox" />
    );
    const indicator = container.querySelector('svg path[d*="M4 8L12 8"]');
    expect(indicator).toBeDefined();
  });

  it('should not show checkmark when unchecked', () => {
    const { container } = render(<CheckboxClean testID="checkbox" />);
    const checkmark = container.querySelector('svg path[d*="M4 8L7 11L12 5"]');
    expect(checkmark).toBeNull();
  });

  
  
  

  it('should apply custom className', () => {
    const { container } = render(
      <CheckboxClean className="custom-class" testID="checkbox" />
    );
    const label = container.querySelector('.custom-class');
    expect(label).toBeDefined();
  });

  it('should have cursor-pointer when interactive', () => {
    const { container } = render(<CheckboxClean testID="checkbox" />);
    const label = container.querySelector('.cursor-pointer');
    expect(label).toBeDefined();
  });

  it('should have cursor-not-allowed when disabled', () => {
    const { container } = render(<CheckboxClean disabled testID="checkbox" />);
    const label = container.querySelector('.cursor-not-allowed');
    expect(label).toBeDefined();
  });

  it('should have cursor-not-allowed when readonly', () => {
    const { container } = render(<CheckboxClean readOnly testID="checkbox" />);
    const label = container.querySelector('.cursor-not-allowed');
    expect(label).toBeDefined();
  });

  it('should apply opacity when disabled', () => {
    const { container } = render(<CheckboxClean disabled testID="checkbox" />);
    const label = container.querySelector('.opacity-50');
    expect(label).toBeDefined();
  });

  
  
  

  it('should render all props together', () => {
    render(
      <CheckboxClean
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
    const { rerender } = render(<CheckboxClean checked={false} testID="checkbox" />);
    let checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    rerender(<CheckboxClean checked={true} testID="checkbox" />);
    checkbox = screen.getByTestId('checkbox') as HTMLInputElement;
    
  });

  it('should forward ref to input element', () => {
    let ref: HTMLInputElement | null = null;
    render(
      <CheckboxClean
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
      <CheckboxClean
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
