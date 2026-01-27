

import { describe, it, expect } from 'bun:test';
import { TextareaEntity } from '../../../entities/textarea/TextareaState';
import { ValidateTextarea } from '../ValidateTextarea';

describe('ValidateTextarea', () => {
  const useCase = new ValidateTextarea();

  describe('Successful Validation', () => {
    it('should pass validation for valid textarea', () => {
      const textarea = TextareaEntity.create({
        required: true,
        value: 'Hello World',
        maxLength: 100,
      });

      const response = useCase.execute({ textarea });

      expect(response.success).toBe(true);
      expect(response.validationResult.valid).toBe(true);
      expect(response.validationResult.errorMessage).toBe(null);
      expect(response.updatedTextarea.hasError).toBe(false);
    });

    it('should clear existing errors when validation passes', () => {
      const textarea = TextareaEntity.create({
        required: true,
        value: 'Valid',
        error: 'Old error',
        state: 'error',
      });

      const response = useCase.execute({ textarea });

      expect(response.success).toBe(true);
      expect(response.validationResult.valid).toBe(true);
      expect(response.updatedTextarea.currentState.error).toBe(null);
      expect(response.updatedTextarea.currentState.state).toBe('default');
    });
  });

  describe('Failed Validation', () => {
    it('should fail when required field is empty', () => {
      const textarea = TextareaEntity.create({
        required: true,
        value: '',
      });

      const response = useCase.execute({ textarea });

      expect(response.success).toBe(true);
      expect(response.validationResult.valid).toBe(false);
      expect(response.validationResult.errorMessage).toBe(
        'This field is required'
      );
      expect(response.updatedTextarea.currentState.error).toBe(
        'This field is required'
      );
    });

    it('should fail when exceeds maxLength', () => {
      const textarea = TextareaEntity.create({
        value: 'Too long',
        maxLength: 5,
      });

      const response = useCase.execute({ textarea });

      expect(response.success).toBe(true);
      expect(response.validationResult.valid).toBe(false);
      expect(response.validationResult.errorMessage).toBe(
        'Maximum 5 characters allowed'
      );
      expect(response.updatedTextarea.hasError).toBe(true);
    });

    it('should fail when below minLength', () => {
      const textarea = TextareaEntity.create({
        value: 'Hi',
        minLength: 10,
      });

      const response = useCase.execute({ textarea });

      expect(response.success).toBe(true);
      expect(response.validationResult.valid).toBe(false);
      expect(response.validationResult.errorMessage).toBe(
        'Minimum 10 characters required'
      );
    });
  });

  describe('Validation Order', () => {
    it('should check required before minLength', () => {
      const textarea = TextareaEntity.create({
        required: true,
        value: '',
        minLength: 10,
      });

      const response = useCase.execute({ textarea });

      expect(response.validationResult.valid).toBe(false);
      expect(response.validationResult.errorMessage).toBe(
        'This field is required'
      );
    });

    it('should check minLength before maxLength', () => {
      const textarea = TextareaEntity.create({
        value: 'This is way too long for the limit',
        minLength: 5,
        maxLength: 10,
      });

      const response = useCase.execute({ textarea });

      
      expect(response.validationResult.valid).toBe(false);
      expect(response.validationResult.errorMessage).toBe(
        'Maximum 10 characters allowed'
      );
    });
  });
});
