

import { describe, it, expect } from 'bun:test';
import { CheckboxPresenter } from '../CheckboxPresenter';
import { CheckboxEntity } from '../../../domain/entities/checkbox/CheckboxState';
import { checkboxTokens } from '../../../frameworks/tokens/checkbox-tokens';

describe('CheckboxPresenter.present', () => {
  
  
  

  it('should present checked checkbox correctly', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({ value: true });

    const viewModel = presenter.present(entity);

    expect(viewModel.checked).toBe(true);
    expect(viewModel.unchecked).toBe(false);
    expect(viewModel.indeterminate).toBe(false);
    expect(viewModel.formValue).toBe(true);
  });

  it('should present unchecked checkbox correctly', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({ value: false });

    const viewModel = presenter.present(entity);

    expect(viewModel.checked).toBe(false);
    expect(viewModel.unchecked).toBe(true);
    expect(viewModel.indeterminate).toBe(false);
    expect(viewModel.formValue).toBe(false);
  });

  it('should present indeterminate checkbox correctly', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({ value: 'indeterminate' });

    const viewModel = presenter.present(entity);

    expect(viewModel.checked).toBe(false);
    expect(viewModel.unchecked).toBe(false);
    expect(viewModel.indeterminate).toBe(true);
    expect(viewModel.formValue).toBe(false);
  });

  it('should present disabled state correctly', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({ disabled: true });

    const viewModel = presenter.present(entity);

    expect(viewModel.disabled).toBe(true);
    expect(viewModel.readonly).toBe(false);
    expect(viewModel.interactive).toBe(false);
  });

  it('should present readonly state correctly', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({ readonly: true });

    const viewModel = presenter.present(entity);

    expect(viewModel.readonly).toBe(true);
    expect(viewModel.disabled).toBe(false);
    expect(viewModel.interactive).toBe(false);
  });

  it('should present required state correctly', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({ required: true });

    const viewModel = presenter.present(entity);

    expect(viewModel.required).toBe(true);
  });

  it('should present interactive state correctly', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({
      disabled: false,
      readonly: false,
    });

    const viewModel = presenter.present(entity);

    expect(viewModel.interactive).toBe(true);
  });

  
  
  

  it('should apply correct styles for unchecked default variant', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({ value: false, variant: 'default' });

    const viewModel = presenter.present(entity);

    expect(viewModel.styles.size).toBe(checkboxTokens.size);
    expect(viewModel.styles.radius).toBe(checkboxTokens.radius);
    expect(viewModel.styles.backgroundColor).toBe(
      checkboxTokens.variants.default.unchecked.background
    );
    expect(viewModel.styles.borderColor).toBe(
      checkboxTokens.variants.default.unchecked.border
    );
  });

  it('should apply correct styles for checked default variant', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({ value: true, variant: 'default' });

    const viewModel = presenter.present(entity);

    expect(viewModel.styles.backgroundColor).toBe(
      checkboxTokens.variants.default.checked.background
    );
    expect(viewModel.styles.borderColor).toBe(
      checkboxTokens.variants.default.checked.border
    );
    expect(viewModel.styles.checkmarkColor).toBe(
      checkboxTokens.variants.default.checked.checkmark
    );
  });

  it('should apply correct styles for indeterminate default variant', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({
      value: 'indeterminate',
      variant: 'default',
    });

    const viewModel = presenter.present(entity);

    expect(viewModel.styles.backgroundColor).toBe(
      checkboxTokens.variants.default.indeterminate.background
    );
    expect(viewModel.styles.borderColor).toBe(
      checkboxTokens.variants.default.indeterminate.border
    );
    expect(viewModel.styles.indicatorColor).toBe(
      checkboxTokens.variants.default.indeterminate.indicator
    );
  });

  
  
  

  it('should apply correct styles for unchecked error variant', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({ value: false, variant: 'error' });

    const viewModel = presenter.present(entity);

    expect(viewModel.styles.backgroundColor).toBe(
      checkboxTokens.variants.error.unchecked.background
    );
    expect(viewModel.styles.borderColor).toBe(
      checkboxTokens.variants.error.unchecked.border
    );
  });

  it('should apply correct styles for checked error variant', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({ value: true, variant: 'error' });

    const viewModel = presenter.present(entity);

    expect(viewModel.styles.backgroundColor).toBe(
      checkboxTokens.variants.error.checked.background
    );
    expect(viewModel.styles.borderColor).toBe(
      checkboxTokens.variants.error.checked.border
    );
    expect(viewModel.styles.checkmarkColor).toBe(
      checkboxTokens.variants.error.checked.checkmark
    );
  });

  it('should apply correct styles for indeterminate error variant', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({
      value: 'indeterminate',
      variant: 'error',
    });

    const viewModel = presenter.present(entity);

    expect(viewModel.styles.backgroundColor).toBe(
      checkboxTokens.variants.error.indeterminate.background
    );
    expect(viewModel.styles.borderColor).toBe(
      checkboxTokens.variants.error.indeterminate.border
    );
    expect(viewModel.styles.indicatorColor).toBe(
      checkboxTokens.variants.error.indeterminate.indicator
    );
  });

  
  
  

  it('should set correct ARIA attributes for checked checkbox', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({ value: true });

    const viewModel = presenter.present(entity);

    expect(viewModel.ariaChecked).toBe(true);
    expect(viewModel.role).toBe('checkbox');
  });

  it('should set correct ARIA attributes for unchecked checkbox', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({ value: false });

    const viewModel = presenter.present(entity);

    expect(viewModel.ariaChecked).toBe(false);
    expect(viewModel.role).toBe('checkbox');
  });

  it('should set correct ARIA attributes for indeterminate checkbox', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({ value: 'indeterminate' });

    const viewModel = presenter.present(entity);

    expect(viewModel.ariaChecked).toBe('mixed');
    expect(viewModel.role).toBe('checkbox');
  });

  it('should set ariaDisabled when disabled', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({ disabled: true });

    const viewModel = presenter.present(entity);

    expect(viewModel.ariaDisabled).toBe(true);
  });

  it('should set ariaReadonly when readonly', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({ readonly: true });

    const viewModel = presenter.present(entity);

    expect(viewModel.ariaReadonly).toBe(true);
  });

  it('should set ariaRequired when required', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({ required: true });

    const viewModel = presenter.present(entity);

    expect(viewModel.ariaRequired).toBe(true);
  });

  
  
  

  it('should handle all properties set simultaneously', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({
      value: true,
      variant: 'error',
      disabled: true,
      required: true,
    });

    const viewModel = presenter.present(entity);

    expect(viewModel.checked).toBe(true);
    expect(viewModel.disabled).toBe(true);
    expect(viewModel.required).toBe(true);
    expect(viewModel.interactive).toBe(false);
    expect(viewModel.ariaChecked).toBe(true);
    expect(viewModel.ariaDisabled).toBe(true);
    expect(viewModel.ariaRequired).toBe(true);
  });

  it('should return consistent viewModel for same entity', () => {
    const presenter = new CheckboxPresenter();
    const entity = CheckboxEntity.create({ value: true, variant: 'error' });

    const viewModel1 = presenter.present(entity);
    const viewModel2 = presenter.present(entity);

    expect(viewModel1).toEqual(viewModel2);
  });

  it('should return different viewModel for different entities', () => {
    const presenter = new CheckboxPresenter();
    const entity1 = CheckboxEntity.create({ value: true });
    const entity2 = CheckboxEntity.create({ value: false });

    const viewModel1 = presenter.present(entity1);
    const viewModel2 = presenter.present(entity2);

    expect(viewModel1.checked).not.toBe(viewModel2.checked);
    expect(viewModel1.ariaChecked).not.toBe(viewModel2.ariaChecked);
  });
});
