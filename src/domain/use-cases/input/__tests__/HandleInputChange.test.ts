

import { describe, it, expect } from 'bun:test';
import { HandleInputChange } from '../HandleInputChange';
import { InputEntity } from '../../../entities/input/InputState';

describe('HandleInputChange Use Case', () => {
  const useCase = new HandleInputChange();

  
  
  

  describe('Rule #1: Cannot change non-interactive inputs', () => {
    it('should not change value when input is disabled', () => {
      const input = InputEntity.create({
        value: 'original',
        disabled: true,
      });

      const response = useCase.execute({
        input,
        newValue: 'attempted change',
      });

      expect(response.success).toBe(true);
      expect(response.updatedInput.currentState.value).toBe('original');
    });

    it('should not change value when input is readonly', () => {
      const input = InputEntity.create({
        value: 'original',
        readOnly: true,
      });

      const response = useCase.execute({
        input,
        newValue: 'attempted change',
      });

      expect(response.success).toBe(true);
      expect(response.updatedInput.currentState.value).toBe('original');
    });

    it('should change value when input is interactive', () => {
      const input = InputEntity.create({
        value: 'original',
        disabled: false,
        readOnly: false,
      });

      const response = useCase.execute({
        input,
        newValue: 'new value',
      });

      expect(response.success).toBe(true);
      expect(response.updatedInput.currentState.value).toBe('new value');
    });
  });

  
  
  

  describe('Rule #2: Value updates clear existing errors', () => {
    it('should clear error when value changes', () => {
      const input = InputEntity.create({
        value: 'bad',
        error: 'Invalid input',
        state: 'error',
      });

      const response = useCase.execute({
        input,
        newValue: 'good',
      });

      expect(response.updatedInput.currentState.error).toBe(null);
      expect(response.updatedInput.currentState.state).toBe('default');
    });

    it('should not clear error for disabled input (no change occurs)', () => {
      const input = InputEntity.create({
        value: 'original',
        disabled: true,
      });

      const response = useCase.execute({
        input,
        newValue: 'new',
      });

      
      expect(response.updatedInput).toBe(input);
    });
  });

  
  
  

  describe('Rule #3: Validate if validateOnChange is true', () => {
    it('should not validate when validateOnChange is false', () => {
      const input = InputEntity.create({
        type: 'email',
        value: '',
        required: true,
      });

      const response = useCase.execute({
        input,
        newValue: 'invalid-email',
        validateOnChange: false,
      });

      expect(response.validationError).toBeUndefined();
      expect(response.updatedInput.currentState.error).toBe(null);
    });

    it('should not validate when validateOnChange is undefined (defaults to false)', () => {
      const input = InputEntity.create({
        type: 'email',
        value: '',
      });

      const response = useCase.execute({
        input,
        newValue: 'invalid-email',
      });

      expect(response.validationError).toBeUndefined();
      expect(response.updatedInput.currentState.error).toBe(null);
    });

    it('should validate when validateOnChange is true - passing validation', () => {
      const input = InputEntity.create({
        type: 'email',
        value: '',
      });

      const response = useCase.execute({
        input,
        newValue: 'valid@example.com',
        validateOnChange: true,
      });

      expect(response.validationError).toBe(null);
      expect(response.updatedInput.currentState.error).toBe(null);
    });

    it('should validate when validateOnChange is true - failing validation', () => {
      const input = InputEntity.create({
        type: 'email',
        value: '',
      });

      const response = useCase.execute({
        input,
        newValue: 'invalid-email',
        validateOnChange: true,
      });

      expect(response.validationError).toBe('Please enter a valid email address');
      expect(response.updatedInput.currentState.error).toBe('Please enter a valid email address');
      expect(response.updatedInput.currentState.state).toBe('error');
    });

    it('should validate required field', () => {
      const input = InputEntity.create({
        type: 'text',
        value: 'something',
        required: true,
      });

      const response = useCase.execute({
        input,
        newValue: '',
        validateOnChange: true,
      });

      expect(response.validationError).toBe('This field is required');
      expect(response.updatedInput.currentState.error).toBe('This field is required');
    });
  });

  
  
  

  describe('Rule #4: Always succeed', () => {
    it('should return success even when input is non-interactive', () => {
      const input = InputEntity.create({
        disabled: true,
      });

      const response = useCase.execute({
        input,
        newValue: 'any value',
      });

      expect(response.success).toBe(true);
    });

    it('should return success even when validation fails', () => {
      const input = InputEntity.create({
        type: 'email',
        required: true,
      });

      const response = useCase.execute({
        input,
        newValue: 'invalid',
        validateOnChange: true,
      });

      expect(response.success).toBe(true);
      expect(response.validationError).toBeTruthy();
    });

    it('should return success on normal change', () => {
      const input = InputEntity.create({});

      const response = useCase.execute({
        input,
        newValue: 'new value',
      });

      expect(response.success).toBe(true);
    });
  });

  
  
  

  describe('Integration scenarios', () => {
    it('should handle complete flow: error -> type -> clear error', () => {
      const input = InputEntity.create({
        type: 'email',
        value: 'bad',
        error: 'Invalid email',
        state: 'error',
      });

      const response = useCase.execute({
        input,
        newValue: 'good@example.com',
      });

      expect(response.success).toBe(true);
      expect(response.updatedInput.currentState.value).toBe('good@example.com');
      expect(response.updatedInput.currentState.error).toBe(null);
      expect(response.updatedInput.currentState.state).toBe('default');
    });

    it('should handle complete flow: type -> validate -> set error', () => {
      const input = InputEntity.create({
        type: 'email',
        value: '',
      });

      const response = useCase.execute({
        input,
        newValue: 'invalid',
        validateOnChange: true,
      });

      expect(response.success).toBe(true);
      expect(response.updatedInput.currentState.value).toBe('invalid');
      expect(response.validationError).toBe('Please enter a valid email address');
      expect(response.updatedInput.hasError).toBe(true);
    });

    it('should handle URL validation', () => {
      const input = InputEntity.create({
        type: 'url',
        value: '',
      });

      const response = useCase.execute({
        input,
        newValue: 'not-a-url',
        validateOnChange: true,
      });

      expect(response.validationError).toBe('Please enter a valid URL');
    });

    it('should handle phone validation', () => {
      const input = InputEntity.create({
        type: 'tel',
        value: '',
      });

      const response = useCase.execute({
        input,
        newValue: '123-ABC-7890',
        validateOnChange: true,
      });

      expect(response.validationError).toBe('Please enter a valid phone number');
    });

    it('should handle number validation', () => {
      const input = InputEntity.create({
        type: 'number',
        value: '',
      });

      const response = useCase.execute({
        input,
        newValue: 'not-a-number',
        validateOnChange: true,
      });

      expect(response.validationError).toBe('Please enter a valid number');
    });
  });
});
