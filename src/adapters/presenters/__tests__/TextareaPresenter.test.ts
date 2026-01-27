

import { describe, it, expect } from 'bun:test';
import { TextareaEntity } from '../../../domain/entities/textarea/TextareaState';
import { TextareaPresenter } from '../TextareaPresenter';

describe('TextareaPresenter', () => {
  const presenter = new TextareaPresenter();

  describe('State Mapping', () => {
    it('should map basic state properties', () => {
      const entity = TextareaEntity.create({
        disabled: true,
        readOnly: false,
        required: true,
      });

      const viewModel = presenter.present(entity);

      expect(viewModel.disabled).toBe(true);
      expect(viewModel.readOnly).toBe(false);
      expect(viewModel.required).toBe(true);
      expect(viewModel.interactive).toBe(false); 
    });

    it('should map error state', () => {
      const entity = TextareaEntity.create({
        error: 'Test error',
        state: 'error',
      });

      const viewModel = presenter.present(entity);

      expect(viewModel.hasError).toBe(true);
      expect(viewModel.errorMessage).toBe('Test error');
    });

    it('should map textarea-specific properties', () => {
      const entity = TextareaEntity.create({
        rows: 10,
        autoResize: true,
      });

      const viewModel = presenter.present(entity);

      expect(viewModel.rows).toBe(10);
      expect(viewModel.autoResize).toBe(true);
    });
  });

  describe('Character Counting', () => {
    it('should include character count', () => {
      const entity = TextareaEntity.create({
        value: 'Hello World',
      });

      const viewModel = presenter.present(entity);

      expect(viewModel.characterCount).toBe(11);
    });

    it('should include word count', () => {
      const entity = TextareaEntity.create({
        value: 'Hello World Test',
      });

      const viewModel = presenter.present(entity);

      expect(viewModel.wordCount).toBe(3);
    });

    it('should include line count', () => {
      const entity = TextareaEntity.create({
        value: 'Line 1\nLine 2\nLine 3',
      });

      const viewModel = presenter.present(entity);

      expect(viewModel.lineCount).toBe(3);
    });

    it('should include remaining characters when maxLength set', () => {
      const entity = TextareaEntity.create({
        value: 'Hello',
        maxLength: 100,
      });

      const viewModel = presenter.present(entity);

      expect(viewModel.remainingCharacters).toBe(95);
    });

    it('should indicate exceeds max length', () => {
      const entity = TextareaEntity.create({
        value: 'Too long',
        maxLength: 5,
      });

      const viewModel = presenter.present(entity);

      expect(viewModel.exceedsMaxLength).toBe(true);
    });
  });

  describe('Style Computation', () => {
    it('should apply small size tokens', () => {
      const entity = TextareaEntity.create({ size: 'sm' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.minHeight).toBe('60px');
      expect(viewModel.styles.fontSize).toBe('13px');
    });

    it('should apply medium size tokens', () => {
      const entity = TextareaEntity.create({ size: 'md' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.minHeight).toBe('80px');
      expect(viewModel.styles.fontSize).toBe('14px');
    });

    it('should apply large size tokens', () => {
      const entity = TextareaEntity.create({ size: 'lg' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.minHeight).toBe('100px');
      expect(viewModel.styles.fontSize).toBe('16px');
    });

    it('should apply default state styles', () => {
      const entity = TextareaEntity.create({ state: 'default' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.borderColor).toBe('rgba(255, 255, 255, 0.1)');
      expect(viewModel.styles.focusColor).toBe('#06b6d4');
    });

    it('should apply error state styles', () => {
      const entity = TextareaEntity.create({
        error: 'Error',
        state: 'error',
      });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.borderColor).toBe('#ef4444');
      expect(viewModel.styles.focusColor).toBe('#ef4444');
    });

    it('should apply success state styles', () => {
      const entity = TextareaEntity.create({ state: 'success' });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.borderColor).toBe('#22c55e');
      expect(viewModel.styles.focusColor).toBe('#22c55e');
    });

    it('should apply disabled styles', () => {
      const entity = TextareaEntity.create({ disabled: true });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.textColor).toBe('rgba(255, 255, 255, 0.5)');
    });

    it('should apply normal text color when not disabled', () => {
      const entity = TextareaEntity.create({ disabled: false });
      const viewModel = presenter.present(entity);

      expect(viewModel.styles.textColor).toBe('#ffffff');
    });
  });

  describe('Accessibility', () => {
    it('should set aria-invalid when has error', () => {
      const entity = TextareaEntity.create({
        error: 'Error',
        state: 'error',
      });
      const viewModel = presenter.present(entity);

      expect(viewModel.ariaInvalid).toBe(true);
    });

    it('should set aria-required when required', () => {
      const entity = TextareaEntity.create({ required: true });
      const viewModel = presenter.present(entity);

      expect(viewModel.ariaRequired).toBe(true);
    });

    it('should set aria-readonly when readonly', () => {
      const entity = TextareaEntity.create({ readOnly: true });
      const viewModel = presenter.present(entity);

      expect(viewModel.ariaReadOnly).toBe(true);
    });
  });
});
