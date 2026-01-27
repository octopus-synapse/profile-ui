

import { describe, it, expect, beforeEach } from 'bun:test';
import { ButtonController } from '../ButtonController';

describe('ButtonController', () => {
  let controller: ButtonController;

  beforeEach(() => {
    controller = new ButtonController({
      variant: 'primary',
      size: 'md',
    });
  });

  describe('Initialization', () => {
    it('should initialize with default state', () => {
      const viewModel = controller.getViewModel();

      expect(viewModel.disabled).toBe(false);
      expect(viewModel.loading).toBe(false);
      expect(viewModel.interactive).toBe(true);
    });

    it('should initialize with custom state', () => {
      const customController = new ButtonController({
        variant: 'accent',
        size: 'lg',
        disabled: true,
        fullWidth: true,
      });

      const viewModel = customController.getViewModel();

      expect(viewModel.styles.backgroundColor).toBe('#06b6d4');
      expect(viewModel.styles.height).toBe('44px');
      expect(viewModel.disabled).toBe(true);
      expect(viewModel.fullWidth).toBe(true);
    });
  });

  describe('Click Handling', () => {
    it('should execute click handler', async () => {
      let handlerCalled = false;

      await controller.onClick(() => {
        handlerCalled = true;
      });

      expect(handlerCalled).toBe(true);
    });

    it('should handle async click handler', async () => {
      let asyncCompleted = false;

      await controller.onClick(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        asyncCompleted = true;
      });

      expect(asyncCompleted).toBe(true);
    });

    it('should throw error when clicking disabled button', async () => {
      controller.setDisabled(true);

      await expect(async () => {
        await controller.onClick(() => {});
      }).toThrow('Button is not interactive');
    });

    it('should throw error when handler fails', async () => {
      await expect(async () => {
        await controller.onClick(() => {
          throw new Error('Handler failed');
        });
      }).toThrow('Handler failed');
    });

    it('should work without handler', async () => {
      await expect(async () => {
        await controller.onClick();
      }).not.toThrow();
    });
  });

  describe('State Management', () => {
    it('should update disabled state', () => {
      controller.setDisabled(true);
      let viewModel = controller.getViewModel();
      expect(viewModel.disabled).toBe(true);

      controller.setDisabled(false);
      viewModel = controller.getViewModel();
      expect(viewModel.disabled).toBe(false);
    });

    it('should update loading state', () => {
      controller.setLoading(true);
      let viewModel = controller.getViewModel();
      expect(viewModel.loading).toBe(true);
      expect(viewModel.disabled).toBe(true); 

      controller.setLoading(false);
      viewModel = controller.getViewModel();
      expect(viewModel.loading).toBe(false);
    });

    it('should update variant', () => {
      controller.setVariant('danger');
      const viewModel = controller.getViewModel();
      expect(viewModel.styles.backgroundColor).toBe('#ef4444');
    });

    it('should update size', () => {
      controller.setSize('xl');
      const viewModel = controller.getViewModel();
      expect(viewModel.styles.height).toBe('48px');
    });

    it('should update fullWidth', () => {
      controller.setFullWidth(true);
      let viewModel = controller.getViewModel();
      expect(viewModel.fullWidth).toBe(true);

      controller.setFullWidth(false);
      viewModel = controller.getViewModel();
      expect(viewModel.fullWidth).toBe(false);
    });
  });

  describe('ViewModel Updates', () => {
    it('should return updated view model after state change', () => {
      const before = controller.getViewModel();
      expect(before.disabled).toBe(false);

      controller.setDisabled(true);

      const after = controller.getViewModel();
      expect(after.disabled).toBe(true);
    });

    it('should return fresh view model each call', () => {
      const vm1 = controller.getViewModel();
      const vm2 = controller.getViewModel();

      expect(vm1).not.toBe(vm2); 
      expect(vm1).toEqual(vm2); 
    });
  });

  describe('Integration with Use Cases', () => {
    it('should respect business rules during click', async () => {
      controller.setLoading(true);

      await expect(async () => {
        await controller.onClick(() => {});
      }).toThrow('Button is not interactive');

      
      const viewModel = controller.getViewModel();
      expect(viewModel.loading).toBe(true);
    });

    it('should handle state transitions during async operation', async () => {
      const initialViewModel = controller.getViewModel();
      expect(initialViewModel.loading).toBe(false);

      const clickPromise = controller.onClick(async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
      });

      
      
      

      await clickPromise;

      const finalViewModel = controller.getViewModel();
      expect(finalViewModel.loading).toBe(false);
    });
  });

  describe('Error Recovery', () => {
    it('should clear loading state after error', async () => {
      try {
        await controller.onClick(async () => {
          throw new Error('Simulated error');
        });
      } catch (_error) {
        // Expected error
      }

      const viewModel = controller.getViewModel();
      expect(viewModel.loading).toBe(false);
    });

    it('should remain interactive after error if not disabled', async () => {
      try {
        await controller.onClick(() => {
          throw new Error('Error');
        });
      } catch (_error) {
        // Expected error
      }

      const viewModel = controller.getViewModel();
      expect(viewModel.interactive).toBe(true);
    });
  });
});
