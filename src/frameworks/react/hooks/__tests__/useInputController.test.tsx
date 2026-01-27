

import { describe, it, expect } from 'bun:test';
import { renderHook, act } from '@testing-library/react';
import { useInputController } from '../useInputController';

describe('useInputController Hook', () => {
  
  
  

  describe('Initialization', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useInputController({}));

      expect(result.current.viewModel.disabled).toBe(false);
      expect(result.current.viewModel.readOnly).toBe(false);
      expect(result.current.viewModel.required).toBe(false);
      expect(result.current.viewModel.hasError).toBe(false);
    });

    it('should initialize with custom state', () => {
      const { result } = renderHook(() =>
        useInputController({
          type: 'email',
          value: 'test@example.com',
          required: true,
        })
      );

      expect(result.current.viewModel.required).toBe(true);
      expect(result.current.getValue()).toBe('test@example.com');
    });
  });

  
  
  

  describe('handleChange()', () => {
    it('should update value', () => {
      const { result } = renderHook(() => useInputController({ value: 'old' }));

      act(() => {
        result.current.handleChange('new');
      });

      expect(result.current.getValue()).toBe('new');
    });

    it('should update view model after change', () => {
      const { result } = renderHook(() =>
        useInputController({
          value: 'bad',
          error: 'Error',
          state: 'error',
        })
      );

      expect(result.current.viewModel.hasError).toBe(true);

      act(() => {
        result.current.handleChange('good');
      });

      expect(result.current.viewModel.hasError).toBe(false);
    });

    it('should validate when validateOnChange is true', () => {
      const { result } = renderHook(() =>
        useInputController({
          type: 'email',
          value: '',
        })
      );

      act(() => {
        result.current.handleChange('invalid-email', true);
      });

      expect(result.current.viewModel.hasError).toBe(true);
    });

    it('should not validate when validateOnChange is false', () => {
      const { result } = renderHook(() =>
        useInputController({
          type: 'email',
          value: '',
        })
      );

      act(() => {
        result.current.handleChange('invalid-email', false);
      });

      expect(result.current.viewModel.hasError).toBe(false);
    });
  });

  
  
  

  describe('handleBlur()', () => {
    it('should validate on blur', () => {
      const { result } = renderHook(() =>
        useInputController({
          type: 'email',
          value: 'invalid-email',
        })
      );

      expect(result.current.viewModel.hasError).toBe(false);

      act(() => {
        result.current.handleBlur();
      });

      expect(result.current.viewModel.hasError).toBe(true);
    });

    it('should update view model after blur', () => {
      const { result } = renderHook(() =>
        useInputController({
          type: 'email',
          value: 'valid@example.com',
        })
      );

      act(() => {
        result.current.handleBlur();
      });

      expect(result.current.viewModel.hasError).toBe(false);
    });
  });

  
  
  

  describe('validate()', () => {
    it('should return validation result', () => {
      const { result } = renderHook(() =>
        useInputController({
          type: 'email',
          value: 'valid@example.com',
        })
      );

      let isValid: boolean = false;
      act(() => {
        isValid = result.current.validate();
      });

      expect(isValid).toBe(true);
    });

    it('should update view model with error on validation failure', () => {
      const { result } = renderHook(() =>
        useInputController({
          type: 'email',
          value: 'invalid',
        })
      );

      act(() => {
        result.current.validate();
      });

      expect(result.current.viewModel.hasError).toBe(true);
    });
  });

  
  
  

  describe('getValue() / setValue()', () => {
    it('should get value', () => {
      const { result } = renderHook(() => useInputController({ value: 'test' }));

      expect(result.current.getValue()).toBe('test');
    });

    it('should set value and update view model', () => {
      const { result } = renderHook(() =>
        useInputController({
          value: 'bad',
          error: 'Error',
          state: 'error',
        })
      );

      expect(result.current.viewModel.hasError).toBe(true);

      act(() => {
        result.current.setValue('good');
      });

      expect(result.current.getValue()).toBe('good');
      expect(result.current.viewModel.hasError).toBe(false);
    });
  });

  
  
  

  describe('setError() / clearError()', () => {
    it('should set error and update view model', () => {
      const { result } = renderHook(() => useInputController({}));

      act(() => {
        result.current.setError('Custom error');
      });

      expect(result.current.viewModel.hasError).toBe(true);
      expect(result.current.viewModel.errorMessage).toBe('Custom error');
    });

    it('should clear error and update view model', () => {
      const { result } = renderHook(() =>
        useInputController({
          error: 'Error',
          state: 'error',
        })
      );

      expect(result.current.viewModel.hasError).toBe(true);

      act(() => {
        result.current.clearError();
      });

      expect(result.current.viewModel.hasError).toBe(false);
    });
  });

  
  
  

  describe('State setters', () => {
    it('should set disabled', () => {
      const { result } = renderHook(() => useInputController({ disabled: false }));

      act(() => {
        result.current.setDisabled(true);
      });

      expect(result.current.viewModel.disabled).toBe(true);
    });

    it('should set readOnly', () => {
      const { result } = renderHook(() => useInputController({ readOnly: false }));

      act(() => {
        result.current.setReadOnly(true);
      });

      expect(result.current.viewModel.readOnly).toBe(true);
    });

    it('should set required', () => {
      const { result } = renderHook(() => useInputController({ required: false }));

      act(() => {
        result.current.setRequired(true);
      });

      expect(result.current.viewModel.required).toBe(true);
    });

    it('should set type', () => {
      const { result } = renderHook(() => useInputController({ type: 'text' }));

      act(() => {
        result.current.setType('email');
        result.current.setValue('invalid-email');
        result.current.validate();
      });

      expect(result.current.viewModel.hasError).toBe(true);
    });

    it('should set size', () => {
      const { result } = renderHook(() => useInputController({ size: 'md' }));

      act(() => {
        result.current.setSize('lg');
      });

      expect(result.current.viewModel.styles.height).toBe('48px');
    });

    it('should set state type', () => {
      const { result } = renderHook(() => useInputController({ state: 'default' }));

      act(() => {
        result.current.setStateType('success');
      });

      expect(result.current.viewModel.styles.borderColor).toBe('#22c55e');
    });
  });

  
  
  

  describe('Integration scenarios', () => {
    it('should handle user typing flow with validation on blur', () => {
      const { result } = renderHook(() =>
        useInputController({
          type: 'email',
          value: '',
          required: true,
        })
      );

      
      expect(result.current.viewModel.hasError).toBe(false);

      
      act(() => {
        result.current.handleChange('invalid');
      });
      expect(result.current.viewModel.hasError).toBe(false);

      
      act(() => {
        result.current.handleBlur();
      });
      expect(result.current.viewModel.hasError).toBe(true);
      expect(result.current.viewModel.errorMessage).toBe(
        'Please enter a valid email address'
      );

      
      act(() => {
        result.current.handleChange('valid@example.com');
      });
      expect(result.current.viewModel.hasError).toBe(false);

      
      act(() => {
        result.current.handleBlur();
      });
      expect(result.current.viewModel.hasError).toBe(false);
    });

    it('should handle immediate validation on change', () => {
      const { result } = renderHook(() =>
        useInputController({
          type: 'email',
          value: '',
        })
      );

      act(() => {
        result.current.handleChange('invalid', true);
      });
      expect(result.current.viewModel.hasError).toBe(true);

      act(() => {
        result.current.handleChange('valid@example.com', true);
      });
      expect(result.current.viewModel.hasError).toBe(false);
    });

    it('should handle programmatic value and error setting', () => {
      const { result } = renderHook(() => useInputController({}));

      act(() => {
        result.current.setValue('some value');
        result.current.setError('Custom error');
      });

      expect(result.current.getValue()).toBe('some value');
      expect(result.current.viewModel.hasError).toBe(true);
      expect(result.current.viewModel.errorMessage).toBe('Custom error');

      act(() => {
        result.current.clearError();
      });

      expect(result.current.viewModel.hasError).toBe(false);
    });
  });

  
  
  

  describe('Hook stability', () => {
    it('should maintain stable function references across renders', () => {
      const { result, rerender } = renderHook(() => useInputController({}));

      const handleChange1 = result.current.handleChange;
      const handleBlur1 = result.current.handleBlur;

      rerender();

      expect(result.current.handleChange).toBe(handleChange1);
      expect(result.current.handleBlur).toBe(handleBlur1);
    });

    it('should create controller only once', () => {
      const { result, rerender } = renderHook(() =>
        useInputController({ value: 'initial' })
      );

      const initialValue = result.current.getValue();

      
      rerender();

      
      expect(result.current.getValue()).toBe(initialValue);
    });
  });
});
