

import { describe, it, expect } from 'bun:test';
import { InputController } from '../InputController';

describe('InputController', () => {
  
  
  

  describe('Initialization', () => {
    it('should create with default state', () => {
      const controller = new InputController({});
      const viewModel = controller.getViewModel();

      expect(viewModel.disabled).toBe(false);
      expect(viewModel.readOnly).toBe(false);
      expect(viewModel.required).toBe(false);
      expect(viewModel.hasError).toBe(false);
    });

    it('should create with custom initial state', () => {
      const controller = new InputController({
        type: 'email',
        size: 'lg',
        value: 'test@example.com',
        required: true,
      });

      const viewModel = controller.getViewModel();
      expect(viewModel.required).toBe(true);
      expect(controller.getValue()).toBe('test@example.com');
    });
  });

  
  
  

  describe('onChange()', () => {
    it('should update value', () => {
      const controller = new InputController({ value: 'old' });
      controller.onChange('new');

      expect(controller.getValue()).toBe('new');
    });

    it('should clear error when value changes', () => {
      const controller = new InputController({
        value: 'bad',
        error: 'Invalid',
        state: 'error',
      });

      controller.onChange('good');

      const viewModel = controller.getViewModel();
      expect(viewModel.hasError).toBe(false);
      expect(viewModel.errorMessage).toBe(null);
    });

    it('should not change value when disabled', () => {
      const controller = new InputController({
        value: 'original',
        disabled: true,
      });

      controller.onChange('attempted change');

      expect(controller.getValue()).toBe('original');
    });

    it('should not change value when readonly', () => {
      const controller = new InputController({
        value: 'original',
        readOnly: true,
      });

      controller.onChange('attempted change');

      expect(controller.getValue()).toBe('original');
    });

    it('should validate when validateOnChange is true - passing', () => {
      const controller = new InputController({
        type: 'email',
        value: '',
      });

      controller.onChange('valid@example.com', true);

      const viewModel = controller.getViewModel();
      expect(viewModel.hasError).toBe(false);
    });

    it('should validate when validateOnChange is true - failing', () => {
      const controller = new InputController({
        type: 'email',
        value: '',
      });

      controller.onChange('invalid-email', true);

      const viewModel = controller.getViewModel();
      expect(viewModel.hasError).toBe(true);
      expect(viewModel.errorMessage).toBe('Please enter a valid email address');
    });

    it('should not validate when validateOnChange is false', () => {
      const controller = new InputController({
        type: 'email',
        value: '',
      });

      controller.onChange('invalid-email', false);

      const viewModel = controller.getViewModel();
      expect(viewModel.hasError).toBe(false);
    });

    it('should not validate when validateOnChange is undefined (default)', () => {
      const controller = new InputController({
        type: 'email',
        value: '',
      });

      controller.onChange('invalid-email');

      const viewModel = controller.getViewModel();
      expect(viewModel.hasError).toBe(false);
    });
  });

  
  
  

  describe('onBlur()', () => {
    it('should validate on blur - passing', () => {
      const controller = new InputController({
        type: 'email',
        value: 'valid@example.com',
      });

      controller.onBlur();

      const viewModel = controller.getViewModel();
      expect(viewModel.hasError).toBe(false);
    });

    it('should validate on blur - failing', () => {
      const controller = new InputController({
        type: 'email',
        value: 'invalid-email',
      });

      controller.onBlur();

      const viewModel = controller.getViewModel();
      expect(viewModel.hasError).toBe(true);
      expect(viewModel.errorMessage).toBe('Please enter a valid email address');
    });

    it('should clear error on blur when value is now valid', () => {
      const controller = new InputController({
        type: 'email',
        value: 'invalid',
        error: 'Previous error',
        state: 'error',
      });

      
      controller.setValue('valid@example.com');

      
      controller.onBlur();

      const viewModel = controller.getViewModel();
      expect(viewModel.hasError).toBe(false);
    });

    it('should validate required field on blur', () => {
      const controller = new InputController({
        type: 'text',
        value: '',
        required: true,
      });

      controller.onBlur();

      const viewModel = controller.getViewModel();
      expect(viewModel.hasError).toBe(true);
      expect(viewModel.errorMessage).toBe('This field is required');
    });
  });

  
  
  

  describe('validate()', () => {
    it('should return true when validation passes', () => {
      const controller = new InputController({
        type: 'email',
        value: 'valid@example.com',
      });

      const isValid = controller.validate();

      expect(isValid).toBe(true);
      expect(controller.hasError()).toBe(false);
    });

    it('should return false when validation fails', () => {
      const controller = new InputController({
        type: 'email',
        value: 'invalid',
      });

      const isValid = controller.validate();

      expect(isValid).toBe(false);
      expect(controller.hasError()).toBe(true);
    });

    it('should set error when validation fails', () => {
      const controller = new InputController({
        type: 'email',
        value: 'invalid',
      });

      controller.validate();

      const viewModel = controller.getViewModel();
      expect(viewModel.errorMessage).toBe('Please enter a valid email address');
    });
  });

  
  
  

  describe('getValue() / setValue()', () => {
    it('should get current value', () => {
      const controller = new InputController({ value: 'test' });
      expect(controller.getValue()).toBe('test');
    });

    it('should set value programmatically', () => {
      const controller = new InputController({ value: 'old' });
      controller.setValue('new');

      expect(controller.getValue()).toBe('new');
    });

    it('should clear error when setting value', () => {
      const controller = new InputController({
        value: 'bad',
        error: 'Error',
        state: 'error',
      });

      controller.setValue('good');

      expect(controller.hasError()).toBe(false);
    });
  });

  
  
  

  describe('setError() / clearError()', () => {
    it('should set error', () => {
      const controller = new InputController({});
      controller.setError('Custom error');

      const viewModel = controller.getViewModel();
      expect(viewModel.hasError).toBe(true);
      expect(viewModel.errorMessage).toBe('Custom error');
    });

    it('should clear error', () => {
      const controller = new InputController({
        error: 'Error',
        state: 'error',
      });

      controller.clearError();

      const viewModel = controller.getViewModel();
      expect(viewModel.hasError).toBe(false);
      expect(viewModel.errorMessage).toBe(null);
    });
  });

  
  
  

  describe('State setters', () => {
    it('should set disabled', () => {
      const controller = new InputController({ disabled: false });
      controller.setDisabled(true);

      const viewModel = controller.getViewModel();
      expect(viewModel.disabled).toBe(true);
    });

    it('should set readOnly', () => {
      const controller = new InputController({ readOnly: false });
      controller.setReadOnly(true);

      const viewModel = controller.getViewModel();
      expect(viewModel.readOnly).toBe(true);
    });

    it('should set required', () => {
      const controller = new InputController({ required: false });
      controller.setRequired(true);

      const viewModel = controller.getViewModel();
      expect(viewModel.required).toBe(true);
    });

    it('should set type', () => {
      const controller = new InputController({ type: 'text' });
      controller.setType('email');

      
      controller.setValue('invalid-email');
      controller.validate();

      expect(controller.hasError()).toBe(true);
    });

    it('should set size', () => {
      const controller = new InputController({ size: 'md' });
      controller.setSize('lg');

      const viewModel = controller.getViewModel();
      expect(viewModel.styles.height).toBe('48px'); 
    });

    it('should set state type', () => {
      const controller = new InputController({ state: 'default' });
      controller.setStateType('success');

      const viewModel = controller.getViewModel();
      expect(viewModel.styles.borderColor).toBe('#22c55e'); 
    });
  });

  
  
  

  describe('isInteractive() / hasError()', () => {
    it('should return true when interactive', () => {
      const controller = new InputController({
        disabled: false,
        readOnly: false,
      });

      expect(controller.isInteractive()).toBe(true);
    });

    it('should return false when disabled', () => {
      const controller = new InputController({ disabled: true });
      expect(controller.isInteractive()).toBe(false);
    });

    it('should return false when readonly', () => {
      const controller = new InputController({ readOnly: true });
      expect(controller.isInteractive()).toBe(false);
    });

    it('should return false when has error', () => {
      const controller = new InputController({});
      expect(controller.hasError()).toBe(false);

      controller.setError('Error');
      expect(controller.hasError()).toBe(true);
    });
  });

  
  
  

  describe('getViewModel() - Presenter integration', () => {
    it('should return view model with correct styles', () => {
      const controller = new InputController({
        size: 'lg',
        state: 'success',
      });

      const viewModel = controller.getViewModel();

      expect(viewModel.styles.height).toBe('48px');
      expect(viewModel.styles.borderColor).toBe('#22c55e');
    });

    it('should return view model with error styles', () => {
      const controller = new InputController({
        error: 'Error',
        state: 'error',
      });

      const viewModel = controller.getViewModel();

      expect(viewModel.styles.borderColor).toBe('#ef4444');
      expect(viewModel.ariaInvalid).toBe(true);
    });

    it('should return view model with disabled styles', () => {
      const controller = new InputController({ disabled: true });

      const viewModel = controller.getViewModel();

      expect(viewModel.styles.backgroundColor).toBe('#171717');
      expect(viewModel.styles.textColor).toBe('#525252');
    });
  });

  
  
  

  describe('Integration scenarios', () => {
    it('should handle complete user flow: type → blur → error → fix → blur → success', () => {
      const controller = new InputController({
        type: 'email',
        value: '',
        required: true,
      });

      
      controller.onChange('invalid');
      expect(controller.hasError()).toBe(false); 

      
      controller.onBlur();
      expect(controller.hasError()).toBe(true);
      expect(controller.getViewModel().errorMessage).toBe(
        'Please enter a valid email address'
      );

      
      controller.onChange('valid@example.com');
      expect(controller.hasError()).toBe(false); 

      
      controller.onBlur();
      expect(controller.hasError()).toBe(false); 
    });

    it('should handle validateOnChange flow', () => {
      const controller = new InputController({
        type: 'email',
        value: '',
      });

      
      controller.onChange('invalid', true);
      expect(controller.hasError()).toBe(true);

      
      controller.onChange('valid@example.com', true);
      expect(controller.hasError()).toBe(false);
    });

    it('should handle disabled input (no changes allowed)', () => {
      const controller = new InputController({
        value: 'original',
        disabled: true,
      });

      controller.onChange('new value');
      expect(controller.getValue()).toBe('original');

      controller.setValue('new value');
      expect(controller.getValue()).toBe('new value'); 
    });

    it('should validate different input types', () => {
      const testCases = [
        { type: 'email' as const, value: 'test@example.com', shouldPass: true },
        { type: 'email' as const, value: 'invalid', shouldPass: false },
        { type: 'url' as const, value: 'https://example.com', shouldPass: true },
        { type: 'url' as const, value: 'invalid', shouldPass: false },
        { type: 'tel' as const, value: '123-456-7890', shouldPass: true },
        { type: 'tel' as const, value: 'ABC', shouldPass: false },
        { type: 'number' as const, value: '123', shouldPass: true },
        { type: 'number' as const, value: 'abc', shouldPass: false },
      ];

      testCases.forEach(({ type, value, shouldPass }) => {
        const controller = new InputController({ type, value });
        const isValid = controller.validate();
        expect(isValid).toBe(shouldPass);
      });
    });

    it('should handle required validation correctly', () => {
      const controller = new InputController({
        type: 'text',
        value: '',
        required: true,
      });

      expect(controller.validate()).toBe(false);
      expect(controller.getViewModel().errorMessage).toBe('This field is required');

      controller.setValue('something');
      expect(controller.validate()).toBe(true);
    });
  });
});
