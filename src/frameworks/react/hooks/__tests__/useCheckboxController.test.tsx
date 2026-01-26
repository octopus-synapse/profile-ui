

import { describe, it, expect } from 'bun:test';
import { renderHook, act } from '@testing-library/react';
import { useCheckboxController } from '../useCheckboxController';
import { mustBeChecked } from '../../../../domain/use-cases/checkbox/ValidateCheckbox';

describe('useCheckboxController', () => {
  describe('Initialization', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useCheckboxController({}));

      expect(result.current.viewModel.checked).toBe(false);
      expect(result.current.viewModel.unchecked).toBe(true);
      expect(result.current.viewModel.disabled).toBe(false);
      expect(result.current.viewModel.readonly).toBe(false);
      expect(result.current.viewModel.interactive).toBe(true);
    });

    it('should initialize with custom state', () => {
      const { result } = renderHook(() =>
        useCheckboxController({
          value: true,
          variant: 'error',
          disabled: true,
          required: true,
        })
      );

      expect(result.current.viewModel.checked).toBe(true);
      expect(result.current.viewModel.disabled).toBe(true);
      expect(result.current.viewModel.required).toBe(true);
    });

    it('should initialize with indeterminate state', () => {
      const { result } = renderHook(() =>
        useCheckboxController({ value: 'indeterminate' })
      );

      expect(result.current.viewModel.indeterminate).toBe(true);
      expect(result.current.viewModel.checked).toBe(false);
      expect(result.current.viewModel.unchecked).toBe(false);
    });
  });

  describe('Toggle Handling', () => {
    it('should toggle checkbox from false to true', async () => {
      const { result } = renderHook(() => useCheckboxController({}));

      await act(async () => {
        await result.current.handleToggle();
      });

      expect(result.current.viewModel.checked).toBe(true);
    });

    it('should toggle checkbox from true to false', async () => {
      const { result } = renderHook(() =>
        useCheckboxController({ value: true })
      );

      await act(async () => {
        await result.current.handleToggle();
      });

      expect(result.current.viewModel.checked).toBe(false);
    });

    it('should toggle checkbox from indeterminate to true', async () => {
      const { result } = renderHook(() =>
        useCheckboxController({ value: 'indeterminate' })
      );

      await act(async () => {
        await result.current.handleToggle();
      });

      expect(result.current.viewModel.checked).toBe(true);
    });

    it('should execute toggle handler', async () => {
      const { result } = renderHook(() => useCheckboxController({}));
      let handlerCalled = false;
      let capturedValue: any;

      await act(async () => {
        await result.current.handleToggle((value) => {
          handlerCalled = true;
          capturedValue = value;
        });
      });

      expect(handlerCalled).toBe(true);
      expect(capturedValue).toBe(true);
    });

    it('should handle async toggle handler', async () => {
      const { result } = renderHook(() => useCheckboxController({}));
      let asyncCompleted = false;

      await act(async () => {
        await result.current.handleToggle(async () => {
          await new Promise((resolve) => setTimeout(resolve, 10));
          asyncCompleted = true;
        });
      });

      expect(asyncCompleted).toBe(true);
    });

    it('should handle toggle errors', async () => {
      const { result } = renderHook(() => useCheckboxController({}));

      await expect(async () => {
        await act(async () => {
          await result.current.handleToggle(() => {
            throw new Error('Toggle failed');
          });
        });
      }).toThrow('Toggle failed');
    });

    it('should throw error when toggling disabled checkbox', async () => {
      const { result } = renderHook(() =>
        useCheckboxController({ disabled: true })
      );

      await expect(async () => {
        await act(async () => {
          await result.current.handleToggle();
        });
      }).toThrow('not interactive');
    });

    it('should throw error when toggling readonly checkbox', async () => {
      const { result } = renderHook(() =>
        useCheckboxController({ readonly: true })
      );

      await expect(async () => {
        await act(async () => {
          await result.current.handleToggle();
        });
      }).toThrow('not interactive');
    });
  });

  describe('Set Value', () => {
    it('should set value to true', async () => {
      const { result } = renderHook(() => useCheckboxController({}));

      await act(async () => {
        await result.current.setValue(true);
      });

      expect(result.current.viewModel.checked).toBe(true);
    });

    it('should set value to false', async () => {
      const { result } = renderHook(() =>
        useCheckboxController({ value: true })
      );

      await act(async () => {
        await result.current.setValue(false);
      });

      expect(result.current.viewModel.checked).toBe(false);
    });

    it('should set value to indeterminate', async () => {
      const { result } = renderHook(() => useCheckboxController({}));

      await act(async () => {
        await result.current.setValue('indeterminate');
      });

      expect(result.current.viewModel.indeterminate).toBe(true);
    });

    it('should execute setValue handler', async () => {
      const { result } = renderHook(() => useCheckboxController({}));
      let handlerCalled = false;
      let capturedValue: any;

      await act(async () => {
        await result.current.setValue('indeterminate', (value) => {
          handlerCalled = true;
          capturedValue = value;
        });
      });

      expect(handlerCalled).toBe(true);
      expect(capturedValue).toBe('indeterminate');
    });

    it('should throw error when setting value on disabled checkbox', async () => {
      const { result } = renderHook(() =>
        useCheckboxController({ disabled: true })
      );

      await expect(async () => {
        await act(async () => {
          await result.current.setValue(true);
        });
      }).toThrow('not interactive');
    });
  });

  describe('Validation', () => {
    it('should validate required checkbox', () => {
      const { result } = renderHook(() =>
        useCheckboxController({ required: true })
      );

      const validation = result.current.validate();

      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('This field is required');
    });

    it('should validate checked required checkbox', () => {
      const { result } = renderHook(() =>
        useCheckboxController({ value: true, required: true })
      );

      const validation = result.current.validate();

      expect(validation.isValid).toBe(true);
      expect(validation.errors).toEqual([]);
    });

    it('should apply custom validation rules', () => {
      const { result } = renderHook(() => useCheckboxController({}));

      act(() => {
        result.current.setValidationRules([mustBeChecked]);
      });

      const validation = result.current.validate();

      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Must be checked');
    });

    it('should update validation after state change', async () => {
      const { result } = renderHook(() =>
        useCheckboxController({ required: true })
      );

      let validation = result.current.validate();
      expect(validation.isValid).toBe(false);

      await act(async () => {
        await result.current.setValue(true);
      });

      validation = result.current.validate();
      expect(validation.isValid).toBe(true);
    });
  });

  describe('State Updates', () => {
    it('should update disabled state', () => {
      const { result } = renderHook(() => useCheckboxController({}));

      act(() => {
        result.current.setDisabled(true);
      });

      expect(result.current.viewModel.disabled).toBe(true);
      expect(result.current.viewModel.interactive).toBe(false);
    });

    it('should update readonly state', () => {
      const { result } = renderHook(() => useCheckboxController({}));

      act(() => {
        result.current.setReadonly(true);
      });

      expect(result.current.viewModel.readonly).toBe(true);
      expect(result.current.viewModel.interactive).toBe(false);
    });

    it('should update variant', () => {
      const { result } = renderHook(() => useCheckboxController({}));

      act(() => {
        result.current.setVariant('error');
      });

      
      expect(result.current.viewModel.styles.borderColor).toContain('ef4444');
    });

    it('should update required state', () => {
      const { result } = renderHook(() => useCheckboxController({}));

      act(() => {
        result.current.setRequired(true);
      });

      expect(result.current.viewModel.required).toBe(true);
    });
  });

  describe('View Model Updates', () => {
    it('should update viewModel after toggle', async () => {
      const { result } = renderHook(() => useCheckboxController({}));

      const initialViewModel = result.current.viewModel;

      await act(async () => {
        await result.current.handleToggle();
      });

      expect(result.current.viewModel).not.toBe(initialViewModel);
      expect(result.current.viewModel.checked).toBe(true);
    });

    it('should update viewModel after setValue', async () => {
      const { result } = renderHook(() => useCheckboxController({}));

      await act(async () => {
        await result.current.setValue('indeterminate');
      });

      expect(result.current.viewModel.indeterminate).toBe(true);
    });

    it('should update viewModel after state changes', () => {
      const { result } = renderHook(() => useCheckboxController({}));

      act(() => {
        result.current.setDisabled(true);
      });

      expect(result.current.viewModel.disabled).toBe(true);

      act(() => {
        result.current.setRequired(true);
      });

      expect(result.current.viewModel.required).toBe(true);
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle multiple sequential toggles', async () => {
      const { result } = renderHook(() => useCheckboxController({}));

      await act(async () => {
        await result.current.handleToggle();
      });
      expect(result.current.viewModel.checked).toBe(true);

      await act(async () => {
        await result.current.handleToggle();
      });
      expect(result.current.viewModel.checked).toBe(false);

      await act(async () => {
        await result.current.handleToggle();
      });
      expect(result.current.viewModel.checked).toBe(true);
    });

    it('should handle mixed toggle and setValue operations', async () => {
      const { result } = renderHook(() => useCheckboxController({}));

      await act(async () => {
        await result.current.handleToggle();
      });
      expect(result.current.viewModel.checked).toBe(true);

      await act(async () => {
        await result.current.setValue('indeterminate');
      });
      expect(result.current.viewModel.indeterminate).toBe(true);

      await act(async () => {
        await result.current.handleToggle();
      });
      expect(result.current.viewModel.checked).toBe(true);
    });

    it('should maintain state consistency through complex interactions', async () => {
      const { result } = renderHook(() =>
        useCheckboxController({ required: true })
      );

      act(() => {
        result.current.setVariant('error');
      });

      await act(async () => {
        await result.current.setValue(true);
      });

      const validation = result.current.validate();

      expect(result.current.viewModel.checked).toBe(true);
      expect(result.current.viewModel.required).toBe(true);
      expect(validation.isValid).toBe(true);
    });

    it('should handle state transitions correctly', async () => {
      const { result } = renderHook(() => useCheckboxController({}));

      await act(async () => {
        await result.current.handleToggle();
      });
      expect(result.current.viewModel.interactive).toBe(true);

      act(() => {
        result.current.setDisabled(true);
      });
      expect(result.current.viewModel.interactive).toBe(false);

      await expect(async () => {
        await act(async () => {
          await result.current.handleToggle();
        });
      }).toThrow();

      act(() => {
        result.current.setDisabled(false);
      });
      expect(result.current.viewModel.interactive).toBe(true);
    });
  });
});
