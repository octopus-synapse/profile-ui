

import { describe, it, expect, mock } from 'bun:test';
import { CheckboxController } from '../CheckboxController';
import { mustBeChecked } from '../../../domain/use-cases/checkbox/ValidateCheckbox';

describe('CheckboxController', () => {
  
  
  

  it('should initialize with default state', () => {
    const controller = new CheckboxController({});
    const viewModel = controller.getViewModel();

    expect(viewModel.checked).toBe(false);
    expect(viewModel.unchecked).toBe(true);
    expect(viewModel.disabled).toBe(false);
    expect(viewModel.readonly).toBe(false);
    expect(viewModel.required).toBe(false);
  });

  it('should initialize with custom state', () => {
    const controller = new CheckboxController({
      value: true,
      variant: 'error',
      disabled: true,
      required: true,
    });
    const viewModel = controller.getViewModel();

    expect(viewModel.checked).toBe(true);
    expect(viewModel.disabled).toBe(true);
    expect(viewModel.required).toBe(true);
  });

  
  
  

  it('should return current view model', () => {
    const controller = new CheckboxController({ value: true });
    const viewModel = controller.getViewModel();

    expect(viewModel).toBeDefined();
    expect(viewModel.checked).toBe(true);
    expect(viewModel.styles).toBeDefined();
    expect(viewModel.ariaChecked).toBe(true);
  });

  it('should return updated view model after state change', () => {
    const controller = new CheckboxController({ value: false });

    let viewModel = controller.getViewModel();
    expect(viewModel.checked).toBe(false);

    controller.setDisabled(true);

    viewModel = controller.getViewModel();
    expect(viewModel.disabled).toBe(true);
  });

  
  
  

  it('should toggle checkbox from false to true', async () => {
    const controller = new CheckboxController({ value: false });

    await controller.onToggle();

    const viewModel = controller.getViewModel();
    expect(viewModel.checked).toBe(true);
  });

  it('should toggle checkbox from true to false', async () => {
    const controller = new CheckboxController({ value: true });

    await controller.onToggle();

    const viewModel = controller.getViewModel();
    expect(viewModel.checked).toBe(false);
  });

  it('should toggle checkbox from indeterminate to true', async () => {
    const controller = new CheckboxController({ value: 'indeterminate' });

    await controller.onToggle();

    const viewModel = controller.getViewModel();
    expect(viewModel.checked).toBe(true);
  });

  it('should call handler when toggling', async () => {
    const controller = new CheckboxController({ value: false });
    const handler = mock((value) => {});

    await controller.onToggle(handler);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(true);
  });

  it('should throw error when toggling disabled checkbox', async () => {
    const controller = new CheckboxController({ value: false, disabled: true });

    await expect(controller.onToggle()).rejects.toThrow('not interactive');
  });

  it('should throw error when toggling readonly checkbox', async () => {
    const controller = new CheckboxController({ value: false, readonly: true });

    await expect(controller.onToggle()).rejects.toThrow('not interactive');
  });

  it('should handle async handler in toggle', async () => {
    const controller = new CheckboxController({ value: false });
    let handlerCompleted = false;
    const handler = mock(async (value) => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      handlerCompleted = true;
    });

    await controller.onToggle(handler);

    expect(handlerCompleted).toBe(true);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  
  
  

  it('should set checkbox to true', async () => {
    const controller = new CheckboxController({ value: false });

    await controller.setValue(true);

    const viewModel = controller.getViewModel();
    expect(viewModel.checked).toBe(true);
  });

  it('should set checkbox to false', async () => {
    const controller = new CheckboxController({ value: true });

    await controller.setValue(false);

    const viewModel = controller.getViewModel();
    expect(viewModel.checked).toBe(false);
  });

  it('should set checkbox to indeterminate', async () => {
    const controller = new CheckboxController({ value: false });

    await controller.setValue('indeterminate');

    const viewModel = controller.getViewModel();
    expect(viewModel.indeterminate).toBe(true);
  });

  it('should call handler when setting value', async () => {
    const controller = new CheckboxController({ value: false });
    const handler = mock((value) => {});

    await controller.setValue('indeterminate', handler);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith('indeterminate');
  });

  it('should throw error when setting value on disabled checkbox', async () => {
    const controller = new CheckboxController({ value: false, disabled: true });

    await expect(controller.setValue(true)).rejects.toThrow('not interactive');
  });

  
  
  

  it('should validate required checkbox as invalid when unchecked', () => {
    const controller = new CheckboxController({ value: false, required: true });

    const result = controller.validate();

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('This field is required');
  });

  it('should validate required checkbox as valid when checked', () => {
    const controller = new CheckboxController({ value: true, required: true });

    const result = controller.validate();

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('should validate optional checkbox as valid when unchecked', () => {
    const controller = new CheckboxController({ value: false, required: false });

    const result = controller.validate();

    expect(result.isValid).toBe(true);
  });

  it('should apply custom validation rules', () => {
    const controller = new CheckboxController({ value: false });
    controller.setValidationRules([mustBeChecked]);

    const result = controller.validate();

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Must be checked');
  });

  it('should validate with multiple custom rules', () => {
    const controller = new CheckboxController({ value: false, required: true });
    controller.setValidationRules([mustBeChecked]);

    const result = controller.validate();

    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveLength(2);
    expect(result.errors).toContain('This field is required');
    expect(result.errors).toContain('Must be checked');
  });

  
  
  

  it('should set custom validation rules', () => {
    const controller = new CheckboxController({ value: false });
    const customRule = mustBeChecked;

    controller.setValidationRules([customRule]);
    const result = controller.validate();

    expect(result.errors).toContain('Must be checked');
  });

  it('should replace existing validation rules', () => {
    const controller = new CheckboxController({ value: false });
    const rule1 = mustBeChecked;
    const rule2 = () => 'Different error';

    controller.setValidationRules([rule1]);
    controller.setValidationRules([rule2]);

    const result = controller.validate();

    expect(result.errors).toContain('Different error');
    expect(result.errors).not.toContain('Must be checked');
  });

  
  
  

  it('should set disabled state', () => {
    const controller = new CheckboxController({ disabled: false });

    controller.setDisabled(true);

    const viewModel = controller.getViewModel();
    expect(viewModel.disabled).toBe(true);
    expect(viewModel.interactive).toBe(false);
  });

  it('should set readonly state', () => {
    const controller = new CheckboxController({ readonly: false });

    controller.setReadonly(true);

    const viewModel = controller.getViewModel();
    expect(viewModel.readonly).toBe(true);
    expect(viewModel.interactive).toBe(false);
  });

  it('should set variant', () => {
    const controller = new CheckboxController({ variant: 'default' });

    controller.setVariant('error');

    const viewModel = controller.getViewModel();
    
    expect(viewModel.styles.borderColor).toContain('ef4444');
  });

  it('should set required state', () => {
    const controller = new CheckboxController({ required: false });

    controller.setRequired(true);

    const viewModel = controller.getViewModel();
    expect(viewModel.required).toBe(true);
  });

  
  
  

  it('should handle multiple state changes', async () => {
    const controller = new CheckboxController({ value: false });

    controller.setRequired(true);
    await controller.setValue(true);
    controller.setVariant('error');

    const viewModel = controller.getViewModel();
    expect(viewModel.checked).toBe(true);
    expect(viewModel.required).toBe(true);

    const validation = controller.validate();
    expect(validation.isValid).toBe(true);
  });

  it('should maintain state consistency through complex interactions', async () => {
    const controller = new CheckboxController({ value: false });

    await controller.onToggle();
    expect(controller.getViewModel().checked).toBe(true);

    await controller.setValue(false);
    expect(controller.getViewModel().checked).toBe(false);

    await controller.setValue('indeterminate');
    expect(controller.getViewModel().indeterminate).toBe(true);

    await controller.onToggle();
    expect(controller.getViewModel().checked).toBe(true);
  });

  it('should handle disabled state transition correctly', async () => {
    const controller = new CheckboxController({ value: false, disabled: false });

    await controller.onToggle();
    expect(controller.getViewModel().checked).toBe(true);

    controller.setDisabled(true);
    await expect(controller.onToggle()).rejects.toThrow();

    controller.setDisabled(false);
    await controller.onToggle();
    expect(controller.getViewModel().checked).toBe(false);
  });

  it('should handle validation state changes', () => {
    const controller = new CheckboxController({ value: false, required: false });

    let result = controller.validate();
    expect(result.isValid).toBe(true);

    controller.setRequired(true);
    result = controller.validate();
    expect(result.isValid).toBe(false);
  });

  
  
  

  it('should return current entity', () => {
    const controller = new CheckboxController({ value: true });
    const entity = controller.getEntity();

    expect(entity.currentState.value).toBe(true);
  });

  it('should return updated entity after state change', () => {
    const controller = new CheckboxController({ value: false });

    controller.setDisabled(true);
    const entity = controller.getEntity();

    expect(entity.currentState.disabled).toBe(true);
  });
});
