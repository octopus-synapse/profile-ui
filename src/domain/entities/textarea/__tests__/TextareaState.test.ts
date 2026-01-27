

import { describe, it, expect } from 'bun:test';
import {
  TextareaEntity,
  TextareaSize,
  TextareaStateType,
  ValidationResult,
} from '../TextareaState';

describe('TextareaEntity', () => {
  describe('Factory Creation', () => {
    it('should create with defaults', () => {
      const entity = TextareaEntity.create({});
      const state = entity.currentState;

      expect(state.size).toBe('md');
      expect(state.state).toBe('default');
      expect(state.value).toBe('');
      expect(state.disabled).toBe(false);
      expect(state.readOnly).toBe(false);
      expect(state.required).toBe(false);
      expect(state.error).toBe(null);
      expect(state.maxLength).toBe(undefined);
      expect(state.minLength).toBe(undefined);
      expect(state.rows).toBe(3);
      expect(state.autoResize).toBe(false);
    });

    it('should create with custom values', () => {
      const entity = TextareaEntity.create({
        size: 'lg',
        value: 'Hello World',
        required: true,
        maxLength: 500,
        minLength: 10,
        rows: 5,
        autoResize: true,
      });
      const state = entity.currentState;

      expect(state.size).toBe('lg');
      expect(state.value).toBe('Hello World');
      expect(state.required).toBe(true);
      expect(state.maxLength).toBe(500);
      expect(state.minLength).toBe(10);
      expect(state.rows).toBe(5);
      expect(state.autoResize).toBe(true);
    });
  });

  describe('Business Rules - Invariants', () => {
    it('RULE #1: ReadOnly textareas cannot be required', () => {
      expect(() => {
        TextareaEntity.create({
          readOnly: true,
          required: true,
        });
      }).toThrow('ReadOnly textareas cannot be required');
    });

    it('RULE #2: Disabled textareas cannot have errors', () => {
      expect(() => {
        TextareaEntity.create({
          disabled: true,
          error: 'Some error',
          state: 'error',
        });
      }).toThrow('Disabled textareas cannot have errors');
    });

    it('RULE #3: Error message requires error state', () => {
      expect(() => {
        TextareaEntity.create({
          error: 'Some error',
          state: 'default',
        });
      }).toThrow('Error message requires error state');
    });

    it('RULE #4: maxLength must be positive if provided', () => {
      expect(() => {
        TextareaEntity.create({
          maxLength: 0,
        });
      }).toThrow('maxLength must be positive');

      expect(() => {
        TextareaEntity.create({
          maxLength: -5,
        });
      }).toThrow('maxLength must be positive');
    });

    it('RULE #5: minLength must be non-negative if provided', () => {
      expect(() => {
        TextareaEntity.create({
          minLength: -1,
        });
      }).toThrow('minLength must be non-negative');
    });

    it('RULE #6: minLength cannot exceed maxLength', () => {
      expect(() => {
        TextareaEntity.create({
          minLength: 100,
          maxLength: 50,
        });
      }).toThrow('minLength cannot exceed maxLength');
    });

    it('RULE #7: rows must be positive', () => {
      expect(() => {
        TextareaEntity.create({
          rows: 0,
        });
      }).toThrow('rows must be positive');

      expect(() => {
        TextareaEntity.create({
          rows: -3,
        });
      }).toThrow('rows must be positive');
    });
  });

  describe('Computed Properties', () => {
    it('should correctly calculate isInteractive', () => {
      const interactive = TextareaEntity.create({});
      expect(interactive.isInteractive).toBe(true);

      const disabled = TextareaEntity.create({ disabled: true });
      expect(disabled.isInteractive).toBe(false);

      const readOnly = TextareaEntity.create({ readOnly: true });
      expect(readOnly.isInteractive).toBe(false);
    });

    it('should correctly calculate hasError', () => {
      const noError = TextareaEntity.create({});
      expect(noError.hasError).toBe(false);

      const withError = TextareaEntity.create({
        error: 'Too long',
        state: 'error',
      });
      expect(withError.hasError).toBe(true);

      const errorStateOnly = TextareaEntity.create({ state: 'error' });
      expect(errorStateOnly.hasError).toBe(true);
    });

    it('should calculate character count', () => {
      const empty = TextareaEntity.create({});
      expect(empty.characterCount).toBe(0);

      const withText = TextareaEntity.create({ value: 'Hello World' });
      expect(withText.characterCount).toBe(11);
    });

    it('should calculate word count', () => {
      const empty = TextareaEntity.create({});
      expect(empty.wordCount).toBe(0);

      const singleWord = TextareaEntity.create({ value: 'Hello' });
      expect(singleWord.wordCount).toBe(1);

      const multipleWords = TextareaEntity.create({ value: 'Hello World Test' });
      expect(multipleWords.wordCount).toBe(3);

      const whitespace = TextareaEntity.create({ value: '   ' });
      expect(whitespace.wordCount).toBe(0);
    });

    it('should calculate line count', () => {
      const empty = TextareaEntity.create({});
      expect(empty.lineCount).toBe(1);

      const singleLine = TextareaEntity.create({ value: 'Hello' });
      expect(singleLine.lineCount).toBe(1);

      const multiLine = TextareaEntity.create({ value: 'Line 1\nLine 2\nLine 3' });
      expect(multiLine.lineCount).toBe(3);
    });

    it('should calculate remaining characters', () => {
      const noLimit = TextareaEntity.create({ value: 'Hello' });
      expect(noLimit.remainingCharacters).toBe(null);

      const withLimit = TextareaEntity.create({
        value: 'Hello',
        maxLength: 100,
      });
      expect(withLimit.remainingCharacters).toBe(95);

      const atLimit = TextareaEntity.create({
        value: 'Hello',
        maxLength: 5,
      });
      expect(atLimit.remainingCharacters).toBe(0);
    });

    it('should detect exceeds max length', () => {
      const noLimit = TextareaEntity.create({ value: 'Hello World' });
      expect(noLimit.exceedsMaxLength).toBe(false);

      const withinLimit = TextareaEntity.create({
        value: 'Hello',
        maxLength: 10,
      });
      expect(withinLimit.exceedsMaxLength).toBe(false);

      const exceedsLimit = TextareaEntity.create({
        value: 'Hello World',
        maxLength: 5,
      });
      expect(exceedsLimit.exceedsMaxLength).toBe(true);
    });
  });

  describe('Immutable Updates', () => {
    it('withValue should update value and clear error', () => {
      const original = TextareaEntity.create({
        value: 'Old',
        error: 'Some error',
        state: 'error',
      });

      const updated = original.withValue('New');

      expect(updated.currentState.value).toBe('New');
      expect(updated.currentState.error).toBe(null);
      expect(updated.currentState.state).toBe('default');
      expect(original.currentState.value).toBe('Old'); 
    });

    it('withValue should allow value exceeding maxLength (validation handles this)', () => {
      const original = TextareaEntity.create({ maxLength: 10 });
      const updated = original.withValue('This is way too long for the limit');

      
      expect(updated.currentState.value).toBe('This is way too long for the limit');
      
      expect(updated.exceedsMaxLength).toBe(true);
      const validationResult = updated.validateMaxLength();
      expect(validationResult.valid).toBe(false);
    });

    it('withValue should allow any value length', () => {
      const original = TextareaEntity.create({ maxLength: 5 });
      const updated = original.withValue('Hello World');
      expect(updated.currentState.value).toBe('Hello World');
    });

    it('withError should set error and state', () => {
      const original = TextareaEntity.create({});
      const updated = original.withError('Error message');

      expect(updated.currentState.error).toBe('Error message');
      expect(updated.currentState.state).toBe('error');
    });

    it('withError(null) should clear error and reset state', () => {
      const original = TextareaEntity.create({
        error: 'Error',
        state: 'error',
      });
      const updated = original.withError(null);

      expect(updated.currentState.error).toBe(null);
      expect(updated.currentState.state).toBe('default');
    });

    it('withDisabled should disable and clear errors', () => {
      const original = TextareaEntity.create({
        error: 'Error',
        state: 'error',
      });
      const updated = original.withDisabled(true);

      expect(updated.currentState.disabled).toBe(true);
      expect(updated.currentState.error).toBe(null);
      expect(updated.currentState.state).toBe('default');
    });

    it('withReadOnly should set readOnly and clear required', () => {
      const original = TextareaEntity.create({ required: true });
      const updated = original.withReadOnly(true);

      expect(updated.currentState.readOnly).toBe(true);
      expect(updated.currentState.required).toBe(false);
    });

    it('withRequired should set required and clear readOnly', () => {
      const original = TextareaEntity.create({ readOnly: true });
      const updated = original.withRequired(true);

      expect(updated.currentState.required).toBe(true);
      expect(updated.currentState.readOnly).toBe(false);
    });

    it('withMaxLength should update maxLength', () => {
      const original = TextareaEntity.create({});
      const updated = original.withMaxLength(100);

      expect(updated.currentState.maxLength).toBe(100);
    });

    it('withMaxLength should validate new limit', () => {
      const original = TextareaEntity.create({});

      expect(() => {
        original.withMaxLength(0);
      }).toThrow('maxLength must be positive');

      expect(() => {
        original.withMaxLength(-5);
      }).toThrow('maxLength must be positive');
    });

    it('withMinLength should update minLength', () => {
      const original = TextareaEntity.create({});
      const updated = original.withMinLength(10);

      expect(updated.currentState.minLength).toBe(10);
    });

    it('withRows should update rows', () => {
      const original = TextareaEntity.create({});
      const updated = original.withRows(10);

      expect(updated.currentState.rows).toBe(10);
    });

    it('withAutoResize should update autoResize', () => {
      const original = TextareaEntity.create({});
      const updated = original.withAutoResize(true);

      expect(updated.currentState.autoResize).toBe(true);
    });
  });

  describe('Validation - Required', () => {
    it('should pass when not required', () => {
      const entity = TextareaEntity.create({ value: '' });
      const result = entity.validateRequired();

      expect(result.valid).toBe(true);
      expect(result.errorMessage).toBe(null);
    });

    it('should pass when required and has value', () => {
      const entity = TextareaEntity.create({
        required: true,
        value: 'Hello',
      });
      const result = entity.validateRequired();

      expect(result.valid).toBe(true);
      expect(result.errorMessage).toBe(null);
    });

    it('should fail when required and empty', () => {
      const entity = TextareaEntity.create({
        required: true,
        value: '',
      });
      const result = entity.validateRequired();

      expect(result.valid).toBe(false);
      expect(result.errorMessage).toBe('This field is required');
    });

    it('should fail when required and only whitespace', () => {
      const entity = TextareaEntity.create({
        required: true,
        value: '   \n  \t  ',
      });
      const result = entity.validateRequired();

      expect(result.valid).toBe(false);
      expect(result.errorMessage).toBe('This field is required');
    });
  });

  describe('Validation - MaxLength', () => {
    it('should pass when no maxLength set', () => {
      const entity = TextareaEntity.create({
        value: 'Any length text here',
      });
      const result = entity.validateMaxLength();

      expect(result.valid).toBe(true);
      expect(result.errorMessage).toBe(null);
    });

    it('should pass when within maxLength', () => {
      const entity = TextareaEntity.create({
        value: 'Hello',
        maxLength: 10,
      });
      const result = entity.validateMaxLength();

      expect(result.valid).toBe(true);
      expect(result.errorMessage).toBe(null);
    });

    it('should pass when exactly at maxLength', () => {
      const entity = TextareaEntity.create({
        value: 'Hello',
        maxLength: 5,
      });
      const result = entity.validateMaxLength();

      expect(result.valid).toBe(true);
      expect(result.errorMessage).toBe(null);
    });

    it('should fail when exceeds maxLength', () => {
      const entity = TextareaEntity.create({
        value: 'Hello World',
        maxLength: 5,
      });
      const result = entity.validateMaxLength();

      expect(result.valid).toBe(false);
      expect(result.errorMessage).toBe('Maximum 5 characters allowed');
    });
  });

  describe('Validation - MinLength', () => {
    it('should pass when no minLength set', () => {
      const entity = TextareaEntity.create({ value: 'Hi' });
      const result = entity.validateMinLength();

      expect(result.valid).toBe(true);
      expect(result.errorMessage).toBe(null);
    });

    it('should pass when empty and not required', () => {
      const entity = TextareaEntity.create({
        value: '',
        minLength: 10,
        required: false,
      });
      const result = entity.validateMinLength();

      expect(result.valid).toBe(true);
      expect(result.errorMessage).toBe(null);
    });

    it('should pass when meets minLength', () => {
      const entity = TextareaEntity.create({
        value: 'Hello World',
        minLength: 10,
      });
      const result = entity.validateMinLength();

      expect(result.valid).toBe(true);
      expect(result.errorMessage).toBe(null);
    });

    it('should fail when below minLength', () => {
      const entity = TextareaEntity.create({
        value: 'Hi',
        minLength: 10,
      });
      const result = entity.validateMinLength();

      expect(result.valid).toBe(false);
      expect(result.errorMessage).toBe('Minimum 10 characters required');
    });
  });

  describe('Validation - validateAll', () => {
    it('should pass all validations when valid', () => {
      const entity = TextareaEntity.create({
        required: true,
        value: 'Hello World',
        minLength: 5,
        maxLength: 100,
      });
      const result = entity.validateAll();

      expect(result.valid).toBe(true);
      expect(result.errorMessage).toBe(null);
    });

    it('should return first error (required before minLength)', () => {
      const entity = TextareaEntity.create({
        required: true,
        value: '',
        minLength: 10,
      });
      const result = entity.validateAll();

      expect(result.valid).toBe(false);
      expect(result.errorMessage).toBe('This field is required');
    });

    it('should check minLength after required passes', () => {
      const entity = TextareaEntity.create({
        required: true,
        value: 'Hi',
        minLength: 10,
      });
      const result = entity.validateAll();

      expect(result.valid).toBe(false);
      expect(result.errorMessage).toBe('Minimum 10 characters required');
    });

    it('should check maxLength after minLength passes', () => {
      const entity = TextareaEntity.create({
        value: 'This is way too long',
        minLength: 5,
        maxLength: 10,
      });
      const result = entity.validateAll();

      expect(result.valid).toBe(false);
      expect(result.errorMessage).toBe('Maximum 10 characters allowed');
    });
  });

  describe('Immutability', () => {
    it('should return new instance on updates', () => {
      const original = TextareaEntity.create({ value: 'Hello' });
      const updated = original.withValue('World');

      expect(updated).not.toBe(original);
      expect(original.currentState.value).toBe('Hello');
      expect(updated.currentState.value).toBe('World');
    });

    it('currentState should return defensive copy', () => {
      const entity = TextareaEntity.create({ value: 'Hello' });
      const state1 = entity.currentState;
      const state2 = entity.currentState;

      expect(state1).not.toBe(state2);
      expect(state1).toEqual(state2);
    });
  });
});
