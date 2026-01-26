

import { describe, it, expect } from 'bun:test';
import { renderHook, act } from '@testing-library/react';
import { useButtonController } from '../useButtonController';

describe('useButtonController', () => {
  describe('Initialization', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useButtonController({}));

      expect(result.current.viewModel.disabled).toBe(false);
      expect(result.current.viewModel.loading).toBe(false);
      expect(result.current.viewModel.interactive).toBe(true);
    });

    it('should initialize with custom state', () => {
      const { result } = renderHook(() =>
        useButtonController({
          variant: 'accent',
          size: 'lg',
          disabled: true,
        })
      );

      expect(result.current.viewModel.styles.backgroundColor).toBe('#06b6d4');
      expect(result.current.viewModel.styles.height).toBe('44px');
      expect(result.current.viewModel.disabled).toBe(true);
    });
  });

  describe('Click Handling', () => {
    it('should execute click handler', async () => {
      const { result } = renderHook(() => useButtonController({}));
      let handlerCalled = false;

      await act(async () => {
        await result.current.handleClick(() => {
          handlerCalled = true;
        });
      });

      expect(handlerCalled).toBe(true);
    });

    it('should handle async click handler', async () => {
      const { result } = renderHook(() => useButtonController({}));
      let asyncCompleted = false;

      await act(async () => {
        await result.current.handleClick(async () => {
          await new Promise((resolve) => setTimeout(resolve, 10));
          asyncCompleted = true;
        });
      });

      expect(asyncCompleted).toBe(true);
    });

    it('should update view model after click', async () => {
      const { result } = renderHook(() => useButtonController({}));

      await act(async () => {
        await result.current.handleClick(() => {});
      });

      
      expect(result.current.viewModel.interactive).toBe(true);
    });

    it('should handle click errors', async () => {
      const { result } = renderHook(() => useButtonController({}));

      await expect(async () => {
        await act(async () => {
          await result.current.handleClick(() => {
            throw new Error('Click failed');
          });
        });
      }).toThrow('Click failed');
    });
  });

  describe('State Updates', () => {
    it('should update disabled state', () => {
      const { result } = renderHook(() => useButtonController({}));

      act(() => {
        result.current.setDisabled(true);
      });

      expect(result.current.viewModel.disabled).toBe(true);

      act(() => {
        result.current.setDisabled(false);
      });

      expect(result.current.viewModel.disabled).toBe(false);
    });

    it('should update loading state', () => {
      const { result } = renderHook(() => useButtonController({}));

      act(() => {
        result.current.setLoading(true);
      });

      expect(result.current.viewModel.loading).toBe(true);
      expect(result.current.viewModel.disabled).toBe(true); 

      act(() => {
        result.current.setLoading(false);
      });

      expect(result.current.viewModel.loading).toBe(false);
    });

    it('should update variant', () => {
      const { result } = renderHook(() => useButtonController({}));

      act(() => {
        result.current.setVariant('danger');
      });

      expect(result.current.viewModel.styles.backgroundColor).toBe('#ef4444');
    });

    it('should update size', () => {
      const { result } = renderHook(() => useButtonController({}));

      act(() => {
        result.current.setSize('xl');
      });

      expect(result.current.viewModel.styles.height).toBe('48px');
    });

    it('should update fullWidth', () => {
      const { result } = renderHook(() => useButtonController({}));

      act(() => {
        result.current.setFullWidth(true);
      });

      expect(result.current.viewModel.fullWidth).toBe(true);
    });
  });

  describe('React Lifecycle', () => {
    it('should maintain controller instance across re-renders', () => {
      const { result, rerender } = renderHook(() => useButtonController({}));

      const firstController = result.current;

      rerender();

      const secondController = result.current;

      
      expect(firstController.handleClick).toBe(secondController.handleClick);
    });

    it('should update view model on state changes', () => {
      const { result } = renderHook(() => useButtonController({}));

      const initialViewModel = result.current.viewModel;

      act(() => {
        result.current.setDisabled(true);
      });

      const updatedViewModel = result.current.viewModel;

      expect(initialViewModel.disabled).toBe(false);
      expect(updatedViewModel.disabled).toBe(true);
    });
  });
});
