

import { describe, it, expect, mock } from 'bun:test';
import { SwitchController } from '../SwitchController';
import { mustBeOn } from '../../../domain/use-cases/switch/ValidateSwitch';

describe('SwitchController', () => {
  
  
  

  describe('Initialization', () => {
    it('should initialize with default state', () => {
      
      const controller = new SwitchController({});

      
      const viewModel = controller.getViewModel();
      expect(viewModel.on).toBe(false);
      expect(viewModel.off).toBe(true);
      expect(viewModel.disabled).toBe(false);
      expect(viewModel.readonly).toBe(false);
    });

    it('should initialize with custom state', () => {
      
      const controller = new SwitchController({
        value: true,
        variant: 'error',
        disabled: false,
        readonly: false,
      });

      
      const viewModel = controller.getViewModel();
      expect(viewModel.on).toBe(true);
      expect(viewModel.off).toBe(false);
    });
  });

  
  
  

  describe('onToggle()', () => {
    it('should toggle switch from off to on', async () => {
      
      const controller = new SwitchController({ value: false });

      
      await controller.onToggle();

      
      const viewModel = controller.getViewModel();
      expect(viewModel.on).toBe(true);
    });

    it('should toggle switch from on to off', async () => {
      
      const controller = new SwitchController({ value: true });

      
      await controller.onToggle();

      
      const viewModel = controller.getViewModel();
      expect(viewModel.off).toBe(true);
    });

    it('should call onChange handler with new value', async () => {
      
      const controller = new SwitchController({ value: false });
      const onChange = mock((value: boolean) => {});

      
      await controller.onToggle(onChange);

      
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('should throw error when toggling disabled switch', async () => {
      
      const controller = new SwitchController({ disabled: true });

      
      await expect(controller.onToggle()).rejects.toThrow(
        'Switch is not interactive (disabled or readonly)'
      );
    });

    it('should throw error when toggling readonly switch', async () => {
      
      const controller = new SwitchController({ readonly: true });

      
      await expect(controller.onToggle()).rejects.toThrow(
        'Switch is not interactive (disabled or readonly)'
      );
    });

    it('should handle async onChange handler', async () => {
      
      const controller = new SwitchController({ value: false });
      let asyncValue: boolean | null = null;

      const onChange = async (value: boolean) => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        asyncValue = value;
      };

      
      await controller.onToggle(onChange);

      
      expect(asyncValue).toBe(true);
    });

    it('should revert state when onChange throws error', async () => {
      
      const controller = new SwitchController({ value: false });
      const onChange = mock((value: boolean) => {
        throw new Error('Handler error');
      });

      
      await expect(controller.onToggle(onChange)).rejects.toThrow('Handler error');

      
      const viewModel = controller.getViewModel();
      expect(viewModel.off).toBe(true);
    });
  });

  
  
  

  describe('setValue()', () => {
    it('should set switch to on', async () => {
      
      const controller = new SwitchController({ value: false });

      
      await controller.setValue(true);

      
      const viewModel = controller.getViewModel();
      expect(viewModel.on).toBe(true);
    });

    it('should set switch to off', async () => {
      
      const controller = new SwitchController({ value: true });

      
      await controller.setValue(false);

      
      const viewModel = controller.getViewModel();
      expect(viewModel.off).toBe(true);
    });

    it('should call onChange handler with explicit value', async () => {
      
      const controller = new SwitchController({ value: false });
      const onChange = mock((value: boolean) => {});

      
      await controller.setValue(true, onChange);

      
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('should throw error when setting value on disabled switch', async () => {
      
      const controller = new SwitchController({ disabled: true });

      
      await expect(controller.setValue(true)).rejects.toThrow(
        'Switch is not interactive (disabled or readonly)'
      );
    });
  });

  
  
  

  describe('validate()', () => {
    it('should return valid for default switch without rules', () => {
      
      const controller = new SwitchController({});

      
      const result = controller.validate();

      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate with custom rules', () => {
      
      const controller = new SwitchController({ value: false });
      controller.setValidationRules([mustBeOn('Must accept terms')]);

      
      const result = controller.validate();

      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Must accept terms');
    });

    it('should return valid when custom rules pass', () => {
      
      const controller = new SwitchController({ value: true });
      controller.setValidationRules([mustBeOn()]);

      
      const result = controller.validate();

      
      expect(result.isValid).toBe(true);
    });
  });

  
  
  

  describe('State setters', () => {
    it('should set disabled state', () => {
      
      const controller = new SwitchController({ disabled: false });

      
      controller.setDisabled(true);

      
      const viewModel = controller.getViewModel();
      expect(viewModel.disabled).toBe(true);
    });

    it('should set readonly state', () => {
      
      const controller = new SwitchController({ readonly: false });

      
      controller.setReadonly(true);

      
      const viewModel = controller.getViewModel();
      expect(viewModel.readonly).toBe(true);
    });

    it('should set variant', () => {
      
      const controller = new SwitchController({ variant: 'default', value: false });

      
      controller.setVariant('error');

      
      const viewModel = controller.getViewModel();
      
      expect(viewModel.styles.borderColor).toBe('#ef4444');
    });

    it('should enforce mutual exclusivity when setting disabled', () => {
      
      const controller = new SwitchController({ readonly: true });

      
      controller.setDisabled(true);

      
      const viewModel = controller.getViewModel();
      expect(viewModel.disabled).toBe(true);
      expect(viewModel.readonly).toBe(false); 
    });

    it('should enforce mutual exclusivity when setting readonly', () => {
      
      const controller = new SwitchController({ disabled: true });

      
      controller.setReadonly(true);

      
      const viewModel = controller.getViewModel();
      expect(viewModel.readonly).toBe(true);
      expect(viewModel.disabled).toBe(false); 
    });
  });

  
  
  

  describe('View model updates', () => {
    it('should return updated view model after toggle', async () => {
      
      const controller = new SwitchController({ value: false });
      const before = controller.getViewModel();

      
      await controller.onToggle();
      const after = controller.getViewModel();

      
      expect(before.on).toBe(false);
      expect(after.on).toBe(true);
    });

    it('should return updated view model after setValue', async () => {
      
      const controller = new SwitchController({ value: false });

      
      await controller.setValue(true);
      const viewModel = controller.getViewModel();

      
      expect(viewModel.on).toBe(true);
    });

    it('should return updated view model after setDisabled', () => {
      
      const controller = new SwitchController({ disabled: false });

      
      controller.setDisabled(true);
      const viewModel = controller.getViewModel();

      
      expect(viewModel.disabled).toBe(true);
      expect(viewModel.interactive).toBe(false);
    });

    it('should update thumb position in view model when toggling', async () => {
      
      const controller = new SwitchController({ value: false });
      const beforeToggle = controller.getViewModel();

      
      await controller.onToggle();
      const afterToggle = controller.getViewModel();

      
      expect(beforeToggle.styles.thumbTranslate).toBe('2px'); 
      expect(afterToggle.styles.thumbTranslate).toBe('16px'); 
    });
  });

  
  
  

  describe('getEntity()', () => {
    it('should return current entity', () => {
      
      const controller = new SwitchController({ value: true });

      
      const entity = controller.getEntity();

      
      expect(entity.currentState.value).toBe(true);
    });

    it('should return updated entity after operations', async () => {
      
      const controller = new SwitchController({ value: false });

      
      await controller.onToggle();
      const entity = controller.getEntity();

      
      expect(entity.currentState.value).toBe(true);
    });
  });

  
  
  

  describe('Integration scenarios', () => {
    it('should handle complete switch lifecycle', async () => {
      
      const controller = new SwitchController({ value: false });

      
      await controller.onToggle();
      expect(controller.getViewModel().on).toBe(true);

      
      controller.setDisabled(true);
      expect(controller.getViewModel().disabled).toBe(true);

      
      await expect(controller.onToggle()).rejects.toThrow();

      
      controller.setDisabled(false);
      expect(controller.getViewModel().disabled).toBe(false);

      
      await controller.onToggle();
      expect(controller.getViewModel().off).toBe(true);
    });

    it('should maintain consistency across multiple operations', async () => {
      
      const controller = new SwitchController({
        value: false,
        variant: 'default',
      });

      
      await controller.setValue(true);
      controller.setVariant('error');
      controller.setDisabled(false);

      
      const viewModel = controller.getViewModel();
      expect(viewModel.on).toBe(true);
      expect(viewModel.disabled).toBe(false);
      expect(viewModel.interactive).toBe(true);
    });
  });
});
