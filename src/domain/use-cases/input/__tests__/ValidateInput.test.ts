

import { describe, it, expect } from 'bun:test';
import { ValidateInput } from '../ValidateInput';
import { InputEntity } from '../../../entities/input/InputState';

describe('ValidateInput Use Case', () => {
  const useCase = new ValidateInput();

  
  
  

  describe('Rule #1: Run all applicable validations', () => {
    it('should validate required field - passing', () => {
      const input = InputEntity.create({
        type: 'text',
        value: 'something',
        required: true,
      });

      const response = useCase.execute({ input });

      expect(response.validationResult.valid).toBe(true);
      expect(response.validationResult.errorMessage).toBe(null);
    });

    it('should validate required field - failing', () => {
      const input = InputEntity.create({
        type: 'text',
        value: '',
        required: true,
      });

      const response = useCase.execute({ input });

      expect(response.validationResult.valid).toBe(false);
      expect(response.validationResult.errorMessage).toBe('This field is required');
    });

    it('should validate email - passing', () => {
      const input = InputEntity.create({
        type: 'email',
        value: 'test@example.com',
      });

      const response = useCase.execute({ input });

      expect(response.validationResult.valid).toBe(true);
    });

    it('should validate email - failing', () => {
      const input = InputEntity.create({
        type: 'email',
        value: 'invalid-email',
      });

      const response = useCase.execute({ input });

      expect(response.validationResult.valid).toBe(false);
      expect(response.validationResult.errorMessage).toBe(
        'Please enter a valid email address'
      );
    });

    it('should validate URL - passing', () => {
      const input = InputEntity.create({
        type: 'url',
        value: 'https://example.com',
      });

      const response = useCase.execute({ input });

      expect(response.validationResult.valid).toBe(true);
    });

    it('should validate URL - failing', () => {
      const input = InputEntity.create({
        type: 'url',
        value: 'not-a-url',
      });

      const response = useCase.execute({ input });

      expect(response.validationResult.valid).toBe(false);
      expect(response.validationResult.errorMessage).toBe('Please enter a valid URL');
    });

    it('should validate tel - passing', () => {
      const input = InputEntity.create({
        type: 'tel',
        value: '123-456-7890',
      });

      const response = useCase.execute({ input });

      expect(response.validationResult.valid).toBe(true);
    });

    it('should validate tel - failing', () => {
      const input = InputEntity.create({
        type: 'tel',
        value: '123-ABC-7890',
      });

      const response = useCase.execute({ input });

      expect(response.validationResult.valid).toBe(false);
      expect(response.validationResult.errorMessage).toBe(
        'Please enter a valid phone number'
      );
    });

    it('should validate number - passing', () => {
      const input = InputEntity.create({
        type: 'number',
        value: '123.45',
      });

      const response = useCase.execute({ input });

      expect(response.validationResult.valid).toBe(true);
    });

    it('should validate number - failing', () => {
      const input = InputEntity.create({
        type: 'number',
        value: 'not-a-number',
      });

      const response = useCase.execute({ input });

      expect(response.validationResult.valid).toBe(false);
      expect(response.validationResult.errorMessage).toBe('Please enter a valid number');
    });
  });

  
  
  

  describe('Rule #2: Update input with error on failure', () => {
    it('should set error on input when validation fails', () => {
      const input = InputEntity.create({
        type: 'email',
        value: 'invalid',
      });

      const response = useCase.execute({ input });

      expect(response.updatedInput.currentState.error).toBe(
        'Please enter a valid email address'
      );
      expect(response.updatedInput.currentState.state).toBe('error');
    });

    it('should preserve original input when validation fails', () => {
      const input = InputEntity.create({
        type: 'email',
        value: 'invalid',
      });

      const response = useCase.execute({ input });

      
      expect(input.currentState.error).toBe(null);
      
      expect(response.updatedInput.currentState.error).toBe(
        'Please enter a valid email address'
      );
    });
  });

  
  
  

  describe('Rule #3: Clear errors on success', () => {
    it('should clear existing error when validation passes', () => {
      
      const input = InputEntity.create({
        type: 'email',
        value: 'valid@example.com',
        error: 'Old error',
        state: 'error',
      });

      const response = useCase.execute({ input });

      expect(response.updatedInput.currentState.error).toBe(null);
      expect(response.updatedInput.currentState.state).toBe('default');
    });

    it('should keep input clean when validation passes and no prior error', () => {
      const input = InputEntity.create({
        type: 'email',
        value: 'valid@example.com',
      });

      const response = useCase.execute({ input });

      expect(response.updatedInput.currentState.error).toBe(null);
      expect(response.updatedInput.currentState.state).toBe('default');
    });
  });

  
  
  

  describe('Rule #4: Return validation result', () => {
    it('should return validation result on success', () => {
      const input = InputEntity.create({
        type: 'text',
        value: 'valid',
      });

      const response = useCase.execute({ input });

      expect(response.success).toBe(true);
      expect(response.validationResult).toBeDefined();
      expect(response.validationResult.valid).toBe(true);
      expect(response.validationResult.errorMessage).toBe(null);
    });

    it('should return validation result on failure', () => {
      const input = InputEntity.create({
        type: 'email',
        value: 'invalid',
      });

      const response = useCase.execute({ input });

      expect(response.success).toBe(true);
      expect(response.validationResult).toBeDefined();
      expect(response.validationResult.valid).toBe(false);
      expect(response.validationResult.errorMessage).toBeTruthy();
    });
  });

  
  
  

  describe('Validation priority (required first, then type-specific)', () => {
    it('should fail on required before checking email format', () => {
      const input = InputEntity.create({
        type: 'email',
        value: '',
        required: true,
      });

      const response = useCase.execute({ input });

      expect(response.validationResult.valid).toBe(false);
      
      expect(response.validationResult.errorMessage).toBe('This field is required');
    });

    it('should check email format after required passes', () => {
      const input = InputEntity.create({
        type: 'email',
        value: 'invalid',
        required: true,
      });

      const response = useCase.execute({ input });

      expect(response.validationResult.valid).toBe(false);
      
      expect(response.validationResult.errorMessage).toBe(
        'Please enter a valid email address'
      );
    });
  });

  
  
  

  describe('Integration scenarios', () => {
    it('should handle complete validation cycle for email', () => {
      
      const input1 = InputEntity.create({
        type: 'email',
        value: 'invalid',
      });

      const response1 = useCase.execute({ input: input1 });
      expect(response1.validationResult.valid).toBe(false);
      expect(response1.updatedInput.hasError).toBe(true);

      
      const input2 = response1.updatedInput.withValue('valid@example.com');
      const response2 = useCase.execute({ input: input2 });

      expect(response2.validationResult.valid).toBe(true);
      expect(response2.updatedInput.hasError).toBe(false);
    });

    it('should handle required + email validation', () => {
      const input = InputEntity.create({
        type: 'email',
        value: 'test@example.com',
        required: true,
      });

      const response = useCase.execute({ input });

      expect(response.validationResult.valid).toBe(true);
      expect(response.updatedInput.hasError).toBe(false);
    });

    it('should handle empty optional field (should pass)', () => {
      const input = InputEntity.create({
        type: 'email',
        value: '',
        required: false,
      });

      const response = useCase.execute({ input });

      expect(response.validationResult.valid).toBe(true);
    });

    it('should validate across different input types', () => {
      const testCases = [
        {
          input: InputEntity.create({ type: 'text', value: 'any text' }),
          shouldPass: true,
        },
        {
          input: InputEntity.create({ type: 'email', value: 'test@example.com' }),
          shouldPass: true,
        },
        {
          input: InputEntity.create({ type: 'email', value: 'invalid' }),
          shouldPass: false,
        },
        {
          input: InputEntity.create({ type: 'url', value: 'https://example.com' }),
          shouldPass: true,
        },
        {
          input: InputEntity.create({ type: 'url', value: 'invalid' }),
          shouldPass: false,
        },
        {
          input: InputEntity.create({ type: 'tel', value: '123-456-7890' }),
          shouldPass: true,
        },
        {
          input: InputEntity.create({ type: 'tel', value: 'ABC' }),
          shouldPass: false,
        },
        {
          input: InputEntity.create({ type: 'number', value: '123' }),
          shouldPass: true,
        },
        {
          input: InputEntity.create({ type: 'number', value: 'abc' }),
          shouldPass: false,
        },
      ];

      testCases.forEach(({ input, shouldPass }) => {
        const response = useCase.execute({ input });
        expect(response.validationResult.valid).toBe(shouldPass);
      });
    });
  });
});
