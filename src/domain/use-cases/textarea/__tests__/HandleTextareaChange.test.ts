

import { describe, it, expect } from 'bun:test';
import { TextareaEntity } from '../../../entities/textarea/TextareaState';
import { HandleTextareaChange } from '../HandleTextareaChange';

describe('HandleTextareaChange', () => {
  const useCase = new HandleTextareaChange();

  describe('Interactive Textareas', () => {
    it('should update value for interactive textarea', () => {
      const textarea = TextareaEntity.create({});
      const response = useCase.execute({
        textarea,
        newValue: 'Hello World',
      });

      expect(response.success).toBe(true);
      expect(response.updatedTextarea.currentState.value).toBe('Hello World');
    });

    it('should clear errors when updating value', () => {
      const textarea = TextareaEntity.create({
        value: 'Old',
        error: 'Some error',
        state: 'error',
      });
      const response = useCase.execute({
        textarea,
        newValue: 'New',
      });

      expect(response.success).toBe(true);
      expect(response.updatedTextarea.currentState.value).toBe('New');
      expect(response.updatedTextarea.currentState.error).toBe(null);
      expect(response.updatedTextarea.currentState.state).toBe('default');
    });
  });

  describe('Non-Interactive Textareas', () => {
    it('should not update disabled textarea', () => {
      const textarea = TextareaEntity.create({
        value: 'Original',
        disabled: true,
      });
      const response = useCase.execute({
        textarea,
        newValue: 'New Value',
      });

      expect(response.success).toBe(true);
      expect(response.updatedTextarea.currentState.value).toBe('Original');
    });

    it('should not update readonly textarea', () => {
      const textarea = TextareaEntity.create({
        value: 'Original',
        readOnly: true,
      });
      const response = useCase.execute({
        textarea,
        newValue: 'New Value',
      });

      expect(response.success).toBe(true);
      expect(response.updatedTextarea.currentState.value).toBe('Original');
    });
  });

  describe('Validation on Change', () => {
    it('should not validate when validateOnChange is false', () => {
      const textarea = TextareaEntity.create({
        required: true,
        value: '',
      });
      const response = useCase.execute({
        textarea,
        newValue: '',
        validateOnChange: false,
      });

      expect(response.success).toBe(true);
      expect(response.validationError).toBeUndefined();
      expect(response.updatedTextarea.hasError).toBe(false);
    });

    it('should validate when validateOnChange is true', () => {
      const textarea = TextareaEntity.create({
        required: true,
      });
      const response = useCase.execute({
        textarea,
        newValue: '',
        validateOnChange: true,
      });

      expect(response.success).toBe(true);
      expect(response.validationError).toBe('This field is required');
      expect(response.updatedTextarea.hasError).toBe(true);
    });

    it('should set error on textarea when validation fails', () => {
      const textarea = TextareaEntity.create({
        maxLength: 10,
      });
      const response = useCase.execute({
        textarea,
        newValue: 'This is too long',
        validateOnChange: true,
      });

      expect(response.success).toBe(true);
      expect(response.validationError).toBe('Maximum 10 characters allowed');
      expect(response.updatedTextarea.currentState.error).toBe(
        'Maximum 10 characters allowed'
      );
    });

    it('should clear error when validation passes', () => {
      const textarea = TextareaEntity.create({
        required: true,
      });
      const response = useCase.execute({
        textarea,
        newValue: 'Valid text',
        validateOnChange: true,
      });

      expect(response.success).toBe(true);
      expect(response.validationError).toBe(null);
      expect(response.updatedTextarea.hasError).toBe(false);
    });
  });

  describe('Character Counting', () => {
    it('should include character count in metadata', () => {
      const textarea = TextareaEntity.create({});
      const response = useCase.execute({
        textarea,
        newValue: 'Hello World',
      });

      expect(response.metadata).toBeDefined();
      expect(response.metadata?.characterCount).toBe(11);
    });

    it('should include word count in metadata', () => {
      const textarea = TextareaEntity.create({});
      const response = useCase.execute({
        textarea,
        newValue: 'Hello World Test',
      });

      expect(response.metadata).toBeDefined();
      expect(response.metadata?.wordCount).toBe(3);
    });

    it('should include line count in metadata', () => {
      const textarea = TextareaEntity.create({});
      const response = useCase.execute({
        textarea,
        newValue: 'Line 1\nLine 2\nLine 3',
      });

      expect(response.metadata).toBeDefined();
      expect(response.metadata?.lineCount).toBe(3);
    });

    it('should include remaining characters when maxLength set', () => {
      const textarea = TextareaEntity.create({
        maxLength: 100,
      });
      const response = useCase.execute({
        textarea,
        newValue: 'Hello',
      });

      expect(response.metadata).toBeDefined();
      expect(response.metadata?.remainingCharacters).toBe(95);
    });

    it('should indicate exceeds max length', () => {
      const textarea = TextareaEntity.create({
        maxLength: 5,
      });
      const response = useCase.execute({
        textarea,
        newValue: 'Too long',
        validateOnChange: true,
      });

      expect(response.metadata).toBeDefined();
      expect(response.metadata?.exceedsMaxLength).toBe(true);
    });
  });

  describe('MaxLength Handling', () => {
    it('should allow value exceeding maxLength (validation shows error)', () => {
      const textarea = TextareaEntity.create({
        maxLength: 10,
      });

      
      const response = useCase.execute({
        textarea,
        newValue: 'This is way too long',
      });

      expect(response.success).toBe(true);
      expect(response.updatedTextarea.currentState.value).toBe('This is way too long');
      expect(response.metadata?.exceedsMaxLength).toBe(true);
    });

    it('should allow any value length', () => {
      const textarea = TextareaEntity.create({
        maxLength: 5,
      });
      const response = useCase.execute({
        textarea,
        newValue: 'Hello World',
      });

      expect(response.success).toBe(true);
      expect(response.updatedTextarea.currentState.value).toBe('Hello World');
    });
  });
});
