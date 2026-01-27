

import { describe, it, expect, beforeEach } from 'bun:test';
import { TextareaController } from '../TextareaController';

describe('TextareaController', () => {
  let controller: TextareaController;

  beforeEach(() => {
    controller = new TextareaController({});
  });

  describe('Initialization', () => {
    it('should initialize with default state', () => {
      const viewModel = controller.getViewModel();

      expect(viewModel.disabled).toBe(false);
      expect(viewModel.readOnly).toBe(false);
      expect(viewModel.required).toBe(false);
      expect(viewModel.hasError).toBe(false);
    });

    it('should initialize with custom state', () => {
      const customController = new TextareaController({
        value: 'Initial',
        required: true,
        maxLength: 500,
        rows: 10,
      });

      expect(customController.getValue()).toBe('Initial');
      const viewModel = customController.getViewModel();
      expect(viewModel.required).toBe(true);
    });
  });

  describe('onChange', () => {
    it('should update value', () => {
      controller.onChange('Hello World');

      expect(controller.getValue()).toBe('Hello World');
      const viewModel = controller.getViewModel();
      expect(viewModel.characterCount).toBe(11);
    });

    it('should update view model after change', () => {
      controller.onChange('Test');
      const viewModel = controller.getViewModel();

      expect(viewModel.characterCount).toBe(4);
      expect(viewModel.wordCount).toBe(1);
    });

    it('should not validate by default', () => {
      const requiredController = new TextareaController({ required: true });
      requiredController.onChange('');

      const viewModel = requiredController.getViewModel();
      expect(viewModel.hasError).toBe(false);
    });

    it('should validate when validateOnChange is true', () => {
      const requiredController = new TextareaController({ required: true });
      requiredController.onChange('', true);

      const viewModel = requiredController.getViewModel();
      expect(viewModel.hasError).toBe(true);
      expect(viewModel.errorMessage).toBe('This field is required');
    });

    it('should clear errors when typing', () => {
      controller.setError('Some error');
      controller.onChange('Fixing');

      const viewModel = controller.getViewModel();
      expect(viewModel.hasError).toBe(false);
    });

    it('should not change non-interactive textareas', () => {
      controller.setDisabled(true);
      controller.onChange('New Value');

      expect(controller.getValue()).toBe('');
    });
  });

  describe('onBlur', () => {
    it('should trigger validation', () => {
      const requiredController = new TextareaController({ required: true });
      requiredController.onBlur();

      const viewModel = requiredController.getViewModel();
      expect(viewModel.hasError).toBe(true);
    });

    it('should clear errors when validation passes', () => {
      controller.setError('Error');
      controller.setValue('Valid');
      controller.onBlur();

      const viewModel = controller.getViewModel();
      expect(viewModel.hasError).toBe(false);
    });
  });

  describe('validate', () => {
    it('should return true when valid', () => {
      controller.setValue('Valid');
      const isValid = controller.validate();

      expect(isValid).toBe(true);
    });

    it('should return false when invalid', () => {
      const requiredController = new TextareaController({ required: true });
      const isValid = requiredController.validate();

      expect(isValid).toBe(false);
    });

    it('should update view model with validation result', () => {
      const maxLengthController = new TextareaController({ maxLength: 10 });
      maxLengthController.setValue('This is too long');
      maxLengthController.validate();

      const viewModel = maxLengthController.getViewModel();
      expect(viewModel.hasError).toBe(true);
    });
  });

  describe('getValue / setValue', () => {
    it('should get current value', () => {
      controller.setValue('Test');
      expect(controller.getValue()).toBe('Test');
    });

    it('should set value programmatically', () => {
      controller.setValue('Programmatic');
      const viewModel = controller.getViewModel();

      expect(viewModel.characterCount).toBe(12);
    });
  });

  describe('Error Management', () => {
    it('should set error', () => {
      controller.setError('Custom error');
      const viewModel = controller.getViewModel();

      expect(viewModel.hasError).toBe(true);
      expect(viewModel.errorMessage).toBe('Custom error');
    });

    it('should clear error', () => {
      controller.setError('Error');
      controller.clearError();

      const viewModel = controller.getViewModel();
      expect(viewModel.hasError).toBe(false);
    });
  });

  describe('State Setters', () => {
    it('should set disabled', () => {
      controller.setDisabled(true);
      const viewModel = controller.getViewModel();

      expect(viewModel.disabled).toBe(true);
      expect(viewModel.interactive).toBe(false);
    });

    it('should set readOnly', () => {
      controller.setReadOnly(true);
      const viewModel = controller.getViewModel();

      expect(viewModel.readOnly).toBe(true);
    });

    it('should set required', () => {
      controller.setRequired(true);
      const viewModel = controller.getViewModel();

      expect(viewModel.required).toBe(true);
    });

    it('should set maxLength', () => {
      controller.setMaxLength(100);
      controller.setValue('Hello');

      const viewModel = controller.getViewModel();
      expect(viewModel.remainingCharacters).toBe(95);
    });

    it('should set minLength', () => {
      controller.setMinLength(10);
      controller.setValue('Hi');
      controller.validate();

      const viewModel = controller.getViewModel();
      expect(viewModel.hasError).toBe(true);
    });

    it('should set rows', () => {
      controller.setRows(10);
      const viewModel = controller.getViewModel();

      
      expect(viewModel.rows).toBe(10);
    });

    it('should set autoResize', () => {
      controller.setAutoResize(true);
      const viewModel = controller.getViewModel();

      expect(viewModel.autoResize).toBe(true);
    });

    it('should set size', () => {
      controller.setSize('lg');
      const viewModel = controller.getViewModel();

      
      expect(viewModel.styles).toBeDefined();
    });
  });

  describe('Computed Properties', () => {
    it('should check if interactive', () => {
      expect(controller.isInteractive()).toBe(true);

      controller.setDisabled(true);
      expect(controller.isInteractive()).toBe(false);
    });

    it('should check if has error', () => {
      expect(controller.hasError()).toBe(false);

      controller.setError('Error');
      expect(controller.hasError()).toBe(true);
    });
  });

  describe('Character Counting', () => {
    it('should provide character count', () => {
      controller.setValue('Hello World');
      const viewModel = controller.getViewModel();

      expect(viewModel.characterCount).toBe(11);
    });

    it('should provide word count', () => {
      controller.setValue('Hello World Test');
      const viewModel = controller.getViewModel();

      expect(viewModel.wordCount).toBe(3);
    });

    it('should provide line count', () => {
      controller.setValue('Line 1\nLine 2\nLine 3');
      const viewModel = controller.getViewModel();

      expect(viewModel.lineCount).toBe(3);
    });

    it('should provide remaining characters', () => {
      controller.setMaxLength(100);
      controller.setValue('Hello');
      const viewModel = controller.getViewModel();

      expect(viewModel.remainingCharacters).toBe(95);
    });

    it('should indicate exceeds max length', () => {
      controller.setMaxLength(5);
      controller.setValue('Too long');
      const viewModel = controller.getViewModel();

      expect(viewModel.exceedsMaxLength).toBe(true);
    });
  });
});
