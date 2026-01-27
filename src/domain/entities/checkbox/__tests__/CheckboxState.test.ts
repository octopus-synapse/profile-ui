

import { describe, it, expect } from 'bun:test';
import { CheckboxEntity, type CheckboxValue } from '../CheckboxState';





describe('CheckboxEntity.create', () => {
  it('should create checkbox with default values', () => {
    const checkbox = CheckboxEntity.create();
    const state = checkbox.currentState;

    expect(state.value).toBe(false);
    expect(state.variant).toBe('default');
    expect(state.disabled).toBe(false);
    expect(state.readonly).toBe(false);
    expect(state.required).toBe(false);
  });

  it('should create checkbox with custom values', () => {
    const checkbox = CheckboxEntity.create({
      value: true,
      variant: 'error',
      disabled: true,
      required: true,
    });
    const state = checkbox.currentState;

    expect(state.value).toBe(true);
    expect(state.variant).toBe('error');
    expect(state.disabled).toBe(true);
    expect(state.readonly).toBe(false);
    expect(state.required).toBe(true);
  });

  it('should create checkbox with indeterminate value', () => {
    const checkbox = CheckboxEntity.create({ value: 'indeterminate' });
    expect(checkbox.currentState.value).toBe('indeterminate');
  });

  it('should reject invalid checkbox value', () => {
    expect(() => {
      CheckboxEntity.create({ value: 'invalid' as CheckboxValue });
    }).toThrow('Invalid checkbox value');
  });

  it('should reject both disabled and readonly', () => {
    expect(() => {
      CheckboxEntity.create({ disabled: true, readonly: true });
    }).toThrow('Checkbox cannot be both disabled and readonly');
  });
});





describe('CheckboxEntity.isInteractive', () => {
  it('should be interactive when neither disabled nor readonly', () => {
    const checkbox = CheckboxEntity.create({
      disabled: false,
      readonly: false,
    });
    expect(checkbox.isInteractive).toBe(true);
  });

  it('should not be interactive when disabled', () => {
    const checkbox = CheckboxEntity.create({ disabled: true });
    expect(checkbox.isInteractive).toBe(false);
  });

  it('should not be interactive when readonly', () => {
    const checkbox = CheckboxEntity.create({ readonly: true });
    expect(checkbox.isInteractive).toBe(false);
  });
});





describe('CheckboxEntity.isChecked', () => {
  it('should return true when value is true', () => {
    const checkbox = CheckboxEntity.create({ value: true });
    expect(checkbox.isChecked).toBe(true);
  });

  it('should return false when value is false', () => {
    const checkbox = CheckboxEntity.create({ value: false });
    expect(checkbox.isChecked).toBe(false);
  });

  it('should return false when value is indeterminate', () => {
    const checkbox = CheckboxEntity.create({ value: 'indeterminate' });
    expect(checkbox.isChecked).toBe(false);
  });
});

describe('CheckboxEntity.isUnchecked', () => {
  it('should return true when value is false', () => {
    const checkbox = CheckboxEntity.create({ value: false });
    expect(checkbox.isUnchecked).toBe(true);
  });

  it('should return false when value is true', () => {
    const checkbox = CheckboxEntity.create({ value: true });
    expect(checkbox.isUnchecked).toBe(false);
  });

  it('should return false when value is indeterminate', () => {
    const checkbox = CheckboxEntity.create({ value: 'indeterminate' });
    expect(checkbox.isUnchecked).toBe(false);
  });
});

describe('CheckboxEntity.isIndeterminate', () => {
  it('should return true when value is indeterminate', () => {
    const checkbox = CheckboxEntity.create({ value: 'indeterminate' });
    expect(checkbox.isIndeterminate).toBe(true);
  });

  it('should return false when value is true', () => {
    const checkbox = CheckboxEntity.create({ value: true });
    expect(checkbox.isIndeterminate).toBe(false);
  });

  it('should return false when value is false', () => {
    const checkbox = CheckboxEntity.create({ value: false });
    expect(checkbox.isIndeterminate).toBe(false);
  });
});





describe('CheckboxEntity.formValue', () => {
  it('should return true when checked', () => {
    const checkbox = CheckboxEntity.create({ value: true });
    expect(checkbox.formValue).toBe(true);
  });

  it('should return false when unchecked', () => {
    const checkbox = CheckboxEntity.create({ value: false });
    expect(checkbox.formValue).toBe(false);
  });

  it('should return false when indeterminate (treats as unchecked)', () => {
    const checkbox = CheckboxEntity.create({ value: 'indeterminate' });
    expect(checkbox.formValue).toBe(false);
  });
});





