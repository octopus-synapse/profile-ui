

import { describe, it, expect } from 'bun:test';
import { FormEntity } from '../../../domain/entities/form/FormState';
import { FormPresenter } from '../FormPresenter';

describe('FormPresenter', () => {
  const presenter = new FormPresenter();

  describe('Basic Presentation', () => {
    it('should present empty form', () => {
      const form = FormEntity.create();
      const viewModel = presenter.present(form);

      expect(viewModel.status).toBe('idle');
      expect(viewModel.fieldCount).toBe(0);
      expect(viewModel.isPristine).toBe(true);
      expect(viewModel.isDirty).toBe(false);
      expect(viewModel.isValid).toBe(true);
      expect(viewModel.hasErrors).toBe(false);
    });

    it('should present form with fields', () => {
      let form = FormEntity.create();
      form = form.registerField('email', 'test@test.com', true);
      form = form.registerField('password', 'secure123', true);

      const viewModel = presenter.present(form);

      expect(viewModel.fieldCount).toBe(2);
      expect(viewModel.fieldNames).toContain('email');
      expect(viewModel.fieldNames).toContain('password');
    });
  });

  describe('Field View Models', () => {
    it('should create field view model', () => {
      let form = FormEntity.create();
      form = form.registerField('email', 'test@test.com', true);

      const viewModel = presenter.present(form);
      const emailField = viewModel.fields.get('email');

      expect(emailField).toBeDefined();
      expect(emailField?.name).toBe('email');
      expect(emailField?.value).toBe('test@test.com');
      expect(emailField?.required).toBe(true);
      expect(emailField?.error).toBe(null);
      expect(emailField?.hasError).toBe(false);
      expect(emailField?.touched).toBe(false);
      expect(emailField?.dirty).toBe(false);
    });

    it('should include error in field view model', () => {
      let form = FormEntity.create();
      form = form.registerField('email', '', true);
      form = form.setFieldError('email', 'This field is required');

      const viewModel = presenter.present(form);
      const emailField = viewModel.fields.get('email');

      expect(emailField?.error).toBe('This field is required');
      expect(emailField?.hasError).toBe(true);
    });

    it('should mark field as touched', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.touchField('email');

      const viewModel = presenter.present(form);
      const emailField = viewModel.fields.get('email');

      expect(emailField?.touched).toBe(true);
    });

    it('should mark field as dirty', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.setFieldValue('email', 'test@test.com');

      const viewModel = presenter.present(form);
      const emailField = viewModel.fields.get('email');

      expect(emailField?.dirty).toBe(true);
    });
  });

  describe('Form State Presentation', () => {
    it('should present pristine state', () => {
      let form = FormEntity.create();
      form = form.registerField('email');

      const viewModel = presenter.present(form);

      expect(viewModel.isPristine).toBe(true);
      expect(viewModel.isDirty).toBe(false);
    });

    it('should present dirty state', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.setFieldValue('email', 'test@test.com');

      const viewModel = presenter.present(form);

      expect(viewModel.isPristine).toBe(false);
      expect(viewModel.isDirty).toBe(true);
    });

    it('should present touched state', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.touchField('email');

      const viewModel = presenter.present(form);

      expect(viewModel.isTouched).toBe(true);
    });

    it('should present valid state', () => {
      let form = FormEntity.create();
      form = form.registerField('email', 'test@test.com', true);

      const viewModel = presenter.present(form);

      expect(viewModel.isValid).toBe(true);
    });

    it('should present invalid state', () => {
      let form = FormEntity.create();
      form = form.registerField('email', '', true);

      const viewModel = presenter.present(form);

      expect(viewModel.isValid).toBe(false);
    });

    it('should present has errors state', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.setFieldError('email', 'Invalid');

      const viewModel = presenter.present(form);

      expect(viewModel.hasErrors).toBe(true);
    });
  });

  describe('Status Presentation', () => {
    it('should present idle status', () => {
      const form = FormEntity.create();
      const viewModel = presenter.present(form);

      expect(viewModel.status).toBe('idle');
      expect(viewModel.isSubmitting).toBe(false);
      expect(viewModel.isValidating).toBe(false);
      expect(viewModel.isSuccess).toBe(false);
      expect(viewModel.isError).toBe(false);
    });

    it('should present submitting status', () => {
      let form = FormEntity.create();
      form = form.registerField('email', 'test@test.com');
      form = form.withStatus('submitting');

      const viewModel = presenter.present(form);

      expect(viewModel.status).toBe('submitting');
      expect(viewModel.isSubmitting).toBe(true);
    });

    it('should present validating status', () => {
      const form = FormEntity.create().withStatus('validating');
      const viewModel = presenter.present(form);

      expect(viewModel.status).toBe('validating');
      expect(viewModel.isValidating).toBe(true);
    });

    it('should present success status', () => {
      const form = FormEntity.create().withStatus('success');
      const viewModel = presenter.present(form);

      expect(viewModel.status).toBe('success');
      expect(viewModel.isSuccess).toBe(true);
    });

    it('should present error status', () => {
      const form = FormEntity.create().withSubmitError('Failed');
      const viewModel = presenter.present(form);

      expect(viewModel.status).toBe('error');
      expect(viewModel.isError).toBe(true);
      expect(viewModel.submitError).toBe('Failed');
    });
  });

  describe('Counts and Metadata', () => {
    it('should present field count', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.registerField('password');

      const viewModel = presenter.present(form);

      expect(viewModel.fieldCount).toBe(2);
    });

    it('should present error count', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.setFieldError('email', 'Invalid');
      form = form.registerField('password');
      form = form.setFieldError('password', 'Too short');

      const viewModel = presenter.present(form);

      expect(viewModel.errorCount).toBe(2);
    });

    it('should present submit attempts', () => {
      let form = FormEntity.create();
      form = form.incrementSubmitAttempts();
      form = form.incrementSubmitAttempts();

      const viewModel = presenter.present(form);

      expect(viewModel.submitAttempts).toBe(2);
    });

    it('should present field names', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.registerField('password');
      form = form.registerField('remember');

      const viewModel = presenter.present(form);

      expect(viewModel.fieldNames).toHaveLength(3);
      expect(viewModel.fieldNames).toContain('email');
      expect(viewModel.fieldNames).toContain('password');
      expect(viewModel.fieldNames).toContain('remember');
    });
  });

  describe('Action Enablement', () => {
    it('should enable submit when valid and not submitting', () => {
      let form = FormEntity.create();
      form = form.registerField('email', 'test@test.com', true);

      const viewModel = presenter.present(form);

      expect(viewModel.canSubmit).toBe(true);
    });

    it('should disable submit when invalid', () => {
      let form = FormEntity.create();
      form = form.registerField('email', '', true);

      const viewModel = presenter.present(form);

      expect(viewModel.canSubmit).toBe(false);
    });

    it('should disable submit when submitting', () => {
      let form = FormEntity.create();
      form = form.registerField('email', 'test@test.com', true);
      form = form.withStatus('submitting');

      const viewModel = presenter.present(form);

      expect(viewModel.canSubmit).toBe(false);
    });

    it('should enable reset when has fields and not submitting', () => {
      let form = FormEntity.create();
      form = form.registerField('email');

      const viewModel = presenter.present(form);

      expect(viewModel.canReset).toBe(true);
    });

    it('should disable reset when no fields', () => {
      const form = FormEntity.create();
      const viewModel = presenter.present(form);

      expect(viewModel.canReset).toBe(false);
    });

    it('should disable reset when submitting', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.withStatus('submitting');

      const viewModel = presenter.present(form);

      expect(viewModel.canReset).toBe(false);
    });
  });

  describe('Submit Error Presentation', () => {
    it('should present submit error', () => {
      const form = FormEntity.create().withSubmitError('Network error');
      const viewModel = presenter.present(form);

      expect(viewModel.submitError).toBe('Network error');
    });

    it('should present null when no submit error', () => {
      const form = FormEntity.create();
      const viewModel = presenter.present(form);

      expect(viewModel.submitError).toBe(null);
    });
  });

  describe('Complex Scenarios', () => {
    it('should present form with mixed field states', () => {
      let form = FormEntity.create();
      form = form.registerField('email', 'test@test.com', true);
      form = form.registerField('password', '', true);
      form = form.touchField('password');
      form = form.setFieldError('password', 'Required');

      const viewModel = presenter.present(form);

      const emailField = viewModel.fields.get('email');
      const passwordField = viewModel.fields.get('password');

      expect(emailField?.hasError).toBe(false);
      expect(emailField?.touched).toBe(false);

      expect(passwordField?.hasError).toBe(true);
      expect(passwordField?.touched).toBe(true);
      expect(passwordField?.error).toBe('Required');

      expect(viewModel.isValid).toBe(false);
      expect(viewModel.hasErrors).toBe(true);
      expect(viewModel.errorCount).toBe(1);
    });

    it('should present form after failed submit', () => {
      let form = FormEntity.create();
      form = form.registerField('email', '', true);
      form = form.incrementSubmitAttempts();
      form = form.touchField('email');
      form = form.setFieldError('email', 'Required');
      form = form.withSubmitError('Please fix errors');

      const viewModel = presenter.present(form);

      expect(viewModel.submitAttempts).toBe(1);
      expect(viewModel.isError).toBe(true);
      expect(viewModel.submitError).toBe('Please fix errors');
      expect(viewModel.hasErrors).toBe(true);
      expect(viewModel.canSubmit).toBe(false);
    });
  });
});
