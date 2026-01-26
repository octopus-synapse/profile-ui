

import { describe, it, expect } from 'bun:test';
import { FormEntity } from '../../../entities/form/FormState';
import { RegisterField } from '../RegisterField';
import { ValidateForm } from '../ValidateForm';
import { HandleFormSubmit } from '../HandleFormSubmit';
import { ResetForm } from '../ResetForm';

describe('RegisterField Use Case', () => {
  const useCase = new RegisterField();

  it('should register field successfully', () => {
    const form = FormEntity.create();

    const response = useCase.execute({
      form,
      fieldName: 'email',
      initialValue: 'test@test.com',
      required: true,
    });

    expect(response.success).toBe(true);
    expect(response.fieldName).toBe('email');
    expect(response.updatedForm.hasField('email')).toBe(true);
  });

  it('should throw on empty field name', () => {
    const form = FormEntity.create();

    expect(() => {
      useCase.execute({
        form,
        fieldName: '',
      });
    }).toThrow('Field name cannot be empty');
  });

  it('should throw on whitespace field name', () => {
    const form = FormEntity.create();

    expect(() => {
      useCase.execute({
        form,
        fieldName: '   ',
      });
    }).toThrow('Field name cannot be empty');
  });

  it('should register field with validator', () => {
    const form = FormEntity.create();
    const validator = (value: any) => (value === 'test' ? null : 'Invalid');

    const response = useCase.execute({
      form,
      fieldName: 'username',
      validator,
    });

    const field = response.updatedForm.getField('username');
    expect(field?.validator).toBe(validator);
  });

  it('should default required to false', () => {
    const form = FormEntity.create();

    const response = useCase.execute({
      form,
      fieldName: 'email',
    });

    const field = response.updatedForm.getField('email');
    expect(field?.required).toBe(false);
  });
});

describe('ValidateForm Use Case', () => {
  const useCase = new ValidateForm();

  it('should validate form successfully when all fields valid', () => {
    let form = FormEntity.create();
    form = form.registerField('email', 'test@test.com', true);
    form = form.registerField('password', 'secure123', true);

    const response = useCase.execute({ form });

    expect(response.success).toBe(true);
    expect(response.isValid).toBe(true);
    expect(response.validationResult.valid).toBe(true);
    expect(response.validationResult.errorCount).toBe(0);
  });

  it('should return validation errors when fields invalid', () => {
    let form = FormEntity.create();
    form = form.registerField('email', '', true);
    form = form.registerField('password', '', true);

    const response = useCase.execute({ form });

    expect(response.success).toBe(true);
    expect(response.isValid).toBe(false);
    expect(response.validationResult.errorCount).toBe(2);
  });

  it('should touch all fields when requested', () => {
    let form = FormEntity.create();
    form = form.registerField('email', '', true);
    form = form.registerField('password', '', true);

    const response = useCase.execute({
      form,
      touchAllFields: true,
    });

    expect(response.updatedForm.getField('email')?.touched).toBe(true);
    expect(response.updatedForm.getField('password')?.touched).toBe(true);
  });

  it('should not touch fields by default', () => {
    let form = FormEntity.create();
    form = form.registerField('email', '', true);

    const response = useCase.execute({ form });

    expect(response.updatedForm.getField('email')?.touched).toBe(false);
  });

  it('should apply validation results to form', () => {
    let form = FormEntity.create();
    form = form.registerField('email', '', true);

    const response = useCase.execute({ form });

    expect(response.updatedForm.getField('email')?.error).toBe('This field is required');
  });

  it('should set validating status during validation', () => {
    let form = FormEntity.create();
    form = form.registerField('email', 'test@test.com', true);

    
    const response = useCase.execute({ form });

    
    expect(response.updatedForm.currentState.status).toBe('idle');
  });

  it('should clear errors for valid fields', () => {
    let form = FormEntity.create();
    form = form.registerField('email', 'test@test.com', true);
    form = form.setFieldError('email', 'Old error');

    const response = useCase.execute({ form });

    expect(response.updatedForm.getField('email')?.error).toBe(null);
  });
});

