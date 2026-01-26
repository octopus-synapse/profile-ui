

import { describe, it, expect } from 'bun:test';
import {
  ValidateCheckbox,
  mustBeChecked,
  mustBeUnchecked,
  cannotBeIndeterminate,
  mustBeInteractive,
  createRequiredRule,
  type ValidationRule,
} from '../ValidateCheckbox';
import { CheckboxEntity } from '../../../entities/checkbox/CheckboxState';





describe('ValidateCheckbox - required field', () => {
  it('should pass validation when required checkbox is checked', () => {
    const useCase = new ValidateCheckbox();
    const checkbox = CheckboxEntity.create({ value: true, required: true });

    const result = useCase.execute({ checkbox });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('should fail validation when required checkbox is unchecked', () => {
    const useCase = new ValidateCheckbox();
    const checkbox = CheckboxEntity.create({ value: false, required: true });

    const result = useCase.execute({ checkbox });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('This field is required');
  });

  it('should fail validation when required checkbox is indeterminate', () => {
    const useCase = new ValidateCheckbox();
    const checkbox = CheckboxEntity.create({
      value: 'indeterminate',
      required: true,
    });

    const result = useCase.execute({ checkbox });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('This field is required');
  });

  it('should pass validation when optional checkbox is unchecked', () => {
    const useCase = new ValidateCheckbox();
    const checkbox = CheckboxEntity.create({ value: false, required: false });

    const result = useCase.execute({ checkbox });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('should pass validation when optional checkbox is checked', () => {
    const useCase = new ValidateCheckbox();
    const checkbox = CheckboxEntity.create({ value: true, required: false });

    const result = useCase.execute({ checkbox });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('should pass validation when optional checkbox is indeterminate', () => {
    const useCase = new ValidateCheckbox();
    const checkbox = CheckboxEntity.create({
      value: 'indeterminate',
      required: false,
    });

    const result = useCase.execute({ checkbox });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });
});





describe('ValidateCheckbox - custom rules', () => {
  it('should apply single custom rule', () => {
    const useCase = new ValidateCheckbox();
    const checkbox = CheckboxEntity.create({ value: false });
    const customRule: ValidationRule = (cb) =>
      cb.isChecked ? null : 'Must be checked';

    const result = useCase.execute({ checkbox, customRules: [customRule] });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Must be checked');
  });

  it('should apply multiple custom rules', () => {
    const useCase = new ValidateCheckbox();
    const checkbox = CheckboxEntity.create({ value: 'indeterminate' });
    const rule1: ValidationRule = (cb) =>
      cb.isChecked ? null : 'Rule 1 failed';
    const rule2: ValidationRule = (cb) =>
      cb.isIndeterminate ? 'Rule 2 failed' : null;

    const result = useCase.execute({
      checkbox,
      customRules: [rule1, rule2],
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Rule 1 failed');
    expect(result.errors).toContain('Rule 2 failed');
  });

  it('should pass when all custom rules pass', () => {
    const useCase = new ValidateCheckbox();
    const checkbox = CheckboxEntity.create({ value: true });
    const rule1: ValidationRule = (cb) => (cb.isChecked ? null : 'Failed');
    const rule2: ValidationRule = (cb) => (cb.isInteractive ? null : 'Failed');

    const result = useCase.execute({
      checkbox,
      customRules: [rule1, rule2],
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('should collect all errors from multiple rules', () => {
    const useCase = new ValidateCheckbox();
    const checkbox = CheckboxEntity.create({ value: false, required: true });
    const customRule: ValidationRule = (cb) => 'Custom error';

    const result = useCase.execute({ checkbox, customRules: [customRule] });

    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveLength(2);
    expect(result.errors).toContain('This field is required');
    expect(result.errors).toContain('Custom error');
  });

  it('should apply rules in order', () => {
    const useCase = new ValidateCheckbox();
    const checkbox = CheckboxEntity.create({ value: false });
    const errors: string[] = [];
    const rule1: ValidationRule = () => {
      errors.push('Rule 1');
      return 'Error 1';
    };
    const rule2: ValidationRule = () => {
      errors.push('Rule 2');
      return 'Error 2';
    };

    useCase.execute({ checkbox, customRules: [rule1, rule2] });

    expect(errors).toEqual(['Rule 1', 'Rule 2']);
  });
});





describe('mustBeChecked rule', () => {
  it('should pass when checkbox is checked', () => {
    const checkbox = CheckboxEntity.create({ value: true });
    const error = mustBeChecked(checkbox);
    expect(error).toBeNull();
  });

  it('should fail when checkbox is unchecked', () => {
    const checkbox = CheckboxEntity.create({ value: false });
    const error = mustBeChecked(checkbox);
    expect(error).toBe('Must be checked');
  });

  it('should fail when checkbox is indeterminate', () => {
    const checkbox = CheckboxEntity.create({ value: 'indeterminate' });
    const error = mustBeChecked(checkbox);
    expect(error).toBe('Must be checked');
  });
});

describe('mustBeUnchecked rule', () => {
  it('should pass when checkbox is unchecked', () => {
    const checkbox = CheckboxEntity.create({ value: false });
    const error = mustBeUnchecked(checkbox);
    expect(error).toBeNull();
  });

  it('should fail when checkbox is checked', () => {
    const checkbox = CheckboxEntity.create({ value: true });
    const error = mustBeUnchecked(checkbox);
    expect(error).toBe('Must be unchecked');
  });

  it('should fail when checkbox is indeterminate', () => {
    const checkbox = CheckboxEntity.create({ value: 'indeterminate' });
    const error = mustBeUnchecked(checkbox);
    expect(error).toBe('Must be unchecked');
  });
});

describe('cannotBeIndeterminate rule', () => {
  it('should pass when checkbox is checked', () => {
    const checkbox = CheckboxEntity.create({ value: true });
    const error = cannotBeIndeterminate(checkbox);
    expect(error).toBeNull();
  });

  it('should pass when checkbox is unchecked', () => {
    const checkbox = CheckboxEntity.create({ value: false });
    const error = cannotBeIndeterminate(checkbox);
    expect(error).toBeNull();
  });

  it('should fail when checkbox is indeterminate', () => {
    const checkbox = CheckboxEntity.create({ value: 'indeterminate' });
    const error = cannotBeIndeterminate(checkbox);
    expect(error).toBe('Cannot be indeterminate');
  });
});

describe('mustBeInteractive rule', () => {
  it('should pass when checkbox is interactive', () => {
    const checkbox = CheckboxEntity.create({
      disabled: false,
      readonly: false,
    });
    const error = mustBeInteractive(checkbox);
    expect(error).toBeNull();
  });

  it('should fail when checkbox is disabled', () => {
    const checkbox = CheckboxEntity.create({ disabled: true });
    const error = mustBeInteractive(checkbox);
    expect(error).toBe('Checkbox is not interactive');
  });

  it('should fail when checkbox is readonly', () => {
    const checkbox = CheckboxEntity.create({ readonly: true });
    const error = mustBeInteractive(checkbox);
    expect(error).toBe('Checkbox is not interactive');
  });
});

describe('createRequiredRule factory', () => {
  it('should create rule with custom message', () => {
    const rule = createRequiredRule('You must accept the terms');
    const checkbox = CheckboxEntity.create({ value: false });

    const error = rule(checkbox);

    expect(error).toBe('You must accept the terms');
  });

  it('should pass when checkbox is checked', () => {
    const rule = createRequiredRule('You must accept the terms');
    const checkbox = CheckboxEntity.create({ value: true });

    const error = rule(checkbox);

    expect(error).toBeNull();
  });

  it('should create independent rules with different messages', () => {
    const rule1 = createRequiredRule('Message 1');
    const rule2 = createRequiredRule('Message 2');
    const checkbox = CheckboxEntity.create({ value: false });

    expect(rule1(checkbox)).toBe('Message 1');
    expect(rule2(checkbox)).toBe('Message 2');
  });
});





describe('ValidateCheckbox - edge cases', () => {
  it('should handle empty custom rules array', () => {
    const useCase = new ValidateCheckbox();
    const checkbox = CheckboxEntity.create({ value: false });

    const result = useCase.execute({ checkbox, customRules: [] });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('should handle undefined custom rules', () => {
    const useCase = new ValidateCheckbox();
    const checkbox = CheckboxEntity.create({ value: false });

    const result = useCase.execute({ checkbox });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('should collect multiple errors from complex validation', () => {
    const useCase = new ValidateCheckbox();
    const checkbox = CheckboxEntity.create({
      value: 'indeterminate',
      required: true,
    });

    const result = useCase.execute({
      checkbox,
      customRules: [cannotBeIndeterminate, mustBeInteractive],
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveLength(2);
    expect(result.errors).toContain('This field is required');
    expect(result.errors).toContain('Cannot be indeterminate');
  });

  it('should handle rule that returns null', () => {
    const useCase = new ValidateCheckbox();
    const checkbox = CheckboxEntity.create({ value: true });
    const passingRule: ValidationRule = () => null;

    const result = useCase.execute({ checkbox, customRules: [passingRule] });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('should validate checkbox with all properties set', () => {
    const useCase = new ValidateCheckbox();
    const checkbox = CheckboxEntity.create({
      value: true,
      variant: 'error',
      disabled: true,
      required: true,
    });

    const result = useCase.execute({ checkbox });

    expect(result.isValid).toBe(true);
  });
});
