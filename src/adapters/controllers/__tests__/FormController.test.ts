

import { describe, it, expect } from 'bun:test';
import { FormController } from '../FormController';

describe('FormController', () => {
  describe('Initialization', () => {
    it('should create controller with empty form', () => {
      const controller = new FormController();
      const viewModel = controller.getViewModel();

      expect(viewModel.fieldCount).toBe(0);
      expect(viewModel.status).toBe('idle');
      expect(viewModel.isPristine).toBe(true);
    });

    it('should accept submit handler', () => {
      const handler = async () => {};
      const controller = new FormController(handler);

      expect(controller).toBeDefined();
    });
  });

  describe('Field Registration', () => {
    it('should register field', () => {
      const controller = new FormController();
      controller.registerField('email', 'test@test.com', true);

      const viewModel = controller.getViewModel();
      expect(viewModel.fieldCount).toBe(1);
      expect(viewModel.fields.has('email')).toBe(true);
    });

    it('should register multiple fields', () => {
      const controller = new FormController();
      controller.registerField('email');
      controller.registerField('password');

      expect(controller.getFieldCount()).toBe(2);
    });

    it('should unregister field', () => {
      const controller = new FormController();
      controller.registerField('email');
      controller.unregisterField('email');

      expect(controller.getFieldCount()).toBe(0);
    });

    it('should register field with validator', () => {
      const controller = new FormController();
      const validator = (value: any) => (value === 'test' ? null : 'Invalid');

      controller.registerField('username', '', false, validator);

      const viewModel = controller.getViewModel();
      expect(viewModel.fields.has('username')).toBe(true);
    });
  });

  describe('Field Values', () => {
    it('should set field value', () => {
      const controller = new FormController();
      controller.registerField('email');
      controller.setFieldValue('email', 'test@test.com');

      expect(controller.getFieldValue('email')).toBe('test@test.com');
    });

    it('should get all values', () => {
      const controller = new FormController();
      controller.registerField('email', 'test@test.com');
      controller.registerField('password', 'secure123');

      const values = controller.getValues();
      expect(values).toEqual({
        email: 'test@test.com',
        password: 'secure123',
      });
    });

    it('should mark field as dirty when value changes', () => {
      const controller = new FormController();
      controller.registerField('email');
      controller.setFieldValue('email', 'test@test.com');

      const viewModel = controller.getViewModel();
      const field = viewModel.fields.get('email');
      expect(field?.dirty).toBe(true);
    });
  });

  describe('Field Validation', () => {
    it('should validate single field', () => {
      const controller = new FormController();
      controller.registerField('email', '', true);

      const isValid = controller.validateField('email');

      expect(isValid).toBe(false);
      const viewModel = controller.getViewModel();
      expect(viewModel.fields.get('email')?.error).toBe('This field is required');
    });

    it('should validate entire form', () => {
      const controller = new FormController();
      controller.registerField('email', '', true);
      controller.registerField('password', '', true);

      const isValid = controller.validateForm();

      expect(isValid).toBe(false);
      expect(controller.getErrorCount()).toBe(2);
    });

    it('should touch all fields when validating form', () => {
      const controller = new FormController();
      controller.registerField('email', '', true);

      controller.validateForm(true);

      const viewModel = controller.getViewModel();
      expect(viewModel.fields.get('email')?.touched).toBe(true);
    });
  });

  describe('Field Touching', () => {
    it('should mark field as touched', () => {
      const controller = new FormController();
      controller.registerField('email');
      controller.touchField('email');

      const viewModel = controller.getViewModel();
      expect(viewModel.fields.get('email')?.touched).toBe(true);
    });
  });

  describe('Form Submission', () => {
    it('should prevent submit when invalid', async () => {
      const controller = new FormController();
      controller.registerField('email', '', true);

      await controller.submit();

      
      expect(controller.isSubmitting()).toBe(false);
      expect(controller.getViewModel().hasErrors).toBe(true);
    });

    it('should call submit handler when valid', async () => {
      let submitCalled = false;
      let submittedData: any = null;

      const handler = async (data: any) => {
        submitCalled = true;
        submittedData = data;
      };

      const controller = new FormController(handler);
      controller.registerField('email', 'test@test.com', true);

      await controller.submit();

      expect(submitCalled).toBe(true);
      expect(submittedData).toEqual({ email: 'test@test.com' });
      expect(controller.getViewModel().isSuccess).toBe(true);
    });

    it('should set success status after successful submit', async () => {
      const handler = async () => {};
      const controller = new FormController(handler);
      controller.registerField('email', 'test@test.com', true);

      await controller.submit();

      expect(controller.getViewModel().isSuccess).toBe(true);
    });

    it('should set error status on submit failure', async () => {
      const handler = async () => {
        throw new Error('Network error');
      };

      const controller = new FormController(handler);
      controller.registerField('email', 'test@test.com', true);

      await controller.submit();

      const viewModel = controller.getViewModel();
      expect(viewModel.isError).toBe(true);
      expect(viewModel.submitError).toBe('Network error');
    });

    it('should mark as success if no handler provided', async () => {
      const controller = new FormController();
      controller.registerField('email', 'test@test.com', true);

      await controller.submit();

      expect(controller.getViewModel().isSuccess).toBe(true);
    });

    it('should increment submit attempts', async () => {
      const controller = new FormController();
      controller.registerField('email', '', true);

      await controller.submit(); 

      expect(controller.getViewModel().submitAttempts).toBe(1);
    });
  });

  describe('Form Reset', () => {
    it('should reset form to empty', () => {
      const controller = new FormController();
      controller.registerField('email', 'test@test.com');
      controller.setFieldValue('email', 'new@test.com');

      controller.reset();

      expect(controller.getFieldValue('email')).toBe('');
      expect(controller.isPristine()).toBe(true);
    });

    it('should reset to specific values', () => {
      const controller = new FormController();
      controller.registerField('email', 'old@test.com');

      controller.reset({ email: 'new@test.com' });

      expect(controller.getFieldValue('email')).toBe('new@test.com');
    });

    it('should clear errors on reset', () => {
      const controller = new FormController();
      controller.registerField('email', '', true);
      controller.validateField('email');

      controller.reset();

      expect(controller.getViewModel().hasErrors).toBe(false);
    });
  });

  describe('Submit Error Management', () => {
    it('should set submit error', () => {
      const controller = new FormController();
      controller.setSubmitError('Something went wrong');

      const viewModel = controller.getViewModel();
      expect(viewModel.submitError).toBe('Something went wrong');
      expect(viewModel.isError).toBe(true);
    });

    it('should clear submit error', () => {
      const controller = new FormController();
      controller.setSubmitError('Error');
      controller.clearSubmitError();

      expect(controller.getViewModel().submitError).toBe(null);
    });
  });

  describe('Form State Queries', () => {
    it('should check if form is valid', () => {
      const controller = new FormController();
      controller.registerField('email', 'test@test.com', true);

      expect(controller.isValid()).toBe(true);
    });

    it('should check if form is pristine', () => {
      const controller = new FormController();
      controller.registerField('email');

      expect(controller.isPristine()).toBe(true);

      controller.setFieldValue('email', 'test@test.com');
      expect(controller.isPristine()).toBe(false);
    });

    it('should check if form is dirty', () => {
      const controller = new FormController();
      controller.registerField('email');

      expect(controller.isDirty()).toBe(false);

      controller.setFieldValue('email', 'test@test.com');
      expect(controller.isDirty()).toBe(true);
    });

    it('should get field count', () => {
      const controller = new FormController();
      expect(controller.getFieldCount()).toBe(0);

      controller.registerField('email');
      expect(controller.getFieldCount()).toBe(1);

      controller.registerField('password');
      expect(controller.getFieldCount()).toBe(2);
    });

    it('should get error count', () => {
      const controller = new FormController();
      controller.registerField('email', '', true);
      controller.registerField('password', '', true);

      controller.validateForm();

      expect(controller.getErrorCount()).toBe(2);
    });
  });

  describe('ViewModel Generation', () => {
    it('should generate complete view model', () => {
      const controller = new FormController();
      controller.registerField('email', 'test@test.com', true);

      const viewModel = controller.getViewModel();

      expect(viewModel.status).toBe('idle');
      expect(viewModel.fieldCount).toBe(1);
      
      expect(viewModel.isPristine).toBe(true);
      expect(viewModel.isValid).toBe(true);
      expect(viewModel.canSubmit).toBe(true);
    });

    it('should set canSubmit based on validity', () => {
      const controller = new FormController();
      controller.registerField('email', '', true);

      let viewModel = controller.getViewModel();
      expect(viewModel.canSubmit).toBe(false);

      controller.setFieldValue('email', 'test@test.com');
      viewModel = controller.getViewModel();
      expect(viewModel.canSubmit).toBe(true);
    });

    it('should set canReset when has fields', () => {
      const controller = new FormController();

      let viewModel = controller.getViewModel();
      expect(viewModel.canReset).toBe(false);

      controller.registerField('email');
      viewModel = controller.getViewModel();
      expect(viewModel.canReset).toBe(true);
    });
  });
});
