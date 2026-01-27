

import { describe, it, expect } from 'bun:test';
import { SwitchEntity, type SwitchState } from '../SwitchState';

describe('SwitchEntity', () => {
  
  
  

  describe('create() factory method', () => {
    it('should create switch with default values', () => {
      
      const switchEntity = SwitchEntity.create();

      
      const state = switchEntity.currentState;
      expect(state.value).toBe(false);
      expect(state.variant).toBe('default');
      expect(state.disabled).toBe(false);
      expect(state.readonly).toBe(false);
    });

    it('should create switch with custom value', () => {
      
      const switchEntity = SwitchEntity.create({ value: true });

      
      expect(switchEntity.currentState.value).toBe(true);
    });

    it('should create switch with error variant', () => {
      
      const switchEntity = SwitchEntity.create({ variant: 'error' });

      
      expect(switchEntity.currentState.variant).toBe('error');
    });

    it('should create disabled switch', () => {
      
      const switchEntity = SwitchEntity.create({ disabled: true });

      
      expect(switchEntity.currentState.disabled).toBe(true);
    });

    it('should create readonly switch', () => {
      
      const switchEntity = SwitchEntity.create({ readonly: true });

      
      expect(switchEntity.currentState.readonly).toBe(true);
    });

    it('should create switch with all custom values', () => {
      
      const params: SwitchState = {
        value: true,
        variant: 'error',
        disabled: false,
        readonly: false,
      };

      
      const switchEntity = SwitchEntity.create(params);

      
      const state = switchEntity.currentState;
      expect(state.value).toBe(true);
      expect(state.variant).toBe('error');
      expect(state.disabled).toBe(false);
      expect(state.readonly).toBe(false);
    });
  });

  
  
  

  describe('BUSINESS RULE #1: Value must be boolean', () => {
    it('should accept true value', () => {
      
      const switchEntity = SwitchEntity.create({ value: true });

      
      expect(switchEntity.currentState.value).toBe(true);
    });

    it('should accept false value', () => {
      
      const switchEntity = SwitchEntity.create({ value: false });

      
      expect(switchEntity.currentState.value).toBe(false);
    });

    it('should reject non-boolean value (type safety)', () => {
      
      
      expect(() => SwitchEntity.create({ value: 'indeterminate' })).toThrow(
        'Invalid switch value: must be boolean (true or false)'
      );
    });

    it('should reject non-boolean value via withValue (type safety)', () => {
      
      const switchEntity = SwitchEntity.create();

      
      
      expect(() => switchEntity.withValue('on')).toThrow(
        'Invalid switch value: must be boolean (true or false)'
      );
    });
  });

  
  
  

  describe('BUSINESS RULE #2: Disabled and readonly are mutually exclusive', () => {
    it('should throw error when creating switch with both disabled and readonly', () => {
      
      expect(() =>
        SwitchEntity.create({ disabled: true, readonly: true })
      ).toThrow('Switch cannot be both disabled and readonly');
    });

    it('should allow disabled without readonly', () => {
      
      const switchEntity = SwitchEntity.create({
        disabled: true,
        readonly: false,
      });

      
      expect(switchEntity.currentState.disabled).toBe(true);
      expect(switchEntity.currentState.readonly).toBe(false);
    });

    it('should allow readonly without disabled', () => {
      
      const switchEntity = SwitchEntity.create({
        disabled: false,
        readonly: true,
      });

      
      expect(switchEntity.currentState.disabled).toBe(false);
      expect(switchEntity.currentState.readonly).toBe(true);
    });

    it('should allow both false', () => {
      
      const switchEntity = SwitchEntity.create({
        disabled: false,
        readonly: false,
      });

      
      expect(switchEntity.currentState.disabled).toBe(false);
      expect(switchEntity.currentState.readonly).toBe(false);
    });
  });

  
  
  

  describe('BUSINESS RULE #3: isInteractive = NOT disabled AND NOT readonly', () => {
    it('should be interactive when neither disabled nor readonly', () => {
      
      const switchEntity = SwitchEntity.create({
        disabled: false,
        readonly: false,
      });

      
      expect(switchEntity.isInteractive).toBe(true);
    });

    it('should NOT be interactive when disabled', () => {
      
      const switchEntity = SwitchEntity.create({ disabled: true });

      
      expect(switchEntity.isInteractive).toBe(false);
    });

    it('should NOT be interactive when readonly', () => {
      
      const switchEntity = SwitchEntity.create({ readonly: true });

      
      expect(switchEntity.isInteractive).toBe(false);
    });
  });

  
  
  

  describe('BUSINESS RULE #4: isOn = value is true', () => {
    it('should return true when value is true', () => {
      
      const switchEntity = SwitchEntity.create({ value: true });

      
      expect(switchEntity.isOn).toBe(true);
      expect(switchEntity.isOff).toBe(false);
    });

    it('should return false when value is false', () => {
      
      const switchEntity = SwitchEntity.create({ value: false });

      
      expect(switchEntity.isOn).toBe(false);
      expect(switchEntity.isOff).toBe(true);
    });
  });

  describe('BUSINESS RULE #5: isOff = value is false', () => {
    it('should return true when value is false', () => {
      
      const switchEntity = SwitchEntity.create({ value: false });

      
      expect(switchEntity.isOff).toBe(true);
    });

    it('should return false when value is true', () => {
      
      const switchEntity = SwitchEntity.create({ value: true });

      
      expect(switchEntity.isOff).toBe(false);
    });
  });

  
  
  

  describe('BUSINESS RULE #6: Toggle switches between on and off', () => {
    it('should toggle from off to on', () => {
      
      const switchEntity = SwitchEntity.create({ value: false });

      
      const toggled = switchEntity.toggle();

      
      expect(toggled.currentState.value).toBe(true);
      expect(toggled.isOn).toBe(true);
      expect(toggled.isOff).toBe(false);
    });

    it('should toggle from on to off', () => {
      
      const switchEntity = SwitchEntity.create({ value: true });

      
      const toggled = switchEntity.toggle();

      
      expect(toggled.currentState.value).toBe(false);
      expect(toggled.isOn).toBe(false);
      expect(toggled.isOff).toBe(true);
    });

    it('should toggle multiple times correctly', () => {
      
      const switchEntity = SwitchEntity.create({ value: false });

      
      const first = switchEntity.toggle();
      expect(first.currentState.value).toBe(true);

      
      const second = first.toggle();
      expect(second.currentState.value).toBe(false);

      
      const third = second.toggle();
      expect(third.currentState.value).toBe(true);
    });
  });

  
  
  

  describe('Immutability', () => {
    it('should not mutate original when using withValue', () => {
      
      const original = SwitchEntity.create({ value: false });

      
      const updated = original.withValue(true);

      
      expect(original.currentState.value).toBe(false);
      expect(updated.currentState.value).toBe(true);
    });

    it('should not mutate original when using toggle', () => {
      
      const original = SwitchEntity.create({ value: false });

      
      const toggled = original.toggle();

      
      expect(original.currentState.value).toBe(false);
      expect(toggled.currentState.value).toBe(true);
    });

    it('should not mutate original when using withDisabled', () => {
      
      const original = SwitchEntity.create({ disabled: false });

      
      const updated = original.withDisabled(true);

      
      expect(original.currentState.disabled).toBe(false);
      expect(updated.currentState.disabled).toBe(true);
    });

    it('should not mutate original when using withReadonly', () => {
      
      const original = SwitchEntity.create({ readonly: false });

      
      const updated = original.withReadonly(true);

      
      expect(original.currentState.readonly).toBe(false);
      expect(updated.currentState.readonly).toBe(true);
    });

    it('should not mutate original when using withVariant', () => {
      
      const original = SwitchEntity.create({ variant: 'default' });

      
      const updated = original.withVariant('error');

      
      expect(original.currentState.variant).toBe('default');
      expect(updated.currentState.variant).toBe('error');
    });

    it('should return new object from currentState getter', () => {
      
      const switchEntity = SwitchEntity.create();

      
      const state1 = switchEntity.currentState;
      const state2 = switchEntity.currentState;

      
      expect(state1).not.toBe(state2);
      
      expect(state1).toEqual(state2);
    });
  });

  
  
  

  describe('withDisabled() - enforces mutual exclusivity', () => {
    it('should set readonly to false when setting disabled to true', () => {
      
      const switchEntity = SwitchEntity.create({ readonly: true });

      
      const updated = switchEntity.withDisabled(true);

      
      expect(updated.currentState.disabled).toBe(true);
      expect(updated.currentState.readonly).toBe(false);
    });

    it('should preserve readonly when setting disabled to false', () => {
      
      const switchEntity = SwitchEntity.create({ readonly: true });

      
      const updated = switchEntity.withDisabled(false);

      
      expect(updated.currentState.disabled).toBe(false);
      expect(updated.currentState.readonly).toBe(true);
    });
  });

  
  
  

  describe('withReadonly() - enforces mutual exclusivity', () => {
    it('should set disabled to false when setting readonly to true', () => {
      
      const switchEntity = SwitchEntity.create({ disabled: true });

      
      const updated = switchEntity.withReadonly(true);

      
      expect(updated.currentState.readonly).toBe(true);
      expect(updated.currentState.disabled).toBe(false);
    });

    it('should preserve disabled when setting readonly to false', () => {
      
      const switchEntity = SwitchEntity.create({ disabled: true });

      
      const updated = switchEntity.withReadonly(false);

      
      expect(updated.currentState.readonly).toBe(false);
      expect(updated.currentState.disabled).toBe(true);
    });
  });

  
  
  

  describe('Edge cases', () => {
    it('should maintain variant through toggle', () => {
      
      const switchEntity = SwitchEntity.create({ variant: 'error' });

      
      const toggled = switchEntity.toggle();

      
      expect(toggled.currentState.variant).toBe('error');
    });

    it('should maintain disabled state through toggle', () => {
      
      const switchEntity = SwitchEntity.create({ disabled: true });

      
      const toggled = switchEntity.toggle();

      
      expect(toggled.currentState.disabled).toBe(true);
    });

    it('should chain multiple operations', () => {
      
      const switchEntity = SwitchEntity.create();

      
      const result = switchEntity
        .withValue(true)
        .withVariant('error')
        .withDisabled(false)
        .toggle();

      
      expect(result.currentState.value).toBe(false);
      expect(result.currentState.variant).toBe('error');
      expect(result.currentState.disabled).toBe(false);
    });
  });
});
