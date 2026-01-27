

import { describe, it, expect } from 'bun:test';
import { FormEntity } from '../FormState';

describe('FormEntity', () => {
  describe('Factory Creation', () => {
    it('should create empty form with defaults', () => {
      const form = FormEntity.create();
      const state = form.currentState;

      expect(state.status).toBe('idle');
      expect(state.fields.size).toBe(0);
      expect(state.submitAttempts).toBe(0);
      expect(state.submitError).toBe(null);
    });

    it('should create form with custom status', () => {
      const form = FormEntity.create({ status: 'validating' });
      expect(form.currentState.status).toBe('validating');
    });

    it('should create form with submit attempts', () => {
      const form = FormEntity.create({ submitAttempts: 3 });
      expect(form.currentState.submitAttempts).toBe(3);
    });
  });

  describe('Business Rule #1: Submitting forms cannot have submit errors', () => {
    it('should throw when creating submitting form with error', () => {
      expect(() => {
        FormEntity.create({
          status: 'submitting',
          submitError: 'Some error',
        });
      }).toThrow('Submitting forms cannot have submit errors');
    });
  });

  describe('Business Rule #2: Success status means no submit error', () => {
    it('should throw when creating success form with error', () => {
      expect(() => {
        FormEntity.create({
          status: 'success',
          submitError: 'Some error',
        });
      }).toThrow('Successful forms cannot have submit errors');
    });
  });

  describe('Business Rule #3: Error status requires submit error message', () => {
    it('should throw when creating error form without error message', () => {
      expect(() => {
        FormEntity.create({
          status: 'error',
          submitError: null,
        });
      }).toThrow('Error status requires submit error message');
    });

    it('should allow error status with error message', () => {
      const form = FormEntity.create({
        status: 'error',
        submitError: 'Submission failed',
      });
      expect(form.currentState.status).toBe('error');
      expect(form.currentState.submitError).toBe('Submission failed');
    });
  });

  describe('Business Rule #4: Field names must be unique', () => {
    it('should prevent duplicate field names', () => {
      const fields = new Map();
      fields.set('email', {
        name: 'email',
        value: 'test@test.com',
        error: null,
        touched: false,
        dirty: false,
        required: false,
      });
      fields.set('email', {
        name: 'email',
        value: 'other@test.com',
        error: null,
        touched: false,
        dirty: false,
        required: false,
      });

      
      const form = FormEntity.create({ fields });
      expect(form.fieldCount).toBe(1);
    });
  });

  describe('Business Rule #5: Form is pristine if NO fields are dirty', () => {
    it('should be pristine with no fields', () => {
      const form = FormEntity.create();
      expect(form.isPristine).toBe(true);
    });

    it('should be pristine with untouched fields', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      expect(form.isPristine).toBe(true);
    });

    it('should not be pristine with dirty fields', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.setFieldValue('email', 'test@test.com');
      expect(form.isPristine).toBe(false);
    });
  });

  describe('Business Rule #6: Form is dirty if ANY field is dirty', () => {
    it('should not be dirty with no fields', () => {
      const form = FormEntity.create();
      expect(form.isDirty).toBe(false);
    });

    it('should be dirty when one field is modified', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.registerField('password');
      form = form.setFieldValue('email', 'test@test.com');

      expect(form.isDirty).toBe(true);
    });
  });

  describe('Business Rule #7: Form is touched if ANY field is touched', () => {
    it('should not be touched with no fields', () => {
      const form = FormEntity.create();
      expect(form.isTouched).toBe(false);
    });

    it('should be touched when one field is touched', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.touchField('email');

      expect(form.isTouched).toBe(true);
    });
  });

  describe('Business Rule #8: Form is valid if ALL field validations pass', () => {
    it('should be valid with no fields', () => {
      const form = FormEntity.create();
      expect(form.isValid).toBe(true);
    });

    it('should be valid with valid fields', () => {
      let form = FormEntity.create();
      form = form.registerField('email', 'test@test.com', false);
      expect(form.isValid).toBe(true);
    });

    it('should be invalid with empty required field', () => {
      let form = FormEntity.create();
      form = form.registerField('email', '', true);
      expect(form.isValid).toBe(false);
    });

    it('should be invalid if any field fails validation', () => {
      let form = FormEntity.create();
      form = form.registerField('email', 'valid@test.com', false);
      form = form.registerField('password', '', true);

      expect(form.isValid).toBe(false);
    });
  });

  describe('Business Rule #9: Form has errors if ANY field has error', () => {
    it('should have no errors with no fields', () => {
      const form = FormEntity.create();
      expect(form.hasErrors).toBe(false);
    });

    it('should have errors when field has error', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.setFieldError('email', 'Invalid email');

      expect(form.hasErrors).toBe(true);
    });
  });

  describe('Business Rule #10: Register field', () => {
    it('should register field with defaults', () => {
      let form = FormEntity.create();
      form = form.registerField('email');

      expect(form.hasField('email')).toBe(true);
      const field = form.getField('email');
      expect(field?.name).toBe('email');
      expect(field?.value).toBe('');
      expect(field?.required).toBe(false);
      expect(field?.touched).toBe(false);
      expect(field?.dirty).toBe(false);
      expect(field?.error).toBe(null);
    });

    it('should register field with initial value', () => {
      let form = FormEntity.create();
      form = form.registerField('email', 'test@test.com');

      const field = form.getField('email');
      expect(field?.value).toBe('test@test.com');
    });

    it('should register required field', () => {
      let form = FormEntity.create();
      form = form.registerField('email', '', true);

      const field = form.getField('email');
      expect(field?.required).toBe(true);
    });

    it('should register field with custom validator', () => {
      const validator = (value: any) => (value === 'test' ? null : 'Invalid');
      let form = FormEntity.create();
      form = form.registerField('username', '', false, validator);

      const field = form.getField('username');
      expect(field?.validator).toBe(validator);
    });

    it('should update field on re-registration (idempotent)', () => {
      let form = FormEntity.create();
      form = form.registerField('email', 'old@test.com');
      form = form.registerField('email', 'new@test.com');

      expect(form.fieldCount).toBe(1);
      const field = form.getField('email');
      expect(field?.value).toBe('new@test.com');
    });
  });

  describe('Unregister field', () => {
    it('should remove field from form', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.unregisterField('email');

      expect(form.hasField('email')).toBe(false);
      expect(form.fieldCount).toBe(0);
    });

    it('should not throw when unregistering non-existent field', () => {
      let form = FormEntity.create();
      form = form.unregisterField('email');

      expect(form.fieldCount).toBe(0);
    });
  });

  describe('Business Rule #11: Setting field value marks it as dirty', () => {
    it('should mark field as dirty when value changes', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.setFieldValue('email', 'test@test.com');

      const field = form.getField('email');
      expect(field?.dirty).toBe(true);
      expect(field?.value).toBe('test@test.com');
    });

    it('should clear error when value changes', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.setFieldError('email', 'Invalid');
      form = form.setFieldValue('email', 'test@test.com');

      const field = form.getField('email');
      expect(field?.error).toBe(null);
    });

    it('should throw when setting value on non-existent field', () => {
      const form = FormEntity.create();
      expect(() => {
        form.setFieldValue('email', 'test@test.com');
      }).toThrow('Field "email" is not registered');
    });
  });

  describe('Business Rule #12: Touching field marks it as touched', () => {
    it('should mark field as touched', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.touchField('email');

      const field = form.getField('email');
      expect(field?.touched).toBe(true);
    });

    it('should throw when touching non-existent field', () => {
      const form = FormEntity.create();
      expect(() => {
        form.touchField('email');
      }).toThrow('Field "email" is not registered');
    });
  });

  describe('Set field error', () => {
    it('should set field error', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.setFieldError('email', 'Invalid email');

      const field = form.getField('email');
      expect(field?.error).toBe('Invalid email');
    });

    it('should clear field error with null', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.setFieldError('email', 'Invalid');
      form = form.setFieldError('email', null);

      const field = form.getField('email');
      expect(field?.error).toBe(null);
    });

    it('should throw when setting error on non-existent field', () => {
      const form = FormEntity.create();
      expect(() => {
        form.setFieldError('email', 'Invalid');
      }).toThrow('Field "email" is not registered');
    });
  });

  describe('Business Rule #13: Required field validation', () => {
    it('should pass validation for non-required empty field', () => {
      let form = FormEntity.create();
      form = form.registerField('email', '', false);

      const result = form.validateField('email');
      expect(result.valid).toBe(true);
    });

    it('should fail validation for required empty string', () => {
      let form = FormEntity.create();
      form = form.registerField('email', '', true);

      const result = form.validateField('email');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('This field is required');
    });

    it('should fail validation for required whitespace string', () => {
      let form = FormEntity.create();
      form = form.registerField('email', '   ', true);

      const result = form.validateField('email');
      expect(result.valid).toBe(false);
    });

    it('should fail validation for required null', () => {
      let form = FormEntity.create();
      form = form.registerField('email', null, true);

      const result = form.validateField('email');
      expect(result.valid).toBe(false);
    });

    it('should fail validation for required undefined', () => {
      let form = FormEntity.create();
      form = form.registerField('email', undefined, true);

      const result = form.validateField('email');
      expect(result.valid).toBe(false);
    });

    it('should pass validation for required field with value', () => {
      let form = FormEntity.create();
      form = form.registerField('email', 'test@test.com', true);

      const result = form.validateField('email');
      expect(result.valid).toBe(true);
    });
  });

  describe('Business Rule #14: Custom validator execution', () => {
    it('should run custom validator', () => {
      const validator = (value: any) => {
        if (typeof value === 'string' && value.length < 3) {
          return 'Minimum 3 characters';
        }
        return null;
      };

      let form = FormEntity.create();
      form = form.registerField('username', 'ab', false, validator);

      const result = form.validateField('username');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Minimum 3 characters');
    });

    it('should pass validation with valid custom validator', () => {
      const validator = (value: any) => {
        if (typeof value === 'string' && value.length < 3) {
          return 'Minimum 3 characters';
        }
        return null;
      };

      let form = FormEntity.create();
      form = form.registerField('username', 'abc', false, validator);

      const result = form.validateField('username');
      expect(result.valid).toBe(true);
    });
  });

  describe('Business Rule #15: Field validation order (required first, then custom)', () => {
    it('should check required before custom validator', () => {
      const validator = (value: any) => 'Custom error';
      let form = FormEntity.create();
      form = form.registerField('email', '', true, validator);

      const result = form.validateField('email');
      expect(result.error).toBe('This field is required');
    });

    it('should run custom validator after required passes', () => {
      const validator = (value: any) => 'Custom error';
      let form = FormEntity.create();
      form = form.registerField('email', 'test', true, validator);

      const result = form.validateField('email');
      expect(result.error).toBe('Custom error');
    });
  });

  describe('Business Rule #16: Form validation aggregates all field validations', () => {
    it('should return valid for form with no errors', () => {
      let form = FormEntity.create();
      form = form.registerField('email', 'test@test.com', true);
      form = form.registerField('password', 'secure123', true);

      const result = form.validateAllFields();
      expect(result.valid).toBe(true);
      expect(result.errorCount).toBe(0);
    });

    it('should aggregate errors from multiple fields', () => {
      let form = FormEntity.create();
      form = form.registerField('email', '', true);
      form = form.registerField('password', '', true);

      const result = form.validateAllFields();
      expect(result.valid).toBe(false);
      expect(result.errorCount).toBe(2);
      expect(result.fieldErrors.has('email')).toBe(true);
      expect(result.fieldErrors.has('password')).toBe(true);
    });

    it('should return errors only for invalid fields', () => {
      let form = FormEntity.create();
      form = form.registerField('email', 'test@test.com', true);
      form = form.registerField('password', '', true);

      const result = form.validateAllFields();
      expect(result.valid).toBe(false);
      expect(result.errorCount).toBe(1);
      expect(result.fieldErrors.has('email')).toBe(false);
      expect(result.fieldErrors.has('password')).toBe(true);
    });
  });

  describe('Apply validation results', () => {
    it('should apply errors from validation results', () => {
      let form = FormEntity.create();
      form = form.registerField('email', '', true);
      form = form.registerField('password', '', true);

      const result = form.validateAllFields();
      form = form.withValidationResults(result);

      expect(form.getField('email')?.error).toBe('This field is required');
      expect(form.getField('password')?.error).toBe('This field is required');
    });

    it('should clear errors not in validation results', () => {
      let form = FormEntity.create();
      form = form.registerField('email', 'test@test.com', true);
      form = form.setFieldError('email', 'Old error');

      const result = form.validateAllFields();
      form = form.withValidationResults(result);

      expect(form.getField('email')?.error).toBe(null);
    });
  });

  describe('Business Rule #17: Submit increments attempt counter', () => {
    it('should increment submit attempts', () => {
      let form = FormEntity.create();
      expect(form.currentState.submitAttempts).toBe(0);

      form = form.incrementSubmitAttempts();
      expect(form.currentState.submitAttempts).toBe(1);

      form = form.incrementSubmitAttempts();
      expect(form.currentState.submitAttempts).toBe(2);
    });
  });

  describe('Business Rule #18: Reset returns all fields to initial values', () => {
    it('should reset all field values to empty', () => {
      let form = FormEntity.create();
      form = form.registerField('email', 'test@test.com');
      form = form.registerField('password', 'secure123');
      form = form.setFieldValue('email', 'new@test.com');

      form = form.reset();

      expect(form.getField('email')?.value).toBe('');
      expect(form.getField('password')?.value).toBe('');
    });

    it('should clear all errors on reset', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.setFieldError('email', 'Invalid');

      form = form.reset();

      expect(form.getField('email')?.error).toBe(null);
    });

    it('should clear touched and dirty states on reset', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.setFieldValue('email', 'test@test.com');
      form = form.touchField('email');

      form = form.reset();

      expect(form.getField('email')?.touched).toBe(false);
      expect(form.getField('email')?.dirty).toBe(false);
    });

    it('should reset status to idle', () => {
      let form = FormEntity.create({ status: 'validating' });
      form = form.reset();

      expect(form.currentState.status).toBe('idle');
    });

    it('should reset submit attempts', () => {
      let form = FormEntity.create();
      form = form.incrementSubmitAttempts();
      form = form.incrementSubmitAttempts();

      form = form.reset();

      expect(form.currentState.submitAttempts).toBe(0);
    });

    it('should clear submit error on reset', () => {
      let form = FormEntity.create({
        status: 'error',
        submitError: 'Submission failed',
      });

      form = form.reset();

      expect(form.currentState.submitError).toBe(null);
    });
  });

  describe('Business Rule #19: Reset to specific values', () => {
    it('should reset with new initial values', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.registerField('password');

      form = form.resetWithValues({
        email: 'reset@test.com',
        password: 'newpass',
      });

      expect(form.getField('email')?.value).toBe('reset@test.com');
      expect(form.getField('password')?.value).toBe('newpass');
      expect(form.isPristine).toBe(true);
    });

    it('should use empty string for fields not in values', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.registerField('password');

      form = form.resetWithValues({
        email: 'reset@test.com',
      });

      expect(form.getField('email')?.value).toBe('reset@test.com');
      expect(form.getField('password')?.value).toBe('');
    });
  });

  describe('Convenience methods', () => {
    it('should get field names', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.registerField('password');

      const names = form.getFieldNames();
      expect(names).toContain('email');
      expect(names).toContain('password');
      expect(names.length).toBe(2);
    });

    it('should get field values as object', () => {
      let form = FormEntity.create();
      form = form.registerField('email', 'test@test.com');
      form = form.registerField('password', 'secure123');

      const values = form.getFieldValues();
      expect(values.email).toBe('test@test.com');
      expect(values.password).toBe('secure123');
    });

    it('should get field count', () => {
      let form = FormEntity.create();
      expect(form.fieldCount).toBe(0);

      form = form.registerField('email');
      expect(form.fieldCount).toBe(1);

      form = form.registerField('password');
      expect(form.fieldCount).toBe(2);
    });

    it('should get error count', () => {
      let form = FormEntity.create();
      form = form.registerField('email');
      form = form.registerField('password');

      expect(form.errorCount).toBe(0);

      form = form.setFieldError('email', 'Invalid');
      expect(form.errorCount).toBe(1);

      form = form.setFieldError('password', 'Too short');
      expect(form.errorCount).toBe(2);
    });
  });

  describe('Status checks', () => {
    it('should check isSubmitting', () => {
      let form = FormEntity.create();
      expect(form.isSubmitting).toBe(false);

      form = form.withStatus('submitting');
      expect(form.isSubmitting).toBe(true);
    });

    it('should check isValidating', () => {
      let form = FormEntity.create();
      expect(form.isValidating).toBe(false);

      form = form.withStatus('validating');
      expect(form.isValidating).toBe(true);
    });

    it('should check isSuccess', () => {
      let form = FormEntity.create();
      expect(form.isSuccess).toBe(false);

      form = form.withStatus('success');
      expect(form.isSuccess).toBe(true);
    });

    it('should check isError', () => {
      let form = FormEntity.create();
      expect(form.isError).toBe(false);

      
      form = form.withSubmitError('Failed');
      expect(form.isError).toBe(true);
    });
  });

  describe('Immutability', () => {
    it('should return new instance on registerField', () => {
      const form1 = FormEntity.create();
      const form2 = form1.registerField('email');

      expect(form1).not.toBe(form2);
      expect(form1.fieldCount).toBe(0);
      expect(form2.fieldCount).toBe(1);
    });

    it('should return new instance on setFieldValue', () => {
      let form1 = FormEntity.create();
      form1 = form1.registerField('email');

      const form2 = form1.setFieldValue('email', 'test@test.com');

      expect(form1).not.toBe(form2);
      expect(form1.getField('email')?.value).toBe('');
      expect(form2.getField('email')?.value).toBe('test@test.com');
    });

    it('should not mutate original on reset', () => {
      let form1 = FormEntity.create();
      form1 = form1.registerField('email', 'test@test.com');
      form1 = form1.setFieldValue('email', 'new@test.com');

      const form2 = form1.reset();

      expect(form1).not.toBe(form2);
      expect(form1.getField('email')?.value).toBe('new@test.com');
      expect(form2.getField('email')?.value).toBe('');
    });
  });
});