describe('CheckboxEntity immutability', () => {
  it('should return new instance when changing value', () => {
    const original = CheckboxEntity.create({ value: false });
    const updated = original.withValue(true);

    expect(updated).not.toBe(original);
    expect(original.currentState.value).toBe(false);
    expect(updated.currentState.value).toBe(true);
  });

  it('should return defensive copy of state', () => {
    const checkbox = CheckboxEntity.create({ value: true });
    const state1 = checkbox.currentState;
    const state2 = checkbox.currentState;

    expect(state1).not.toBe(state2);
    expect(state1).toEqual(state2);
  });
});





describe('CheckboxEntity.toggle', () => {
  it('should toggle from false to true', () => {
    const checkbox = CheckboxEntity.create({ value: false });
    const toggled = checkbox.toggle();
    expect(toggled.currentState.value).toBe(true);
  });

  it('should toggle from true to false', () => {
    const checkbox = CheckboxEntity.create({ value: true });
    const toggled = checkbox.toggle();
    expect(toggled.currentState.value).toBe(false);
  });

  it('should toggle from indeterminate to true', () => {
    const checkbox = CheckboxEntity.create({ value: 'indeterminate' });
    const toggled = checkbox.toggle();
    expect(toggled.currentState.value).toBe(true);
  });

  it('should toggle multiple times correctly', () => {
    const checkbox = CheckboxEntity.create({ value: false });
    const first = checkbox.toggle();
    const second = first.toggle();
    const third = second.toggle();

    expect(first.currentState.value).toBe(true);
    expect(second.currentState.value).toBe(false);
    expect(third.currentState.value).toBe(true);
  });

  it('should preserve other state when toggling', () => {
    const checkbox = CheckboxEntity.create({
      value: false,
      variant: 'error',
      disabled: true,
      required: true,
    });
    const toggled = checkbox.toggle();
    const state = toggled.currentState;

    expect(state.variant).toBe('error');
    expect(state.disabled).toBe(true);
    expect(state.required).toBe(true);
  });
});





describe('CheckboxEntity.withValue', () => {
  it('should set value to true', () => {
    const checkbox = CheckboxEntity.create({ value: false });
    const updated = checkbox.withValue(true);
    expect(updated.currentState.value).toBe(true);
  });

  it('should set value to false', () => {
    const checkbox = CheckboxEntity.create({ value: true });
    const updated = checkbox.withValue(false);
    expect(updated.currentState.value).toBe(false);
  });

  it('should set value to indeterminate', () => {
    const checkbox = CheckboxEntity.create({ value: false });
    const updated = checkbox.withValue('indeterminate');
    expect(updated.currentState.value).toBe('indeterminate');
  });

  it('should preserve other state when setting value', () => {
    const checkbox = CheckboxEntity.create({
      value: false,
      variant: 'error',
      disabled: true,
    });
    const updated = checkbox.withValue(true);
    const state = updated.currentState;

    expect(state.variant).toBe('error');
    expect(state.disabled).toBe(true);
  });
});





describe('CheckboxEntity.withVariant', () => {
  it('should change variant from default to error', () => {
    const checkbox = CheckboxEntity.create({ variant: 'default' });
    const updated = checkbox.withVariant('error');
    expect(updated.currentState.variant).toBe('error');
  });

  it('should change variant from error to default', () => {
    const checkbox = CheckboxEntity.create({ variant: 'error' });
    const updated = checkbox.withVariant('default');
    expect(updated.currentState.variant).toBe('default');
  });

  it('should preserve other state when changing variant', () => {
    const checkbox = CheckboxEntity.create({
      value: true,
      variant: 'default',
      disabled: true,
    });
    const updated = checkbox.withVariant('error');
    const state = updated.currentState;

    expect(state.value).toBe(true);
    expect(state.disabled).toBe(true);
  });
});





