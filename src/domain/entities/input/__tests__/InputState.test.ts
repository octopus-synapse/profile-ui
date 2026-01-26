

import { describe, it, expect } from 'bun:test';
import { InputEntity } from '../InputState';

describe('InputEntity', () => {
  
  
  

  describe('create()', () => {
    it('should create entity with default values when no params provided', () => {
      const entity = InputEntity.create({});

      const state = entity.currentState;
      expect(state.type).toBe('text');
      expect(state.size).toBe('md');
      expect(state.state).toBe('default');
      expect(state.value).toBe('');
      expect(state.disabled).toBe(false);
      expect(state.readOnly).toBe(false);
      expect(state.required).toBe(false);
      expect(state.error).toBe(null);
    });

    it('should create entity with provided values', () => {
      const entity = InputEntity.create({
        type: 'email',
        size: 'lg',
        state: 'success',
        value: 'test@example.com',
        disabled: false,
        readOnly: false,
        required: true,
        error: null,
      });

      const state = entity.currentState;
      expect(state.type).toBe('email');
      expect(state.size).toBe('lg');
      expect(state.state).toBe('success');
      expect(state.value).toBe('test@example.com');
      expect(state.required).toBe(true);
    });
  });

  
  
  

  describe('Business Rule #1: ReadOnly inputs cannot be required', () => {
    it('should throw error when creating readonly + required input', () => {
      expect(() => {
        InputEntity.create({
          readOnly: true,
          required: true,
        });
      }).toThrow('ReadOnly inputs cannot be required');
    });

    it('should allow readonly without required', () => {
      expect(() => {
        InputEntity.create({
          readOnly: true,
          required: false,
        });
      }).not.toThrow();
    });

    it('should allow required without readonly', () => {
      expect(() => {
        InputEntity.create({
          readOnly: false,
          required: true,
        });
      }).not.toThrow();
    });
  });

  
  
  

  describe('Business Rule #2: Disabled inputs cannot have errors', () => {
    it('should throw error when creating disabled input with error', () => {
      expect(() => {
        InputEntity.create({
          disabled: true,
          error: 'Some error',
          state: 'error',
        });
      }).toThrow('Disabled inputs cannot have errors');
    });

    it('should allow disabled without error', () => {
      expect(() => {
        InputEntity.create({
          disabled: true,
          error: null,
        });
      }).not.toThrow();
    });
  });

  
  
  

  describe('Business Rule #3: Error state must match error message', () => {
    it('should throw error when error message exists but state is not error', () => {
      expect(() => {
        InputEntity.create({
          error: 'Invalid input',
          state: 'default',
        });
      }).toThrow('Error message requires error state');
    });

    it('should allow error message with error state', () => {
      expect(() => {
        InputEntity.create({
          error: 'Invalid input',
          state: 'error',
        });
      }).not.toThrow();
    });

    it('should allow error state without error message', () => {
      expect(() => {
        InputEntity.create({
          error: null,
          state: 'error',
        });
      }).not.toThrow();
    });
  });

  
  
  

  describe('Business Rule #4: isInteractive', () => {
    it('should return true when not disabled and not readonly', () => {
      const entity = InputEntity.create({
        disabled: false,
        readOnly: false,
      });

      expect(entity.isInteractive).toBe(true);
    });

    it('should return false when disabled', () => {
      const entity = InputEntity.create({
        disabled: true,
        readOnly: false,
      });

      expect(entity.isInteractive).toBe(false);
    });

    it('should return false when readonly', () => {
      const entity = InputEntity.create({
        disabled: false,
        readOnly: true,
      });

      expect(entity.isInteractive).toBe(false);
    });

    it('should return false when both disabled and readonly', () => {
      const entity = InputEntity.create({
        disabled: true,
        readOnly: true,
      });

      expect(entity.isInteractive).toBe(false);
    });
  });

  
  
  

  describe('Business Rule #5: hasError', () => {
    it('should return true when error message exists', () => {
      const entity = InputEntity.create({
        error: 'Invalid input',
        state: 'error',
      });

      expect(entity.hasError).toBe(true);
    });

    it('should return true when state is error (even without message)', () => {
      const entity = InputEntity.create({
        error: null,
        state: 'error',
      });

      expect(entity.hasError).toBe(true);
    });

    it('should return false when no error and state is not error', () => {
      const entity = InputEntity.create({
        error: null,
        state: 'default',
      });

      expect(entity.hasError).toBe(false);
    });
  });

  
  
  

  describe('withValue()', () => {
    it('should return new entity with updated value', () => {
      const entity1 = InputEntity.create({ value: 'old' });
      const entity2 = entity1.withValue('new');

      expect(entity1.currentState.value).toBe('old');
      expect(entity2.currentState.value).toBe('new');
    });

    it('should clear error when value changes (user is fixing it)', () => {
      const entity1 = InputEntity.create({
        value: 'bad',
        error: 'Invalid',
        state: 'error',
      });
      const entity2 = entity1.withValue('good');

      expect(entity2.currentState.error).toBe(null);
      expect(entity2.currentState.state).toBe('default');
    });

    it('should preserve non-error state when value changes', () => {
      const entity1 = InputEntity.create({
        value: 'old',
        state: 'success',
      });
      const entity2 = entity1.withValue('new');

      expect(entity2.currentState.state).toBe('success');
    });
  });

  
  
  

  describe('withError()', () => {
    it('should set error and change state to error', () => {
      const entity1 = InputEntity.create({ state: 'default' });
      const entity2 = entity1.withError('Invalid input');

      expect(entity2.currentState.error).toBe('Invalid input');
      expect(entity2.currentState.state).toBe('error');
    });

    it('should clear error and reset state to default when error is null', () => {
      const entity1 = InputEntity.create({
        error: 'Invalid',
        state: 'error',
      });
      const entity2 = entity1.withError(null);

      expect(entity2.currentState.error).toBe(null);
      expect(entity2.currentState.state).toBe('default');
    });
  });

  
  
  

  describe('withStateType()', () => {
    it('should update state type', () => {
      const entity1 = InputEntity.create({ state: 'default' });
      const entity2 = entity1.withStateType('success');

      expect(entity2.currentState.state).toBe('success');
    });

    it('should preserve error when changing to error state', () => {
      const entity1 = InputEntity.create({
        error: 'Invalid',
        state: 'error',
      });
      const entity2 = entity1.withStateType('error');

      expect(entity2.currentState.error).toBe('Invalid');
    });

    it('should clear error when changing to non-error state', () => {
      const entity1 = InputEntity.create({
        error: 'Invalid',
        state: 'error',
      });
      const entity2 = entity1.withStateType('default');

      expect(entity2.currentState.error).toBe(null);
    });
  });

  
  
  

  describe('withDisabled()', () => {
    it('should update disabled state', () => {
      const entity1 = InputEntity.create({ disabled: false });
      const entity2 = entity1.withDisabled(true);

      expect(entity2.currentState.disabled).toBe(true);
    });

    it('should clear error when disabling', () => {
      const entity1 = InputEntity.create({
        disabled: false,
        error: 'Invalid',
        state: 'error',
      });
      const entity2 = entity1.withDisabled(true);

      expect(entity2.currentState.error).toBe(null);
      expect(entity2.currentState.state).toBe('default');
    });

    it('should preserve state when enabling (not disabled)', () => {
      const entity1 = InputEntity.create({ disabled: true });
      const entity2 = entity1.withDisabled(false);

      expect(entity2.currentState.disabled).toBe(false);
    });
  });

  
  
  

  describe('withReadOnly()', () => {
    it('should update readonly state', () => {
      const entity1 = InputEntity.create({ readOnly: false });
      const entity2 = entity1.withReadOnly(true);

      expect(entity2.currentState.readOnly).toBe(true);
    });

    it('should clear required when making readonly (prevents invalid state)', () => {
      const entity1 = InputEntity.create({
        readOnly: false,
        required: true,
      });
      const entity2 = entity1.withReadOnly(true);

      expect(entity2.currentState.readOnly).toBe(true);
      expect(entity2.currentState.required).toBe(false);
    });
  });

  
  
  

  describe('withRequired()', () => {
    it('should update required state', () => {
      const entity1 = InputEntity.create({ required: false });
      const entity2 = entity1.withRequired(true);

      expect(entity2.currentState.required).toBe(true);
    });

    it('should clear readonly when making required (prevents invalid state)', () => {
      const entity1 = InputEntity.create({
        readOnly: true,
        required: false,
      });
      const entity2 = entity1.withRequired(true);

      expect(entity2.currentState.required).toBe(true);
      expect(entity2.currentState.readOnly).toBe(false);
    });
  });

  
  
  

  describe('withType()', () => {
    it('should update input type', () => {
      const entity1 = InputEntity.create({ type: 'text' });
      const entity2 = entity1.withType('email');

      expect(entity2.currentState.type).toBe('email');
    });
  });

  
  
  

  describe('withSize()', () => {
    it('should update input size', () => {
      const entity1 = InputEntity.create({ size: 'md' });
      const entity2 = entity1.withSize('lg');

      expect(entity2.currentState.size).toBe('lg');
    });
  });

  
  
  

  describe('Business Rule #6: validateRequired()', () => {
    it('should pass when not required', () => {
      const entity = InputEntity.create({
        required: false,
        value: '',
      });

      const result = entity.validateRequired();
      expect(result.valid).toBe(true);
      expect(result.errorMessage).toBe(null);
    });

    it('should pass when required and value is not empty', () => {
      const entity = InputEntity.create({
        required: true,
        value: 'something',
      });

      const result = entity.validateRequired();
      expect(result.valid).toBe(true);
    });

    it('should fail when required and value is empty', () => {
      const entity = InputEntity.create({
        required: true,
        value: '',
      });

      const result = entity.validateRequired();
      expect(result.valid).toBe(false);
      expect(result.errorMessage).toBe('This field is required');
    });

    it('should fail when required and value is only whitespace', () => {
      const entity = InputEntity.create({
        required: true,
        value: '   ',
      });

      const result = entity.validateRequired();
      expect(result.valid).toBe(false);
    });
  });

  
  
  

  describe('Business Rule #7: validateEmail()', () => {
    it('should pass when type is not email', () => {
      const entity = InputEntity.create({
        type: 'text',
        value: 'not-an-email',
      });

      const result = entity.validateEmail();
      expect(result.valid).toBe(true);
    });

    it('should pass when email is empty (use validateRequired for that)', () => {
      const entity = InputEntity.create({
        type: 'email',
        value: '',
      });

      const result = entity.validateEmail();
      expect(result.valid).toBe(true);
    });

    it('should pass when email is valid', () => {
      const entity = InputEntity.create({
        type: 'email',
        value: 'test@example.com',
      });

      const result = entity.validateEmail();
      expect(result.valid).toBe(true);
    });

    it('should fail when email is invalid - no @', () => {
      const entity = InputEntity.create({
        type: 'email',
        value: 'invalid-email',
      });

      const result = entity.validateEmail();
      expect(result.valid).toBe(false);
      expect(result.errorMessage).toBe('Please enter a valid email address');
    });

    it('should fail when email is invalid - no domain', () => {
      const entity = InputEntity.create({
        type: 'email',
        value: 'invalid@',
      });

      const result = entity.validateEmail();
      expect(result.valid).toBe(false);
    });

    it('should fail when email is invalid - no TLD', () => {
      const entity = InputEntity.create({
        type: 'email',
        value: 'invalid@domain',
      });

      const result = entity.validateEmail();
      expect(result.valid).toBe(false);
    });
  });

  
  
  

  describe('Business Rule #8: validateUrl()', () => {
    it('should pass when type is not url', () => {
      const entity = InputEntity.create({
        type: 'text',
        value: 'not-a-url',
      });

      const result = entity.validateUrl();
      expect(result.valid).toBe(true);
    });

    it('should pass when url is empty', () => {
      const entity = InputEntity.create({
        type: 'url',
        value: '',
      });

      const result = entity.validateUrl();
      expect(result.valid).toBe(true);
    });

    it('should pass when url is valid - http', () => {
      const entity = InputEntity.create({
        type: 'url',
        value: 'http://example.com',
      });

      const result = entity.validateUrl();
      expect(result.valid).toBe(true);
    });

    it('should pass when url is valid - https', () => {
      const entity = InputEntity.create({
        type: 'url',
        value: 'https://example.com',
      });

      const result = entity.validateUrl();
      expect(result.valid).toBe(true);
    });

    it('should fail when url is invalid', () => {
      const entity = InputEntity.create({
        type: 'url',
        value: 'not-a-url',
      });

      const result = entity.validateUrl();
      expect(result.valid).toBe(false);
      expect(result.errorMessage).toBe('Please enter a valid URL');
    });
  });

  
  
  

  describe('Business Rule #9: validateTel()', () => {
    it('should pass when type is not tel', () => {
      const entity = InputEntity.create({
        type: 'text',
        value: 'not-a-phone',
      });

      const result = entity.validateTel();
      expect(result.valid).toBe(true);
    });

    it('should pass when tel is empty', () => {
      const entity = InputEntity.create({
        type: 'tel',
        value: '',
      });

      const result = entity.validateTel();
      expect(result.valid).toBe(true);
    });

    it('should pass when tel is valid - digits only', () => {
      const entity = InputEntity.create({
        type: 'tel',
        value: '1234567890',
      });

      const result = entity.validateTel();
      expect(result.valid).toBe(true);
    });

    it('should pass when tel is valid - with dashes', () => {
      const entity = InputEntity.create({
        type: 'tel',
        value: '123-456-7890',
      });

      const result = entity.validateTel();
      expect(result.valid).toBe(true);
    });

    it('should pass when tel is valid - with parentheses', () => {
      const entity = InputEntity.create({
        type: 'tel',
        value: '(123) 456-7890',
      });

      const result = entity.validateTel();
      expect(result.valid).toBe(true);
    });

    it('should pass when tel is valid - with plus', () => {
      const entity = InputEntity.create({
        type: 'tel',
        value: '+1 123 456 7890',
      });

      const result = entity.validateTel();
      expect(result.valid).toBe(true);
    });

    it('should fail when tel contains letters', () => {
      const entity = InputEntity.create({
        type: 'tel',
        value: '123-ABC-7890',
      });

      const result = entity.validateTel();
      expect(result.valid).toBe(false);
      expect(result.errorMessage).toBe('Please enter a valid phone number');
    });
  });

  
  
  

  describe('Business Rule #10: validateNumber()', () => {
    it('should pass when type is not number', () => {
      const entity = InputEntity.create({
        type: 'text',
        value: 'not-a-number',
      });

      const result = entity.validateNumber();
      expect(result.valid).toBe(true);
    });

    it('should pass when number is empty', () => {
      const entity = InputEntity.create({
        type: 'number',
        value: '',
      });

      const result = entity.validateNumber();
      expect(result.valid).toBe(true);
    });

    it('should pass when number is valid - integer', () => {
      const entity = InputEntity.create({
        type: 'number',
        value: '123',
      });

      const result = entity.validateNumber();
      expect(result.valid).toBe(true);
    });

    it('should pass when number is valid - decimal', () => {
      const entity = InputEntity.create({
        type: 'number',
        value: '123.45',
      });

      const result = entity.validateNumber();
      expect(result.valid).toBe(true);
    });

    it('should pass when number is valid - negative', () => {
      const entity = InputEntity.create({
        type: 'number',
        value: '-123',
      });

      const result = entity.validateNumber();
      expect(result.valid).toBe(true);
    });

    it('should fail when number is invalid', () => {
      const entity = InputEntity.create({
        type: 'number',
        value: 'not-a-number',
      });

      const result = entity.validateNumber();
      expect(result.valid).toBe(false);
      expect(result.errorMessage).toBe('Please enter a valid number');
    });
  });

  
  
  

  describe('validateAll()', () => {
    it('should pass when all validations pass', () => {
      const entity = InputEntity.create({
        type: 'email',
        value: 'test@example.com',
        required: true,
      });

      const result = entity.validateAll();
      expect(result.valid).toBe(true);
      expect(result.errorMessage).toBe(null);
    });

    it('should fail on required first', () => {
      const entity = InputEntity.create({
        type: 'email',
        value: '',
        required: true,
      });

      const result = entity.validateAll();
      expect(result.valid).toBe(false);
      expect(result.errorMessage).toBe('This field is required');
    });

    it('should fail on email validation after required passes', () => {
      const entity = InputEntity.create({
        type: 'email',
        value: 'invalid-email',
        required: true,
      });

      const result = entity.validateAll();
      expect(result.valid).toBe(false);
      expect(result.errorMessage).toBe('Please enter a valid email address');
    });

    it('should validate url correctly', () => {
      const entity = InputEntity.create({
        type: 'url',
        value: 'not-a-url',
      });

      const result = entity.validateAll();
      expect(result.valid).toBe(false);
      expect(result.errorMessage).toBe('Please enter a valid URL');
    });

    it('should validate tel correctly', () => {
      const entity = InputEntity.create({
        type: 'tel',
        value: '123-ABC-7890',
      });

      const result = entity.validateAll();
      expect(result.valid).toBe(false);
      expect(result.errorMessage).toBe('Please enter a valid phone number');
    });

    it('should validate number correctly', () => {
      const entity = InputEntity.create({
        type: 'number',
        value: 'abc',
      });

      const result = entity.validateAll();
      expect(result.valid).toBe(false);
      expect(result.errorMessage).toBe('Please enter a valid number');
    });
  });

  
  
  

  describe('Immutability', () => {
    it('should return new instance on every update', () => {
      const entity1 = InputEntity.create({});
      const entity2 = entity1.withValue('new');

      expect(entity1).not.toBe(entity2);
    });

    it('should not modify original state', () => {
      const entity1 = InputEntity.create({ value: 'original' });
      entity1.withValue('modified');

      expect(entity1.currentState.value).toBe('original');
    });

    it('should return defensive copy from currentState getter', () => {
      const entity = InputEntity.create({ value: 'test' });
      const state1 = entity.currentState;
      const state2 = entity.currentState;

      expect(state1).not.toBe(state2); 
      expect(state1).toEqual(state2); 
    });
  });
});
