

import { describe, it, expect } from 'bun:test';
import { SwitchEntity } from '../../../entities/switch/SwitchState';
import {
  ValidateSwitch,
  mustBeOn,
  mustBeOff,
  mustBeInteractive,
  type ValidationRule,
} from '../ValidateSwitch';

describe('ValidateSwitch Use Case', () => {
  
  
  

  describe('Base validation without custom rules', () => {
    it('should return valid for default switch', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create();

      
      const result = useCase.execute({ switchEntity });

      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return valid for switch that is on', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create({ value: true });

      
      const result = useCase.execute({ switchEntity });

      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return valid for disabled switch', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create({ disabled: true });

      
      const result = useCase.execute({ switchEntity });

      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return valid for readonly switch', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create({ readonly: true });

      
      const result = useCase.execute({ switchEntity });

      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  
  
  

  describe('Custom validation rules', () => {
    it('should validate with single custom rule that passes', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create({ value: true });
      const rule: ValidationRule = {
        validate: (entity) => entity.isOn,
        errorMessage: 'Must be on',
      };

      
      const result = useCase.execute({
        switchEntity,
        customRules: [rule],
      });

      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate with single custom rule that fails', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create({ value: false });
      const rule: ValidationRule = {
        validate: (entity) => entity.isOn,
        errorMessage: 'Must be on',
      };

      
      const result = useCase.execute({
        switchEntity,
        customRules: [rule],
      });

      
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toBe('Must be on');
    });

    it('should validate with multiple custom rules (all pass)', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create({ value: true });
      const rules: ValidationRule[] = [
        {
          validate: (entity) => entity.isOn,
          errorMessage: 'Must be on',
        },
        {
          validate: (entity) => entity.isInteractive,
          errorMessage: 'Must be interactive',
        },
      ];

      
      const result = useCase.execute({
        switchEntity,
        customRules: rules,
      });

      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should collect all errors when multiple rules fail', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create({ value: false, disabled: true });
      const rules: ValidationRule[] = [
        {
          validate: (entity) => entity.isOn,
          errorMessage: 'Must be on',
        },
        {
          validate: (entity) => entity.isInteractive,
          errorMessage: 'Must be interactive',
        },
      ];

      
      const result = useCase.execute({
        switchEntity,
        customRules: rules,
      });

      
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(2);
      expect(result.errors).toContain('Must be on');
      expect(result.errors).toContain('Must be interactive');
    });

    it('should handle empty custom rules array', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create();

      
      const result = useCase.execute({
        switchEntity,
        customRules: [],
      });

      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  
  
  

  describe('mustBeOn validation rule', () => {
    it('should pass when switch is on', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create({ value: true });

      
      const result = useCase.execute({
        switchEntity,
        customRules: [mustBeOn()],
      });

      
      expect(result.isValid).toBe(true);
    });

    it('should fail when switch is off', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create({ value: false });

      
      const result = useCase.execute({
        switchEntity,
        customRules: [mustBeOn()],
      });

      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Switch must be on');
    });

    it('should use custom error message', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create({ value: false });

      
      const result = useCase.execute({
        switchEntity,
        customRules: [mustBeOn('You must accept the terms')],
      });

      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('You must accept the terms');
    });
  });

  describe('mustBeOff validation rule', () => {
    it('should pass when switch is off', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create({ value: false });

      
      const result = useCase.execute({
        switchEntity,
        customRules: [mustBeOff()],
      });

      
      expect(result.isValid).toBe(true);
    });

    it('should fail when switch is on', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create({ value: true });

      
      const result = useCase.execute({
        switchEntity,
        customRules: [mustBeOff()],
      });

      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Switch must be off');
    });

    it('should use custom error message', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create({ value: true });

      
      const result = useCase.execute({
        switchEntity,
        customRules: [mustBeOff('Safety mode must be disabled')],
      });

      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Safety mode must be disabled');
    });
  });

  describe('mustBeInteractive validation rule', () => {
    it('should pass when switch is interactive', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create({ disabled: false, readonly: false });

      
      const result = useCase.execute({
        switchEntity,
        customRules: [mustBeInteractive()],
      });

      
      expect(result.isValid).toBe(true);
    });

    it('should fail when switch is disabled', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create({ disabled: true });

      
      const result = useCase.execute({
        switchEntity,
        customRules: [mustBeInteractive()],
      });

      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Switch must be interactive');
    });

    it('should fail when switch is readonly', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create({ readonly: true });

      
      const result = useCase.execute({
        switchEntity,
        customRules: [mustBeInteractive()],
      });

      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Switch must be interactive');
    });

    it('should use custom error message', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create({ disabled: true });

      
      const result = useCase.execute({
        switchEntity,
        customRules: [mustBeInteractive('Cannot submit with disabled switch')],
      });

      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Cannot submit with disabled switch');
    });
  });

  
  
  

  describe('Real-world scenarios', () => {
    it('should validate terms acceptance (must be on)', () => {
      
      const useCase = new ValidateSwitch();
      const termsSwitch = SwitchEntity.create({ value: false });

      
      const result = useCase.execute({
        switchEntity: termsSwitch,
        customRules: [mustBeOn('You must accept the terms to continue')],
      });

      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('You must accept the terms to continue');
    });

    it('should validate safety override (must be off to proceed)', () => {
      
      const useCase = new ValidateSwitch();
      const safetySwitch = SwitchEntity.create({ value: true });

      
      const result = useCase.execute({
        switchEntity: safetySwitch,
        customRules: [mustBeOff('Disable safety mode to perform this action')],
      });

      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Disable safety mode to perform this action');
    });

    it('should validate complex rule (on AND interactive)', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create({ value: true, disabled: false });

      
      const result = useCase.execute({
        switchEntity,
        customRules: [mustBeOn(), mustBeInteractive()],
      });

      
      expect(result.isValid).toBe(true);
    });

    it('should handle switch state with variant (validation unaffected)', () => {
      
      const useCase = new ValidateSwitch();
      const switchEntity = SwitchEntity.create({ value: false, variant: 'error' });

      
      const result = useCase.execute({
        switchEntity,
        customRules: [mustBeOn()],
      });

      
      expect(result.isValid).toBe(false);
      
    });
  });
});
