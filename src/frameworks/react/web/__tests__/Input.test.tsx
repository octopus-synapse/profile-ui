

import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Input } from '../Input';

describe('Input Component (Clean Architecture)', () => {
  beforeEach(() => {
    
  });

  afterEach(() => {
    cleanup();
  });

  
  
  

  describe('Rendering', () => {
    it('should render input element', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDefined();
    });

    it('should render with placeholder', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeDefined();
    });

    it('should render with testID', () => {
      render(<Input testID="test-input" />);
      expect(screen.getByTestId('test-input')).toBeDefined();
    });

    it('should render left addon', () => {
      render(<Input leftAddon={<span data-testid="left-addon">@</span>} />);
      expect(screen.getByTestId('left-addon')).toBeDefined();
    });

    it('should render right addon', () => {
      render(<Input rightAddon={<span data-testid="right-addon">✓</span>} />);
      expect(screen.getByTestId('right-addon')).toBeDefined();
    });

    it('should render helper text', () => {
      render(<Input helperText="Enter your email address" />);
      expect(screen.getByText('Enter your email address')).toBeDefined();
    });

    it('should render error message', () => {
      render(<Input error="This field is required" state="error" />);
      expect(screen.getByText('This field is required')).toBeDefined();
    });

    it('should prioritize error message over helper text', () => {
      render(<Input error="Error message" state="error" helperText="Helper text" />);

      expect(screen.getByText('Error message')).toBeDefined();
      expect(screen.queryByText('Helper text')).toBeNull();
    });
  });

  
  
  

  describe('State props', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Input disabled testID="input" />);
      const input = screen.getByTestId('input') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });

    it('should be readonly when readOnly prop is true', () => {
      render(<Input readOnly testID="input" />);
      const input = screen.getByTestId('input') as HTMLInputElement;
      expect(input.readOnly).toBe(true);
    });

    it('should be required when required prop is true', () => {
      render(<Input required testID="input" />);
      const input = screen.getByTestId('input') as HTMLInputElement;
      expect(input.required).toBe(true);
    });

    it('should handle different input types', () => {
      const { rerender } = render(<Input type="email" testID="input" />);
      let input = screen.getByTestId('input') as HTMLInputElement;
      expect(input.type).toBe('email');

      rerender(<Input type="password" testID="input" />);
      input = screen.getByTestId('input') as HTMLInputElement;
      expect(input.type).toBe('password');

      rerender(<Input type="number" testID="input" />);
      input = screen.getByTestId('input') as HTMLInputElement;
      expect(input.type).toBe('number');
    });
  });

  
  
  

  describe('onChange interaction', () => {
    it('should handle value changes', () => {
      const handleChangeText = () => {
        let value = '';
        return {
          fn: (text: string) => {
            value = text;
          },
          getValue: () => value,
        };
      };

      const mock = handleChangeText();
      render(<Input onChangeText={mock.fn} testID="input" />);

      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'test value' } });

      expect(mock.getValue()).toBe('test value');
    });

    it('should clear error when user types (business rule)', () => {
      render(<Input error="Initial error" state="error" testID="input" />);

      expect(screen.getByText('Initial error')).toBeDefined();

      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'new value' } });

      
      expect(screen.queryByText('Initial error')).toBeNull();
    });

    it('should validate on change when validateOnChange is true', () => {
      render(
        <Input
          type="email"
          validateOnChange={true}
          testID="input"
        />
      );

      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'invalid-email' } });

      
      expect(screen.getByText('Please enter a valid email address')).toBeDefined();
    });

    it('should not validate on change when validateOnChange is false', () => {
      render(
        <Input
          type="email"
          validateOnChange={false}
          testID="input"
        />
      );

      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'invalid-email' } });

      
      expect(screen.queryByText('Please enter a valid email address')).toBeNull();
    });

    it('should not validate on change by default', () => {
      render(<Input type="email" testID="input" />);

      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'invalid-email' } });

      expect(screen.queryByText('Please enter a valid email address')).toBeNull();
    });
  });

  
  
  

  describe('onBlur interaction', () => {
    it('should validate on blur', () => {
      render(<Input type="email" testID="input" />);

      const input = screen.getByTestId('input');

      
      fireEvent.change(input, { target: { value: 'invalid-email' } });
      expect(screen.queryByText('Please enter a valid email address')).toBeNull();

      
      fireEvent.blur(input);
      expect(screen.getByText('Please enter a valid email address')).toBeDefined();
    });

    it('should call onBlur callback', () => {
      const handleBlur = () => {
        let called = false;
        return {
          fn: () => {
            called = true;
          },
          wasCalled: () => called,
        };
      };

      const mock = handleBlur();
      render(<Input onBlur={mock.fn} testID="input" />);

      const input = screen.getByTestId('input');
      fireEvent.blur(input);

      expect(mock.wasCalled()).toBe(true);
    });

    it('should clear error on blur when value is now valid', () => {
      render(
        <Input
          type="email"
          error="Previous error"
          state="error"
          testID="input"
        />
      );

      expect(screen.getByText('Previous error')).toBeDefined();

      const input = screen.getByTestId('input');

      
      fireEvent.change(input, { target: { value: 'valid@example.com' } });

      
      fireEvent.blur(input);

      expect(screen.queryByText('Previous error')).toBeNull();
    });
  });

  
  
  

  describe('onSubmit interaction', () => {
    it('should call onSubmit when Enter is pressed', () => {
      const handleSubmit = () => {
        let called = false;
        return {
          fn: () => {
            called = true;
          },
          wasCalled: () => called,
        };
      };

      const mock = handleSubmit();
      render(<Input onSubmit={mock.fn} testID="input" />);

      const input = screen.getByTestId('input');
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(mock.wasCalled()).toBe(true);
    });

    it('should not call onSubmit when other keys are pressed', () => {
      const handleSubmit = () => {
        let called = false;
        return {
          fn: () => {
            called = true;
          },
          wasCalled: () => called,
        };
      };

      const mock = handleSubmit();
      render(<Input onSubmit={mock.fn} testID="input" />);

      const input = screen.getByTestId('input');
      fireEvent.keyDown(input, { key: 'a' });

      expect(mock.wasCalled()).toBe(false);
    });
  });

  
  
  

  describe('Accessibility', () => {
    it('should set aria-invalid when error is present', () => {
      render(<Input error="Error" state="error" testID="input" />);
      const input = screen.getByTestId('input');
      expect(input.getAttribute('aria-invalid')).toBe('true');
    });

    it('should not set aria-invalid when no error', () => {
      render(<Input testID="input" />);
      const input = screen.getByTestId('input');
      expect(input.getAttribute('aria-invalid')).toBe('false');
    });

    it('should set aria-required when required', () => {
      render(<Input required testID="input" />);
      const input = screen.getByTestId('input');
      expect(input.getAttribute('aria-required')).toBe('true');
    });

    it('should not set aria-required when not required', () => {
      render(<Input testID="input" />);
      const input = screen.getByTestId('input');
      expect(input.getAttribute('aria-required')).toBe('false');
    });
  });

  
  
  

  describe('Business rules enforcement', () => {
    it('should not allow changes when disabled', () => {
      render(<Input disabled value="original" testID="input" />);

      const input = screen.getByTestId('input') as HTMLInputElement;
      const originalValue = input.value;

      
      fireEvent.change(input, { target: { value: 'new' } });

      
      expect(input.disabled).toBe(true);
    });

    it('should enforce required validation', () => {
      render(<Input required testID="input" />);

      const input = screen.getByTestId('input');

      
      fireEvent.blur(input);

      expect(screen.getByText('This field is required')).toBeDefined();

      
      fireEvent.change(input, { target: { value: 'something' } });
      fireEvent.blur(input);

      expect(screen.queryByText('This field is required')).toBeNull();
    });

    it('should enforce email validation', () => {
      render(<Input type="email" testID="input" />);

      const input = screen.getByTestId('input');

      fireEvent.change(input, { target: { value: 'invalid' } });
      fireEvent.blur(input);

      expect(screen.getByText('Please enter a valid email address')).toBeDefined();

      fireEvent.change(input, { target: { value: 'valid@example.com' } });
      fireEvent.blur(input);

      expect(screen.queryByText('Please enter a valid email address')).toBeNull();
    });

    it('should enforce URL validation', () => {
      render(<Input type="url" testID="input" />);

      const input = screen.getByTestId('input');

      fireEvent.change(input, { target: { value: 'not-a-url' } });
      fireEvent.blur(input);

      expect(screen.getByText('Please enter a valid URL')).toBeDefined();

      fireEvent.change(input, { target: { value: 'https://example.com' } });
      fireEvent.blur(input);

      expect(screen.queryByText('Please enter a valid URL')).toBeNull();
    });
  });

  
  
  

  describe('Integration scenarios', () => {
    it('should handle complete user flow with validation', () => {
      render(
        <Input
          type="email"
          required
          helperText="Enter your email"
          testID="input"
        />
      );

      const input = screen.getByTestId('input');

      
      expect(screen.getByText('Enter your email')).toBeDefined();

      
      fireEvent.change(input, { target: { value: 'invalid' } });

      
      fireEvent.blur(input);

      
      expect(screen.getByText('Please enter a valid email address')).toBeDefined();
      expect(screen.queryByText('Enter your email')).toBeNull();

      
      fireEvent.change(input, { target: { value: 'valid@example.com' } });

      
      expect(screen.queryByText('Please enter a valid email address')).toBeNull();

      
      fireEvent.blur(input);

      
      expect(screen.getByText('Enter your email')).toBeDefined();
    });

    it('should handle immediate validation mode', () => {
      render(
        <Input
          type="email"
          validateOnChange={true}
          testID="input"
        />
      );

      const input = screen.getByTestId('input');

      
      fireEvent.change(input, { target: { value: 'invalid' } });
      expect(screen.getByText('Please enter a valid email address')).toBeDefined();

      
      fireEvent.change(input, { target: { value: 'valid@example.com' } });
      expect(screen.queryByText('Please enter a valid email address')).toBeNull();
    });

    it('should render with different sizes', () => {
      const { container: smContainer } = render(<Input size="sm" testID="sm-input" />);
      const smInput = screen.getByTestId('sm-input');
      expect(smInput.style.height).toBe('32px');
      cleanup();

      const { container: mdContainer } = render(<Input size="md" testID="md-input" />);
      const mdInput = screen.getByTestId('md-input');
      expect(mdInput.style.height).toBe('40px');
      cleanup();

      const { container: lgContainer } = render(<Input size="lg" testID="lg-input" />);
      const lgInput = screen.getByTestId('lg-input');
      expect(lgInput.style.height).toBe('48px');
    });

    it('should render with different states', () => {
      render(<Input state="default" testID="default-input" />);
      const defaultInput = screen.getByTestId('default-input');
      expect(defaultInput.style.borderColor).toBeTruthy();
      cleanup();

      render(<Input state="success" testID="success-input" />);
      const successInput = screen.getByTestId('success-input');
      expect(successInput.style.borderColor).toBe('#22c55e');
      cleanup();

      render(<Input state="error" testID="error-input" />);
      const errorInput = screen.getByTestId('error-input');
      expect(errorInput.style.borderColor).toBe('#ef4444');
    });
  });
});