describe('CheckboxEntity.withDisabled', () => {
  it('should set disabled to true', () => {
    const checkbox = CheckboxEntity.create({ disabled: false });
    const updated = checkbox.withDisabled(true);
    expect(updated.currentState.disabled).toBe(true);
  });

  it('should set disabled to false', () => {
    const checkbox = CheckboxEntity.create({ disabled: true });
    const updated = checkbox.withDisabled(false);
    expect(updated.currentState.disabled).toBe(false);
  });

  it('should clear readonly when setting disabled=true', () => {
    const checkbox = CheckboxEntity.create({ readonly: true, disabled: false });
    const updated = checkbox.withDisabled(true);
    const state = updated.currentState;

    expect(state.disabled).toBe(true);
    expect(state.readonly).toBe(false);
  });

  it('should preserve readonly=false when setting disabled=false', () => {
    const checkbox = CheckboxEntity.create({ readonly: false, disabled: true });
    const updated = checkbox.withDisabled(false);
    const state = updated.currentState;

    expect(state.disabled).toBe(false);
    expect(state.readonly).toBe(false);
  });

  it('should preserve other state when changing disabled', () => {
    const checkbox = CheckboxEntity.create({
      value: true,
      variant: 'error',
      required: true,
    });
    const updated = checkbox.withDisabled(true);
    const state = updated.currentState;

    expect(state.value).toBe(true);
    expect(state.variant).toBe('error');
    expect(state.required).toBe(true);
  });
});

describe('CheckboxEntity.withReadonly', () => {
  it('should set readonly to true', () => {
    const checkbox = CheckboxEntity.create({ readonly: false });
    const updated = checkbox.withReadonly(true);
    expect(updated.currentState.readonly).toBe(true);
  });

  it('should set readonly to false', () => {
    const checkbox = CheckboxEntity.create({ readonly: true });
    const updated = checkbox.withReadonly(false);
    expect(updated.currentState.readonly).toBe(false);
  });

  it('should clear disabled when setting readonly=true', () => {
    const checkbox = CheckboxEntity.create({ disabled: true, readonly: false });
    const updated = checkbox.withReadonly(true);
    const state = updated.currentState;

    expect(state.readonly).toBe(true);
    expect(state.disabled).toBe(false);
  });

  it('should preserve disabled=false when setting readonly=false', () => {
    const checkbox = CheckboxEntity.create({ disabled: false, readonly: true });
    const updated = checkbox.withReadonly(false);
    const state = updated.currentState;

    expect(state.readonly).toBe(false);
    expect(state.disabled).toBe(false);
  });

  it('should preserve other state when changing readonly', () => {
    const checkbox = CheckboxEntity.create({
      value: true,
      variant: 'error',
      required: true,
    });
    const updated = checkbox.withReadonly(true);
    const state = updated.currentState;

    expect(state.value).toBe(true);
    expect(state.variant).toBe('error');
    expect(state.required).toBe(true);
  });
});





describe('CheckboxEntity.withRequired', () => {
  it('should set required to true', () => {
    const checkbox = CheckboxEntity.create({ required: false });
    const updated = checkbox.withRequired(true);
    expect(updated.currentState.required).toBe(true);
  });

  it('should set required to false', () => {
    const checkbox = CheckboxEntity.create({ required: true });
    const updated = checkbox.withRequired(false);
    expect(updated.currentState.required).toBe(false);
  });

  it('should preserve other state when changing required', () => {
    const checkbox = CheckboxEntity.create({
      value: true,
      variant: 'error',
      disabled: true,
    });
    const updated = checkbox.withRequired(true);
    const state = updated.currentState;

    expect(state.value).toBe(true);
    expect(state.variant).toBe('error');
    expect(state.disabled).toBe(true);
  });
});





describe('CheckboxEntity edge cases', () => {
  it('should handle multiple chained updates', () => {
    const checkbox = CheckboxEntity.create()
      .withValue(true)
      .withVariant('error')
      .withDisabled(true)
      .withRequired(true);

    const state = checkbox.currentState;
    expect(state.value).toBe(true);
    expect(state.variant).toBe('error');
    expect(state.disabled).toBe(true);
    expect(state.required).toBe(true);
  });

  it('should maintain immutability through complex chains', () => {
    const original = CheckboxEntity.create({ value: false });
    const step1 = original.withValue(true);
    const step2 = step1.withVariant('error');
    const step3 = step2.withDisabled(true);

    expect(original.currentState.value).toBe(false);
    expect(original.currentState.variant).toBe('default');
    expect(original.currentState.disabled).toBe(false);

    expect(step3.currentState.value).toBe(true);
    expect(step3.currentState.variant).toBe('error');
    expect(step3.currentState.disabled).toBe(true);
  });

  it('should handle rapid state transitions', () => {
    let checkbox = CheckboxEntity.create({ value: false });

    checkbox = checkbox.toggle();
    expect(checkbox.currentState.value).toBe(true);

    checkbox = checkbox.toggle();
    expect(checkbox.currentState.value).toBe(false);

    checkbox = checkbox.withValue('indeterminate');
    expect(checkbox.currentState.value).toBe('indeterminate');

    checkbox = checkbox.toggle();
    expect(checkbox.currentState.value).toBe(true);
  });
});