describe('HandleFormSubmit Use Case', () => {
  const useCase = new HandleFormSubmit();

  it('should prevent submit when form invalid', () => {
    let form = FormEntity.create();
    form = form.registerField('email', '', true);

    const response = useCase.execute({ form });

    expect(response.success).toBe(false);
    expect(response.canSubmit).toBe(false);
    expect(response.formData).toEqual({});
    expect(response.validationErrors).toBeDefined();
    expect(response.validationErrors!.size).toBeGreaterThan(0);
  });

  it('should allow submit when form valid', () => {
    let form = FormEntity.create();
    form = form.registerField('email', 'test@test.com', true);
    form = form.registerField('password', 'secure123', true);

    const response = useCase.execute({ form });

    expect(response.success).toBe(true);
    expect(response.canSubmit).toBe(true);
    expect(response.formData).toEqual({
      email: 'test@test.com',
      password: 'secure123',
    });
    expect(response.validationErrors).toBeUndefined();
  });

  it('should increment submit attempts', () => {
    let form = FormEntity.create();
    form = form.registerField('email', 'test@test.com', true);

    const response = useCase.execute({ form });

    expect(response.updatedForm.currentState.submitAttempts).toBe(1);
  });

  it('should increment submit attempts even when validation fails', () => {
    let form = FormEntity.create();
    form = form.registerField('email', '', true);

    const response = useCase.execute({ form });

    expect(response.updatedForm.currentState.submitAttempts).toBe(1);
  });

  it('should touch all fields on submit', () => {
    let form = FormEntity.create();
    form = form.registerField('email', '', true);
    form = form.registerField('password', '', true);

    const response = useCase.execute({ form });

    expect(response.updatedForm.getField('email')?.touched).toBe(true);
    expect(response.updatedForm.getField('password')?.touched).toBe(true);
  });

  it('should set status to submitting when validation passes', () => {
    let form = FormEntity.create();
    form = form.registerField('email', 'test@test.com', true);

    const response = useCase.execute({ form });

    expect(response.updatedForm.currentState.status).toBe('submitting');
  });

  it('should not set submitting status when validation fails', () => {
    let form = FormEntity.create();
    form = form.registerField('email', '', true);

    const response = useCase.execute({ form });

    expect(response.updatedForm.currentState.status).not.toBe('submitting');
  });

  it('should prepare form data with all field values', () => {
    let form = FormEntity.create();
    form = form.registerField('email', 'test@test.com');
    form = form.registerField('password', 'secure123');
    form = form.registerField('remember', true);

    const response = useCase.execute({ form });

    expect(response.formData).toEqual({
      email: 'test@test.com',
      password: 'secure123',
      remember: true,
    });
  });
});

describe('ResetForm Use Case', () => {
  const useCase = new ResetForm();

  it('should reset form to empty values', () => {
    let form = FormEntity.create();
    form = form.registerField('email', 'test@test.com');
    form = form.setFieldValue('email', 'new@test.com');

    const response = useCase.execute({ form });

    expect(response.success).toBe(true);
    expect(response.updatedForm.getField('email')?.value).toBe('');
  });

  it('should reset form to specific values', () => {
    let form = FormEntity.create();
    form = form.registerField('email', 'old@test.com');
    form = form.registerField('password', 'oldpass');

    const response = useCase.execute({
      form,
      values: {
        email: 'new@test.com',
        password: 'newpass',
      },
    });

    expect(response.updatedForm.getField('email')?.value).toBe('new@test.com');
    expect(response.updatedForm.getField('password')?.value).toBe('newpass');
  });

  it('should clear all errors on reset', () => {
    let form = FormEntity.create();
    form = form.registerField('email');
    form = form.setFieldError('email', 'Invalid');

    const response = useCase.execute({ form });

    expect(response.updatedForm.getField('email')?.error).toBe(null);
  });

  it('should clear touched state on reset', () => {
    let form = FormEntity.create();
    form = form.registerField('email');
    form = form.touchField('email');

    const response = useCase.execute({ form });

    expect(response.updatedForm.getField('email')?.touched).toBe(false);
  });

  it('should clear dirty state on reset', () => {
    let form = FormEntity.create();
    form = form.registerField('email');
    form = form.setFieldValue('email', 'test@test.com');

    const response = useCase.execute({ form });

    expect(response.updatedForm.getField('email')?.dirty).toBe(false);
  });

  it('should reset status to idle', () => {
    let form = FormEntity.create({ status: 'validating' });
    form = form.registerField('email');

    const response = useCase.execute({ form });

    expect(response.updatedForm.currentState.status).toBe('idle');
  });

  it('should reset submit attempts', () => {
    let form = FormEntity.create();
    form = form.incrementSubmitAttempts();
    form = form.incrementSubmitAttempts();

    const response = useCase.execute({ form });

    expect(response.updatedForm.currentState.submitAttempts).toBe(0);
  });

  it('should clear submit error', () => {
    let form = FormEntity.create({
      status: 'error',
      submitError: 'Failed',
    });
    form = form.registerField('email');

    const response = useCase.execute({ form });

    expect(response.updatedForm.currentState.submitError).toBe(null);
  });
});

describe('Use Case Integration', () => {
  it('should coordinate multiple use cases in submit flow', () => {
    const registerUseCase = new RegisterField();
    const submitUseCase = new HandleFormSubmit();

    
    let form = FormEntity.create();

    const emailResponse = registerUseCase.execute({
      form,
      fieldName: 'email',
      initialValue: 'test@test.com',
      required: true,
    });
    form = emailResponse.updatedForm;

    const passwordResponse = registerUseCase.execute({
      form,
      fieldName: 'password',
      initialValue: 'secure123',
      required: true,
    });
    form = passwordResponse.updatedForm;

    
    const submitResponse = submitUseCase.execute({ form });

    expect(submitResponse.canSubmit).toBe(true);
    expect(submitResponse.formData).toEqual({
      email: 'test@test.com',
      password: 'secure123',
    });
  });

  it('should coordinate validate and reset', () => {
    const validateUseCase = new ValidateForm();
    const resetUseCase = new ResetForm();

    let form = FormEntity.create();
    form = form.registerField('email', '', true);

    
    const validateResponse = validateUseCase.execute({
      form,
      touchAllFields: true,
    });
    form = validateResponse.updatedForm;

    expect(form.hasErrors).toBe(true);
    expect(form.isTouched).toBe(true);

    
    const resetResponse = resetUseCase.execute({ form });
    form = resetResponse.updatedForm;

    expect(form.hasErrors).toBe(false);
    expect(form.isTouched).toBe(false);
  });
});
