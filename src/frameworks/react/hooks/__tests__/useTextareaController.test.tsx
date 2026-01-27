

import { describe, it, expect } from 'bun:test';
import { renderHook, act } from '@testing-library/react';
import { useTextareaController } from '../useTextareaController';

describe('useTextareaController', () => {
  describe('Initialization', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useTextareaController({}));

      expect(result.current.viewModel.disabled).toBe(false);
      expect(result.current.viewModel.required).toBe(false);
      expect(result.current.viewModel.characterCount).toBe(0);
    });

    it('should initialize with custom state', () => {
      const { result } = renderHook(() =>
        useTextareaController({
          value: 'Initial',
          required: true,
          maxLength: 500,
        })
      );

      expect(result.current.getValue()).toBe('Initial');
      expect(result.current.viewModel.required).toBe(true);
    });
  });

  describe('handleChange', () => {
    it('should update value', () => {
      const { result } = renderHook(() => useTextareaController({}));

      act(() => {
        result.current.handleChange('Hello World');
      });

      expect(result.current.getValue()).toBe('Hello World');
      expect(result.current.viewModel.characterCount).toBe(11);
    });

    it('should update view model reactively', () => {
      const { result } = renderHook(() => useTextareaController({}));

      act(() => {
        result.current.handleChange('Test');
      });

      expect(result.current.viewModel.wordCount).toBe(1);
    });

    it('should validate when validateOnChange is true', () => {
      const { result } = renderHook(() =>
        useTextareaController({ required: true })
      );

      act(() => {
        result.current.handleChange('', true);
      });

      expect(result.current.viewModel.hasError).toBe(true);
    });
  });

  describe('handleBlur', () => {
    it('should trigger validation', () => {
      const { result } = renderHook(() =>
        useTextareaController({ required: true })
      );

      act(() => {
        result.current.handleBlur();
      });

      expect(result.current.viewModel.hasError).toBe(true);
    });
  });

  describe('validate', () => {
    it('should return validation result', () => {
      const { result } = renderHook(() =>
        useTextareaController({ required: true })
      );

      let isValid: boolean = true;
      act(() => {
        isValid = result.current.validate();
      });

      expect(isValid).toBe(false);
    });
  });

  describe('setValue', () => {
    it('should set value programmatically', () => {
      const { result } = renderHook(() => useTextareaController({}));

      act(() => {
        result.current.setValue('Programmatic');
      });

      expect(result.current.getValue()).toBe('Programmatic');
      expect(result.current.viewModel.characterCount).toBe(12);
    });
  });

  describe('Error Management', () => {
    it('should set error', () => {
      const { result } = renderHook(() => useTextareaController({}));

      act(() => {
        result.current.setError('Custom error');
      });

      expect(result.current.viewModel.hasError).toBe(true);
      expect(result.current.viewModel.errorMessage).toBe('Custom error');
    });

    it('should clear error', () => {
      const { result } = renderHook(() => useTextareaController({}));

      act(() => {
        result.current.setError('Error');
        result.current.clearError();
      });

      expect(result.current.viewModel.hasError).toBe(false);
    });
  });

  describe('State Setters', () => {
    it('should set disabled', () => {
      const { result } = renderHook(() => useTextareaController({}));

      act(() => {
        result.current.setDisabled(true);
      });

      expect(result.current.viewModel.disabled).toBe(true);
    });

    it('should set readOnly', () => {
      const { result } = renderHook(() => useTextareaController({}));

      act(() => {
        result.current.setReadOnly(true);
      });

      expect(result.current.viewModel.readOnly).toBe(true);
    });

    it('should set required', () => {
      const { result } = renderHook(() => useTextareaController({}));

      act(() => {
        result.current.setRequired(true);
      });

      expect(result.current.viewModel.required).toBe(true);
    });

    it('should set maxLength', () => {
      const { result } = renderHook(() => useTextareaController({}));

      act(() => {
        result.current.setMaxLength(100);
        result.current.setValue('Hello');
      });

      expect(result.current.viewModel.remainingCharacters).toBe(95);
    });

    it('should set rows', () => {
      const { result } = renderHook(() => useTextareaController({}));

      act(() => {
        result.current.setRows(10);
      });

      expect(result.current.viewModel.rows).toBe(10);
    });

    it('should set autoResize', () => {
      const { result } = renderHook(() => useTextareaController({}));

      act(() => {
        result.current.setAutoResize(true);
      });

      expect(result.current.viewModel.autoResize).toBe(true);
    });
  });

  describe('Memoization', () => {
    it('should create controller only once and maintain state', () => {
      const { result, rerender } = renderHook(() => useTextareaController({}));

      const firstViewModel = result.current.viewModel;

      
      act(() => {
        result.current.setValue('Test');
      });

      rerender();
      const secondViewModel = result.current.viewModel;

      
      expect(result.current.getValue()).toBe('Test');
      expect(secondViewModel.characterCount).toBe(4);
    });
  });
});
