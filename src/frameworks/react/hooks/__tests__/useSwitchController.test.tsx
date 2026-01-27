

import { describe, it, expect, mock } from 'bun:test';
import { renderHook, act } from '@testing-library/react';
import { useSwitchController } from '../useSwitchController';
import { mustBeOn } from '../../../../domain/use-cases/switch/ValidateSwitch';

describe('useSwitchController', () => {
  
  
  

  describe('Initialization', () => {
    it('should initialize with default state', () => {
      
      const { result } = renderHook(() => useSwitchController({}));

      
      expect(result.current.viewModel.on).toBe(false);
      expect(result.current.viewModel.off).toBe(true);
      expect(result.current.viewModel.disabled).toBe(false);
      expect(result.current.viewModel.readonly).toBe(false);
    });

    it('should initialize with custom state', () => {
      
      const { result } = renderHook(() =>
        useSwitchController({ value: true, variant: 'error' })
      );

      
      expect(result.current.viewModel.on).toBe(true);
    });
  });

  
  
  

  describe('handleToggle()', () => {
    it('should toggle switch from off to on', async () => {
      
      const { result } = renderHook(() => useSwitchController({ value: false }));

      
      await act(async () => {
        await result.current.handleToggle();
      });

      
      expect(result.current.viewModel.on).toBe(true);
    });

    it('should toggle switch from on to off', async () => {
      
      const { result } = renderHook(() => useSwitchController({ value: true }));

      
      await act(async () => {
        await result.current.handleToggle();
      });

      
      expect(result.current.viewModel.off).toBe(true);
    });

    it('should call onChange handler', async () => {
      
      const { result } = renderHook(() => useSwitchController({ value: false }));
      const onChange = mock((value: boolean) => {});

      
      await act(async () => {
        await result.current.handleToggle(onChange);
      });

      
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('should update view model after toggle', async () => {
      
      const { result } = renderHook(() => useSwitchController({ value: false }));
      const beforeStyles = result.current.viewModel.styles.thumbTranslate;

      
      await act(async () => {
        await result.current.handleToggle();
      });

      
      const afterStyles = result.current.viewModel.styles.thumbTranslate;
      expect(beforeStyles).not.toBe(afterStyles);
      expect(beforeStyles).toBe('2px'); 
      expect(afterStyles).toBe('16px'); 
    });

    it('should handle errors from onChange handler', async () => {
      
      const { result } = renderHook(() => useSwitchController({ value: false }));
      const onChange = mock((value: boolean) => {
        throw new Error('Handler error');
      });

      
      await act(async () => {
        await expect(result.current.handleToggle(onChange)).rejects.toThrow(
          'Handler error'
        );
      });

      
      expect(result.current.viewModel.off).toBe(true);
    });
  });

  
  
  

  describe('setValue()', () => {
    it('should set switch to on', async () => {
      
      const { result } = renderHook(() => useSwitchController({ value: false }));

      
      await act(async () => {
        await result.current.setValue(true);
      });

      
      expect(result.current.viewModel.on).toBe(true);
    });

    it('should set switch to off', async () => {
      
      const { result } = renderHook(() => useSwitchController({ value: true }));

      
      await act(async () => {
        await result.current.setValue(false);
      });

      
      expect(result.current.viewModel.off).toBe(true);
    });

    it('should call onChange handler with explicit value', async () => {
      
      const { result } = renderHook(() => useSwitchController({ value: false }));
      const onChange = mock((value: boolean) => {});

      
      await act(async () => {
        await result.current.setValue(true, onChange);
      });

      
      expect(onChange).toHaveBeenCalledWith(true);
    });
  });

  
  
  

  describe('validate()', () => {
    it('should return valid for default switch', () => {
      
      const { result } = renderHook(() => useSwitchController({}));

      
      const validation = result.current.validate();

      
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should validate with custom rules', () => {
      
      const { result } = renderHook(() => useSwitchController({ value: false }));

      
      act(() => {
        result.current.setValidationRules([mustBeOn('Must be on')]);
      });
      const validation = result.current.validate();

      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Must be on');
    });

    it('should return valid when rules pass', () => {
      
      const { result } = renderHook(() => useSwitchController({ value: true }));

      
      act(() => {
        result.current.setValidationRules([mustBeOn()]);
      });
      const validation = result.current.validate();

      
      expect(validation.isValid).toBe(true);
    });
  });

  
  
  

  describe('State setters', () => {
    it('should set disabled state and update view model', () => {
      
      const { result } = renderHook(() => useSwitchController({ disabled: false }));

      
      act(() => {
        result.current.setDisabled(true);
      });

      
      expect(result.current.viewModel.disabled).toBe(true);
      expect(result.current.viewModel.interactive).toBe(false);
    });

    it('should set readonly state and update view model', () => {
      
      const { result } = renderHook(() => useSwitchController({ readonly: false }));

      
      act(() => {
        result.current.setReadonly(true);
      });

      
      expect(result.current.viewModel.readonly).toBe(true);
      expect(result.current.viewModel.interactive).toBe(false);
    });

    it('should set variant and update view model styles', () => {
      
      const { result } = renderHook(() =>
        useSwitchController({ variant: 'default', value: false })
      );

      
      act(() => {
        result.current.setVariant('error');
      });

      
      expect(result.current.viewModel.styles.borderColor).toBe('#ef4444');
    });

    it('should enforce mutual exclusivity when setting disabled', () => {
      
      const { result } = renderHook(() => useSwitchController({ readonly: true }));

      
      act(() => {
        result.current.setDisabled(true);
      });

      
      expect(result.current.viewModel.disabled).toBe(true);
      expect(result.current.viewModel.readonly).toBe(false);
    });
  });

  
  
  

  describe('Integration scenarios', () => {
    it('should handle multiple operations in sequence', async () => {
      
      const { result } = renderHook(() => useSwitchController({ value: false }));

      
      await act(async () => {
        await result.current.handleToggle();
      });
      expect(result.current.viewModel.on).toBe(true);

      
      act(() => {
        result.current.setVariant('error');
      });
      expect(result.current.viewModel.styles.borderColor).toBe('#ef4444');

      
      await act(async () => {
        await result.current.handleToggle();
      });
      expect(result.current.viewModel.off).toBe(true);
    });

    it('should maintain state consistency across re-renders', async () => {
      
      const { result, rerender } = renderHook(() =>
        useSwitchController({ value: false })
      );

      
      await act(async () => {
        await result.current.handleToggle();
      });

      
      rerender();

      
      expect(result.current.viewModel.on).toBe(true);
    });

    it('should handle disabled state preventing toggle', async () => {
      
      const { result } = renderHook(() => useSwitchController({ value: false }));

      
      act(() => {
        result.current.setDisabled(true);
      });

      
      await act(async () => {
        await expect(result.current.handleToggle()).rejects.toThrow();
      });

      
      expect(result.current.viewModel.off).toBe(true);
    });
  });

  
  
  

  describe('Performance and stability', () => {
    it('should memoize controller instance', () => {
      
      const { result, rerender } = renderHook(() => useSwitchController({}));
      const firstViewModel = result.current.viewModel;

      
      rerender();

      
      
      expect(result.current.viewModel.on).toBe(firstViewModel.on);
    });

    it('should not create new controller on re-render', () => {
      
      const { result, rerender } = renderHook(() => useSwitchController({}));
      const firstHandler = result.current.handleToggle;

      
      rerender();

      
      expect(result.current.handleToggle).toBe(firstHandler);
    });
  });
});
