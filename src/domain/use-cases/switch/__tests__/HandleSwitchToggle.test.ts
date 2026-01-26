

import { describe, it, expect, mock } from 'bun:test';
import { SwitchEntity } from '../../../entities/switch/SwitchState';
import { HandleSwitchToggle } from '../HandleSwitchToggle';

describe('HandleSwitchToggle Use Case', () => {
  
  
  

  describe('Success: Basic toggle functionality', () => {
    it('should toggle switch from off to on', async () => {
      
      const useCase = new HandleSwitchToggle();
      const switchEntity = SwitchEntity.create({ value: false });

      
      const result = await useCase.execute({
        switchEntity,
      });

      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.newValue).toBe(true);
        expect(result.oldValue).toBe(false);
        expect(result.updatedSwitch.currentState.value).toBe(true);
      }
    });

    it('should toggle switch from on to off', async () => {
      
      const useCase = new HandleSwitchToggle();
      const switchEntity = SwitchEntity.create({ value: true });

      
      const result = await useCase.execute({
        switchEntity,
      });

      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.newValue).toBe(false);
        expect(result.oldValue).toBe(true);
        expect(result.updatedSwitch.currentState.value).toBe(false);
      }
    });
  });

  
  
  

  describe('Success: Explicit value setting', () => {
    it('should set switch to on when newValue is true', async () => {
      
      const useCase = new HandleSwitchToggle();
      const switchEntity = SwitchEntity.create({ value: false });

      
      const result = await useCase.execute({
        switchEntity,
        newValue: true,
      });

      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.newValue).toBe(true);
        expect(result.oldValue).toBe(false);
      }
    });

    it('should set switch to off when newValue is false', async () => {
      
      const useCase = new HandleSwitchToggle();
      const switchEntity = SwitchEntity.create({ value: true });

      
      const result = await useCase.execute({
        switchEntity,
        newValue: false,
      });

      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.newValue).toBe(false);
        expect(result.oldValue).toBe(true);
      }
    });

    it('should set switch to same value when newValue equals current value', async () => {
      
      const useCase = new HandleSwitchToggle();
      const switchEntity = SwitchEntity.create({ value: true });

      
      const result = await useCase.execute({
        switchEntity,
        newValue: true,
      });

      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.newValue).toBe(true);
        expect(result.oldValue).toBe(true);
      }
    });
  });

  
  
  

  describe('Success: onChange handler invocation', () => {
    it('should call onChange handler with new value when toggling', async () => {
      
      const useCase = new HandleSwitchToggle();
      const switchEntity = SwitchEntity.create({ value: false });
      const onChange = mock((value: boolean) => {});

      
      const result = await useCase.execute({
        switchEntity,
        onChange,
      });

      
      expect(result.success).toBe(true);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('should call onChange handler with explicit newValue', async () => {
      
      const useCase = new HandleSwitchToggle();
      const switchEntity = SwitchEntity.create({ value: false });
      const onChange = mock((value: boolean) => {});

      
      const result = await useCase.execute({
        switchEntity,
        newValue: true,
        onChange,
      });

      
      expect(result.success).toBe(true);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('should NOT call onChange when handler is not provided', async () => {
      
      const useCase = new HandleSwitchToggle();
      const switchEntity = SwitchEntity.create({ value: false });

      
      const result = await useCase.execute({
        switchEntity,
      });

      
      expect(result.success).toBe(true);
      
    });

    it('should handle async onChange handler', async () => {
      
      const useCase = new HandleSwitchToggle();
      const switchEntity = SwitchEntity.create({ value: false });
      let asyncValue: boolean | null = null;

      const onChange = async (value: boolean) => {
        
        await new Promise((resolve) => setTimeout(resolve, 10));
        asyncValue = value;
      };

      
      const result = await useCase.execute({
        switchEntity,
        onChange,
      });

      
      expect(result.success).toBe(true);
      expect(asyncValue).toBe(true);
    });
  });

  
  
  

  describe('Failure: Non-interactive switches', () => {
    it('should fail when switch is disabled', async () => {
      
      const useCase = new HandleSwitchToggle();
      const switchEntity = SwitchEntity.create({ disabled: true, value: false });

      
      const result = await useCase.execute({
        switchEntity,
      });

      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Switch is not interactive (disabled or readonly)');
        expect(result.updatedSwitch.currentState.value).toBe(false); 
      }
    });

    it('should fail when switch is readonly', async () => {
      
      const useCase = new HandleSwitchToggle();
      const switchEntity = SwitchEntity.create({ readonly: true, value: false });

      
      const result = await useCase.execute({
        switchEntity,
      });

      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Switch is not interactive (disabled or readonly)');
        expect(result.updatedSwitch.currentState.value).toBe(false); 
      }
    });

    it('should NOT call onChange handler when switch is disabled', async () => {
      
      const useCase = new HandleSwitchToggle();
      const switchEntity = SwitchEntity.create({ disabled: true, value: false });
      const onChange = mock((value: boolean) => {});

      
      const result = await useCase.execute({
        switchEntity,
        onChange,
      });

      
      expect(result.success).toBe(false);
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  
  
  

  describe('Failure: onChange handler errors', () => {
    it('should revert value when onChange throws error', async () => {
      
      const useCase = new HandleSwitchToggle();
      const switchEntity = SwitchEntity.create({ value: false });
      const onChange = mock((value: boolean) => {
        throw new Error('Network error');
      });

      
      const result = await useCase.execute({
        switchEntity,
        onChange,
      });

      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Network error');
        expect(result.updatedSwitch.currentState.value).toBe(false); 
      }
    });

    it('should revert value when async onChange rejects', async () => {
      
      const useCase = new HandleSwitchToggle();
      const switchEntity = SwitchEntity.create({ value: false });
      const onChange = async (value: boolean) => {
        throw new Error('Async error');
      };

      
      const result = await useCase.execute({
        switchEntity,
        onChange,
      });

      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Async error');
        expect(result.updatedSwitch.currentState.value).toBe(false); 
      }
    });

    it('should handle non-Error exceptions in onChange', async () => {
      
      const useCase = new HandleSwitchToggle();
      const switchEntity = SwitchEntity.create({ value: false });
      const onChange = mock((value: boolean) => {
        throw 'String error';
      });

      
      const result = await useCase.execute({
        switchEntity,
        onChange,
      });

      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('onChange handler failed');
        expect(result.updatedSwitch.currentState.value).toBe(false);
      }
    });
  });

  
  
  

  describe('Immutability', () => {
    it('should not mutate original switch entity', async () => {
      
      const useCase = new HandleSwitchToggle();
      const switchEntity = SwitchEntity.create({ value: false });

      
      const result = await useCase.execute({
        switchEntity,
      });

      
      expect(switchEntity.currentState.value).toBe(false); 
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.updatedSwitch.currentState.value).toBe(true); 
      }
    });

    it('should preserve other properties when toggling', async () => {
      
      const useCase = new HandleSwitchToggle();
      const switchEntity = SwitchEntity.create({
        value: false,
        variant: 'error',
        disabled: false,
        readonly: false,
      });

      
      const result = await useCase.execute({
        switchEntity,
      });

      
      expect(result.success).toBe(true);
      if (result.success) {
        const state = result.updatedSwitch.currentState;
        expect(state.value).toBe(true); 
        expect(state.variant).toBe('error'); 
        expect(state.disabled).toBe(false); 
        expect(state.readonly).toBe(false); 
      }
    });
  });

  
  
  

  describe('Edge cases', () => {
    it('should handle multiple toggles in sequence', async () => {
      
      const useCase = new HandleSwitchToggle();
      let switchEntity = SwitchEntity.create({ value: false });

      
      const result1 = await useCase.execute({ switchEntity });
      expect(result1.success).toBe(true);
      if (result1.success) {
        switchEntity = result1.updatedSwitch;
      }

      
      const result2 = await useCase.execute({ switchEntity });
      expect(result2.success).toBe(true);
      if (result2.success) {
        switchEntity = result2.updatedSwitch;
      }

      
      const result3 = await useCase.execute({ switchEntity });

      
      expect(result3.success).toBe(true);
      if (result3.success) {
        expect(result3.updatedSwitch.currentState.value).toBe(true);
      }
    });

    it('should handle rapid onChange calls', async () => {
      
      const useCase = new HandleSwitchToggle();
      const switchEntity = SwitchEntity.create({ value: false });
      let callCount = 0;
      const onChange = mock((value: boolean) => {
        callCount++;
      });

      
      await Promise.all([
        useCase.execute({ switchEntity, onChange }),
        useCase.execute({ switchEntity, onChange }),
        useCase.execute({ switchEntity, onChange }),
      ]);

      
      expect(callCount).toBe(3);
    });
  });
});
