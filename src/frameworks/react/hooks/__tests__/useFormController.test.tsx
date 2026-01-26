

import { describe, it, expect } from 'bun:test';
import { renderHook, act } from '@testing-library/react';
import { useFormController } from '../useFormController';

describe('useFormController', () => {
  describe('Initialization', () => {
    it('should initialize with empty form', () => {
      const { result } = renderHook(() => useFormController());

      expect(result.current.viewModel.fieldCount).toBe(0);
      expect(result.current.viewModel.status).toBe('idle');
      expect(result.current.viewModel.isPristine).toBe(true);
    });

    it('should accept submit handler', () => {
      const handler = async () => {};
      const { result } = renderHook(() => useFormController(handler));

      expect(result.current).toBeDefined();
    });
  });

  describe('Field Registration', () => {
    it('should register field', () => {
      const { result } = renderHook(() => useFormController());

      act(() => {
        result.current.registerField('email', 'test@test.com', true);
      });

      expect(result.current.viewModel.fieldCount).toBe(1);
      expect(result.current.viewModel.fields.has('email')).toBe(true);
    });

    it('should unregister field', () => {
      const { result } = renderHook(() => useFormController());

      act(() => {
        result.current.registerField('email');
        result.current.unregisterField('email');
      });

      expect(result.current.viewModel.fieldCount).toBe(0);
    });
  });

  describe('Field Values', () => {
    it('should set and get field value', () => {
      const { result } = renderHook(() => useFormController());

      act(() => {
        result.current.registerField('email');
        result.current.setFieldValue('email', 'test@test.com');
      });

      expect(result.current.getFieldValue('email')).toBe('test@test.com');
    });

    it('should get all values', () => {
      const { result } = renderHook(() => useFormController());

      act(() => {
        result.current.registerField('email', 'test@test.com');
        result.current.registerField('password', 'secure123');
      });

      const values = result.current.getValues();
      expect(values).toEqual({
        email: 'test@test.com',
        password: 'secure123',
      });
    });
  });

  describe('Field Validation', () => {
    it('should validate single field', () => {
      const { result } = renderHook(() => useFormController());

      act(() => {
        result.current.registerField('email', '', true);
      });

      let isValid: boolean = true;
      act(() => {
        isValid = result.current.validateField('email');
      });

      expect(isValid).toBe(false);
      expect(result.current.viewModel.fields.get('email')?.error).toBe(
        'This field is required'
      );
    });

    it('should validate entire form', () => {
      const { result } = renderHook(() => useFormController());

      act(() => {
        result.current.registerField('email', '', true);
      });

      let isValid: boolean = true;
      act(() => {
        isValid = result.current.validateForm();
      });

      expect(isValid).toBe(false);
      expect(result.current.viewModel.hasErrors).toBe(true);
    });
  });

  describe('Field Touching', () => {
    it('should touch field', () => {
      const { result } = renderHook(() => useFormController());

      act(() => {
        result.current.registerField('email');
        result.current.touchField('email');
      });

      expect(result.current.viewModel.fields.get('email')?.touched).toBe(true);
    });
  });

  describe('Form Submission', () => {
    it('should prevent submit when invalid', async () => {
      const { result } = renderHook(() => useFormController());

      act(() => {
        result.current.registerField('email', '', true);
      });

      await act(async () => {
        await result.current.submit();
      });

      expect(result.current.viewModel.hasErrors).toBe(true);
    });

    it('should call submit handler when valid', async () => {
      let submitCalled = false;

      const handler = async () => {
        submitCalled = true;
      };

      const { result } = renderHook(() => useFormController(handler));

      act(() => {
        result.current.registerField('email', 'test@test.com', true);
      });

      await act(async () => {
        await result.current.submit();
      });

      expect(submitCalled).toBe(true);
      expect(result.current.viewModel.isSuccess).toBe(true);
    });

    it('should handle submit error', async () => {
      const handler = async () => {
        throw new Error('Network error');
      };

      const { result } = renderHook(() => useFormController(handler));

      act(() => {
        result.current.registerField('email', 'test@test.com', true);
      });

      await act(async () => {
        await result.current.submit();
      });

      expect(result.current.viewModel.isError).toBe(true);
      expect(result.current.viewModel.submitError).toBe('Network error');
    });
  });

  describe('Form Reset', () => {
    it('should reset form', () => {
      const { result } = renderHook(() => useFormController());

      act(() => {
        result.current.registerField('email');
        result.current.setFieldValue('email', 'test@test.com');
        result.current.reset();
      });

      expect(result.current.getFieldValue('email')).toBe('');
      expect(result.current.isPristine()).toBe(true);
    });

    it('should reset to specific values', () => {
      const { result } = renderHook(() => useFormController());

      act(() => {
        result.current.registerField('email');
        result.current.reset({ email: 'new@test.com' });
      });

      expect(result.current.getFieldValue('email')).toBe('new@test.com');
    });
  });

  describe('Submit Error Management', () => {
    it('should set submit error', () => {
      const { result } = renderHook(() => useFormController());

      act(() => {
        result.current.setSubmitError('Something went wrong');
      });

      expect(result.current.viewModel.submitError).toBe('Something went wrong');
      expect(result.current.viewModel.isError).toBe(true);
    });

    it('should clear submit error', () => {
      const { result } = renderHook(() => useFormController());

      act(() => {
        result.current.setSubmitError('Error');
        result.current.clearSubmitError();
      });

      expect(result.current.viewModel.submitError).toBe(null);
    });
  });

  describe('State Queries', () => {
    it('should check if valid', () => {
      const { result } = renderHook(() => useFormController());

      act(() => {
        result.current.registerField('email', 'test@test.com', true);
      });

      expect(result.current.isValid()).toBe(true);
    });

    it('should check if pristine', () => {
      const { result } = renderHook(() => useFormController());

      act(() => {
        result.current.registerField('email');
      });

      expect(result.current.isPristine()).toBe(true);

      act(() => {
        result.current.setFieldValue('email', 'test@test.com');
      });

      expect(result.current.isPristine()).toBe(false);
    });

    it('should check if dirty', () => {
      const { result } = renderHook(() => useFormController());

      act(() => {
        result.current.registerField('email');
      });

      expect(result.current.isDirty()).toBe(false);

      act(() => {
        result.current.setFieldValue('email', 'test@test.com');
      });

      expect(result.current.isDirty()).toBe(true);
    });

    it('should get field count', () => {
      const { result } = renderHook(() => useFormController());

      expect(result.current.getFieldCount()).toBe(0);

      act(() => {
        result.current.registerField('email');
      });

      expect(result.current.getFieldCount()).toBe(1);
    });

    it('should get error count', () => {
      const { result } = renderHook(() => useFormController());

      act(() => {
        result.current.registerField('email', '', true);
        result.current.validateForm();
      });

      expect(result.current.getErrorCount()).toBe(1);
    });
  });

  describe('ViewModel Updates', () => {
    it('should update view model on field registration', () => {
      const { result } = renderHook(() => useFormController());

      const initialFieldCount = result.current.viewModel.fieldCount;

      act(() => {
        result.current.registerField('email');
      });

      expect(result.current.viewModel.fieldCount).toBe(initialFieldCount + 1);
    });

    it('should update view model on value change', () => {
      const { result } = renderHook(() => useFormController());

      act(() => {
        result.current.registerField('email');
        result.current.setFieldValue('email', 'test@test.com');
      });

      expect(result.current.viewModel.fields.get('email')?.value).toBe('test@test.com');
      expect(result.current.viewModel.isDirty).toBe(true);
    });
  });
});
