

import { describe, it, expect } from 'bun:test';
import { InputPresenter } from '../InputPresenter';
import { InputEntity } from '../../../domain/entities/input/InputState';
import { inputTokens } from '../../../frameworks/tokens/input-tokens';

describe('InputPresenter', () => {
  const presenter = new InputPresenter();

  
  
  

  describe('Basic state mapping', () => {
    it('should map disabled state', () => {
      const entity = InputEntity.create({ disabled: true });
      const viewModel = presenter.present(entity);

      expect(viewModel.disabled).toBe(true);
    });

    it('should map readOnly state', () => {
      const entity = InputEntity.create({ readOnly: true });
      const viewModel = presenter.present(entity);

      expect(viewModel.readOnly).toBe(true);
    });

    it('should map required state', () => {
      const entity = InputEntity.create({ required: true });
      const viewModel = presenter.present(entity);

      expect(viewModel.required).toBe(true);
    });

    it('should map interactive state from entity', () => {
      const entity1 = InputEntity.create({ disabled: false, readOnly: false });
      const viewModel1 = presenter.present(entity1);
      expect(viewModel1.interactive).toBe(true);

      const entity2 = InputEntity.create({ disabled: true });
      const viewModel2 = presenter.present(entity2);
      expect(viewModel2.interactive).toBe(false);
    });

    it('should map hasError state from entity', () => {
      const entity1 = InputEntity.create({ error: 'Error', state: 'error' });
      const viewModel1 = presenter.present(entity1);
      expect(viewModel1.hasError).toBe(true);

      const entity2 = InputEntity.create({ state: 'default' });
      const viewModel2 = presenter.present(entity2);
      expect(viewModel2.hasError).toBe(false);
    });

    it('should map errorMessage from entity', () => {
      const entity = InputEntity.create({ error: 'Test error', state: 'error' });
      const viewModel = presenter.present(entity);

      expect(viewModel.errorMessage).toBe('Test error');
    });
  });

  
  
  

  describe('Size token mapping', () => {
    it('should apply sm size tokens', () => {
      const entity = InputEntity.create({ size: 'sm' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.height).toBe(inputTokens.sizes.sm.height);
      expect(viewModel.styles.paddingH).toBe(inputTokens.sizes.sm.paddingH);
      expect(viewModel.styles.fontSize).toBe(inputTokens.sizes.sm.fontSize);
    });

    it('should apply md size tokens', () => {
      const entity = InputEntity.create({ size: 'md' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.height).toBe(inputTokens.sizes.md.height);
      expect(viewModel.styles.paddingH).toBe(inputTokens.sizes.md.paddingH);
      expect(viewModel.styles.fontSize).toBe(inputTokens.sizes.md.fontSize);
    });

    it('should apply lg size tokens', () => {
      const entity = InputEntity.create({ size: 'lg' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.height).toBe(inputTokens.sizes.lg.height);
      expect(viewModel.styles.paddingH).toBe(inputTokens.sizes.lg.paddingH);
      expect(viewModel.styles.fontSize).toBe(inputTokens.sizes.lg.fontSize);
    });
  });

  
  
  

  describe('State token mapping', () => {
    it('should apply default state tokens', () => {
      const entity = InputEntity.create({ state: 'default' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.borderColor).toBe(inputTokens.states.default.border);
      expect(viewModel.styles.focusColor).toBe(inputTokens.states.default.focus);
    });

    it('should apply error state tokens when hasError is true', () => {
      const entity = InputEntity.create({ error: 'Error', state: 'error' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.borderColor).toBe(inputTokens.states.error.border);
      expect(viewModel.styles.focusColor).toBe(inputTokens.states.error.focus);
    });

    it('should apply success state tokens', () => {
      const entity = InputEntity.create({ state: 'success' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.borderColor).toBe(inputTokens.states.success.border);
      expect(viewModel.styles.focusColor).toBe(inputTokens.states.success.focus);
    });

    it('should use error tokens when entity has error', () => {
      
      const entity = InputEntity.create({
        state: 'error',
        error: 'Error message',
      });

      const viewModel = presenter.present(entity);
      expect(viewModel.styles.borderColor).toBe(inputTokens.states.error.border);
      expect(viewModel.styles.focusColor).toBe(inputTokens.states.error.focus);
    });
  });

  
  
  

  describe('Color mapping', () => {
    it('should apply normal colors when not disabled', () => {
      const entity = InputEntity.create({ disabled: false });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.backgroundColor).toBe(inputTokens.colors.background);
      expect(viewModel.styles.textColor).toBe(inputTokens.colors.text);
    });

    it('should apply disabled colors when disabled', () => {
      const entity = InputEntity.create({ disabled: true });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.backgroundColor).toBe(
        inputTokens.colors.disabled.background
      );
      expect(viewModel.styles.textColor).toBe(inputTokens.colors.disabled.text);
    });

    it('should apply border radius from tokens', () => {
      const entity = InputEntity.create({});
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.borderRadius).toBe(inputTokens.radius);
    });
  });

  
  
  

  describe('Accessibility attributes', () => {
    it('should set ariaInvalid based on hasError', () => {
      const entity1 = InputEntity.create({ error: 'Error', state: 'error' });
      const viewModel1 = presenter.present(entity1);
      expect(viewModel1.ariaInvalid).toBe(true);

      const entity2 = InputEntity.create({ state: 'default' });
      const viewModel2 = presenter.present(entity2);
      expect(viewModel2.ariaInvalid).toBe(false);
    });

    it('should set ariaRequired based on required state', () => {
      const entity1 = InputEntity.create({ required: true });
      const viewModel1 = presenter.present(entity1);
      expect(viewModel1.ariaRequired).toBe(true);

      const entity2 = InputEntity.create({ required: false });
      const viewModel2 = presenter.present(entity2);
      expect(viewModel2.ariaRequired).toBe(false);
    });

    it('should set ariaReadOnly based on readOnly state', () => {
      const entity1 = InputEntity.create({ readOnly: true });
      const viewModel1 = presenter.present(entity1);
      expect(viewModel1.ariaReadOnly).toBe(true);

      const entity2 = InputEntity.create({ readOnly: false });
      const viewModel2 = presenter.present(entity2);
      expect(viewModel2.ariaReadOnly).toBe(false);
    });
  });

  
  
  

  describe('Integration scenarios', () => {
    it('should present complete disabled input correctly', () => {
      const entity = InputEntity.create({
        disabled: true,
        size: 'lg',
        type: 'email',
      });

      const viewModel = presenter.present(entity);

      expect(viewModel.disabled).toBe(true);
      expect(viewModel.interactive).toBe(false);
      expect(viewModel.styles.backgroundColor).toBe(
        inputTokens.colors.disabled.background
      );
      expect(viewModel.styles.textColor).toBe(inputTokens.colors.disabled.text);
      expect(viewModel.styles.height).toBe(inputTokens.sizes.lg.height);
    });

    it('should present input with error correctly', () => {
      const entity = InputEntity.create({
        error: 'Invalid email',
        state: 'error',
        type: 'email',
      });

      const viewModel = presenter.present(entity);

      expect(viewModel.hasError).toBe(true);
      expect(viewModel.errorMessage).toBe('Invalid email');
      expect(viewModel.ariaInvalid).toBe(true);
      expect(viewModel.styles.borderColor).toBe(inputTokens.states.error.border);
      expect(viewModel.styles.focusColor).toBe(inputTokens.states.error.focus);
    });

    it('should present readonly required input correctly', () => {
      
      const entity = InputEntity.create({
        readOnly: true,
        required: false,
      });

      const viewModel = presenter.present(entity);

      expect(viewModel.readOnly).toBe(true);
      expect(viewModel.required).toBe(false);
      expect(viewModel.interactive).toBe(false);
      expect(viewModel.ariaReadOnly).toBe(true);
    });

    it('should present success state input correctly', () => {
      const entity = InputEntity.create({
        state: 'success',
        value: 'valid@example.com',
        type: 'email',
      });

      const viewModel = presenter.present(entity);

      expect(viewModel.hasError).toBe(false);
      expect(viewModel.styles.borderColor).toBe(inputTokens.states.success.border);
      expect(viewModel.styles.focusColor).toBe(inputTokens.states.success.focus);
    });

    it('should handle all size variants correctly', () => {
      const sizes = ['sm', 'md', 'lg'] as const;

      sizes.forEach((size) => {
        const entity = InputEntity.create({ size });
        const viewModel = presenter.present(entity);

        expect(viewModel.styles.height).toBe(inputTokens.sizes[size].height);
        expect(viewModel.styles.paddingH).toBe(inputTokens.sizes[size].paddingH);
        expect(viewModel.styles.fontSize).toBe(inputTokens.sizes[size].fontSize);
      });
    });
  });
});
